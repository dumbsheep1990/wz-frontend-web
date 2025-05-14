/**
 * 市场API封装
 */
import type { MarketSearchParams, MarketSearchResult, Company, Category, Region, CompanyScale, RevenueRange, Product } from '../types/market'

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

/**
 * 获取产品详情
 * @param id 产品ID
 * @returns 产品详情
 */
export async function getProductDetail(id: number): Promise<Product | null> {
  try {
    // 这里应该是实际API调用
    // return await useFetch(`/api/v1/products/${id}`)
    
    // 模拟数据
    return {
      id,
      name: "优质热轧H型钢HW250*250",
      companyId: 1,
      companyName: "绍兴市天宏钢贸有限公司",
      category: "H型钢",
      price: 5800,
      specification: "HW250*250*9*14",
      material: "Q235B",
      stock: 500,
      minOrder: 5,
      description: "热轧H型钢，材质Q235B，规格齐全，用于建筑、桥梁等工程。我公司产品质量可靠，价格合理，交货及时，欢迎来电咨询。",
      images: [
        "/img/products/steel1.jpg",
        "/img/products/steel2.jpg",
        "/img/products/steel3.jpg"
      ],
      contactPerson: "张先生",
      contactPhone: "0571-88888888",
      contactEmail: "contact@example.com",
      address: "江苏省 绍兴市越城区 皋埠镇111号",
      views: 230,
      sales: 89,
      createdAt: "2023-05-01",
      updatedAt: "2023-08-15"
    }
  } catch (error) {
    console.error('获取产品详情失败:', error)
    return null
  }
}

/**
 * 获取相关产品
 * @param id 产品ID
 * @param limit 限制数量
 * @returns 相关产品列表
 */
export async function getRelatedProducts(id: number, limit: number = 4): Promise<Product[]> {
  try {
    // 这里应该是实际API调用
    // return await useFetch(`/api/v1/products/${id}/related?limit=${limit}`)
    
    // 模拟数据
    return [
      {
        id: 101,
        name: "优质热轧H型钢HW200*200",
        companyId: 1,
        companyName: "绍兴市天宏钢贸有限公司",
        category: "H型钢",
        price: 5500,
        specification: "HW200*200*8*12",
        material: "Q235B",
        stock: 300,
        minOrder: 5,
        views: 180,
        sales: 65,
        createdAt: "2023-06-01",
        updatedAt: "2023-08-10"
      },
      {
        id: 102,
        name: "优质热轧H型钢HW300*300",
        companyId: 1,
        companyName: "绍兴市天宏钢贸有限公司",
        category: "H型钢",
        price: 6300,
        specification: "HW300*300*10*15",
        material: "Q235B",
        stock: 200,
        minOrder: 5,
        views: 150,
        sales: 45,
        createdAt: "2023-06-15",
        updatedAt: "2023-08-12"
      },
      {
        id: 103,
        name: "热轧工字钢I20",
        companyId: 2,
        companyName: "绍兴市家旺汽车销售服务中心",
        category: "工字钢",
        price: 5000,
        specification: "I20",
        material: "Q235B",
        stock: 400,
        minOrder: 10,
        views: 120,
        sales: 35,
        createdAt: "2023-07-01",
        updatedAt: "2023-08-05"
      },
      {
        id: 104,
        name: "角钢L5*50*50",
        companyId: 3,
        companyName: "钱江旅店",
        category: "角钢",
        price: 4800,
        specification: "L5*50*50",
        material: "Q235B",
        stock: 500,
        minOrder: 10,
        views: 100,
        sales: 25,
        createdAt: "2023-07-15",
        updatedAt: "2023-08-01"
      }
    ]
  } catch (error) {
    console.error('获取相关产品失败:', error)
    return []
  }
}

/**
 * 搜索产品
 * @param params 搜索参数
 * @returns 产品列表搜索结果
 */
export async function searchProducts(params: {
  companyId?: number;
  category?: string;
  keyword?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  total: number;
  page: number;
  pageSize: number;
  data: Product[];
}> {
  try {
    // 这里应该是实际API调用
    // return await useFetch('/api/v1/products', {
    //   method: 'GET',
    //   params
    // })
    
    // 模拟数据
    const mockProducts: Product[] = [
      {
        id: 101,
        name: "优质热轧H型钢HW200*200",
        companyId: 1,
        companyName: "绍兴市天宏钢贸有限公司",
        category: "H型钢",
        price: 5500,
        specification: "HW200*200*8*12",
        material: "Q235B",
        stock: 300,
        minOrder: 5,
        views: 180,
        sales: 65,
        createdAt: "2023-06-01",
        updatedAt: "2023-08-10"
      },
      {
        id: 102,
        name: "优质热轧H型钢HW300*300",
        companyId: 1,
        companyName: "绍兴市天宏钢贸有限公司",
        category: "H型钢",
        price: 6300,
        specification: "HW300*300*10*15",
        material: "Q235B",
        stock: 200,
        minOrder: 5,
        views: 150,
        sales: 45,
        createdAt: "2023-06-15",
        updatedAt: "2023-08-12"
      },
      {
        id: 103,
        name: "热轧工字钢I20",
        companyId: 2,
        companyName: "绍兴市家旺汽车销售服务中心",
        category: "工字钢",
        price: 5000,
        specification: "I20",
        material: "Q235B",
        stock: 400,
        minOrder: 10,
        views: 120,
        sales: 35,
        createdAt: "2023-07-01",
        updatedAt: "2023-08-05"
      },
      {
        id: 104,
        name: "角钢L5*50*50",
        companyId: 3,
        companyName: "钱江旅店",
        category: "角钢",
        price: 4800,
        specification: "L5*50*50",
        material: "Q235B",
        stock: 500,
        minOrder: 10,
        views: 100,
        sales: 25,
        createdAt: "2023-07-15",
        updatedAt: "2023-08-01"
      }
    ]
    
    return {
      total: 156,
      page: params.page || 1,
      pageSize: params.pageSize || 10,
      data: mockProducts
    }
  } catch (error) {
    console.error('搜索产品失败:', error)
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      data: []
    }
  }
} 