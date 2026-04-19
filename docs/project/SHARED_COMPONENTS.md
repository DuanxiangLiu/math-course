# 共享组件库使用指南

本文档介绍如何使用 `public/shared/` 目录下的共享组件，避免代码重复。

---

## 📁 组件库结构

```
public/shared/
├── css/
│   └── components.css          # 组件样式
├── js/
│   ├── utils/
│   │   ├── notifications.js    # 通知系统
│   │   └── progress.js         # 进度跟踪
│   ├── components/
│   │   └── quiz.js             # 测验组件
│   └── init.js                 # 初始化脚本
└── templates/
    └── chapter-full.html       # 完整章节模板
```

---

## 🚀 快速引入

在章节页面中引入共享组件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 引入共享样式 -->
    <link rel="stylesheet" href="../shared/css/components.css">
</head>
<body>
    <!-- 页面内容 -->
    
    <!-- 引入共享脚本 -->
    <script src="../shared/js/utils/notifications.js"></script>
    <script src="../shared/js/utils/progress.js"></script>
    <script src="../shared/js/components/quiz.js"></script>
    <script src="../shared/js/init.js"></script>
</body>
</html>
```

---

## 📦 组件使用

### 1. 通知系统 (NotificationSystem)

显示各种类型的通知消息。

```javascript
// 成功通知
showNotification('🎉 回答正确！', 'success');

// 错误通知
showNotification('❌ 答案错误', 'error');

// 信息通知
showNotification('💡 提示信息', 'info');

// 自定义持续时间（毫秒）
NotificationSystem.show('消息', 'info', 5000);
```

### 2. 进度跟踪 (ProgressTracker)

保存和读取学习进度。

```javascript
// 标记小节完成
ProgressTracker.markComplete('chapter1', 'section1');

// 获取小节状态
const status = ProgressTracker.getStatus('chapter1', 'section1');
console.log(status.completed); // true/false

// 获取章节进度百分比
const progress = ProgressTracker.getChapterProgress('chapter1', 5);
console.log(progress); // 0-100

// 重置进度
ProgressTracker.reset('chapter1'); // 重置单个章节
ProgressTracker.reset(); // 重置全部
```

### 3. 测验组件 (QuizComponent)

自动初始化测验交互。

```html
<div class="practice-box">
    <h3>✏️ 小试牛刀</h3>
    <div class="quiz" id="quiz-1">
        <p><strong>问题：</strong>如果向东走5m记作+5m，那么向西走3m记作什么？</p>
        <button class="quiz-option" data-correct="true">-3m</button>
        <button class="quiz-option">+3m</button>
        <button class="quiz-option">3m</button>
    </div>
    
    <div class="explanation" style="display: none;">
        <h4>💡 解析</h4>
        <p>向西走与向东走方向相反，所以用负数表示...</p>
    </div>
</div>
```

测验组件会自动：
- 监听选项点击
- 显示正确/错误状态
- 显示解析（如果有）
- 触发通知

### 4. CSS 组件样式

#### 概念框
```html
<div class="concept-box">
    <h3>📚 概念讲解</h3>
    <p><strong>有理数：</strong>整数和分数统称为有理数。</p>
</div>
```

#### 例题框
```html
<div class="example-box">
    <h3>📝 例题解析</h3>
    <div class="example">
        <p><strong>例1：</strong>计算 (-3) + 5</p>
        <p><strong>解答：</strong>...</p>
    </div>
</div>
```

#### 练习框
```html
<div class="practice-box">
    <h3>✏️ 小试牛刀</h3>
    <div class="quiz">
        <!-- 测验内容 -->
    </div>
</div>
```

#### 学习目标
```html
<div class="learning-goals">
    <h3>🎯 学习目标</h3>
    <ul>
        <li>知识目标：理解有理数的概念</li>
        <li>技能目标：掌握有理数的分类</li>
        <li>应用目标：能运用有理数解决实际问题</li>
    </ul>
</div>
```

#### 知识回顾
```html
<div class="review-box">
    <h3>🔄 知识回顾</h3>
    <p>在学习本节内容之前，让我们先回顾一下相关知识：</p>
    <ul class="review-links">
        <li><a href="chapter1.html#section1">相关章节</a></li>
    </ul>
</div>
```

#### 章节总结
```html
<section class="chapter-summary">
    <h2>📋 本章小结</h2>
    <div class="summary-content">
        <h3>🎯 核心知识</h3>
        <ul class="key-points">
            <li><strong>知识点1：</strong>...</li>
        </ul>
    </div>
</section>
```

---

## 🎨 样式变量

组件样式使用 CSS 变量，可在页面中覆盖：

```css
:root {
    --primary-color: #3b82f6;    /* 主色调 */
    --success-color: #22c55e;    /* 成功色 */
    --warning-color: #f59e0b;    /* 警告色 */
    --error-color: #ef4444;      /* 错误色 */
    --text-color: #1f2937;       /* 文字色 */
    --bg-color: #f9fafb;         /* 背景色 */
    --border-color: #e5e7eb;     /* 边框色 */
    --radius: 8px;               /* 圆角 */
}
```

---

## 📝 最佳实践

1. **优先使用共享组件** - 避免在每个章节重复编写样式和脚本
2. **保持组件独立** - 组件不应依赖页面特定的代码
3. **统一命名规范** - 使用语义化的 class 名称
4. **渐进增强** - 确保页面在 JavaScript 禁用时仍可阅读

---

## 🔧 扩展组件

如需添加新的共享组件：

1. **CSS 样式** → 添加到 `public/shared/css/components.css`
2. **JavaScript 工具** → 添加到 `public/shared/js/utils/`
3. **UI 组件** → 添加到 `public/shared/js/components/`
4. **HTML 模板** → 添加到 `public/shared/templates/`

添加新组件后，记得更新本文档！
