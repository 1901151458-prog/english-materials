# 数据与构建维护说明

本站大部分内容（课文、语法、范文的 HTML）是手工/脚本一次性生成的静态页面。
但有几份**派生数据**会随词库变化，需要重建。

---

## 一、派生数据清单

| 文件 | 大小 | 来源 | 被谁使用 |
|---|---:|---|---|
| `assets/vocab-5-books/data.js` | 827 KB | **权威源**（人工维护，见下） | 词汇助记页、背单词、词汇排序 |
| `typing/data/index.js` + `v1–v6.js` | 4.5 KB + 6 个分册 | 从上面 data.js 拆分 | 背单词页（按册懒加载） |
| `vocab-rank/data.js` | 389 KB | data.js + Google 万词表 | 词汇排序页 |
| `assets/search-index.json` | 250 KB | 遍历全部 HTML | 全站搜索 |

---

## 二、一键重建

在 workspace 根目录执行：

```powershell
.\build.ps1            # 重建全部派生数据并校验
.\build.ps1 -Check     # 只做一致性校验，不改文件
```

或直接：

```powershell
<python> work\build_all.py
<python> work\build_all.py --check
```

**正常情况约 2 秒完成**，输出示例：

```
[1/3] 背单词分册数据   ✓ 0.3s
[2/3] 词汇排序数据     ✓ 0.3s
[3/3] 全站搜索索引     ✓ 0.9s

=== 一致性校验 ===
  词汇助记词条：1504
  背单词索引词数：1504
  词汇排序条目：1504
  ✓ 三处词数一致
  搜索索引：628 条，覆盖 167/167 页
  ✓ 全部页面已收录
```

构建是**幂等**的：数据没变时重复运行不会产生任何文件变化。

---

## 三、⚠ 重要：`vocab-5-books/data.js` 是权威源

**不要**试图从上游 `data/final/units.json` 重新生成它。原因：

1. `data/final/units.json` 只有 **5 册 1298 词**（官方词表对照范围），
   九下 206 词是 `work/_merge_g9b_vocab.py` 直接并入 data.js 的。
2. `tools/build_vocab_book_data.py` 会校验 JSON 与 LaTeX 打印版的助记标签计数，
   两者存在历史差异时会直接报错中断。
3. 因此 data.js 视为**人工维护的权威源**，改动词库时直接改它的数据源再重新生成，
   但不要用 build_all.py 重建它。

修改词库的正确流程：

```
改 data/ 下的源数据（或 work/scratch/vocab-g9b/）
  → 重新生成 assets/vocab-5-books/data.js（单独跑对应工具，注意校验）
  → 再跑 .\build.ps1 重建下游三个派生文件
```

---

## 四、各脚本位置

| 脚本 | 作用 |
|---|---|
| `work/build_all.py` | 一键构建 + 校验（推荐） |
| `work/split_typing_data.py` | 拆分背单词数据为索引 + 6 册 |
| `work/build_vocab_rank.py` | 生成难度考频排序数据 |
| `work/build_search_index.py` | 重建全站搜索索引 |
| `work/unify_main_nav.py` | 统一 8 个核心页面的主导航 |
| `work/audit_boldwords.py` | 黑体词对照官方词表审计 |
| `scripts/compare_official.py` | 官方词表对照（**会覆盖 units.json，慎用**） |
| `tools/build_vocab_book_data.py` | 从 units.json 生成 5 册 data.js（**有 LaTeX 校验**） |

---

## 五、发布流程

```powershell
# 1. 重建数据
.\build.ps1

# 2. 检查结构
<python> root-site\scripts\check_structure.py --quiet

# 3. 按范围提交（不要 git add -A，避免混入其他改动）
cd english-materials
git add <改动的路径>
git commit -m "..."
git push origin main
```

GitHub Pages 构建约 **1–2 分钟**后生效，可用 `?cb=<时间戳>` 绕过 CDN 缓存验证。
