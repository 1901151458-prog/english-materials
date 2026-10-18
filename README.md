# 初中英语资料站

人教版（2024 版）初中英语学习资料整理 · 静态站点（GitHub Pages）

**在线访问：<https://1901151458-prog.github.io/english-materials/>**

## 已收录资料

| 资料 | 适用 | 规模 | 在线页面 | PDF |
| --- | --- | --- | --- | --- |
| U1–U8 黑体词词形变化整理 | 九年级上册 | 8 个单元 · 327 个黑体词 · 2,013 个词形与派生词 | [打开](https://1901151458-prog.github.io/english-materials/vocab-forms-u1-u8/) | [下载](https://1901151458-prog.github.io/english-materials/assets/pdf/g9-u1-u8-vocab-forms.pdf) |

## 这份资料是什么

- 词表来自人教版（2024 版）九年级上册英语教材的单元词汇表，只收录其中要求掌握的黑体词。
- 每个黑体词逐个列出：三单、过去式、过去分词、现在分词、复数、比较级与派生词。
- **黑色加粗**：义务教育英语课程标准（2022 年版）初中考纲词汇（三级词汇表）及其常规词形变化。
- **绿色加粗**：考纲外拓展同根词（已对照剑桥词典核对，供学有余力的同学参考）。
- **蓝色文字**：中文词性、词形说明。
- 网站支持搜索、按单元/词性筛选、隐藏拓展词、自测模式、A4 打印；另有 PDF 版可直接下载打印。

## 目录结构

```
index.html                         # 首页（资料目录）
assets/
  base.css                         # 全站共用样式
  favicon.svg
  pdf/g9-u1-u8-vocab-forms.pdf     # 词形表 PDF（xelatex 编译）
  vocab-forms/
    data.js                        # 词表数据（由 LaTeX 源解析生成）
    logic.js                       # 搜索/筛选/统计等纯逻辑
    app.js                         # 页面渲染与交互
vocab-forms-u1-u8/
  index.html                       # 词形变化互动页面
  style.css
source/
  vocab-forms-u1-u8.tex            # LaTeX 源文件（xelatex 编译两次生成 PDF）
.nojekyll                          # 让 GitHub Pages 原样发布，不走 Jekyll
```

## 本地预览

直接双击 `index.html` 即可（无需构建、无外部依赖、无统计脚本）；也可以起一个本地服务器：

```bash
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 更新 / 新增资料

```bash
git add -A
git commit -m "更新说明"
git push
```

新增资料时：在站点根目录建立资料页面（或页面文件夹），在 `index.html` 的资料目录里加一张卡片，并同步更新本 README 的表格。

## 数据与标注

- 词形变化依据教材词汇表整理；拓展同根词对照 [Cambridge Dictionary](https://dictionary.cambridge.org/) 核对。
- 个别更生僻的派生词词典未单列，仍作为拓展参考列入，已在页面图例中说明。
- 资料仅供学习与教学参考，可自由用于课堂教学与家庭辅导，请保留出处；发现疏漏欢迎提 Issue。

## 许可证

内容用于教学与学习；代码部分可自由使用。教材词汇版权归人民教育出版社所有。
