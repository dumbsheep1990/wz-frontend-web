<template>
  <div class="container mx-auto px-4 py-5">
    <!-- 面包屑导航 -->
    <div class="mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-500">首页</NuxtLink> 
      <span class="text-gray-400 mx-1">/</span> 
      <span class="text-orange-500">万知市场</span>
    </div>
    
    <!-- 搜索区域 -->
    <div class="bg-white p-4 rounded shadow-sm mb-5">
      <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="w-full md:flex-grow">
          <input 
            type="text" 
            v-model="searchParams.keyword" 
            placeholder="输入关键词搜索" 
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div class="flex space-x-2">
          <button 
            @click="handleSearch"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
            搜索
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            免费发布
          </button>
        </div>
      </div>
    </div>
    
    <!-- 主分类区域 -->
    <div class="bg-white p-4 rounded shadow-sm mb-5">
      <!-- 行业分类 -->
      <div class="mb-4">
        <h3 class="font-bold mb-2">行业分类：</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
          <div 
            v-for="category in industryCategories" 
            :key="category.id"
            class="text-center py-2 px-3 text-sm rounded cursor-pointer"
            :class="searchParams.industry === category.id ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'"
            @click="searchParams.industry = category.id; handleSearch()"
          >
            {{ category.name }}
          </div>
        </div>
      </div>
      
      <!-- 地区分类 -->
      <div class="mb-4">
        <h3 class="font-bold mb-2">地区：</h3>
        <div class="grid grid-cols-2 md:grid-cols-6 gap-2">
          <div 
            v-for="region in regions" 
            :key="region.id"
            class="text-center py-2 px-3 text-sm rounded cursor-pointer"
            :class="searchParams.region === region.id ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'"
            @click="searchParams.region = region.id; handleSearch()"
          >
            {{ region.name }}
          </div>
        </div>
      </div>
      
      <!-- 企业规模 -->
      <div class="mb-4">
        <h3 class="font-bold mb-2">企业规模：</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div 
            v-for="scale in companyScales" 
            :key="scale.id"
            class="text-center py-2 px-3 text-sm rounded cursor-pointer"
            :class="searchParams.scale === scale.id ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'"
            @click="searchParams.scale = scale.id; handleSearch()"
          >
            {{ scale.name }}
          </div>
        </div>
      </div>
      
      <!-- 营业额 -->
      <div>
        <h3 class="font-bold mb-2">营业额：</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div 
            v-for="revenue in revenueRanges" 
            :key="revenue.id"
            class="text-center py-2 px-3 text-sm rounded cursor-pointer"
            :class="searchParams.revenue === revenue.id ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'"
            @click="searchParams.revenue = revenue.id; handleSearch()"
          >
            {{ revenue.name }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 企业列表 -->
    <div class="bg-white rounded shadow-sm mb-5">
      <div v-if="companies.length > 0">
        <div v-for="company in companies" :key="company.id" class="border-b border-gray-200 p-4 hover:bg-gray-50">
          <div class="flex flex-col md:flex-row md:items-center">
            <!-- 公司信息 -->
            <div class="md:flex-grow mb-4 md:mb-0">
              <div class="flex items-start">
                <div class="mr-4">
                  <img :src="company.logo || '/img/default-company.png'" class="w-20 h-20 object-cover border border-gray-200 rounded" alt="公司logo" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-orange-500 mb-1">
                    <NuxtLink :to="`/market/${company.id}`" class="hover:underline">
                      {{ company.name }}
                    </NuxtLink>
                  </h3>
                  <p class="text-gray-600 mb-1">
                    <span>{{ company.address }}</span>
                    <span class="ml-3 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-sm">已认证</span>
                  </p>
                  <p class="text-gray-600 mb-1">成立时间：{{ company.establishTime }}</p>
                  <p class="text-gray-600">营业额：{{ company.revenue }}</p>
                </div>
              </div>
            </div>
            
            <!-- 公司联系信息 -->
            <div class="flex flex-col space-y-2 md:w-48">
              <div class="text-sm">
                <span class="text-gray-500">行业类型：</span>
                <span>{{ company.industryType }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">分类：</span>
                <span>{{ company.category }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">浏览量：</span>
                <span>{{ company.views }}</span>
              </div>
              <div class="text-sm">
                <span class="text-gray-500">点赞：</span>
                <span>{{ company.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 无数据 -->
      <div v-else class="p-8 text-center">
        <p class="text-gray-500">暂无符合条件的企业信息</p>
      </div>
    </div>
    
    <!-- 分页 -->
    <div v-if="companies.length > 0" class="flex justify-center items-center space-x-2">
      <button 
        @click="handlePageChange(searchResult.page - 1)" 
        :disabled="searchResult.page <= 1"
        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        上一页
      </button>
      <div 
        v-for="page in getTotalPages()" :key="page" 
        class="w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        :class="searchResult.page === page ? 'bg-orange-500 text-white' : 'hover:bg-gray-100'"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </div>
      <button 
        @click="handlePageChange(searchResult.page + 1)" 
        :disabled="searchResult.page >= getTotalPages()"
        class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMarket } from '../composables/useMarket'

// 使用市场相关composable
const { 
  searchParams,
  searchResult,
  industryCategories,
  regions,
  companyScales,
  revenueRanges,
  companies,
  handleSearch,
  handlePageChange,
  getTotalPages,
  fetchCategoryData
} = useMarket()

// 点击企业项
const onCompanyClick = (id) => {
  navigateTo(`/market/${id}`)
}

// 初始化
onMounted(async () => {
  await fetchCategoryData()
  await handleSearch()
})
</script> 