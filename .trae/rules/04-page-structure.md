# 页面结构

每个课程页面必须包含以下部分：

## 1. 页面头部
- 导航栏 - 返回首页链接
- 面包屑导航 - 显示当前位置

## 2. 主体内容
- 章节标题
- 侧边栏 - 本章目录导航
- 内容区域 - 包含多个小节

## 3. 每个小节的标准结构

```html
<section id="section{N}" class="content-section">
    <h2 class="section-title">小节标题</h2>
    
    <!-- 学习目标（可选但推荐） -->
    <div class="learning-goals">
        <h3>🎯 学习目标</h3>
        <ul>
            <li>目标1</li>
            <li>目标2</li>
        </ul>
    </div>
    
    <!-- 概念讲解 -->
    <div class="concept-box">
        <h3>📚 概念讲解</h3>
        <p>详细的概念解释...</p>
    </div>
    
    <!-- 知识回顾（如适用） -->
    <div class="review-box">
        <h3>🔄 知识回顾</h3>
        <p>回顾相关前置知识...</p>
        <a href="chapter{X}.html#section{Y}">查看相关章节</a>
    </div>
    
    <!-- 例题解析 -->
    <div class="example-box">
        <h3>📝 例题解析</h3>
        <div class="example">
            <p><strong>例{N}：</strong>题目描述</p>
            <p class="math-formula">数学公式</p>
            <p><strong>解答：</strong></p>
            <p>详细解答步骤...</p>
        </div>
    </div>
    
    <!-- 互动演示（如适用） -->
    <div class="interactive-demo">
        <h3>🎮 互动演示</h3>
        <div class="demo-container">
            <!-- 互动演示内容 -->
        </div>
    </div>
    
    <!-- 小试牛刀 -->
    <div class="practice-box">
        <h3>✏️ 小试牛刀</h3>
        <div class="quiz">
            <p><strong>问题{N}：</strong>题目内容</p>
            <button class="quiz-option" data-correct="true">正确答案</button>
            <button class="quiz-option">错误选项</button>
            <button class="quiz-option">错误选项</button>
        </div>
        <!-- 可选：添加解析 -->
        <div class="explanation" style="display:none;">
            <h4>💡 详细解析</h4>
            <p>解析内容...</p>
        </div>
    </div>
</section>
```

## 4. 页面底部
- 章节导航 - 上一章/下一章链接
- 页脚信息

## 5. 交互组件开发指南

### 5.1 数轴滑块
**用途**：展示数值在数轴上的位置，正数、负数的概念
**参考实现**：`chapter1.html` 中的实现
**JavaScript 初始化函数**：`initNumberSlider()`

### 5.2 小测验系统
**用途**：提供选择题练习，带有即时反馈
**JavaScript 初始化函数**：`initQuiz()`

### 5.3 通知系统
**用途**：显示提示信息、成功/失败消息
**使用方法**：
```javascript
showNotification('🎉 回答正确！太棒了！');
```

### 5.4 进度跟踪
**用途**：标记章节完成状态
**使用方法**：
```javascript
markChapterComplete(chapterNumber);
```

### 5.5 侧边栏导航
**用途**：显示本章目录，支持滚动高亮
**自动初始化**：`initChapterNav()` 函数会自动处理
