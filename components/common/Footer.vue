<template>
  <footer class="bg-white mt-8 border-t border-gray-200">
    <!-- 友情链接 -->
    <div class="container mx-auto px-4 py-6">
      <div class="mb-4">
        <h3 class="text-base font-semibold mb-3">主题：</h3>
        <div class="flex flex-wrap">
          <NuxtLink 
            v-for="(link, index) in themeLinks" 
            :key="index" 
            :to="link.url" 
            class="mr-4 mb-2 text-sm text-gray-600 hover:text-orange-500"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-base font-semibold mb-3">热门行业：</h3>
        <div class="flex flex-wrap">
          <NuxtLink 
            v-for="(link, index) in industryLinks" 
            :key="index" 
            :to="link.url" 
            class="mr-4 mb-2 text-sm text-gray-600 hover:text-orange-500"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-base font-semibold mb-3">地区：</h3>
        <div class="flex flex-wrap">
          <NuxtLink 
            v-for="(link, index) in regionLinks" 
            :key="index" 
            :to="link.url" 
            class="mr-4 mb-2 text-sm text-gray-600 hover:text-orange-500"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
      <div>
        <h3 class="text-base font-semibold mb-3">友情链接：</h3>
        <div class="flex flex-wrap">
          <a 
            v-for="(link, index) in friendLinks" 
            :key="index" 
            :href="link.url" 
            target="_blank" 
            class="mr-4 mb-2 text-sm text-gray-600 hover:text-orange-500"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- 底部导航与版权信息 -->
    <div class="bg-gray-100 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-4">
          <div class="flex mb-4 md:mb-0">
            <NuxtLink 
              v-for="(link, index) in footerNavLinks" 
              :key="index" 
              :to="link.url"
              class="mx-2 text-sm text-gray-600 hover:text-orange-500"
            >
              {{ link.name }}
            </NuxtLink>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
        <div class="text-center text-sm text-gray-600">
          <p>版权所有 © {{ currentYear }} 万知网 (wz.gg). 保留所有权利.</p>
          <p class="mt-1">浙ICP备15001930号-1 | 浙公网安备33011102000046号</p>
          <p class="mt-1">地址：浙江省杭州市余杭区仓前街道1158号</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// 当前年份
const currentYear = computed(() => new Date().getFullYear())

// 主题链接
const themeLinks = [
  { name: '私立学校', url: '/theme/private-school' },
  { name: '建筑', url: '/theme/building' },
  { name: '医药', url: '/theme/medicine' },
  { name: '科技', url: '/theme/tech' },
  { name: '工业', url: '/theme/industry' },
  { name: '服务', url: '/theme/service' },
  { name: '农业', url: '/theme/agriculture' },
  { name: '装修', url: '/theme/decoration' },
  { name: '贸易', url: '/theme/trade' },
  { name: '制造', url: '/theme/manufacturing' }
]

// 行业链接
const industryLinks = [
  { name: '工业设备', url: '/industry/equipment' },
  { name: '农业机械', url: '/industry/agricultural-machinery' },
  { name: '电子设备', url: '/industry/electronic' },
  { name: '服装纺织', url: '/industry/textile' },
  { name: '食品饮料', url: '/industry/food-beverage' },
  { name: '建筑材料', url: '/industry/building-materials' },
  { name: '医疗器械', url: '/industry/medical-equipment' },
  { name: '化工原料', url: '/industry/chemical' },
  { name: '包装材料', url: '/industry/packaging' },
  { name: '办公用品', url: '/industry/office-supplies' }
]

// 地区链接
const regionLinks = [
  { name: '上海', url: '/region/shanghai' },
  { name: '北京', url: '/region/beijing' },
  { name: '杭州', url: '/region/hangzhou' },
  { name: '广州', url: '/region/guangzhou' },
  { name: '深圳', url: '/region/shenzhen' },
  { name: '重庆', url: '/region/chongqing' },
  { name: '南京', url: '/region/nanjing' },
  { name: '苏州', url: '/region/suzhou' },
  { name: '武汉', url: '/region/wuhan' },
  { name: '成都', url: '/region/chengdu' }
]

// 友情链接
const friendLinks = [
  { name: '工业网', url: 'https://www.gongye.com' },
  { name: '贸易网', url: 'https://www.maoyi.com' },
  { name: '制造网', url: 'https://www.zhizao.com' },
  { name: '农业网', url: 'https://www.nongye.com' },
  { name: '建筑网', url: 'https://www.jianzhu.com' },
  { name: '医药网', url: 'https://www.yiyao.com' },
  { name: '科技网', url: 'https://www.keji.com' },
  { name: '装修网', url: 'https://www.zhuangxiu.com' },
  { name: '电子商务网', url: 'https://www.dianzi.com' },
  { name: '机械设备网', url: 'https://www.jixie.com' }
]

// 底部导航链接
const footerNavLinks = [
  { name: '关于我们', url: '/about' },
  { name: '联系我们', url: '/contact' },
  { name: '服务条款', url: '/terms' },
  { name: '隐私政策', url: '/privacy' },
  { name: '帮助中心', url: '/help' },
  { name: '广告服务', url: '/ad' },
  { name: '招聘信息', url: '/job' }
]
</script> 