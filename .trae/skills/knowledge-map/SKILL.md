---
name: "knowledge-map"
description: "知识图谱生成技能，为章节和年级生成可交互的知识树和思维导图，帮助学生建立知识网络。"
---

# 知识图谱（knowledge-map）

## 📋 目录导航

- [概述](#概述)
- [核心设计理念](#核心设计理念)
- [知识树生成](#知识树生成)
- [思维导图生成](#思维导图生成)
- [年级总复习页面](#年级总复习页面)
- [组件实现](#组件实现)
- [与 chapter-design 集成](#与-chapter-design-集成)

---

## 概述

这是**知识图谱生成技能**，用于：
- 为单个章节生成可交互的知识树
- 为全年级生成知识思维导图
- 创建年级总复习页面
- 帮助学生建立知识网络，实现高效复习

## 核心设计理念

### 为什么知识图谱有效？

1. **符合认知科学** - 激活「扩散激活」，帮助学生建立知识网络
2. **符合建构主义** - 让学生看到「知识是怎么连起来的」，而不是孤立的点
3. **高效复习** - 考试前一张图顶十页笔记
4. **螺旋式上升的完美补充** - 小节回顾是「点」，知识树是「面」

### 设计原则

1. **层次清晰** - 从宏观到微观，层层递进
2. **可交互** - 支持折叠/展开，移动端友好
3. **可跳转** - 点击知识点可以跳转到对应章节
4. **可视化** - 使用图标和颜色区分不同类型的知识

---

## 知识树生成

### 单章知识树结构（以有理数为例）

```
有理数
├── 📚 基本概念
│   ├── 正数和负数
│   ├── 有理数的分类
│   └── 数轴
├── 🎯 核心概念
│   ├── 相反数
│   ├── 绝对值
│   └── 倒数
└── ➕ 运算
    ├── 加法
    ├── 减法
    ├── 乘法
    ├── 除法
    └── 乘方
```

### HTML 组件模板

```html
<section class="knowledge-tree">
    <h2>🌳 本章知识树</h2>
    <p class="tree-intro">点击节点可以展开/折叠，点击知识点可以跳转到对应小节</p>
    
    <div class="tree-container">
        <ul class="tree">
            <li class="tree-node">
                <div class="tree-item tree-root" data-toggle="collapse">
                    <span class="tree-icon">📚</span>
                    <span class="tree-text">有理数</span>
                </div>
                <ul class="tree-children">
                    <li class="tree-node">
                        <div class="tree-item" data-toggle="collapse">
                            <span class="tree-icon">📖</span>
                            <span class="tree-text">基本概念</span>
                        </div>
                        <ul class="tree-children">
                            <li class="tree-node">
                                <a href="#section1" class="tree-item tree-link">
                                    <span class="tree-text">正数和负数</span>
                                </a>
                            </li>
                            <li class="tree-node">
                                <a href="#section1" class="tree-item tree-link">
                                    <span class="tree-text">有理数的分类</span>
                                </a>
                            </li>
                            <li class="tree-node">
                                <a href="#section2" class="tree-item tree-link">
                                    <span class="tree-text">数轴</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="tree-node">
                        <div class="tree-item" data-toggle="collapse">
                            <span class="tree-icon">🎯</span>
                            <span class="tree-text">核心概念</span>
                        </div>
                        <ul class="tree-children">
                            <li class="tree-node">
                                <a href="#section2" class="tree-item tree-link">
                                    <span class="tree-text">相反数</span>
                                </a>
                            </li>
                            <li class="tree-node">
                                <a href="#section2" class="tree-item tree-link">
                                    <span class="tree-text">绝对值</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="tree-node">
                        <div class="tree-item" data-toggle="collapse">
                            <span class="tree-icon">➕</span>
                            <span class="tree-text">运算</span>
                        </div>
                        <ul class="tree-children">
                            <li class="tree-node">
                                <a href="#section3" class="tree-item tree-link">
                                    <span class="tree-text">加法</span>
                                </a>
                            </li>
                            <li class="tree-node">
                                <a href="#section3" class="tree-item tree-link">
                                    <span class="tree-text">减法</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</section>
```

### CSS 样式

```css
.knowledge-tree {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--bg-alt);
    border-radius: var(--radius);
}

.tree-intro {
    color: var(--text-light);
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.tree-container {
    overflow-x: auto;
}

.tree {
    list-style: none;
    padding-left: 0;
}

.tree-node {
    margin: 0.5rem 0;
}

.tree-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.tree-item:hover {
    background-color: rgba(79, 70, 229, 0.1);
}

.tree-root {
    font-weight: 600;
    font-size: 1.1rem;
    background: linear-gradient(135deg, var(--primary-color), #7c3aed);
    color: white;
}

.tree-root:hover {
    background: linear-gradient(135deg, var(--primary-hover), #6d28d9);
}

.tree-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
}

.tree-text {
    flex: 1;
}

.tree-link {
    text-decoration: none;
    color: var(--text-color);
}

.tree-link:hover {
    color: var(--primary-color);
}

.tree-children {
    list-style: none;
    padding-left: 1.5rem;
    margin-top: 0.25rem;
    display: none;
}

.tree-children.expanded {
    display: block;
}

.tree-item[data-toggle="collapse"]::after {
    content: "▶";
    font-size: 0.7rem;
    color: var(--text-light);
    transition: transform 0.2s;
}

.tree-item[data-toggle="collapse"].expanded::after {
    transform: rotate(90deg);
}
```

### JavaScript 交互

```javascript
function initKnowledgeTree() {
    const treeItems = document.querySelectorAll('.tree-item[data-toggle="collapse"]');
    
    treeItems.forEach(item => {
        item.addEventListener('click', function() {
            const children = this.parentElement.querySelector('.tree-children');
            if (children) {
                children.classList.toggle('expanded');
                this.classList.toggle('expanded');
            }
        });
    });
    
    // 默认展开第一层
    const rootChildren = document.querySelector('.tree-root')?.parentElement?.querySelector('.tree-children');
    if (rootChildren) {
        rootChildren.classList.add('expanded');
        document.querySelector('.tree-root')?.classList.add('expanded');
    }
}
```

---

## 思维导图生成

### 数据结构（JSON）

```javascript
const mindMapData = {
    id: 'root',
    label: '有理数',
    children: [
        {
            id: 'basic',
            label: '基本概念',
            children: [
                { id: 'positive-negative', label: '正数和负数' },
                { id: 'classification', label: '有理数的分类' },
                { id: 'number-line', label: '数轴' }
            ]
        },
        {
            id: 'core',
            label: '核心概念',
            children: [
                { id: 'opposite', label: '相反数' },
                { id: 'absolute', label: '绝对值' },
                { id: 'reciprocal', label: '倒数' }
            ]
        },
        {
            id: 'operations',
            label: '运算',
            children: [
                { id: 'addition', label: '加法' },
                { id: 'subtraction', label: '减法' },
                { id: 'multiplication', label: '乘法' }
            ]
        }
    ]
};
```

### 实现说明

思维导图可以使用以下方案：
1. **纯 CSS/JS** - 简单，但视觉效果有限
2. **D3.js** - 强大的可视化库，可生成漂亮的思维导图
3. **Markmap** - 将 Markdown 转换为思维导图的库

**推荐**：先实现知识树（纯 CSS/JS），思维导图作为长期规划。

---

## 年级总复习页面

### 页面结构

在 `public/courses/math/math-grade-7/` 下创建 `review.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>七年级上册总复习 - 初一数学课程</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/chapter.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">初一数学课程</a>
            <nav class="nav">
                <a href="../index.html" class="nav-link">返回首页</a>
            </nav>
        </div>
    </header>

    <main class="main chapter-main">
        <div class="container">
            <nav class="chapter-breadcrumb">
                <a href="../index.html">首页</a> &gt; <span>七年级上册总复习</span>
            </nav>

            <h1 class="chapter-title">📚 七年级上册总复习</h1>
            
            <!-- 全册知识树 -->
            <section class="knowledge-tree full-book">
                <h2>🌳 全册知识树</h2>
                <div class="tree-container">
                    <!-- 全册知识树内容 -->
                </div>
            </section>
            
            <!-- 章节快速导航 -->
            <section class="chapter-review-nav">
                <h2>📖 章节快速导航</h2>
                <div class="review-grid">
                    <a href="chapter1.html" class="review-card">
                        <h3>第一章</h3>
                        <p>有理数</p>
                    </a>
                    <a href="chapter2.html" class="review-card">
                        <h3>第二章</h3>
                        <p>整式的加减</p>
                    </a>
                    <a href="chapter3.html" class="review-card">
                        <h3>第三章</h3>
                        <p>一元一次方程</p>
                    </a>
                    <a href="chapter4.html" class="review-card">
                        <h3>第四章</h3>
                        <p>几何图形初步</p>
                    </a>
                </div>
            </section>
            
            <!-- 易错点汇总 -->
            <section class="common-mistakes">
                <h2>⚠️ 易错点汇总</h2>
                <div class="mistake-list">
                    <div class="mistake-item">
                        <h4>有理数运算</h4>
                        <p>符号错误是最常见的错误，注意：负负得正，异号相加取绝对值大的符号...</p>
                        <a href="chapter1.html#section3">查看相关章节</a>
                    </div>
                </div>
            </section>
            
            <!-- 综合练习 -->
            <section class="comprehensive-practice">
                <h2>🌟 综合练习</h2>
                <div class="practice-box">
                    <!-- 综合练习题 -->
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 初一数学课程. 一起学习，共同进步！</p>
        </div>
    </footer>

    <script src="../js/main.js"></script>
    <script src="../js/chapter.js"></script>
    <script>
        initKnowledgeTree();
    </script>
</body>
</html>
```

---

## 与 chapter-design 集成

### 在 chapter-design 中调用 knowledge-map

在 `chapter-design` 技能的「完整章节输出格式」中，在章节总结后添加知识树：

```html
<!-- 章节总结 -->
<section id="chapter-summary" class="chapter-summary">
    <h2>📋 本章总结</h2>
    ...
</section>

<!-- 知识树 -->
<section class="knowledge-tree">
    <h2>🌳 本章知识树</h2>
    <!-- 知识树内容 -->
</section>
```

### 知识树数据生成模板

根据章节内容自动生成知识树：

```javascript
function generateKnowledgeTree(chapterData) {
    return {
        title: chapterData.title,
        sections: chapterData.sections.map(section => ({
            id: section.id,
            title: section.title,
            concepts: section.concepts,
            link: `#${section.id}`
        }))
    };
}
```

---

## 使用流程

### 用户输入示例

```
> 帮我为第一章生成知识树
> 帮我创建七年级上册总复习页面
```

### AI 执行步骤

1. **生成单章知识树**
   - 分析章节内容
   - 提取知识点和层级关系
   - 生成 HTML 组件
   - 添加到章节页面

2. **生成年级总复习**
   - 整合所有章节的知识树
   - 创建总复习页面
   - 添加易错点汇总
   - 添加综合练习

---

## 相关技能

- [chapter-design](../chapter-design/SKILL.md) - 章节设计
