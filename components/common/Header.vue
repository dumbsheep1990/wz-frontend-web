<template>
  <header class="w-full bg-white shadow-sm sticky top-0 z-10">
    <div class="bg-gray-100 py-1 border-b border-gray-200">
      <div class="container mx-auto px-4 flex justify-between text-sm text-gray-600">
        <div>欢迎来到万知网</div>
        <div class="flex space-x-4">
          <NuxtLink to="/login" class="hover:text-orange-500">登录</NuxtLink>
          <span>|</span>
          <NuxtLink to="/register" class="hover:text-orange-500">注册</NuxtLink>
          <span>|</span>
          <NuxtLink to="/help" class="hover:text-orange-500">帮助中心</NuxtLink>
          <span>|</span>
          <NuxtLink to="/contact" class="hover:text-orange-500">联系我们</NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center">
        <!-- Logo 区域 -->
        <div class="flex items-center mr-8">
          <NuxtLink to="/" class="flex items-center">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500 text-white font-bold text-xl mr-2">W</div>
            <div>
              <div class="text-lg font-bold text-gray-800">万知</div>
              <div class="text-xs text-gray-500">WZ.GG</div>
            </div>
          </NuxtLink>
        </div>

        <!-- 搜索框 -->
        <div class="flex-grow max-w-2xl">
          <div class="flex">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="输入关键词搜索" 
              class="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              @click="handleSearch" 
              class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-r-lg"
            >
              搜索
            </button>
            <button 
              class="ml-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              免费发布
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主导航菜单 -->
    <div class="bg-orange-500">
      <div class="container mx-auto px-4">
        <div class="flex">
          <NuxtLink 
            v-for="item in mainNavigation" 
            :key="item.path" 
            :to="item.path"
            class="px-6 py-3 text-white hover:bg-orange-600 transition-colors"
            active-class="bg-orange-600 font-bold"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- 移动端菜单按钮 -->
    <button 
      @click="isMenuOpen = !isMenuOpen" 
      class="md:hidden absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'hidden': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'hidden': !isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- 移动端菜单 -->
    <div v-if="isMenuOpen" class="md:hidden py-4 border-t bg-white">
      <div class="container mx-auto px-4">
        <div class="mb-4">
          <div class="flex items-center bg-gray-100 rounded-lg">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索..." 
              class="bg-transparent border-none outline-none flex-grow p-3"
              @keyup.enter="handleSearch"
            />
            <button @click="handleSearch" class="p-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <ul class="space-y-2">
          <li v-for="item in mainNavigation" :key="item.path">
            <NuxtLink 
              :to="item.path"
              class="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              active-class="bg-orange-50 text-orange-600"
              @click="isMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 菜单展开状态
const isMenuOpen = ref(false)

// 搜索关键词
const searchQuery = ref('')

// 主导航菜单
const mainNavigation = [
  { name: '首页', path: '/' },
  { name: '万知市场', path: '/market' },
  { name: '万知旗舰', path: '/flagship' },
  { name: '万知认证', path: '/certified' },
  { name: '万知人才', path: '/talent' },
  { name: '万知资讯', path: '/news' },
  { name: '万知商城', path: '/shop' },
  { name: '万知服务', path: '/service' },
  { name: '万知APP', path: '/app' },
  { name: '万知问答', path: '/qa' },
  { name: '万知培训', path: '/training' },
  { name: '万知专题', path: '/topic' }
]

// 搜索处理
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 跳转到搜索结果页
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
    isMenuOpen.value = false
  }
}

// 站点配置
const siteConfig = reactive({
  siteName: '万知网',
  siteLogo: ''
})

// 登录状态
const isLoggedIn = ref(false)

// 用户信息
const user = reactive({
  username: '',
  nickname: '',
  avatar: ''
})

// 退出登录
const logout = () => {
  // 这里可以添加退出登录逻辑
  isLoggedIn.value = false
}

// 获取站点配置
const fetchSiteConfig = async () => {
  try {
    // 这里可以替换为实际API调用
    // 模拟数据
    siteConfig.siteName = '万知网'
    siteConfig.siteLogo = ''
  } catch (error) {
    console.error('获取站点配置失败:', error)
  }
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    // 这里可以替换为实际API调用
    // 模拟数据
    isLoggedIn.value = false
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  fetchSiteConfig()
  fetchUserInfo()
})
</script> 