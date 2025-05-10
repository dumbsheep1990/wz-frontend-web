<template>
  <footer class="w-full bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <!-- 友情链接 -->
      <div v-if="links && links.length > 0" class="mb-6">
        <h3 class="text-lg font-medium mb-3">友情链接</h3>
        <div class="flex flex-wrap">
          <a 
            v-for="link in links" 
            :key="link.id" 
            :href="link.url" 
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center mr-4 mb-2 text-gray-600 hover:text-blue-600"
          >
            <img v-if="link.logo" :src="link.logo" :alt="link.name" class="h-6 w-auto mr-1" />
            <span>{{ link.name }}</span>
          </a>
        </div>
      </div>
      
      <!-- 底部导航 -->
      <div class="flex flex-wrap justify-between mb-6">
        <div class="w-full md:w-auto mb-4 md:mb-0">
          <div class="mb-2">
            <img v-if="siteConfig.siteLogo" :src="siteConfig.siteLogo" :alt="siteConfig.siteName" class="h-8" />
            <div v-else class="text-xl font-bold">{{ siteConfig.siteName || 'WZ-FRONT-WEB' }}</div>
          </div>
          <p class="text-sm text-gray-500">{{ siteConfig.seoDescription }}</p>
        </div>
        
        <div class="w-full md:w-auto">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h4 class="font-medium mb-2">关于我们</h4>
              <ul class="text-sm text-gray-500">
                <li class="mb-1"><NuxtLink to="/about" class="hover:text-blue-600">关于我们</NuxtLink></li>
                <li class="mb-1"><NuxtLink to="/legal/privacy" class="hover:text-blue-600">隐私政策</NuxtLink></li>
                <li class="mb-1"><NuxtLink to="/legal/terms" class="hover:text-blue-600">服务条款</NuxtLink></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">服务支持</h4>
              <ul class="text-sm text-gray-500">
                <li class="mb-1"><NuxtLink to="/help" class="hover:text-blue-600">帮助中心</NuxtLink></li>
                <li class="mb-1"><NuxtLink to="/feedback" class="hover:text-blue-600">意见反馈</NuxtLink></li>
                <li class="mb-1"><NuxtLink to="/contact" class="hover:text-blue-600">联系我们</NuxtLink></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">联系方式</h4>
              <ul class="text-sm text-gray-500">
                <li v-if="siteConfig.contactEmail" class="mb-1">
                  <span>邮箱：{{ siteConfig.contactEmail }}</span>
                </li>
                <li v-if="siteConfig.contactPhone" class="mb-1">
                  <span>电话：{{ siteConfig.contactPhone }}</span>
                </li>
                <li v-if="siteConfig.address" class="mb-1">
                  <span>地址：{{ siteConfig.address }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        <p>{{ siteConfig.copyright || `© ${new Date().getFullYear()} ${siteConfig.siteName || 'WZ-FRONT-WEB'}. 保留所有权利。` }}</p>
        <p v-if="siteConfig.icpNumber" class="mt-1">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{{ siteConfig.icpNumber }}</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const siteConfig = ref({
  siteName: '',
  siteLogo: '',
  seoDescription: '',
  copyright: '',
  icpNumber: '',
  contactEmail: '',
  contactPhone: '',
  address: ''
})

const links = ref([])

// 获取站点配置
const fetchSiteConfig = async () => {
  try {
    // 这里可以替换为实际API调用
    // const res = await $fetch('/api/site/config')
    // siteConfig.value = res.data
    
    // 模拟数据
    siteConfig.value = {
      siteName: 'WZ 前端示例',
      siteLogo: '',
      seoDescription: '基于 Vue3 的多端响应式站点，支持 SSR 和独立站点生成。',
      copyright: `© ${new Date().getFullYear()} WZ-FRONT-WEB. 保留所有权利。`,
      icpNumber: '浙ICP备XXXXXXXX号',
      contactEmail: 'support@example.com',
      contactPhone: '400-XXX-XXXX',
      address: '浙江省杭州市'
    }
  } catch (error) {
    console.error('获取站点配置失败:', error)
  }
}

// 获取友情链接
const fetchLinks = async () => {
  try {
    // 这里可以替换为实际API调用
    // const res = await $fetch('/api/links')
    // links.value = res.data
    
    // 模拟数据
    links.value = [
      { id: 1, name: '百度', url: 'https://www.baidu.com', logo: '' },
      { id: 2, name: '腾讯', url: 'https://www.qq.com', logo: '' },
      { id: 3, name: '阿里巴巴', url: 'https://www.alibaba.com', logo: '' },
      { id: 4, name: '京东', url: 'https://www.jd.com', logo: '' }
    ]
  } catch (error) {
    console.error('获取友情链接失败:', error)
  }
}

onMounted(() => {
  fetchSiteConfig()
  fetchLinks()
})
</script> 