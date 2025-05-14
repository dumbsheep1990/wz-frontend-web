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

/**
 * 产品信息接口
 */
export interface Product {
  id: number;
  name: string;
  companyId: number;
  companyName: string;
  category: string;
  price: number;
  specification?: string;
  material?: string;
  stock: number;
  minOrder?: number;
  description?: string;
  images?: string[];
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  views: number;
  sales: number;
  createdAt: string;
  updatedAt: string;
}