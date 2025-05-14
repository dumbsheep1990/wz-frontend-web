import { ref, reactive, computed } from 'vue'
import type { 
  MarketSearchParams, 
  MarketSearchResult, 
  Company, 
  Category, 
  Region, 
  CompanyScale, 
  RevenueRange,
  Product
} from '../types/market'
import { 
  searchCompanies, 
  getIndustryCategories, 
  getRegions, 
  getCompanyScales, 
  getRevenueRanges,
  getCompanyDetail,
  getProductDetail,
  getRelatedProducts,
  searchProducts
} from '../api/market'

/**
 * 市场相关功能的组合式函数
 */
export function useMarket() {
  // 搜索参数
  const searchParams = reactive<MarketSearchParams>({
    keyword: '',
    industry: 'all',
    region: 'all',
    scale: 'all',
    revenue: 'all',
    page: 1,
    pageSize: 10
  })

  // 搜索结果
  const searchResult = reactive<MarketSearchResult>({
    total: 0,
    page: 1,
    pageSize: 10,
    data: []
  })

  // 分类数据
  const industryCategories = ref<Category[]>([])
  const regions = ref<Region[]>([])
  const companyScales = ref<CompanyScale[]>([])
  const revenueRanges = ref<RevenueRange[]>([])

  // 企业列表计算属性
  const companies = computed(() => searchResult.data)

  // 搜索处理
  const handleSearch = async () => {
    searchParams.page = 1
    const result = await searchCompanies(searchParams)
    Object.assign(searchResult, result)
  }

  // 分页处理
  const handlePageChange = async (page: number) => {
    if (page < 1 || page > getTotalPages()) return
    
    searchParams.page = page
    const result = await searchCompanies(searchParams)
    Object.assign(searchResult, result)
  }

  // 计算总页数
  const getTotalPages = () => {
    return Math.ceil(searchResult.total / searchResult.pageSize)
  }

  // 获取分类数据
  const fetchCategoryData = async () => {
    industryCategories.value = await getIndustryCategories()
    regions.value = await getRegions()
    companyScales.value = await getCompanyScales()
    revenueRanges.value = await getRevenueRanges()
  }

  // 获取企业详情
  const fetchCompanyDetail = async (id: number) => {
    return await getCompanyDetail(id)
  }

  // 获取产品详情
  const fetchProductDetail = async (id: number) => {
    return await getProductDetail(id)
  }

  // 获取相关产品
  const fetchRelatedProducts = async (id: number, limit: number = 4) => {
    return await getRelatedProducts(id, limit)
  }

  // 产品搜索参数
  const productSearchParams = reactive({
    companyId: undefined as number | undefined,
    category: '',
    keyword: '',
    priceMin: undefined as number | undefined,
    priceMax: undefined as number | undefined,
    sortBy: 'time',
    sortOrder: 'desc',
    page: 1,
    pageSize: 10
  })

  // 产品搜索结果
  const productSearchResult = reactive({
    total: 0,
    page: 1,
    pageSize: 10,
    data: [] as Product[]
  })

  // 搜索产品
  const searchProductList = async () => {
    const result = await searchProducts(productSearchParams)
    Object.assign(productSearchResult, result)
  }

  // 产品列表计算属性
  const products = computed(() => productSearchResult.data)

  return {
    // 状态
    searchParams,
    searchResult,
    industryCategories,
    regions,
    companyScales,
    revenueRanges,
    companies,
    productSearchParams,
    productSearchResult,
    products,
    
    // 方法
    handleSearch,
    handlePageChange,
    getTotalPages,
    fetchCategoryData,
    fetchCompanyDetail,
    fetchProductDetail,
    fetchRelatedProducts,
    searchProductList
  }
} 