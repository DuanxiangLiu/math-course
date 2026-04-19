# 📚 文档中心导航

> **最后更新**: 2026-04-18
> **版本**: 3.0 (.trae 重组版)

---

## 欢迎来到交互式数学课程项目文档中心！

本项目已建立**完整的文档体系**，帮助你（和AI）高效地完成所有工作。

---

## 🗺️ 快速导航

### 👤 如果你是用户/维护者

**想快速开始？**
→ 🚀 [快速启动指南](./getting-started/QUICK_START_GUIDE.md) (3分钟上手)

**想了解如何使用？**
→ 📖 [教师指南](./TEACHER_GUIDE.md)

---

### 🤖 如果你是 AI

**AI 配置和规则在 `.trae/` 目录**：
→ 📋 [.trae/README.md](../.trae/README.md) (总入口)
→ 📏 [.trae/rules/](../.trae/rules/) (工作规则，按主题拆分)
→ 🤖 [.trae/skills/](../.trae/skills/) (AI 技能库)

---

## 📂 完整目录结构

```
.trae/                                # 🔒 AI 核心配置区
├── README.md                         # .trae 目录总入口
├── rules/                            # AI 工作规则（已拆分）
│   ├── 01-project-overview.md       # 项目概述
│   ├── 02-design-principles.md      # 设计原则
│   ├── 03-code-standards.md         # 代码规范
│   ├── 04-page-structure.md         # 页面结构
│   └── 05-workflow.md               # 工作流程
└── skills/                           # AI 技能库
    ├── index.json                    # 技能索引
    ├── chapter-design/               # 章节设计技能
    │   └── SKILL.md
    └── chapter-validate/             # 章节验证技能
        └── SKILL.md

docs/                                 # 📚 文档中心
├── README.md                         # 你在这里！📍
├── getting-started/                  # 🚀 新手入门区
│   └── QUICK_START_GUIDE.md          # 快速启动指南
├── project/                          # 📖 项目技术文档
│   ├── PROJECT_STRUCTURE.md          # 项目结构详解
│   └── SHARED_COMPONENTS.md          # 共享组件文档
└── TEACHER_GUIDE.md                  # 教师使用指南
```

---

## 🎯 核心文档速查表

### 必读文档（按优先级排序）

