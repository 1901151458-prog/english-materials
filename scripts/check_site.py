#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""english-materials 站点自检（静态）

供 GitHub Actions 与本地使用，自包含、无第三方依赖。

检查项：
  1. HTML 结构：lang / title / meta description / viewport / h1 数量 / 重复 id
  2. 链接：相对路径存在性、绝对路径映射、页内与跨页锚点
  3. 版本化引用（?v=N）指向的文件是否存在
  4. CSS 花括号配平
  5. JS 语法（若环境有 node）
  6. JSON / window.X={...} 数据合法性

用法：
    python scripts/check_site.py
退出码：0 通过，1 有问题。
"""
import json
import os
import re
import shutil
from html.parser import HTMLParser
import subprocess
import sys

for _s in (sys.stdout, sys.stderr):
    try:
        _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "node_modules", "__pycache__", "artifacts"}


def iter_files(suffix):
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for f in fn:
            if f.endswith(suffix):
                yield os.path.join(dp, f)


def rel(p):
    return os.path.relpath(p, ROOT).replace("\\", "/")


def read(p):
    return open(p, encoding="utf-8", errors="replace").read()


# ---------- HTML 结构 ----------
def check_html(problems):
    for path in iter_files(".html"):
        r = rel(path)
        html = read(path)

        ids = re.findall(r'\sid="([^"]+)"', html)
        seen = set()
        dups = [i for i in ids if i in seen or seen.add(i)]
        if dups:
            problems.append(f"{r}: 重复 id -> {', '.join(dups[:5])}")

        if "<html" in html and not re.search(r"<html[^>]*\blang=", html):
            problems.append(f"{r}: <html> 缺少 lang")
        if "<title>" not in html:
            problems.append(f"{r}: 缺少 <title>")
        if not re.search(r'name="description"', html):
            problems.append(f"{r}: 缺少 meta description")
        if "<html" in html and not re.search(r'name="viewport"', html):
            problems.append(f"{r}: 缺少 viewport")

        h1 = len(re.findall(r"<h1[\s>]", html))
        if h1 == 0:
            problems.append(f"{r}: 缺少 <h1>")
        elif h1 > 1:
            problems.append(f"{r}: 有 {h1} 个 <h1>")


# ---------- 链接 ----------
_hash_cache = {}


def is_hash_routed(html_path):
    key = os.path.abspath(html_path)
    if key in _hash_cache:
        return _hash_cache[key]
    result = False
    try:
        html = read(html_path)
        base = os.path.dirname(html_path)
        for m in re.finditer(r'<script[^>]+src="([^"]+)"', html):
            src = m.group(1).split("?")[0]
            if src.startswith(("http", "/", "//")):
                continue
            jp = os.path.normpath(os.path.join(base, src))
            if not os.path.exists(jp):
                continue
            js = read(jp)
            if "hashchange" in js or "parseHash" in js or "location.hash" in js:
                result = True
                break
    except Exception:
        pass
    _hash_cache[key] = result
    return result


def check_links(problems, ids_cache):
    for path in iter_files(".html"):
        r = rel(path)
        base = os.path.dirname(path)
        for m in re.finditer(r'(?<!data-)(?:href|src)="([^"]+)"', read(path)):
            url = m.group(1).strip()
            if not url or url.startswith(("http://", "https://", "//", "mailto:", "javascript:", "data:", "tel:")):
                continue

            # 页内锚点
            if url.startswith("#"):
                aid = url[1:]
                if aid and aid not in ids_cache[r] and not is_hash_routed(path):
                    problems.append(f"{r}: 页内锚点不存在 -> {url}")
                continue

            # 站内绝对路径：只允许映射到本仓库内容
            if url.startswith("/"):
                if url.startswith("/english-materials/"):
                    tail = url.split("#")[0].split("?")[0][len("/english-materials/"):]
                    cand = os.path.join(ROOT, tail)
                    if os.path.isdir(cand):
                        cand = os.path.join(cand, "index.html")
                    if tail and not os.path.exists(cand):
                        problems.append(f"{r}: 绝对路径目标不存在 -> {url}")
                continue

            target, _, frag = url.partition("#")
            target = target.split("?")[0]
            if not target:
                continue
            full = os.path.normpath(os.path.join(base, target))
            if os.path.isdir(full):
                full = os.path.join(full, "index.html")
            if not os.path.exists(full):
                problems.append(f"{r}: 相对链接目标不存在 -> {url}")
                continue
            if frag and full.endswith(".html"):
                if is_hash_routed(full):
                    continue
                tr = rel(full)
                tids = ids_cache.get(tr)
                if tids is None:
                    tids = set(re.findall(r'\sid="([^"]+)"', read(full)))
                    ids_cache[tr] = tids
                if frag not in tids:
                    problems.append(f"{r}: 跨页锚点不存在 -> {url}")


# ---------- 版本化引用 ----------
def check_versioned(problems):
    for path in iter_files(".html"):
        r = rel(path)
        base = os.path.dirname(path)
        for m in re.finditer(r'(?:href|src)="([^"?#]+)\?v=\d+"', read(path)):
            target = m.group(1)
            if target.startswith(("/", "http")):
                continue
            if not os.path.exists(os.path.normpath(os.path.join(base, target))):
                problems.append(f"{r}: 版本化引用文件不存在 -> {target}")


# ---------- CSS ----------
def check_css(problems):
    for path in iter_files(".css"):
        text = read(path)
        if text.count("{") != text.count("}"):
            problems.append(f"{rel(path)}: CSS 花括号不配平 ({text.count('{')} vs {text.count('}')})")


# ---------- JS 语法 ----------
def check_js(problems):
    node = shutil.which("node")
    if not node:
        return
    for path in iter_files(".js"):
        result = subprocess.run([node, "--check", path], capture_output=True, text=True)
        if result.returncode != 0:
            first = " ".join((result.stderr or "").strip().splitlines()[:2])
            problems.append(f"{rel(path)}: JS 语法错误 -> {first[:160]}")


# ---------- HTML 标签平衡 ----------
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
             "link", "meta", "param", "source", "track", "wbr"}
# 只检查通常不省略闭合的容器标签，避免 <p>/<li>/<td> 的合法省略造成误报
CONTAINER_TAGS = {"div", "section", "main", "article", "aside", "nav",
                  "header", "footer", "ul", "ol", "table", "thead", "tbody",
                  "tfoot", "form", "details", "summary", "blockquote", "figure",
                  "style", "script", "svg", "template"}


class _Balance(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag in VOID_TAGS or tag in ("br", "img", "input", "meta", "link", "hr"):
            return
        if tag in CONTAINER_TAGS:
            self.stack.append((tag, self.getpos()))
        else:
            self.stack.append((tag, self.getpos()))

    def handle_startendtag(self, tag, attrs):
        return  # 自闭合，忽略

    def handle_endtag(self, tag):
        if tag in VOID_TAGS:
            return
        if not self.stack:
            self.errors.append(f"多余的 </{tag}> @ 行 {self.getpos()[0]}")
            return
        # 找到最近的同名标签
        idx = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                idx = i
                break
        if idx is None:
            self.errors.append(f"多余的 </{tag}> @ 行 {self.getpos()[0]}")
            return
        # 中间未闭合的非容器标签（如 p/li）允许，容器标签不算错
        unclosed = [t for t, _ in self.stack[idx + 1:] if t in CONTAINER_TAGS]
        if unclosed:
            self.errors.append(
                f"</{tag}> @ 行 {self.getpos()[0]} 之前有未闭合容器: {', '.join(unclosed[:4])}")
        del self.stack[idx:]


def check_tag_balance(problems):
    for path in iter_files(".html"):
        text = read(path)
        if "<html" not in text.lower():
            continue
        b = _Balance()
        try:
            b.feed(text)
            b.close()
        except Exception as exc:
            problems.append(f"{rel(path)}: HTML 解析失败 -> {str(exc)[:100]}")
            continue
        opens = [f"<{t}>@行{pos[0]}" for t, pos in b.stack if t in CONTAINER_TAGS]
        if opens:
            problems.append(f"{rel(path)}: 未闭合容器标签 {len(opens)} 个 -> {', '.join(opens[:4])}")
        for e in b.errors[:4]:
            problems.append(f"{rel(path)}: {e}")


# ---------- JSON ----------
def check_json(problems):
    for path in iter_files(".json"):
        try:
            json.load(open(path, encoding="utf-8"))
        except Exception as exc:
            problems.append(f"{rel(path)}: JSON 解析失败 -> {str(exc)[:120]}")
    for path in iter_files(".js"):
        text = read(path)
        m = re.search(r"window\.\w+\s*=\s*(\{.*\})\s*;?\s*$", text, re.S)
        if not m:
            continue
        try:
            json.loads(m.group(1))
        except Exception as exc:
            problems.append(f"{rel(path)}: window 数据不是合法 JSON -> {str(exc)[:120]}")


def main():
    print(f"站点根：{ROOT}")
    problems = []
    ids_cache = {}
    for path in iter_files(".html"):
        ids_cache[rel(path)] = set(re.findall(r'\sid="([^"]+)"', read(path)))

    checks = [
        ("HTML 结构", lambda p: check_html(p)),
        ("链接与锚点", lambda p: check_links(p, ids_cache)),
        ("版本化引用", check_versioned),
        ("CSS", check_css),
        ("标签平衡", check_tag_balance),
        ("JS 语法", check_js),
        ("JSON", check_json),
    ]
    for name, fn in checks:
        before = len(problems)
        try:
            fn(problems)
        except Exception as exc:
            problems.append(f"[{name}] 检查异常: {exc}")
        delta = len(problems) - before
        print(f"  [{name}] {'ok' if delta == 0 else str(delta) + ' 个问题'}")

    if problems:
        print(f"\n[FAIL] 共 {len(problems)} 个问题：")
        for item in problems[:60]:
            print("  " + item)
        if len(problems) > 60:
            print(f"  ... 还有 {len(problems) - 60} 个")
        return 1

    print("\n[OK] 全部检查通过")
    return 0


if __name__ == "__main__":
    sys.exit(main())
