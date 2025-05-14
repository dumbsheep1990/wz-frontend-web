// 站点定义
export interface Site {
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
  footer: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  status: 'draft' | 'published' | 'archived';
  thumbnail?: string; // 站点缩略图
}

// 主题配置
export interface ThemeConfig {
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
export interface Page {
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
export interface Section {
  id: string;
  type: string;  // 区块类型
  title: string;
  settings?: Record<string, any>;  // 区块特定配置
  components: Component[];
  style?: any;
}

// 组件定义
export interface Component {
  id: string;
  type: string;  // 组件类型
  name: string;
  settings?: Record<string, any>;  // 组件配置
  content?: any;  // 组件内容
  style?: any;
}

// 导航配置
export interface Navigation {
  type: 'horizontal' | 'vertical' | 'mega-menu';
  items: NavigationItem[];
  style: any;
}

// 导航项
export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  icon?: string;
  children?: NavigationItem[];
  isExternalLink: boolean;
}

// 站点模板定义
export interface SiteTemplate {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

// 组件分类定义
export interface ComponentCategory {
  id: string;
  name: string;
  components: ComponentDefinition[];
}

// 组件定义
export interface ComponentDefinition {
  type: string;
  name: string;
  icon: string;
  description: string;
  defaultSettings: Record<string, any>;
} 