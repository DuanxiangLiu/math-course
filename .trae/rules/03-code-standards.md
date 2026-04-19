# 代码规范

## 1. 技术栈
- 使用纯 HTML5 / CSS3 / JavaScript
- 不引入额外的前端框架
- 使用 Tailwind CSS 进行快速 UI 开发
- 保持响应式设计，支持移动端

## 2. 文件组织
- 课程页面放在 `chapters/` 目录下
- 样式文件放在 `css/` 目录下
- JavaScript 文件放在 `js/` 目录下
- 新章节文件命名为 `chapter{N}.html`

## 3. 代码风格
- 遵循项目现有的代码风格和结构
- 保持代码清晰、可读、可维护
- 添加必要的注释说明复杂逻辑
- 所有文本内容使用中文
- **使用相对路径而非绝对路径**：所有文件路径应使用相对路径，确保代码在不同环境中可移植
  - Python 脚本应使用 `os.path.dirname(os.path.abspath(__file__))` 获取脚本所在目录
  - 使用 `os.path.join()` 构建跨平台兼容的路径

## 4. 样式指南

### CSS 变量
使用 `css/style.css` 中定义的 CSS 变量：
- `--primary-color` - 主色调 (#4f46e5)
- `--primary-hover` - 主色悬浮态 (#4338ca)
- `--secondary-color` - 次要色 (#64748b)
- `--accent-color` - 强调色 (#f59e0b)
- `--bg-color` - 背景色 (#ffffff)
- `--bg-alt` - 替代背景色 (#f8fafc)
- `--text-color` - 文本颜色 (#1e293b)
- `--text-light` - 浅色文本 (#64748b)
- `--border-color` - 边框颜色 (#e2e8f0)
- `--shadow` - 阴影
- `--shadow-lg` - 大阴影

### 组件类名
- `.concept-box` - 概念讲解框
- `.example-box` - 例题解析框
- `.interactive-demo` - 互动演示
- `.practice-box` - 练习框
- `.math-formula` - 数学公式
- `.learning-goals` - 学习目标
- `.review-box` - 知识回顾框
- `.explanation` - 详细解析

## 5. 注意事项

### 代码修改
- 不要修改现有的核心样式和脚本文件，除非有明确要求
- 添加新的交互功能时，先在 `js/chapter.js` 中查看是否已有类似实现
- 保持代码风格一致

### 内容质量
- 保持数学内容的准确性，如有不确定请查阅教材
- 使用通俗易懂的语言解释复杂概念
- 提供丰富的例题和详细的解答步骤
- 所有文本内容使用中文

### 用户体验
- 确保响应式设计，支持移动端
- 字体足够大，对比度足够高
- 交互反馈及时、清晰
- 进度保存功能正常工作

### 设计理念
- 遵循建构主义学习理念，让学生通过操作学习
- 提供即时反馈，不要让学生等待
- 记录学习进度，支持断点续学
- 设计完整的学习闭环
