<template>
  <div class="container mx-auto px-4 py-5">
    <!-- 面包屑导航 -->
    <div class="mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-500">首页</NuxtLink> / 
      <NuxtLink to="/market" class="text-gray-500 hover:text-orange-500">万知市场</NuxtLink> / 
      <span class="text-orange-500">产品列表</span>
    </div>
    
    <div class="flex flex-col md:flex-row gap-4">
      <!-- 搜索筛选栏 -->
      <div class="md:w-1/4 lg:w-1/5">
        <div class="bg-white rounded shadow-sm p-4 mb-4">
          <h2 class="text-lg font-bold mb-4">筛选条件</h2>
          
          <!-- 搜索框 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">关键词</label>
            <input 
              v-model="searchParams.keyword" 
              type="text" 
              placeholder="搜索产品名称" 
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              @keyup.enter="handleSearch"
            />
          </div>
          
          <!-- 企业选择 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">所属企业</label>
            <select 
              v-model="searchParams.companyId" 
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              @change="handleSearch"
            >
              <option :value="undefined">全部企业</option>
              <option :value="1">绍兴市天宏钢贸有限公司</option>
              <option :value="2">绍兴市家旺汽车销售服务中心</option>
              <option :value="3">钱江旅店</option>
            </select>
          </div>
          
          <!-- 类别选择 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">产品分类</label>
            <select 
              v-model="searchParams.category" 
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              @change="handleSearch"
            >
              <option value="">全部分类</option>
              <option value="H型钢">H型钢</option>
              <option value="工字钢">工字钢</option>
              <option value="角钢">角钢</option>
              <option value="钢板">钢板</option>
              <option value="螺纹钢">螺纹钢</option>
            </select>
          </div>
          
          <!-- 价格区间 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">价格区间</label>
            <div class="flex items-center">
              <input 
                v-model.number="searchParams.priceMin" 
                type="number" 
                placeholder="最低价" 
                class="w-full px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span class="px-2">-</span>
              <input 
                v-model.number="searchParams.priceMax" 
                type="number" 
                placeholder="最高价" 
                class="w-full px-3 py-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          
          <!-- 排序方式 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">排序方式</label>
            <select 
              v-model="searchParams.sortBy" 
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              @change="handleSearch"
            >
              <option value="time">最新上架</option>
              <option value="price">价格</option>
              <option value="sales">销量</option>
              <option value="views">浏览量</option>
            </select>
          </div>
          
          <!-- 排序顺序 -->
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">排序顺序</label>
            <select 
              v-model="searchParams.sortOrder" 
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              @change="handleSearch"
            >
              <option value="desc">降序</option>
              <option value="asc">升序</option>
            </select>
          </div>
          
          <!-- 搜索按钮 -->
          <button 
            @click="handleSearch" 
            class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors"
          >
            搜索
          </button>
        </div>
      </div>
      
      <!-- 产品列表 -->
      <div class="md:w-3/4 lg:w-4/5">
        <!-- 产品排序栏 -->
        <div class="bg-white rounded shadow-sm p-4 mb-4">
          <div class="flex flex-wrap items-center gap-4">
            <div class="font-bold">共找到 {{ searchResult.total }} 条结果</div>
            <div class="flex items-center">
              <span class="mr-2">快速排序：</span>
              <button 
                @click="setSort('time')" 
                class="px-3 py-1 rounded transition-colors"
                :class="searchParams.sortBy === 'time' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              >
                最新
              </button>
              <button 
                @click="setSort('price')" 
                class="px-3 py-1 rounded ml-2 transition-colors"
                :class="searchParams.sortBy === 'price' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              >
                价格
              </button>
              <button 
                @click="setSort('sales')" 
                class="px-3 py-1 rounded ml-2 transition-colors"
                :class="searchParams.sortBy === 'sales' ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              >
                销量
              </button>
            </div>
          </div>
        </div>
        
        <!-- 产品列表 -->
        <ProductList 
          :products="products" 
          @item-click="handleProductClick"
        />
        
        <!-- 分页 -->
        <div v-if="searchResult.total > 0" class="flex justify-center mt-6">
          <ul class="flex">
            <li>
              <button 
                @click="handlePageChange(searchResult.page - 1)" 
                :disabled="searchResult.page === 1"
                class="px-3 py-1 rounded-l border"
                :class="searchResult.page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'"
              >
                上一页
              </button>
            </li>
            <li v-for="page in getPageList()" :key="page">
              <button 
                @click="handlePageChange(page)" 
                class="px-3 py-1 border-t border-b"
                :class="page === searchResult.page ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50'"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button 
                @click="handlePageChange(searchResult.page + 1)" 
                :disabled="searchResult.page >= getTotalPages()"
                class="px-3 py-1 rounded-r border"
                :class="searchResult.page >= getTotalPages() ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50'"
              >
                下一页
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useMarket } from '../../../composables/useMarket'
import ProductList from '../../../components/market/ProductList.vue'

const { productSearchParams, productSearchResult, products, searchProductList } = useMarket()

// 搜索参数的引用，方便在模板中使用
const searchParams = productSearchParams
const searchResult = productSearchResult

// 初始加载
onMounted(() => {
  handleSearch()
})

// 搜索处理
const handleSearch = async () => {
  searchParams.page = 1
  await searchProductList()
}

// 分页处理
const handlePageChange = async (page: number) => {
  if (page < 1 || page > getTotalPages()) return
  
  searchParams.page = page
  await searchProductList()
}

// 计算总页数
const getTotalPages = () => {
  return Math.ceil(searchResult.total / searchResult.pageSize)
}

// 获取分页列表
const getPageList = () => {
  const totalPages = getTotalPages()
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  
  const currentPage = searchResult.page
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5]
  }
  
  if (currentPage >= totalPages - 2) {
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  
  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
}

// 设置排序
const setSort = (sortBy: string) => {
  if (searchParams.sortBy === sortBy) {
    // 如果点击的是当前排序字段，切换排序顺序
    searchParams.sortOrder = searchParams.sortOrder === 'asc' ? 'desc' : 'asc'
  } else {
    // 否则设置新的排序字段，默认降序
    searchParams.sortBy = sortBy
    searchParams.sortOrder = 'desc'
  }
  
  handleSearch()
}

// 产品点击处理
const handleProductClick = (id: number) => {
  // 可以在这里添加额外的点击处理逻辑
  console.log('Product clicked:', id)
}
</script> 