# .trae 目录说明

本目录包含 AI 助手工作所需的规则和技能配置。

## 📁 目录结构

```
.trae/
├── README.md                    # 本文件
├── rules/                       # 项目规则文档
│   ├── 01-project-overview.md  # 项目概述
│   ├── 02-design-principles.md # 设计原则
│   ├── 03-code-standards.md    # 代码规范
│   ├── 04-page-structure.md    # 页面结构
│   └── 05-workflow.md          # 工作流程
└── skills/                      # AI 技能目录
    ├── index.json               # 技能索引
    ├── chapter-design/          # 章节设计技能
    │   └── SKILL.md
    └── chapter-validate/        # 章节验证技能
        └── SKILL.md
```

## 📚 快速导航

### 规则文档
- **[项目概述](rules/01-project-overview.md)** - 了解项目目标和范围
- **[设计原则](rules/02-design-principles.md)** - 教学设计和交互设计原则
- **[代码规范](rules/03-code-standards.md)** - 技术栈、文件组织和代码风格
- **[页面结构](rules/04-page-structure.md)** - 课程页面标准结构和组件
- **[工作流程](rules/05-workflow.md)** - 课程制作流程和注意事项

### AI 技能
- **[chapter-design](skills/chapter-design/SKILL.md)** - 一站式章节设计技能
- **[chapter-validate](skills/chapter-validate/SKILL.md)** - 章节验证和优化技能

## 🎯 使用说明

- **给人类看的**：`rules/` 目录下的文档，已按主题拆分，便于查找和维护
- **给 AI 看的**：`skills/` 目录下的文档，保持完整单一文件，便于 AI 理解完整上下文
