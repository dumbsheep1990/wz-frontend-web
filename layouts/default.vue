<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <CommonHeader />
    
    <!-- 主要内容区域 -->
    <main class="flex-grow">
      <slot />
    </main>
    
    <!-- 页脚 -->
    <CommonFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 站点配置
const siteConfig = ref({
  siteName: '',
  siteLogo: ''
})

// 主导航菜单
const mainNavigation = [
  { name: '首页', path: '/' },
  { name: '内容', path: '/content' },
  { name: '推荐', path: '/recommend' },
  { name: '会员中心', path: '/person' },
  { name: '关于我们', path: '/about' }
]

// 获取站点配置
const fetchSiteConfig = async () => {
  try {
    // 这里可以替换为实际API调用
    // const res = await $fetch('/api/site/config')
    // siteConfig.value = res.data
    
    // 模拟数据
    siteConfig.value = {
      siteName: 'WZ 前端示例',
      siteLogo: ''
    }
  } catch (error) {
    console.error('获取站点配置失败:', error)
  }
}

onMounted(() => {
  fetchSiteConfig()
})
</script> 