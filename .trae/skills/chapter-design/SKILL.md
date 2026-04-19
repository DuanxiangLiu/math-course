---
name: "chapter-design"
description: "一站式章节设计技能，从知识点输入到包含互动元素和习题的完整章节设计。能够读取默认位置的课本内容，生成结构清晰、富含互动的完整章节。"
---

# 章节设计（chapter-design）

## 📋 目录导航

- [概述](#概述)
- [核心设计理念](#核心设计理念)
- [使用流程](#使用流程)
- [模块 1：输入处理](#模块-1输入处理)
- [模块 2：内容设计](#模块-2内容设计)
- [模块 3：互动设计（核心模块）](#模块-3互动设计核心模块)
- [模块 4：习题生成](#模块-4习题生成)
- [模块 5：进度跟踪](#模块-5进度跟踪)
- [完整章节输出格式](#完整章节输出格式)
- [完整执行流程](#完整执行流程)
- [相关技能](#相关技能)

---

## 概述

这是**核心章节设计技能**，整合了所有旧技能的功能，能够自动化完成从知识点输入到包含互动元素和习题的完整章节设计流程。

## 核心设计理念

### 项目核心优势
- **做中学**：让学生通过操作、探索、发现来构建数学理解
- **互动驱动**：习题与互动相结合，让学生感兴趣
- **建构主义**：避免知识灌输，引导学生主动发现

### 设计原则
1. **每个重要概念都有互动演示**
2. **习题与互动相结合**
3. **即时反馈机制**
4. **螺旋式上升链接**
5. **完整学习闭环**

---

## 使用流程

### 步骤 1：理解用户需求

**用户输入示例**：
```
> 帮我设计"第一章 有理数"的完整章节
```

**AI 首先执行**：
1. 自动查找默认位置的课本内容
2. 如果找到，继续执行；如果没找到，询问用户

---

## 模块 1：输入处理

### 1.1 课本内容定位

**默认查找路径**（按优先级）：

```
resources/textbooks/math/grade-7/vol1/
├── 01_第一章 有理数.md
├── 02_第二章 整式的加减.md
├── 03_第三章 一元一次方程.md
└── 04_第四章 几何图形初步.md
```

**查找逻辑**：
1. 根据章节名称（如"第一章 有理数"）匹配文件名
2. 优先使用 `resources/textbooks/math/{年级}/{学期}/` 目录
3. 如果找到，读取并分析内容
4. 如果没找到，询问用户

### 1.2 课本内容分析

读取 Markdown 文件后，识别以下内容：

| 内容类型 | 识别方式 | 用途 |
|---------|---------|------|
| 章节标题 | `#` 标题 | 页面标题 |
| 小节划分 | `##` 或 `1.1` 格式 | 生成小节导航 |
| 概念讲解 | 段落文本 | 转换为 `.concept-box` |
| 例题 | "例" 开头的段落 | 转换为 `.example-box` |
| 练习题 | 小节末尾的题目 | 生成 `practice-box` |

### 1.3 知识点提取模板

```javascript
function analyzeTextbookContent(text) {
    return {
        title: extractChapterTitle(text),
        sections: extractSections(text),
        concepts: extractConcepts(text),
        examples: extractExamples(text),
        exercises: extractExercises(text)
    };
}
```

---

## 模块 2：内容设计

### 2.1 章节结构标准

**完整章节必须包含**：

```
┌─────────────────────────────────┐
│  导航栏（返回首页）              │
├─────────────────────────────────┤
│  面包屑导航                      │
│  章节标题                        │
├─────────────────────────────────┤
│  侧边栏                          │  内容区
│  ├─ 小节1                        │  ┌─────────────────┐
│  ├─ 小节2                        │  │  小节1内容       │
│  ├─ 小节3                        │  └─────────────────┘
│  └─ 本章总结                     │  ┌─────────────────┐
│  标记本章完成按钮                │  │  小节2内容       │
├─────────────────────────────────┤  └─────────────────┘
│  上一章 / 下一章                 │  ┌─────────────────┐
└─────────────────────────────────┘  │  本章总结         │
                                      └─────────────────┘
```

### 2.2 学习目标设计

**每个小节开始时添加**：

```html
<div class="learning-goals">
    <h3>🎯 学习目标</h3>
    <ul>
        <li>理解 [核心概念] 的含义</li>
        <li>掌握 [知识点] 的基本方法</li>
        <li>能够运用 [知识点] 解决问题</li>
    </ul>
</div>
```

**设计原则**：
- 3-5 个目标，SMART 原则（具体、可衡量、可达成、相关、有时限）
- 分层次：基础、提高、拓展

### 2.3 概念讲解设计

```html
<div class="concept-box">
    <h3>📚 概念讲解</h3>
    <p>用通俗易懂的语言解释概念...</p>
    
    <div class="concept-visual">
        <!-- 可视化辅助 -->
    </div>
</div>
```

**设计要点**：
- 将课本语言转化为学生易懂的语言
- 配合可视化演示
- 提供具体实例

### 2.4 例题解析设计

```html
<div class="example-box">
    <h3>📝 例题解析</h3>
    <div class="example">
        <p><strong>例1：</strong>题目描述</p>
        
        <div class="solution">
            <p><strong>解：</strong></p>
            <ol class="solution-steps">
                <li>步骤1：...</li>
                <li>步骤2：...</li>
                <li>步骤3：...</li>
            </ol>
        </div>
    </div>
</div>
```

**设计要点**：
- 步骤清晰，标注关键点
- 逻辑连贯

### 2.5 知识回顾链接（螺旋式上升）

```html
<div class="review-box">
    <h3>🔄 知识回顾</h3>
    <p>在学习本节内容前，回顾相关前置知识：</p>
    
    <a href="chapter{N}.html#section{M}" class="review-link">
        📖 复习：[前置章节名称]
    </a>
</div>
```

**触发条件**：
- 当前置知识对理解新知识很重要时
- 学生可能遗忘时

### 2.6 章节总结设计

```html
<section id="chapter-summary" class="chapter-summary">
    <h2>📋 本章总结</h2>
    
    <div class="summary-content">
        <h3>🎯 核心知识</h3>
        <ul>
            <li><strong>知识点1：</strong>核心概念</li>
            <li><strong>知识点2：</strong>核心概念</li>
        </ul>
        
        <h3>📐 核心公式</h3>
        <div class="formula-list">
            <div class="formula-item">
                <p class="formula">公式</p>
                <p class="formula-desc">说明</p>
            </div>
        </div>
        
        <h3>⚠️ 易错点提醒</h3>
        <ul>
            <li><strong>易错点：</strong>错误描述及正确做法</li>
        </ul>
    </div>
</section>
```

---

## 模块 3：互动设计（核心模块）

### 3.1 互动类型选择指南

| 知识点类型 | 推荐互动类型 | 示例 |
|-----------|-------------|------|
| 数值相关 | 数轴滑块 | 正数负数、绝对值 |
| 运算相关 | 计算模拟器 | 有理数加减乘除 |
| 几何相关 | 几何图形交互 | 角度、图形变换 |
| 函数相关 | 函数图像绘制 | 一次函数、反比例 |

### 3.2 互动与习题结合模式

**模式 1：互动探索 → 习题验证**

```html
<!-- 先互动探索 -->
<div class="interactive-demo">
    <h3>🎮 探索：[概念名称]</h3>
    <div class="demo-container">
        <!-- 互动演示内容 -->
    </div>
    
    <div class="discovery-questions">
        <p>🔍 通过探索，你发现了什么？</p>
        <ol>
            <li>问题1</li>
            <li>问题2</li>
        </ol>
    </div>
</div>

<!-- 再习题验证 -->
<div class="practice-box">
    <h3>✏️ 验证你的发现</h3>
    <!-- 练习题 -->
</div>
```

**模式 2：习题 → 互动解释**

```html
<!-- 先做题 -->
<div class="practice-box">
    <h3>✏️ 试一试</h3>
    <div class="quiz">
        <!-- 题目 -->
    </div>
</div>

<!-- 错误时用互动解释 -->
<div class="explanation" style="display: none;">
    <h4>💡 看看这个演示，你就明白了</h4>
    <div class="mini-interactive">
        <!-- 简化版互动演示 -->
    </div>
</div>
```

### 3.3 数轴滑块（数值相关）

```html
<div class="interactive-demo">
    <h3>🎮 探索：数轴上的数</h3>
    
    <div class="demo-container">
        <p>拖动滑块，观察数轴上的点：</p>
        
        <input type="range" id="number-slider" min="-10" max="10" value="0" step="0.5">
        
        <div class="number-line">
            <div class="number-marker" id="marker" style="left: 50%;">0</div>
        </div>
        
        <div class="feedback">
            <p>当前数值：<span id="slider-value">0</span></p>
            <p>到原点的距离：<span id="distance">0</span></p>
        </div>
        
        <div class="guiding-questions">
            <p>💡 思考：</p>
            <ul>
                <li>当你把点移到负数区域时，距离会变成负数吗？</li>
                <li>为什么 |-5| = 5 而不是 -5？</li>
            </ul>
        </div>
    </div>
</div>

<script>
function initNumberSlider() {
    const slider = document.getElementById('number-slider');
    const marker = document.getElementById('marker');
    const valueDisplay = document.getElementById('slider-value');
    const distanceDisplay = document.getElementById('distance');
    
    if (!slider) return;
    
    slider.addEventListener('input', function() {
        const value = parseFloat(this.value);
        const percentage = ((value + 10) / 20) * 100;
        
        marker.textContent = value;
        marker.style.left = percentage + '%';
        valueDisplay.textContent = value;
        distanceDisplay.textContent = Math.abs(value);
    });
}
</script>
```

### 3.4 计算模拟器（运算相关）

```html
<div class="interactive-demo">
    <h3>🌡️ 温度变化实验室</h3>
    
    <div class="demo-container">
        <div class="thermometer">
            <div class="mercury" id="mercury-level"></div>
            <div class="scale"></div>
        </div>
        
        <div class="control-panel">
            <p>当前温度：<span id="current-temp">-3</span>℃</p>
            
            <div class="operation">
                <button onclick="changeTemp(5)">升高 5℃</button>
                <button onclick="changeTemp(-5)">降低 5℃</button>
                <button onclick="changeTemp(3)">升高 3℃</button>
                <button onclick="changeTemp(-3)">降低 3℃</button>
            </div>
            
            <div class="history">
                <h4>操作记录：</h4>
                <ul id="operation-history">
                    <li>初始温度：-3℃</li>
                </ul>
            </div>
        </div>
        
        <div class="discovery-zone">
            <p>🔍 探索任务：</p>
            <ol>
                <li>从 -3℃ 开始，升高 5℃，结果是多少？</li>
                <li>你发现了什么规律？</li>
            </ol>
            
            <div class="rule-summary">
                <p>📝 总结加法法则：</p>
                <p>同号两数相加：______</p>
                <p>异号两数相加：______</p>
            </div>
        </div>
    </div>
</div>

<script>
let currentTemp = -3;

function changeTemp(delta) {
    const oldTemp = currentTemp;
    currentTemp += delta;
    
    updateThermometer();
    addHistory(oldTemp, delta, currentTemp);
}

function updateThermometer() {
    document.getElementById('current-temp').textContent = currentTemp;
    const mercury = document.getElementById('mercury-level');
    const percentage = ((currentTemp + 10) / 20) * 100;
    mercury.style.height = percentage + '%';
}

function addHistory(oldTemp, delta, newTemp) {
    const history = document.getElementById('operation-history');
    const li = document.createElement('li');
    const op = delta >= 0 ? '+' : '';
    li.textContent = `${oldTemp}℃ ${op}${delta}℃ = ${newTemp}℃`;
    history.appendChild(li);
}
</script>
```

### 3.5 互动设计检查清单

- [ ] 互动不是简单的输入输出，而是让学生发现规律
- [ ] 有明确的操作方式和反馈机制
- [ ] 有引导问题和规律发现环节
- [ ] 与习题相结合
- [ ] 移动端友好

---

## 模块 4：习题生成

### 4.1 习题层次设计

| 层次 | 数量 | 难度 | 特点 |
|-----|------|------|------|
| 基础题 | 2题 | 简单 | 考察基本概念，直接套用 |
| 提高题 | 1-2题 | 中等 | 需要简单分析或计算 |
| 拓展题 | 0-1题 | 较难 | 综合运用多个知识点 |

### 4.2 带详细解析的习题模板

```html
<div class="practice-box">
    <h3>✏️ 小试牛刀</h3>
    
    <div class="quiz" data-level="basic">
        <div class="quiz-badge">⭐ 基础题</div>
        <p><strong>问题：</strong>题目内容</p>
        <button class="quiz-option" data-correct="true">正确答案</button>
        <button class="quiz-option">错误选项</button>
        <button class="quiz-option">错误选项</button>
    </div>
    
    <div class="explanation" style="display: none;">
        <h4>💡 详细解析</h4>
        
        <div class="explanation-content">
            <p><strong>正确答案：</strong>正确答案</p>
            
            <h5>📝 解题思路</h5>
            <p>解题思路说明</p>
            
            <h5>🔍 步骤解析</h5>
            <ol>
                <li>步骤1</li>
                <li>步骤2</li>
            </ol>
            
            <h5>⚠️ 常见错误</h5>
            <ul>
                <li><strong>错误选项A：</strong>错误原因</li>
                <li><strong>错误选项B：</strong>错误原因</li>
            </ul>
            
            <h5>💪 知识点回顾</h5>
            <p>回顾相关知识点</p>
            
            <h5>✨ 举一反三</h5>
            <p>试试类似题目</p>
        </div>
    </div>
</div>
```

### 4.3 综合题设计（融合多个知识点）

```html
<div class="practice-box">
    <h3>🌟 综合练习</h3>
    
    <div class="quiz comprehensive">
        <div class="quiz-badge">🌟 综合题</div>
        
        <p><strong>问题：</strong>综合题内容</p>
        
        <div class="knowledge-tags">
            <span class="tag">📚 知识点1</span>
            <span class="tag">📚 知识点2</span>
        </div>
        
        <button class="quiz-option" data-correct="true">正确答案</button>
        <button class="quiz-option">错误选项</button>
    </div>
    
    <div class="explanation" style="display: none;">
        <h4>💡 详细解析</h4>
        
        <div class="solution-breakdown">
            <h5>🔍 解题思路</h5>
            <p>这道题需要综合运用以下知识点：</p>
            <ol>
                <li><strong>知识点1：</strong>如何运用</li>
                <li><strong>知识点2：</strong>如何运用</li>
            </ol>
        </div>
        
        <div class="knowledge-review">
            <h5>🔄 相关知识回顾</h5>
            <ul>
                <li><a href="chapter{N}.html#section{M}">复习知识点1</a></li>
                <li><a href="chapter{N}.html#section{M}">复习知识点2</a></li>
            </ul>
        </div>
    </div>
</div>
```

### 4.4 习题设计检查清单

- [ ] 题目紧密结合所学知识点
- [ ] 选项设计有迷惑性但不误导
- [ ] 反馈信息积极鼓励
- [ ] 难度循序渐进
- [ ] 每小节 2-3 题为宜
- [ ] 有详细解析

---

## 模块 5：进度跟踪

### 5.1 章节完成标记

```html
<button class="btn btn-primary btn-full" onclick="markChapterComplete(1)">
    标记本章完成
</button>

<script>
function markChapterComplete(chapterNumber) {
    const allProgress = JSON.parse(localStorage.getItem('chapterProgress') || '{}');
    allProgress[`chapter${chapterNumber}`] = {
        status: 'completed',
        completedTime: new Date().toISOString()
    };
    localStorage.setItem('chapterProgress', JSON.stringify(allProgress));
    
    showNotification('🎉 恭喜完成本章！');
    showCompletionCelebration();
}
</script>
```

### 5.2 错题记录

```javascript
function recordWrongAnswer(questionData) {
    const wrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers') || '[]');
    
    wrongAnswers.push({
        id: 'wa_' + Date.now(),
        ...questionData,
        metadata: {
            timestamp: new Date().toISOString(),
            retryCount: 0,
            mastered: false
        }
    });
    
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
    showNotification('📝 已记录到错题本');
}
```

---

## 完整章节输出格式

### 标准 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{章节标题} - 初一数学课程</title>
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
                <a href="../index.html">首页</a> &gt; <span>{章节标题}</span>
            </nav>

            <h1 class="chapter-title">{章节标题}</h1>
            
            <div class="chapter-sidebar-layout">
                <aside class="chapter-sidebar">
                    <h3 class="sidebar-title">本章目录</h3>
                    <ul class="chapter-nav">
                        <li class="chapter-nav-item active">
                            <a href="#section1">{小节1标题}</a>
                        </li>
                        <li class="chapter-nav-item">
                            <a href="#section2">{小节2标题}</a>
                        </li>
                    </ul>
                    
                    <button class="btn btn-primary btn-full" onclick="markChapterComplete({章节编号})">
                        标记本章完成
                    </button>
                </aside>

                <div class="chapter-content">
                    <!-- 小节 1 -->
                    <section id="section1" class="content-section">
                        <h2 class="section-title">{小节1标题}</h2>
                        
                        <!-- 学习目标 -->
                        <div class="learning-goals">...</div>
                        
                        <!-- 知识回顾（如适用） -->
                        <div class="review-box">...</div>
                        
                        <!-- 概念讲解 -->
                        <div class="concept-box">...</div>
                        
                        <!-- 互动演示 -->
                        <div class="interactive-demo">...</div>
                        
                        <!-- 例题解析 -->
                        <div class="example-box">...</div>
                        
                        <!-- 小试牛刀 -->
                        <div class="practice-box">...</div>
                    </section>
                    
                    <!-- 章节总结 -->
                    <section id="chapter-summary" class="chapter-summary">
                        <h2>📋 本章总结</h2>
                        ...
                    </section>
                    
                    <!-- 知识树（调用 knowledge-map 技能） -->
                    <section class="knowledge-tree">
                        <h2>🌳 本章知识树</h2>
                        <!-- 由 knowledge-map 技能生成 -->
                    </section>
                    
                    <!-- 章节导航 -->
                    <div class="chapter-navigation">
                        <a href="chapter{N-1}.html" class="btn btn-secondary">← 上一章</a>
                        <a href="chapter{N+1}.html" class="btn btn-secondary">下一章 →</a>
                    </div>
                </div>
            </div>
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
        // 页面特定的互动脚本
    </script>
</body>
</html>
```

---

## 完整执行流程

### 用户输入
```
> 帮我设计"第一章 有理数"的完整章节
```

### AI 执行步骤

1. **查找课本**
   - 检查 `resources/textbooks/math/grade-7/vol1/01_第一章 有理数.md`
   - 如果找到，继续；如果没找到，询问用户

2. **分析内容**
   - 提取章节标题、小节、概念、例题、练习题

3. **创建文件**
   - 在 `public/courses/math-grade-7/chapters/` 下创建 `chapter1.html`

4. **生成内容**（按小节）
   - 添加学习目标
   - 添加知识回顾（如适用）
   - 添加概念讲解
   - 添加互动演示
   - 添加例题解析
   - 添加练习题（带解析）

5. **添加总结**
   - 核心知识
   - 核心公式
   - 易错点提醒

6. **生成知识树**（调用 knowledge-map 技能）
   - 分析章节知识点
   - 生成可交互的知识树
   - 添加到章节页面

7. **验证完整性**
   - 检查所有必要元素
   - 测试链接
   - 验证交互功能

8. **启动预览**
   - 启动本地服务器
   - 在浏览器中打开

---

## 相关技能

- [chapter-validate](../chapter-validate/SKILL.md) - 章节验证和优化
- [knowledge-map](../knowledge-map/SKILL.md) - 知识图谱生成（会自动调用）
