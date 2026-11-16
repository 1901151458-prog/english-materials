#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""english-materials 线上巡检（GitHub Pages）

检查项：
  1. 代表性页面 HTTP 状态与响应时间
  2. 关键静态资源可达性与体积
  3. 外部链接抽样可达性
  4. 404 行为是否正确

在 GitHub Actions 中定时运行，也可本地执行。
用法：
    python scripts/check_live.py
    python scripts/check_live.py --external 40
"""
import argparse
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE = "https://1901151458-prog.github.io/english-materials/"
UA = {"User-Agent": "Mozilla/5.0 (compatible; english-materials-ci/1.0)"}

PAGES = [
    ("首页", ""),
    ("搜索", "search.html"),
    ("404", "404.html"),
    ("词汇总入口", "vocab-hub/"),
    ("语法总入口", "grammar/"),
    ("课文总入口", "reading/"),
    ("范文总入口", "essays/"),
    ("背单词", "typing/"),
    ("词汇排序", "vocab-rank/"),
    ("词汇助记", "vocab-5-books/"),
    ("七上", "g7a/"),
    ("七下", "g7b/"),
    ("八上", "g8a/"),
    ("八下", "g8b/"),
    ("九上", "g9/"),
    ("九下", "g9b/"),
    ("课文-七上U1", "g7a/unit1-reading/"),
    ("课文-八下U6", "g8b/unit6-reading/"),
    ("课文-九上U4", "g9/unit4-reading/"),
    ("语法-七上名词", "g7a-nouns/"),
    ("语法-宾语从句", "object-clauses-g9/"),
    ("范文-七上", "essays-g7a/"),
    ("词形-七上", "vocab-forms-g7a/"),
    ("SDG 阅读", "sdgs/reading/"),
    ("SDG 写作", "sdgs/essays/"),
]

ASSETS = [
    "assets/base.min.css",
    "assets/refine.min.css",
    "assets/theme.min.css",
    "assets/theme.min.js",
    "assets/dict.min.js",
    "assets/speak.min.js",
    "assets/read-aloud.min.js",
    "assets/search-index.json",
    "assets/vocab-5-books/data.js",
    "assets/og-cover.png",
    "typing/app.min.js",
    "typing/data/index.js",
    "vocab-rank/data.js",
    "vocab-rank/app.min.js",
    "manifest.webmanifest",
]

# 外部链接：抽几个高频且稳定的（UN 官网、GitHub 仓库）
EXTERNAL = [
    "https://www.un.org/sustainabledevelopment/",
    "https://www.un.org/sustainabledevelopment/climate-change/",
    "https://github.com/1901151458-prog/english-materials",
    "https://dictionary.cambridge.org/",
]


def fetch(url, timeout=30):
    t0 = time.perf_counter()
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            data = r.read()
            return r.status, len(data), (time.perf_counter() - t0) * 1000, None
    except urllib.error.HTTPError as e:
        return e.code, 0, (time.perf_counter() - t0) * 1000, f"HTTP {e.code}"
    except Exception as e:
        return 0, 0, (time.perf_counter() - t0) * 1000, str(e)[:100]


def check_404():
    """不存在路径应返回 404 且是自定义页"""
    try:
        req = urllib.request.Request(BASE + "__ci_probe_404__.html", headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", "replace")
            return False, f"返回 {r.status}（预期 404）"
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        ok = e.code == 404 and ("404" in body or "未找到" in body or "页面未找到" in body)
        return ok, f"HTTP {e.code}, 自定义页={'是' if ok else '否'}"
    except Exception as e:
        return False, str(e)[:80]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--external", type=int, default=len(EXTERNAL))
    args = ap.parse_args()

    print("=" * 68)
    print("english-materials 线上巡检")
    print("=" * 68)

    fails = []

    # 页面
    print("\n--- 页面 ---")
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(fetch, BASE + p): (label, p) for label, p in PAGES}
        rows = {}
        for f in as_completed(futs):
            label, p = futs[f]
            rows[p] = f.result()
    times = []
    for label, p in PAGES:
        st, size, ms, err = rows[p]
        if st == 200:
            times.append(ms)
        else:
            fails.append(f"页面 {label} /{p} -> {err}")
        print(f"  {'OK ' if st == 200 else 'FAIL'} {st or '---':>4} {ms:>7.0f}ms {size/1024:>8.1f}KB  {label}")

    # 资源
    print("\n--- 关键资源 ---")
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(fetch, BASE + a): a for a in ASSETS}
        for f in as_completed(futs):
            a = futs[f]
            st, size, ms, err = f.result()
            if st != 200:
                fails.append(f"资源 {a} -> {err}")
            print(f"  {'OK ' if st == 200 else 'FAIL'} {st or '---':>4} {ms:>7.0f}ms {size/1024:>8.1f}KB  {a}")

    # 外链
    ext = EXTERNAL[: args.external]
    if ext:
        print(f"\n--- 外部链接（{len(ext)} 个）---")
        for u in ext:
            st, size, ms, err = fetch(u, 25)
            if st != 200:
                fails.append(f"外链 {u} -> {err}")
            print(f"  {'OK ' if st == 200 else 'WARN'} {st or '---':>4} {ms:>7.0f}ms  {u[:64]}")

    # 404
    print("\n--- 404 行为 ---")
    ok404, msg = check_404()
    print(f"  {'OK ' if ok404 else 'FAIL'} {msg}")
    if not ok404:
        fails.append(f"404 行为异常: {msg}")

    # 汇总
    print("\n" + "=" * 68)
    if times:
        avg = sum(times) / len(times)
        print(f"页面：{len(PAGES)} 个，失败 {len([x for x in fails if x.startswith('页面')])} 个，平均 {avg:.0f}ms")
        if avg > 3000:
            fails.append(f"平均响应时间过慢：{avg:.0f}ms > 3000ms")
    print(f"资源：{len(ASSETS)} 个")
    print(f"外链：{len(ext)} 个")

    if fails:
        print(f"\n[FAIL] {len(fails)} 项异常：")
        for x in fails:
            print("  " + x)
        return 1

    print("\n[OK] 线上巡检通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
