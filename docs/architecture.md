# MarsView 项目架构文档

## 1. 项目概述

MarsView 是一款开源的低代码平台，面向中后台管理系统。支持可视化配置、逻辑编排、事件流交互、数据源配置等。

## 2. 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design 5
- **状态管理**: Zustand
- **路由**: React Router DOM
- **样式**: Less + CSS Modules
- **HTTP客户端**: Axios
- **代码规范**: Prettier + ESLint

## 3. 项目架构

### 3.1 整体架构

```mermaid
graph TD
    A[用户] -->|浏览器访问| B[前端应用]
    B -->|API请求| C[后端服务]
    C -->|数据存储| D[数据库]
    
    subgraph 前端应用
        B1[Admin 管理后台]
        B2[Editor 低代码编辑器]
        B3[Docs 文档站点]
    end
    
    subgraph 技术栈
        B1 -->|React + TypeScript| B4[前端框架]
        B2 -->|Vite| B5[构建工具]
        B3 -->|Ant Design| B6[UI组件]
    end
```

### 3.2 模块架构

```mermaid
flowchart LR
    subgraph 项目根目录
        direction TB
        A[packages/]
        B[docs/]
        C[README.md]
        D[package.json]
    end
    
    subgraph packages/
        direction TB
        A1[admin/]
        A2[editor/]
        A3[docs/]
    end
    
    subgraph admin/
        direction TB
        A11[src/]
        A12[public/]
        A13[vite.config.ts]
        A14[package.json]
    end
    
    subgraph src/
        direction TB
        A111[api/]
        A112[components/]
        A113[config/]
        A114[layout/]
        A115[pages/]
        A116[router/]
        A117[stores/]
        A118[types/]
        A119[utils/]
    end
```

## 4. 核心模块说明

### 4.1 Admin 管理后台

- **功能**: 系统管理、用户管理、项目管理
- **技术栈**: React 18 + TypeScript + Vite + Ant Design
- **入口文件**: `packages/admin/src/main.tsx`

### 4.2 Editor 低代码编辑器

- **功能**: 可视化页面编辑、组件配置、逻辑编排
- **技术栈**: React 18 + TypeScript + Vite + Monaco Editor
- **入口文件**: `packages/editor/src/main.tsx`

### 4.3 Docs 文档站点

- **功能**: 项目文档、API文档、使用教程
- **技术栈**: VitePress
- **入口文件**: `packages/docs/index.md`

## 5. 数据流向

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: 页面操作
    Frontend->>Backend: API请求
    Backend->>Database: 数据查询/修改
    Database->>Backend: 返回数据
    Backend->>Frontend: 返回响应
    Frontend->>User: 更新页面
```

## 6. 开发流程

```mermaid
graph LR
    A[克隆仓库] --> B[安装依赖]
    B --> C[启动开发服务器]
    C --> D[代码开发]
    D --> E[代码检查]
    E --> F[提交代码]
    F --> G[PR审核]
    G --> H[合并代码]
```

## 7. 部署架构

```mermaid
graph TD
    A[GitHub Actions] --> B[构建代码]
    B --> C[上传CDN]
    C --> D[生产环境]
    
    D -->|Nginx| E[Admin应用]
    D -->|Nginx| F[Editor应用]
    D -->|Nginx| G[Docs应用]
```