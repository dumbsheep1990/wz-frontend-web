/**
 * 企业信息接口
 */
export interface Company {
  id: number;
  name: string;
  logo?: string;
  address: string;
  establishTime: string;
  revenue: string;
  industryType: string;
  category: string;
  description?: string;
  contact?: string;
  phone?: string;
  email?: string;
  website?: string;
  views: number;
  likes: number;
}

/**
 * 分类类型接口
 */
export interface Category {
  id: string;
  name: string;
}

/**
 * 地区接口
 */
export interface Region {
  id: string;
  name: string;
  children?: Region[];
}

/**
 * 企业规模接口
 */
export interface CompanyScale {
  id: string;
  name: string;
}

/**
 * 营业额范围接口
 */
export interface RevenueRange {
  id: string;
  name: string;
}

/**
 * 市场搜索参数接口
 */
export interface MarketSearchParams {
  keyword?: string;
  industry?: string;
  region?: string;
  scale?: string;
  revenue?: string;
  page?: number;
  pageSize?: number;
}

/**
 * 市场搜索结果接口
 */
export interface MarketSearchResult {
  total: number;
  page: number;
  pageSize: number;
  data: Company[];
} 