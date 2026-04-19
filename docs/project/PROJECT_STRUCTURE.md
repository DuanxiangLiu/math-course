# 项目文件夹结构说明

## 📁 核心目录

```
math/
├── public/              # 部署根目录
├── textbooks/           # 课本资源
├── docs/                # 项目文档
├── .trae/               # AI 配置 ⭐
├── __tests__/           # 测试目录
└── scripts/             # 工具脚本
```

## 🔑 关键目录说明

### 1. `.trae/` - AI 配置 ⭐

AI 助手的核心配置，详见 [`.trae/README.md`](../../.trae/README.md)

**子目录：**
- `rules/` - AI 工作规则（按主题拆分）
- `skills/` - AI 技能库

### 2. `public/` - 部署根目录

**子目录：**
- `courses/` - 课程内容
- `shared/` - 共享组件库
- `templates/` - 页面模板

### 3. `resources/textbooks/` - 课本资源

AI 读取课本内容的唯一位置，详见 [`resources/textbooks/README.md`](../../resources/textbooks/README.md)

## 🎯 AI 工作路径

详见 [`.trae/rules/05-workflow.md`](../../.trae/rules/05-workflow.md)

## 📝 注意事项

1. 不要修改 `textbooks/` 下的文件
2. AI 生成的内容放在 `public/courses/` 下
3. 使用 `public/shared/` 中的共享组件
4. 部署根目录是 `public/`

## 💡 相关文档

- AI 配置：[`.trae/README.md`](../../.trae/README.md)
- 代码规范：[`.trae/rules/03-code-standards.md`](../../.trae/rules/03-code-standards.md)
- 页面结构：[`.trae/rules/04-page-structure.md`](../../.trae/rules/04-page-structure.md)
