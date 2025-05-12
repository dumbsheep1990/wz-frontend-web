import { ref, reactive, computed } from 'vue'
import type { 
  MarketSearchParams, 
  MarketSearchResult, 
  Company, 
  Category, 
  Region, 
  CompanyScale, 
  RevenueRange 
} from '../types/market'
import { 
  searchCompanies, 
  getIndustryCategories, 
  getRegions, 
  getCompanyScales, 
  getRevenueRanges,
  getCompanyDetail
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

  return {
    // 状态
    searchParams,
    searchResult,
    industryCategories,
    regions,
    companyScales,
    revenueRanges,
    companies,
    
    // 方法
    handleSearch,
    handlePageChange,
    getTotalPages,
    fetchCategoryData,
    fetchCompanyDetail
  }
} 