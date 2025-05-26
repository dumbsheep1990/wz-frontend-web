<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap -mx-4">
        <!-- 左侧导航 -->
        <div class="w-full md:w-1/4 px-4 mb-6 md:mb-0">
          <div class="bg-white rounded-lg shadow p-6 sticky top-24">
            <!-- 个人信息 -->
            <div class="text-center mb-6">
              <div class="inline-block relative mb-4">
                <img 
                  :src="user.avatar || '/img/default-avatar.png'" 
                  alt="用户头像" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              </div>
              <h3 class="text-xl font-semibold">{{ user.nickname || user.username }}</h3>
              <p class="text-gray-500 text-sm">{{ user.role || '普通会员' }}</p>
            </div>
            
            <!-- 导航菜单 -->
            <nav>
              <ul class="space-y-2">
                <li v-for="item in personNavMenu" :key="item.id">
                  <NuxtLink 
                    :to="item.path"
                    class="flex items-center w-full px-4 py-2 rounded-md transition-colors"
                    :class="route.path === item.path ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50'"
                  >
                    <span class="mr-3">
                      <i :class="item.icon"></i>
                    </span>
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <!-- 右侧内容区域 -->
        <div class="w-full md:w-3/4 px-4">
          <div class="bg-white rounded-lg shadow p-6">
            <!-- 步骤导航 -->
            <div class="flex justify-between items-center mb-8 relative">
              <div class="w-full absolute top-1/2 -translate-y-1/2 h-1 bg-green-500 z-0"></div>
              
              <div class="flex justify-between w-full relative z-10">
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">✓</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">基本信息</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">✓</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">企业认证</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">✓</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">提交成功</div>
                </div>
              </div>
            </div>
            
            <!-- 成功提示 -->
            <div class="success-message text-center py-12">
              <div class="mb-6">
                <svg class="h-24 w-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 class="text-2xl font-bold text-gray-800 mb-4">提交成功</h2>
              <p class="text-gray-600 max-w-md mx-auto mb-8">
                您的企业认证申请已提交成功，我们将在1-3个工作日内进行审核，请耐心等待。
              </p>
              
              <div class="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
                <h3 class="font-medium text-gray-800 mb-3">申请信息</h3>
                <ul class="space-y-2 text-sm text-gray-600">
                  <li class="flex justify-between">
                    <span>企业名称:</span>
                    <span class="font-medium">{{ companyInfo.companyName }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span>申请时间:</span>
                    <span class="font-medium">{{ formattedDate }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span>申请状态:</span>
                    <span class="font-medium text-yellow-600">审核中</span>
                  </li>
                </ul>
              </div>
              
              <div class="flex justify-center space-x-4">
                <button 
                  class="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  @click="viewApplication"
                >
                  查看申请
                </button>
                <button 
                  class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  @click="goToHome"
                >
                  返回首页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import enterpriseRegistrationApi from '~/api/enterprise-registration'

const route = useRoute()
const router = useRouter()

// 用户信息
const user = ref({
  username: '用户123456',
  nickname: '张三',
  role: '个人用户',
  avatar: null
})

// 个人中心导航菜单
const personNavMenu = [
  { id: 'profile', name: '个人资料', path: '/person', icon: 'fas fa-user' },
  { id: 'enterprise', name: '入驻申请', path: '/person/enterprise-registration', icon: 'fas fa-building' },
  { id: 'messages', name: '消息中心', path: '/person/messages', icon: 'fas fa-envelope' },
  { id: 'points', name: '积分记录', path: '/person/points', icon: 'fas fa-star' },
  { id: 'favorites', name: '我的收藏', path: '/person/favorites', icon: 'fas fa-heart' },
  { id: 'settings', name: '账号设置', path: '/person/settings', icon: 'fas fa-cog' },
]

// 公司信息
const companyInfo = ref({
  companyName: '未知企业',
  applicationTime: new Date(),
  status: '审核中'
})

// 格式化日期
const formattedDate = computed(() => {
  const date = companyInfo.value.applicationTime
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
})

// 查看申请
const viewApplication = () => {
  router.push('/person/enterprise-registration')
}

// 返回首页
const goToHome = () => {
  router.push('/')
}

// 页面加载时获取企业信息
onMounted(async () => {
  try {
    const registration = await enterpriseRegistrationApi.getEnterpriseRegistration()
    if (registration.data) {
      companyInfo.value.companyName = registration.data.companyName || '未知企业'
      if (registration.data.createdAt) {
        companyInfo.value.applicationTime = new Date(registration.data.createdAt)
      }
      
      // 根据状态码设置状态文本
      switch (registration.data.status) {
        case 0:
          companyInfo.value.status = '审核中'
          break
        case 1:
          companyInfo.value.status = '已通过'
          break
        case 2:
          companyInfo.value.status = '已拒绝'
          break
        default:
          companyInfo.value.status = '审核中'
      }
    } else {
      // 如果没有申请信息，重定向到基本信息页
      router.push('/person/enterprise-registration')
    }
  } catch (error) {
    console.error('获取企业入驻信息失败:', error)
  }
})
</script>

<style scoped>
/* 自定义样式 */
.success-message {
  color: #333;
}
</style>
