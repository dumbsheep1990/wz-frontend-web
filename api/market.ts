/**
 * 市场API封装
 */
import type { MarketSearchParams, MarketSearchResult, Company, Category, Region, CompanyScale, RevenueRange } from '../types/market'

/**
 * 搜索企业
 * @param params 搜索参数
 * @returns 企业列表搜索结果
 */
export async function searchCompanies(params: MarketSearchParams): Promise<MarketSearchResult> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/market/search', {
    //   method: 'GET',
    //   params
    // })
    
    // 模拟数据
    const mockCompanies: Company[] = [
      {
        id: 1,
        name: '绍兴市天宏钢贸有限公司',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠镇111号',
        establishTime: '1993-01-08',
        revenue: '1280万元',
        industryType: '钢铁',
        category: '贸易公司',
        views: 230,
        likes: 89
      },
      {
        id: 2,
        name: '绍兴市家旺汽车销售服务中心',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠开发区新厂汽车城',
        establishTime: '2007-02-01',
        revenue: '1580万元', 
        industryType: '二手汽车',
        category: '汽车销售/服务',
        views: 130,
        likes: 118
      },
      {
        id: 3,
        name: '钱江旅店',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠西区一环路',
        establishTime: '2000-01-06',
        revenue: '825万元',
        industryType: '酒店服务',
        category: '住宿',
        views: 80,
        likes: 35
      },
      {
        id: 4,
        name: '绍兴石材',
        logo: '',
        address: '江苏省 绍兴市越城区 皋口115',
        establishTime: '2016-09-01',
        revenue: '1800万元',
        industryType: '建材',
        category: '装修',
        views: 90,
        likes: 27
      },
      {
        id: 5,
        name: '绍兴通用汽车有限公司',
        logo: '',
        address: '江苏省 绍兴市越城区 江桥镇中路村工业区沈家路398号',
        establishTime: '2014-02-18',
        revenue: '1600万元',
        industryType: '汽车制造/零配件',
        category: '制造业',
        views: 90,
        likes: 24
      }
    ]
    
    return {
      total: 156,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      data: mockCompanies
    }
  } catch (error) {
    console.error('搜索企业失败:', error)
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      data: []
    }
  }
}

/**
 * 获取企业详情
 * @param id 企业ID
 * @returns 企业详情
 */
export async function getCompanyDetail(id: number): Promise<Company | null> {
  try {
    // 这里应该是实际API调用
    // return await useFetch(`/api/market/company/${id}`)
    
    // 模拟数据
    return {
      id,
      name: '绍兴市天宏钢贸有限公司',
      logo: '',
      address: '江苏省 绍兴市越城区 皋埠镇111号',
      establishTime: '1993-01-08',
      revenue: '1280万元',
      industryType: '钢铁',
      category: '贸易公司',
      description: '绍兴市天宏钢贸有限公司是一家专业从事钢铁贸易的企业，成立于1993年，主要经营各类钢材、建材等产品。',
      contact: '张先生',
      phone: '0571-88888888',
      email: 'contact@example.com',
      website: 'http://www.example.com',
      views: 230,
      likes: 89
    }
  } catch (error) {
    console.error('获取企业详情失败:', error)
    return null
  }
}

/**
 * 获取行业分类
 * @returns 行业分类列表
 */
export async function getIndustryCategories(): Promise<Category[]> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/market/categories')
    
    // 模拟数据
    return [
      { id: 'all', name: '全部分类' },
      { id: 'industry', name: '工业' },
      { id: 'agriculture', name: '农业' },
      { id: 'service', name: '服务业' },
      { id: 'trade', name: '贸易' },
      { id: 'technology', name: '科技' },
      { id: 'medicine', name: '医药' },
      { id: 'education', name: '教育' },
      { id: 'construction', name: '建筑' },
      { id: 'transportation', name: '运输' },
      { id: 'other', name: '其他' }
    ]
  } catch (error) {
    console.error('获取行业分类失败:', error)
    return []
  }
}

/**
 * 获取地区列表
 * @returns 地区列表
 */
export async function getRegions(): Promise<Region[]> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/market/regions')
    
    // 模拟数据
    return [
      { id: 'all', name: '全部地区' },
      { id: 'north', name: '华北' },
      { id: 'east', name: '华东' },
      { id: 'south', name: '华南' },
      { id: 'central', name: '华中' },
      { id: 'southwest', name: '西南' },
      { id: 'northwest', name: '西北' },
      { id: 'northeast', name: '东北' }
    ]
  } catch (error) {
    console.error('获取地区列表失败:', error)
    return []
  }
}

/**
 * 获取企业规模列表
 * @returns 企业规模列表
 */
export async function getCompanyScales(): Promise<CompanyScale[]> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/market/scales')
    
    // 模拟数据
    return [
      { id: 'all', name: '全部规模' },
      { id: 'micro', name: '1人-9人' },
      { id: 'small', name: '10人-99人' },
      { id: 'medium', name: '100人-499人' },
      { id: 'large', name: '500人以上' }
    ]
  } catch (error) {
    console.error('获取企业规模列表失败:', error)
    return []
  }
}

/**
 * 获取营业额范围列表
 * @returns 营业额范围列表
 */
export async function getRevenueRanges(): Promise<RevenueRange[]> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/market/revenues')
    
    // 模拟数据
    return [
      { id: 'all', name: '全部' },
      { id: 'under1m', name: '1-100万' },
      { id: '1m-10m', name: '100万-1000万' },
      { id: '10m-100m', name: '1000万-1亿' },
      { id: 'above100m', name: '1亿以上' }
    ]
  } catch (error) {
    console.error('获取营业额范围列表失败:', error)
    return []
  }
} 