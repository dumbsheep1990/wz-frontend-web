// 站点设置接口
export interface SiteConfig {
  id?: number;
  siteName: string;
  siteLogo?: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDescription?: string;
  icpNumber?: string;
  copyright?: string;
  themeId?: number;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

// 友情链接接口
export interface Link {
  id: number;
  name: string;
  url: string;
  logo?: string;
  sort?: number;
  status: number;
  description?: string;
}

// 主题接口
export interface Theme {
  id: number;
  name: string;
  code: string;
  preview?: string;
  description?: string;
  status: number;
  isDefault: number;
  config?: string;
}

// Banner接口
export interface Banner {
  id: number;
  title: string;
  description?: string;
  image: string;
  link?: string;
  sort?: number;
  status?: number;
}

// 公告接口
export interface Notice {
  id: number;
  title: string;
  content?: string;
  link?: string;
  startTime?: string;
  endTime?: string;
  status?: number;
}

// 内容项接口
export interface ContentItem {
  id: number;
  title: string;
  description?: string;
  content?: string;
  cover?: string;
  category?: string;
  categoryId?: number;
  tags?: string[];
  date?: string;
  author?: string;
  authorId?: number;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  link?: string;
  status?: number;
  tag?: string; // 标签，如"热门"、"推荐"
}

// 分类接口
export interface Category {
  id: number;
  name: string;
  code?: string;
  icon?: string;
  sort?: number;
  parentId?: number;
  count?: number;
  description?: string;
  status?: number;
  link?: string;
}

// 用户信息接口
export interface User {
  id: number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  status?: number;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

// 用户积分接口
export interface UserPoints {
  id: number;
  userId: number;
  points: number;
  totalPoints?: number;
  type: number; // 1增加，2减少
  source: string;
  description?: string;
  createdAt?: string;
}

// 用户消息接口
export interface UserMessage {
  id: number;
  userId: number;
  title: string;
  content?: string;
  type: number; // 1系统通知，2业务通知，3私信
  status: number; // 0未读，1已读
  isImportant?: number;
  createdAt?: string;
}

// 用户收藏接口
export interface UserFavorite {
  id: number;
  userId: number;
  itemId: number;
  itemType: string;
  title: string;
  cover?: string;
  summary?: string;
  url?: string;
  remark?: string;
  createdAt?: string;
}

// API通用响应格式
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

// 分页数据响应格式
export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
} 