# 初中英语资料站

人教版（2024 版）初中英语学习资料整理 · 静态站点（GitHub Pages）

**在线访问：<https://1901151458-prog.github.io/english-materials/>**

## 已收录资料

| 资料 | 适用 | 规模 | 在线页面 | PDF |
| --- | --- | --- | --- | --- |
| U1–U8 黑体词词形变化整理 | 九年级上册 | 8 个单元 · 327 个黑体词 · 2,013 个词形与派生词 | [打开](https://1901151458-prog.github.io/english-materials/vocab-forms-u1-u8/) | [下载](https://1901151458-prog.github.io/english-materials/assets/pdf/g9-u1-u8-vocab-forms.pdf) |
| U1–U8 书面表达范文集 | 九年级上册 | 8 个单元 · 80 篇范文 · 64 条写作常用句型 | [打开](https://1901151458-prog.github.io/english-materials/essays-u1-u8/) | [下载](https://1901151458-prog.github.io/english-materials/assets/pdf/g9-u1-u8-writing-essays.pdf) |

## 资料简介

### 一、U1–U8 黑体词词形变化整理（词汇）

- 词表来自人教版（2024 版）九年级上册英语教材的单元词汇表，只收录其中要求掌握的黑体词。
- 每个黑体词逐个列出：三单、过去式、过去分词、现在分词、复数、比较级与派生词。
- **黑色加粗**：义务教育英语课程标准（2022 年版）初中考纲词汇（三级词汇表）及其常规词形变化。
- **绿色加粗**：考纲外拓展同根词（已对照剑桥词典核对，供学有余力的同学参考）。
- **蓝色文字**：中文词性、词形说明。
- 网站支持搜索、按单元/词性筛选、隐藏拓展词、自测模式、A4 打印；另有 PDF 版可直接下载打印。

### 二、U1–U8 书面表达范文集（写作）

- 依据人教新版（2024 年版）九年级上册各单元话题整理，面向成都市中考英语书面表达备考。
- 每单元包含：**8 条写作常用句型**（附中文释义与用法）、**A 组 5 篇满分范文**（配亮点解析与亮点句）、**B 组 5 篇好背好文**（配参考译文）。
- 全书 8 个单元、80 篇范文、64 条句型；范文话题贴近成都生活（天府绿道、成都大运会、城市音乐厅等）。
- 网站支持按单元浏览、全文检索、遮住中文自测、展开解析/译文、复制范文正文、A4 打印；另有 PDF 版（56 页 A4）。

## 目录结构

```
index.html                           # 首页（资料目录）
assets/
  base.css                           # 全站共用样式
  favicon.svg
  pdf/
    g9-u1-u8-vocab-forms.pdf         # 词形表 PDF（xelatex 编译）
    g9-u1-u8-writing-essays.pdf      # 范文集 PDF（xelatex 编译，56 页 A4）
  vocab-forms/                       # 词形表数据与逻辑
    data.js / logic.js / app.js
  essays/                            # 范文集数据与逻辑
    data.js / logic.js / app.js
vocab-forms-u1-u8/
  index.html                         # 词形变化互动页面
  style.css
essays-u1-u8/
  index.html                         # 书面表达范文集页面
  style.css
source/
  vocab-forms-u1-u8.tex              # 词形表 LaTeX 源文件
  writing-essays-u1-u8.tex           # 范文集 LaTeX 源文件
.nojekyll                            # 让 GitHub Pages 原样发布，不走 Jekyll
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
- 范文依据教材单元话题与成都市中考书面表达要求整理；文中专有名词可在考场上按题目替换。
- 资料仅供学习与教学参考，可自由用于课堂教学与家庭辅导，请保留出处；发现疏漏欢迎提 Issue。

## 许可证

内容用于教学与学习；代码部分可自由使用。教材内容版权归人民教育出版社所有。
