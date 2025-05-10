<template>
  <header class="w-full bg-white shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between h-16">
        <!-- 左侧 Logo 和站点名称 -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img v-if="siteConfig.siteLogo" :src="siteConfig.siteLogo" :alt="siteConfig.siteName" class="h-8 w-auto mr-2" />
            <span class="text-xl font-bold">{{ siteConfig.siteName || 'WZ-FRONT-WEB' }}</span>
          </NuxtLink>
        </div>
        
        <!-- 中间导航菜单 -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink 
            v-for="item in mainNavigation" 
            :key="item.path" 
            :to="item.path"
            class="text-gray-700 hover:text-blue-600 py-2"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        
        <!-- 搜索框 -->
        <div class="hidden md:block relative">
          <div class="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索..." 
              class="bg-transparent border-none outline-none w-40 text-sm"
              @keyup.enter="handleSearch"
            />
            <button 
              @click="handleSearch" 
              class="ml-2 text-gray-500 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 右侧用户区域 -->
        <div class="flex items-center">
          <template v-if="isLoggedIn">
            <NuxtLink to="/person" class="text-gray-700 hover:text-blue-600 flex items-center mr-4">
              <img 
                :src="user.avatar || '/img/default-avatar.png'" 
                class="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span class="hidden md:inline">{{ user.nickname || user.username }}</span>
            </NuxtLink>
            <button @click="logout" class="text-gray-700 hover:text-blue-600">退出</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="text-gray-700 hover:text-blue-600 mr-4">登录</NuxtLink>
            <NuxtLink to="/register" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">注册</NuxtLink>
          </template>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'hidden': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :class="{ 'hidden': !isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
      
      <!-- 移动端菜单 -->
      <div v-if="isMenuOpen" class="md:hidden py-4 border-t">
        <div class="mb-4">
          <div class="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索..." 
              class="bg-transparent border-none outline-none flex-grow text-sm"
              @keyup.enter="handleSearch"
            />
            <button @click="handleSearch" class="ml-2 text-gray-500">
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
              active-class="bg-blue-50 text-blue-600"
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
  { name: '内容', path: '/content' },
  { name: '推荐', path: '/recommend' },
  { name: '会员中心', path: '/person' },
  { name: '关于我们', path: '/about' }
]

// 站点配置
const siteConfig = reactive({
  siteName: '',
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

// 搜索处理
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 跳转到搜索结果页
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
    isMenuOpen.value = false
  }
}

// 退出登录
const logout = () => {
  // 这里可以添加退出登录逻辑
  isLoggedIn.value = false
}

// 获取站点配置
const fetchSiteConfig = async () => {
  try {
    // 这里可以替换为实际API调用
    // const res = await $fetch('/api/site/config')
    // siteConfig.value = res.data
    
    // 模拟数据
    siteConfig.siteName = 'WZ 前端示例'
    siteConfig.siteLogo = ''
  } catch (error) {
    console.error('获取站点配置失败:', error)
  }
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    // 这里可以替换为实际API调用
    // const res = await $fetch('/api/user/info')
    // if (res.code === 200) {
    //   isLoggedIn.value = true
    //   Object.assign(user, res.data)
    // }
    
    // 模拟数据
    isLoggedIn.value = true
    user.username = 'user123'
    user.nickname = '测试用户'
    user.avatar = 'https://randomuser.me/api/portraits/men/32.jpg'
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

onMounted(() => {
  fetchSiteConfig()
  fetchUserInfo()
})
</script> 