<template>
  <div class="container mx-auto px-4 py-5">
    <!-- 面包屑导航 -->
    <div class="mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-500">首页</NuxtLink> / 
      <NuxtLink to="/market" class="text-gray-500 hover:text-orange-500">万知市场</NuxtLink> / 
      <span class="text-orange-500">{{ company?.name || '企业详情' }}</span>
    </div>
    
    <div v-if="company" class="bg-white rounded shadow-sm p-6">
      <!-- 企业基本信息 -->
      <div class="flex flex-col md:flex-row mb-8 border-b pb-6">
        <div class="md:mr-8 mb-4 md:mb-0">
          <img 
            :src="company.logo || '/img/default-company.png'" 
            class="w-32 h-32 object-cover border border-gray-200 rounded" 
            alt="公司logo" 
          />
        </div>
        <div class="flex-grow">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ company.name }}</h1>
            <span class="ml-3 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-sm">已认证</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">所在地区：</span>
              <span>{{ company.address }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">行业类型：</span>
              <span>{{ company.industryType }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">成立时间：</span>
              <span>{{ company.establishTime }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">营业额：</span>
              <span>{{ company.revenue }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2">分类：</span>
              <span>{{ company.category }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-4 md:text-right mt-4 md:mt-0">
          <div class="flex items-center justify-start md:justify-end space-x-4">
            <div class="text-sm">
              <span class="text-gray-500">浏览量：</span>
              <span class="text-orange-500">{{ company.views }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">点赞数：</span>
              <span class="text-orange-500">{{ company.likes }}</span>
            </div>
          </div>
          <div class="flex space-x-2 justify-start md:justify-end">
            <button class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              联系商家
            </button>
            <button class="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
              收藏
            </button>
          </div>
        </div>
      </div>
      
      <!-- 企业详情信息 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 text-gray-800">企业介绍</h2>
        <div class="text-gray-700 leading-relaxed">
          <p>{{ company.description || '暂无介绍' }}</p>
        </div>
      </div>
      
      <!-- 联系方式 -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4 text-gray-800">联系方式</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <span class="text-gray-500 mr-2 w-20">联系人：</span>
            <span>{{ company.contact || '暂无' }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 mr-2 w-20">联系电话：</span>
            <span>{{ company.phone || '暂无' }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 mr-2 w-20">电子邮箱：</span>
            <span>{{ company.email || '暂无' }}</span>
          </div>
          <div class="flex items-center">
            <span class="text-gray-500 mr-2 w-20">公司网站：</span>
            <a v-if="company.website" :href="company.website" target="_blank" class="text-orange-500 hover:underline">
              {{ company.website }}
            </a>
            <span v-else>暂无</span>
          </div>
        </div>
      </div>
      
      <!-- 推荐企业 -->
      <div>
        <h2 class="text-xl font-bold mb-4 text-gray-800">相关推荐</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="item in relatedCompanies" 
            :key="item.id" 
            class="border rounded p-4 hover:shadow-md transition-shadow"
          >
            <h3 class="font-bold text-orange-500 mb-2">
              <NuxtLink :to="`/market/${item.id}`" class="hover:underline">
                {{ item.name }}
              </NuxtLink>
            </h3>
            <p class="text-gray-600 mb-2 text-sm truncate">{{ item.address }}</p>
            <p class="text-gray-600 text-sm">{{ item.industryType }} | {{ item.category }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载中 -->
    <div v-else-if="loading" class="bg-white rounded shadow-sm p-8 text-center">
      <p class="text-gray-500">正在加载企业信息...</p>
    </div>
    
    <!-- 无数据 -->
    <div v-else class="bg-white rounded shadow-sm p-8 text-center">
      <p class="text-gray-500">未找到相关企业信息</p>
      <NuxtLink to="/market" class="text-orange-500 hover:underline mt-4 inline-block">
        返回企业列表
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMarket } from '../../composables/useMarket'
import type { Company } from '../../types/market'

const route = useRoute()
const companyId = parseInt(route.params.id as string)

const { fetchCompanyDetail } = useMarket()

const company = ref<Company | null>(null)
const loading = ref(true)
const relatedCompanies = ref<Company[]>([])

// 获取企业详情
const loadCompanyDetail = async () => {
  loading.value = true
  try {
    company.value = await fetchCompanyDetail(companyId)
    
    // 模拟获取相关企业
    relatedCompanies.value = [
      {
        id: 6,
        name: '绍兴市华信物资有限公司',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠镇工业园区',
        establishTime: '2001-03-15',
        revenue: '1500万元',
        industryType: '钢铁',
        category: '贸易公司',
        views: 150,
        likes: 45
      },
      {
        id: 7,
        name: '绍兴市恒达金属制品有限公司',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠镇工业区',
        establishTime: '2005-06-18',
        revenue: '980万元',
        industryType: '金属制造',
        category: '制造业',
        views: 120,
        likes: 36
      },
      {
        id: 8,
        name: '绍兴中天建材有限公司',
        logo: '',
        address: '江苏省 绍兴市越城区 皋埠工业区',
        establishTime: '2008-12-10',
        revenue: '1200万元',
        industryType: '建材',
        category: '贸易公司',
        views: 185,
        likes: 52
      }
    ]
  } catch (error) {
    console.error('获取企业详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCompanyDetail()
})
</script> 