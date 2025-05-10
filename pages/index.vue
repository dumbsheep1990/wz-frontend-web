<template>
  <div class="min-h-screen">
    <!-- Banner 轮播 -->
    <section class="relative">
      <div class="carousel-container relative h-[400px] overflow-hidden">
        <div 
          v-for="(banner, index) in banners" 
          :key="banner.id"
          class="carousel-item absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-100': currentBanner === index, 'opacity-0': currentBanner !== index }"
        >
          <img :src="banner.image" :alt="banner.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-lg">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ banner.title }}</h2>
                <p class="text-gray-200 mb-6">{{ banner.description }}</p>
                <NuxtLink :to="banner.link" class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
                  了解更多
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 轮播指示器 -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center">
        <div class="flex space-x-2">
          <button 
            v-for="(banner, index) in banners" 
            :key="index"
            @click="currentBanner = index"
            class="w-3 h-3 rounded-full transition-colors duration-300"
            :class="{ 'bg-white': currentBanner === index, 'bg-white bg-opacity-50': currentBanner !== index }"
          ></button>
        </div>
      </div>
    </section>
    
    <!-- 公告信息 -->
    <section v-if="notices && notices.length > 0" class="bg-orange-50 py-3">
      <div class="container mx-auto px-4 flex items-center">
        <div class="shrink-0 text-orange-700 font-medium mr-3">公告：</div>
        <div class="notice-content relative overflow-hidden h-6 flex-1">
          <div
            v-for="(notice, index) in notices"
            :key="notice.id"
            class="notice-item absolute left-0 right-0 transition-transform duration-500 ease-in-out"
            :class="{ 'translate-y-0': currentNotice === index, 'translate-y-full': currentNotice !== index }"
          >
            <div class="truncate">
              <NuxtLink :to="`/notice/${notice.id}`" class="text-gray-700 hover:text-blue-600">
                {{ notice.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 推荐内容 -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6 text-center">热门推荐</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="item in recommendedItems" 
            :key="item.id"
            class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="aspect-w-16 aspect-h-9 relative">
              <img :src="item.cover" :alt="item.title" class="w-full h-40 object-cover" />
              <div v-if="item.tag" class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {{ item.tag }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium text-lg mb-2 line-clamp-2">
                <NuxtLink :to="item.link" class="hover:text-blue-600">{{ item.title }}</NuxtLink>
              </h3>
              <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>{{ item.category }}</span>
                <span>{{ item.date }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <NuxtLink to="/recommend" class="inline-block px-6 py-2 border border-gray-300 rounded hover:border-blue-600 hover:text-blue-600">
            查看更多
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- 分类导航 -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6 text-center">分类浏览</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.id"
            :to="category.link"
            class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="w-12 h-12 mb-3 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
              <i :class="category.icon"></i>
            </div>
            <span class="text-center font-medium">{{ category.name }}</span>
            <span class="text-xs text-gray-500">{{ category.count }}篇内容</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Banner数据
const banners = ref([
  {
    id: 1,
    title: 'WZ 多端统一发布平台',
    description: '一站式开发，多端同步发布，轻松构建网站和APP',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/about'
  },
  {
    id: 2,
    title: '多租户解决方案',
    description: '完全隔离的多租户架构，满足各类独立站点需求',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/tenant'
  },
  {
    id: 3,
    title: 'UniApp移动端支持',
    description: '支持将站点封装为UniApp应用，实现移动端原生体验',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/mobile'
  }
])

// 公告数据
const notices = ref([
  {
    id: 1,
    title: '重要通知：站点升级维护，预计8月1日晚上23:00-次日2:00期间暂停访问',
    link: '/notice/1'
  },
  {
    id: 2,
    title: '新功能发布：用户积分系统正式上线，参与互动赢取积分',
    link: '/notice/2'
  },
  {
    id: 3,
    title: '本站即将迎来改版升级，敬请期待全新体验',
    link: '/notice/3'
  }
])

// 推荐内容
const recommendedItems = ref([
  {
    id: 1,
    title: 'Vue3与Nuxt3搭建SSR站点实战教程',
    description: '从零开始学习如何使用最新的Vue3和Nuxt3框架搭建SSR站点，包含完整案例代码。',
    cover: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/content/1',
    category: '前端开发',
    date: '2023-07-15',
    tag: '热门'
  },
  {
    id: 2,
    title: '如何优化Nuxt3应用性能，提升首屏加载速度',
    description: '分享10个提升Nuxt3应用性能的实用技巧，让你的网站飞起来。',
    cover: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/content/2',
    category: '性能优化',
    date: '2023-07-20'
  },
  {
    id: 3,
    title: 'TailwindCSS入门到精通：构建现代响应式UI',
    description: '全面学习TailwindCSS，从基础概念到高级应用，快速构建美观的用户界面。',
    cover: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/content/3',
    category: 'CSS框架',
    date: '2023-07-25',
    tag: '推荐'
  },
  {
    id: 4,
    title: '多租户SaaS平台架构设计与实践',
    description: '深入解析多租户SaaS平台的架构设计原则、数据隔离策略及实现方案。',
    cover: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
    link: '/content/4',
    category: '架构设计',
    date: '2023-07-30'
  }
])

// 分类数据
const categories = ref([
  { id: 1, name: '前端开发', count: 128, icon: 'i-mdi-language-javascript', link: '/category/frontend' },
  { id: 2, name: '后端开发', count: 85, icon: 'i-mdi-server', link: '/category/backend' },
  { id: 3, name: '移动开发', count: 64, icon: 'i-mdi-cellphone', link: '/category/mobile' },
  { id: 4, name: '云原生', count: 42, icon: 'i-mdi-cloud-outline', link: '/category/cloud' },
  { id: 5, name: '人工智能', count: 36, icon: 'i-mdi-robot', link: '/category/ai' },
  { id: 6, name: '数据库', count: 53, icon: 'i-mdi-database', link: '/category/database' }
])

// 当前轮播索引
const currentBanner = ref(0)
// 当前公告索引
const currentNotice = ref(0)

// 自动轮播Banner
const startBannerAutoplay = () => {
  setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 5000)
}

// 自动轮播公告
const startNoticeAutoplay = () => {
  setInterval(() => {
    currentNotice.value = (currentNotice.value + 1) % notices.value.length
  }, 3000)
}

onMounted(() => {
  startBannerAutoplay()
  startNoticeAutoplay()
})
</script>

<style scoped>
.carousel-item {
  z-index: 0;
}
.carousel-item.opacity-100 {
  z-index: 1;
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > img {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 