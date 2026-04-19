---
name: "chapter-validate"
description: "章节验证和优化技能，检查章节完整性、内容正确性和交互功能，提供改进建议并执行优化。"
---

# 章节验证（chapter-validate）

## 📋 目录导航

- [概述](#概述)
- [使用场景](#使用场景)
- [模块 1：结构完整性检查](#模块-1结构完整性检查)
- [模块 2：链接有效性检查](#模块-2链接有效性检查)
- [模块 3：数学内容检查](#模块-3数学内容检查)
- [模块 4：交互功能检查](#模块-4交互功能检查)
- [模块 5：优化建议](#模块-5优化建议)
- [完整验证报告](#完整验证报告)
- [使用流程](#使用流程)
- [常见问题及修复](#常见问题及修复)
- [相关技能](#相关技能)

---

## 概述

这是**章节验证和优化技能**，整合了 `improve-chapter` 和 `validate-chapter` 的功能，用于：
- 验证新创建章节的质量
- 检查现有章节的完整性
- 提供改进建议
- 执行优化和修复

## 使用场景

- 新章节创建后进行质量检查
- 章节更新后验证修改是否正确
- 批量检查多个章节的质量
- 对现有章节进行内容补充和交互增强

---

## 模块 1：结构完整性检查

### 1.1 必需元素检查

| 元素 | 选择器 | 说明 |
|-----|--------|------|
| 章节标题 | `h1.chapter-title` | 必须存在 |
| 学习目标 | `.learning-goals` | 每个小节至少1个 |
| 概念讲解 | `.concept-box` | 每个小节至少1个 |
| 例题解析 | `.example-box` | 每个小节至少1个 |
| 练习题 | `.practice-box` | 每个小节至少2个 |
| 章节总结 | `.chapter-summary` | 必须存在 |
| 侧边栏导航 | `.chapter-sidebar` | 必须存在 |

### 1.2 检查脚本模板

```javascript
function validateChapterStructure(chapterDoc) {
    const checks = [
        { name: '章节标题', selector: 'h1.chapter-title', required: true },
        { name: '学习目标', selector: '.learning-goals', required: true },
        { name: '概念讲解', selector: '.concept-box', required: true },
        { name: '例题解析', selector: '.example-box', required: true },
        { name: '练习题', selector: '.practice-box', required: true },
        { name: '章节总结', selector: '.chapter-summary', required: true }
    ];
    
    const results = [];
    
    checks.forEach(check => {
        const elements = chapterDoc.querySelectorAll(check.selector);
        results.push({
            name: check.name,
            exists: elements.length > 0,
            count: elements.length
        });
    });
    
    return results;
}
```

---

## 模块 2：链接有效性检查

### 2.1 内部链接检查

检查以下类型的链接：
- 章节导航链接（上一章/下一章）
- 知识回顾链接（指向其他章节）
- 侧边栏目录链接（锚点链接）

### 2.2 检查脚本

```javascript
function validateLinks(chapterDoc) {
    const links = chapterDoc.querySelectorAll('a[href]');
    const results = {
        total: links.length,
        valid: 0,
        broken: [],
        internal: 0,
        external: 0
    };
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            results.internal++;
            const target = chapterDoc.querySelector(href);
            if (target) {
                results.valid++;
            } else {
                results.broken.push({
                    href: href,
                    text: link.textContent
                });
            }
        } else if (href.startsWith('chapter')) {
            results.internal++;
            results.valid++;
        } else if (href.startsWith('http')) {
            results.external++;
            results.valid++;
        }
    });
    
    return results;
}
```

---

## 模块 3：数学内容检查

### 3.1 检查内容

- 公式语法正确
- 符号使用规范
- 计算结果正确
- 概念表述准确

### 3.2 常见数学规范

| 规范 | 正确 | 错误 |
|-----|------|------|
| 乘号 | 使用 · 或 × | 避免使用 * |
| 分数 | 使用 \(\frac{a}{b}\) | 避免 a/b |
| 绝对值 | 使用 |x| | 避免 abs(x) |

---

## 模块 4：交互功能检查

### 4.1 测验组件检查

| 检查项 | 标准 |
|-------|------|
| 选项数量 | 至少 2 个 |
| 正确答案 | 有且仅有 1 个（data-correct="true"） |
| 解析内容 | 错误时应有详细解析 |

### 4.2 检查脚本

```javascript
function validateQuizzes(chapterDoc) {
    const quizzes = chapterDoc.querySelectorAll('.quiz');
    const results = {
        total: quizzes.length,
        valid: 0,
        issues: []
    };
    
    quizzes.forEach((quiz, index) => {
        const options = quiz.querySelectorAll('.quiz-option');
        const correctOptions = quiz.querySelectorAll('.quiz-option[data-correct="true"]');
        
        if (options.length < 2) {
            results.issues.push({
                quiz: index + 1,
                issue: '选项数量不足（少于2个）',
                severity: 'high'
            });
        } else if (correctOptions.length !== 1) {
            results.issues.push({
                quiz: index + 1,
                issue: `正确答案数量异常（${correctOptions.length}个）`,
                severity: 'high'
            });
        } else {
            results.valid++;
        }
    });
    
    return results;
}
```

---

## 模块 5：优化建议

### 5.1 常见优化任务

| 任务类型 | 说明 |
|---------|------|
| 补充知识点 | 检查是否所有课本内容都已覆盖 |
| 添加互动演示 | 为重要概念添加合适的互动 |
| 增加练习题 | 每小节 2-3 题，带详细解析 |
| 优化UI布局 | 改进响应式和移动端体验 |
| 增强反馈 | 提供更详细的错误提示 |

### 5.2 优化执行流程

1. **了解现状**
   - 阅读当前章节内容
   - 查看课本资料
   - 确定需要优化的部分

2. **制定计划**
   - 明确需要做哪些改进
   - 按优先级排序

3. **执行改进**
   - 逐一实施改进
   - 保持与现有风格一致

4. **测试验证**
   - 启动本地服务器测试
   - 验证所有功能正常

---

## 完整验证报告

### 报告模板

```markdown
# 📋 章节验证报告

## 基本信息
- **章节名称**: {章节标题}
- **验证日期**: {日期}
- **验证结果**: ✅ 通过 / ⚠️ 需要改进 / ❌ 不通过

## 结构检查

| 检查项 | 状态 | 数量 | 说明 |
|--------|------|------|------|
| 章节标题 | ✅/❌ | 1 | |
| 学习目标 | ✅/❌ | N | |
| 概念讲解 | ✅/❌ | N | |
| 例题解析 | ✅/❌ | N | |
| 练习题 | ✅/❌ | N | |
| 章节总结 | ✅/❌ | 1 | |

## 链接检查

| 链接类型 | 数量 | 有效 | 失效 |
|----------|------|------|------|
| 章节导航 | N | N | N |
| 知识回顾 | N | N | N |
| 外部资源 | N | N | N |

## 数学内容检查

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 公式语法 | ✅/❌ | |
| 符号规范 | ✅/❌ | |
| 计算正确 | ✅/❌ | |

## 交互功能检查

| 组件类型 | 数量 | 正常 | 异常 |
|----------|------|------|------|
| 测验组件 | N | N | N |
| 滑块组件 | N | N | N |
| 动画组件 | N | N | N |

## 问题列表

1. **{问题描述}**
   - 位置: {文件名}:{行号}
   - 严重程度: 高/中/低
   - 建议修复: {修复建议}

## 优化建议

1. **{优化建议1}**
   - 优先级: 高/中/低
   - 说明: {详细说明}

## 总体评分
- 结构完整性: X/10
- 内容正确性: X/10
- 交互可用性: X/10
- **综合评分: X/10**
```

---

## 使用流程

### 用户输入示例

```
> 帮我验证 chapter1.html 的质量
> 帮我优化第二章的互动演示
```

### AI 执行步骤

1. **读取章节**
   - 读取目标章节文件

2. **执行检查**
   - 结构完整性检查
   - 链接有效性检查
   - 数学内容检查
   - 交互功能检查

3. **生成报告**
   - 输出验证报告
   - 列出问题和建议

4. **执行优化**（如需要）
   - 补充缺失内容
   - 增强交互演示
   - 优化用户体验

5. **测试验证**
   - 启动本地服务器
   - 预览修改结果

---

## 常见问题及修复

| 问题 | 严重程度 | 修复方法 |
|------|----------|----------|
| 缺少学习目标 | 高 | 添加学习目标块 |
| 链接失效 | 中 | 更新或删除链接 |
| 公式语法错误 | 高 | 修正公式语法 |
| 测验无正确答案 | 高 | 添加 data-correct="true" |
| 缺少章节总结 | 中 | 添加章节总结 |

---

## 相关技能

- [chapter-design](../chapter-design/SKILL.md) - 章节设计
