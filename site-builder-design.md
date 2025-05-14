# 万知市场 - 自定义站点建设器设计方案

## 项目概述

本设计方案旨在为"万知市场"平台添加自定义站点创建功能，允许企业或组织单位根据自身需求定制专属站点。系统将提供拖拽式的设计界面，支持自定义页面内容、导航区内容和页面风格，并通过SSR技术进行渲染，提供更好的用户体验和SEO效果。

## 技术栈

- 前端框架：Nuxt.js 3 (基于Vue 3)
- UI组件库：TailwindCSS + DaisyUI
- 状态管理：Pinia
- 拖拽功能：Vue Draggable Next
- 图标库：Iconify
- 表单验证：Vee-validate
- 模板引擎：EJS

## 系统架构

### 核心模块

1. **站点模板管理**：预设多种站点模板供用户选择作为起点
2. **页面编辑器**：拖拽式页面编辑功能
3. **组件库**：提供丰富的预设组件
4. **主题系统**：颜色、字体、布局等主题配置
5. **资源管理器**：上传和管理图片、视频等资源
6. **预览与发布**：实时预览和一键发布功能
7. **数据分析**：访问数据统计和分析

### 数据结构

```typescript
// 站点定义
interface Site {
  id: string;
  name: string;
  description: string;
  domain: string;
  logo: string;
  favicon: string;
  tenantId: string;   // 关联的企业/组织ID
  theme: ThemeConfig;
  pages: Page[];
  navigation: Navigation;
  footer: FooterConfig;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  status: 'draft' | 'published' | 'archived';
}

// 主题配置
interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  headerStyle: 'standard' | 'centered' | 'minimal';
  borderRadius: 'none' | 'small' | 'medium' | 'large';
  customCSS: string;
}

// 页面定义
interface Page {
  id: string;
  name: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  isHomepage: boolean;
  layout: 'default' | 'full-width' | 'sidebar';
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

// 页面区块
interface Section {
  id: string;
  type: string;  // 区块类型
  title: string;
  settings: Record<string, any>;  // 区块特定配置
  components: Component[];
  style: SectionStyle;
}

// 组件定义
interface Component {
  id: string;
  type: string;  // 组件类型
  name: string;
  settings: Record<string, any>;  // 组件配置
  content: any;  // 组件内容
  style: ComponentStyle;
}

// 导航配置
interface Navigation {
  type: 'horizontal' | 'vertical' | 'mega-menu';
  items: NavigationItem[];
  style: NavigationStyle;
}

// 导航项
interface NavigationItem {
  id: string;
  label: string;
  link: string;
  icon?: string;
  children?: NavigationItem[];
  isExternalLink: boolean;
}
```

## 用户界面设计

### 整体布局

站点建设器的管理后台将划分为以下几个主要区域：

1. **顶部导航栏**：包含站点名称、保存按钮、预览按钮、发布按钮和用户信息
2. **左侧边栏**：包含不同的编辑模式和工具选项
3. **中央工作区**：页面编辑的主要区域
4. **右侧属性面板**：显示和编辑当前选中元素的属性
5. **底部状态栏**：显示操作历史和当前状态信息

### 主要功能页面

1. **站点管理页面**：
   - 站点列表/创建新站点
   - 站点基本信息配置
   - 域名设置
   - 站点监控数据

2. **页面管理**：
   - 创建/编辑/删除页面
   - 页面SEO设置
   - 页面排序

3. **页面编辑器**：
   - 区块和组件选择面板
   - 可视化拖拽编辑区域
   - 属性编辑面板

4. **导航编辑器**：
   - 菜单项管理
   - 导航样式设置

5. **主题设置**：
   - 颜色配置
   - 字体设置
   - 全局样式调整

6. **资源管理**：
   - 图片/视频上传
   - 资源分类与搜索

## 组件库设计

组件库将分为以下几类：

### 基础组件
- 文本块
- 图片
- 按钮
- 分隔线
- 图标
- 视频
- 表单元素
- 表格

### 布局组件
- 容器
- 行/列布局
- 卡片
- 标签页
- 折叠面板
- 网格布局

### 业务组件
- 产品展示
- 产品列表
- 产品详情
- 团队成员展示
- 证书展示
- 客户案例
- 新闻文章
- 联系表单
- 位置地图
- 轮播图
- 计数器

