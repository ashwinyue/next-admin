# issue2md 前端管理系统

基于 React + Vite 构建的现代化前端管理系统，采用工业实用主义设计风格。

## 设计理念

**美学方向：工业实用主义 + 赛博微触感**

- 深色工业风背景，霓虹青/琥珀色作为强调
- 等宽数据字体 + 粗犷标题字体组合
- 网格线、边框、技术细节
- 微妙扫描线和噪点纹理
- 非对称、打破常规的布局

## 技术栈

- **框架**: React 18.3 + Vite 5.2
- **路由**: React Router 6.22
- **动画**: Framer Motion 11.0
- **样式**: Tailwind CSS 3.4
- **图标**: Lucide React 0.344

## 项目结构

```
web/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── StatusIndicator.jsx
│   ├── pages/           # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── Issues.jsx
│   │   ├── Documents.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   ├── layouts/         # 布局组件
│   │   └── MainLayout.jsx
│   ├── hooks/           # 自定义 Hooks
│   │   ├── useDebounce.jsx
│   │   └── useLocalStorage.jsx
│   ├── lib/             # 工具函数
│   │   └── utils.js
│   ├── styles/          # 全局样式
│   │   └── index.css
│   ├── App.jsx          # 应用根组件
│   └── main.jsx         # 入口文件
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 快速开始

### 安装依赖

```bash
npm install
# 或使用项目根目录的 Makefile
make init
```

### 开发模式

```bash
npm run dev
# 或
make web-dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
# 或
make web-build
```

### 代码检查

```bash
npm run lint
# 或
make web-lint
```

## 设计系统

### 颜色

```css
--color-void: #0a0a0f;         /* 主背景 */
--color-void-light: #12121a;   /* 次级背景 */
--color-void-border: #1e1e2e;  /* 边框颜色 */
--color-neon-cyan: #00f5ff;    /* 主强调色 */
--color-neon-amber: #ffaa00;   /* 警告色 */
--color-neon-pink: #ff006e;    /* 危险色 */
--color-neon-green: #00ff9f;   /* 成功色 */
```

### 字体

- **Display**: Syncopate / Orbitron - 标题和品牌
- **Mono**: JetBrains Mono / Fira Code - 数据和代码
- **Sans**: IBM Plex Sans / Inter - 正文

### 动画

- `scan` - 扫描线效果
- `flicker` - 闪烁效果
- `slide-up` - 上滑进入
- `glow` - 霓虹发光

## 组件使用

### Button

```jsx
import Button from '@/components/Button'

<Button variant="primary" loading={false}>
  提交
</Button>
```

### Card

```jsx
import Card from '@/components/Card'

<Card variant="neon" hover={true}>
  内容
</Card>
```

### Badge

```jsx
import Badge from '@/components/Badge'

<Badge variant="success" size="md" dot pulse>
  在线
</Badge>
```

## 页面说明

- **Dashboard**: 系统概览、统计数据、最近活动
- **Issues**: Issue 管理、搜索、筛选、批量操作
- **Documents**: 文档库、文件夹、预览、下载
- **Settings**: 系统配置、GitHub 集成、API 设置

## 开发规范

1. **命名规范**: 使用 PascalCase 命名组件
2. **文件组织**: 每个组件一个文件，导出默认组件
3. **样式优先**: 使用 Tailwind 类名，避免内联样式
4. **动画克制**: 仅在关键时刻使用动画，避免过度使用