| 优先级 | 文档 | 位置 | 目标读者 | 用途 |
|--------|------|------|---------|------|
| ⭐⭐⭐ | **.trae/README.md** | `.trae/` | 双方 | .trae 目录总入口 |
| ⭐⭐ | **.trae/rules/** | `.trae/rules/` | AI | 工作规则（按主题） |
| ⭐⭐ | **.trae/skills/index.json** | `.trae/skills/` | 双方 | 技能索引 |
| ⭐⭐ | **QUICK_START_GUIDE.md** | `getting-started/` | **你！** | 快速启动指南 |
| ⭐ | **PROJECT_STRUCTURE.md** | `project/` | 双方 | 项目结构详解 |

---

## 🔄 典型使用场景

### 场景 1: 第一次使用（新手）

```bash
你的路径:
1. 先看这里: docs/README.md (本文档)
2. 然后: docs/getting-started/QUICK_START_GUIDE.md (3分钟了解)
3. 最后: 复制启动命令给 AI，去睡觉！

预计耗时: 10分钟阅读 + 8小时睡眠 = 明早见成果！
```

### 场景 2: 让 AI 开始工作

```bash
对 AI 说:
"请阅读 .trae/README.md 了解配置，然后使用 chapter-design 技能帮我生成第一章 有理数"

AI 会自动:
✅ 读取 .trae/ 下的配置
✅ 使用 chapter-design 技能
✅ 输出完整章节
```

### 场景 3: 检查生成结果

```bash
第二天早上:
1. 查看 AI 输出
2. 启动服务器: python3 -m http.server 8080
3. 浏览器打开: http://localhost:8080
4. 如有问题: 告诉 AI "使用 chapter-validate 验证第X章"
```

---

## 📊 文档统计信息

### 总体数据

| 类别 | 数量 | 位置 |
|------|------|------|
| **.trae 核心配置** | 8个 | `.trae/` |
| **docs 文档中心** | 5+个 | `docs/` |
| **总计** | **13+ 个** | **完整覆盖** |

### 按目标读者分类

#### 给 AI 看的（8个）:
- ✅ `.trae/README.md` (总入口)
- ✅ `.trae/rules/` 下全部 (5个规则文档)
- ✅ `.trae/skills/` 下全部 (2个技能文档)

#### 给人看的（5+个）:
- ✅ `docs/README.md` (本文档)
- ✅ `docs/getting-started/QUICK_START_GUIDE.md`
- ✅ `docs/TEACHER_GUIDE.md`
- ✅ `docs/project/*` (项目技术文档)

---

## 🆕 版本更新历史

### v3.0 - 2026-04-18 (.trae 重组)

**重大变更**:
- ✅ `.trae/rules.md` 拆分为 5 个专题文档
- ✅ 创建 `.trae/README.md` 总入口
- ✅ 更新 `.trae/skills/index.json` 只保留实际存在的技能
- ✅ 为技能文档添加目录导航
- ✅ 更新所有相关文档引用

**优化改进**:
- 🔧 规则文档更易查找和维护
- 🔍 技能索引准确，无过期引用
- 📈 整体结构更清晰

### v2.0 - 2026-04-17 (文档重组)

**重大变更**:
- ✅ 从扁平结构升级为树形分层结构
- ✅ 创建了多个子目录
- ✅ 建立了完整的索引系统

---

## 💡 使用建议

### 对于新加入项目的开发者：

1. **花10分钟**浏览本文档和 .trae/README.md
2. **理解目录结构**，知道什么文档在哪里
3. **尝试一次小规模测试**（只生成1章）

### 对于日常使用者：

1. **收藏 .trae/README.md** 作为 AI 配置入口
2. **需要时查阅**具体的规则文档
3. **使用 chapter-design 和 chapter-validate** 两个核心技能

---

## ❓ 常见问题

### Q: 为什么规则文档拆分到 `.trae/rules/` 下？
**A**: 原来的 360 行单一文档太难维护。拆分为 5 个专题后，每个文档专注一个主题，更易查找和更新。

### Q: 为什么只有两个技能了？
**A**: 其他技能已被整合或删除。现在只保留 `chapter-design`（一站式设计）和 `chapter-validate`（验证优化）两个核心技能，功能更强大。

### Q: 如何找到某个特定的文档？
**A**: 
- 从本文档或 `.trae/README.md` 的导航中查找
- 或使用编辑器的搜索功能搜索关键词
- 大部分文档都有明确的命名规范

### Q: 可以修改这些文档吗？
**A**: 当然可以！这些文档就是为了方便使用而存在的。如果你有改进建议，欢迎更新它们。

---

## 🎯 下一步行动

### 如果你准备开始使用：

1. 📖 阅读: [.trae/README.md](../.trae/README.md) (AI 配置入口)
2. 📖 阅读: [QUICK_START_GUIDE.md](./getting-started/QUICK_START_GUIDE.md) (5分钟)
3. 🚀 让 AI 开始工作！

### 如果你想深入了解：

1. 📋 浏览: [.trae/rules/](../.trae/rules/) (详细工作规则)
2. 📊 查看: [PROJECT_STRUCTURE.md](./project/PROJECT_STRUCTURE.md) (项目结构)

---

## 📞 获取帮助

如果在使用过程中遇到问题：

1. **查看文档**: 先在本页面或 `.trae/README.md` 查找相关链接
2. **搜索关键词**: 使用 Ctrl+F 搜索特定术语
3. **询问 AI**: "关于{主题}，我应该看哪个文档？"

---

**感谢你使用本项目的文档系统！希望它能帮助你高效地完成工作！** 🚀

---
*文档版本: 3.0 | 最后更新: 2026-04-18 | 维护者: AI Assistant*