### 区块模板
- 特色产品区块
- 服务介绍区块
- 关于我们区块
- 团队展示区块
- 合作伙伴区块
- 联系我们区块
- 页脚区块

## 技术实现方案

### 拖拽实现

使用Vue Draggable Next实现组件的拖拽功能：

```typescript
// 组件拖拽功能实现
import { defineComponent } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    // 实现组件的拖拽功能
  }
});
```

### 实时预览

使用Iframe实现页面的实时预览：

```typescript
// 实时预览功能
function generatePreviewHtml(site: Site, page: Page): string {
  // 根据站点和页面配置生成HTML
  return renderTemplate('page', { site, page });
}

function renderTemplate(templateName: string, data: any): string {
  // 使用EJS或其他模板引擎渲染模板
}
```

### 状态管理

使用Pinia管理站点编辑状态：

```typescript
// 站点编辑状态管理
export const useSiteEditorStore = defineStore('siteEditor', {
  state: () => ({
    currentSite: null as Site | null,
    currentPage: null as Page | null,
    selectedElement: null as any,
    isEditing: false,
    undoStack: [] as Array<any>,
    redoStack: [] as Array<any>,
  }),
  
  actions: {
    // 站点编辑相关操作
    selectElement(element: any) {
      this.selectedElement = element;
    },
    
    addComponent(sectionId: string, component: Component) {
      // 添加组件并记录历史
    },
    
    saveState() {
      // 保存当前状态到撤销栈
    },
    
    undo() {
      // 实现撤销功能
    },
    
    redo() {
      // 实现重做功能
    },
  },
});
```

### SSR实现

利用Nuxt.js的SSR能力实现站点渲染：

```typescript
// 站点页面渲染
export default defineEventHandler(async (event) => {
  const { domain, path } = getRouteParams(event);
  
  // 根据域名查找站点
  const site = await getSiteByDomain(domain);
  if (!site) {
    throw createError({
      statusCode: 404,
      message: 'Site not found',
    });
  }
  
  // 根据路径查找页面
  const page = findPageByPath(site, path);
  if (!page) {
    throw createError({
      statusCode: 404,
      message: 'Page not found',
    });
  }
  
  // 渲染页面
  return renderPage(site, page);
});
```

## 项目目录结构

```
wz-frontend-web/
├─ components/
│  ├─ site-builder/
│  │  ├─ editor/           # 编辑器组件
│  │  ├─ panels/           # 各种面板组件
│  │  ├─ elements/         # 拖拽元素组件
│  │  └─ preview/          # 预览相关组件
│  └─ site-templates/      # 站点前台模板组件
├─ composables/
│  └─ useSiteBuilder.ts    # 站点建设器相关的组合式函数
├─ pages/
│  ├─ admin/
│  │  └─ site-builder/     # 站点建设器管理页面
│  └─ sites/               # 自定义站点访问页面
├─ store/
│  └─ siteBuilder.ts       # 站点建设器状态管理
├─ types/
│  └─ siteBuilder.ts       # 类型定义
└─ server/
   ├─ api/
   │  └─ site-builder/     # 站点建设器API
   └─ middleware/
      └─ site-routing.ts   # 自定义站点路由中间件
```

## 实现路线图

### 第一阶段：核心功能实现

1. 站点基础管理功能
2. 页面编辑器基础框架
3. 基础组件库开发
4. 拖拽功能实现
5. 预览功能实现

### 第二阶段：功能完善

1. 主题系统完善
2. 高级业务组件开发
3. 模板库扩充
4. 资源管理系统实现
5. 导航编辑器优化

### 第三阶段：性能与体验优化

1. 组件渲染性能优化
2. 编辑器交互体验提升
3. 预设模板丰富
4. 数据统计与分析功能
5. 多设备预览功能

## 与现有系统集成

站点建设器将与现有万知市场系统集成，主要通过以下方式：

1. 共享用户认证系统
2. 复用现有的企业/组织数据
3. 集成产品数据，方便在自定义站点中展示企业产品
4. 保持页面风格一致性，遵循现有的UI设计语言

## 用户权限设计

系统将提供以下几种用户角色：

1. **超级管理员**：可以管理所有站点和系统设置
2. **站点管理员**：可以管理指定站点的所有设置
3. **内容编辑者**：只能编辑站点内容，不能更改结构和设置
4. **查看者**：只能查看但不能编辑
