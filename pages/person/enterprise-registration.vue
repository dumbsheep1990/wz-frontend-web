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
              <div class="w-full absolute top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
              
              <div class="flex justify-between w-full relative z-10">
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">1</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">基本信息</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 font-bold bg-gray-200">2</div>
                  <div class="text-sm mt-2 text-gray-500">企业认证</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 font-bold bg-gray-200">3</div>
                  <div class="text-sm mt-2 text-gray-500">提交成功</div>
                </div>
              </div>
            </div>
            
            <!-- 基本信息表单 -->
            <div class="basic-info-form">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b text-green-600">基本信息</h2>
              
              <form @submit.prevent="submitBasicInfo">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- 企业名称 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      <span class="text-red-500">*</span>企业名称:
                    </label>
                    <input 
                      type="text" 
                      v-model="formData.companyName" 
                      placeholder="企业名称"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <!-- 企业性质 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      <span class="text-red-500">*</span>企业性质:
                    </label>
                    <div class="relative">
                      <select 
                        v-model="formData.companyType" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 appearance-none"
                        required
                      >
                        <option value="" disabled>请选择企业性质</option>
                        <option :value="1">企业</option>
                        <option :value="2">集团</option>
                        <option :value="3">政府机构/NGO/协会</option>
                        <option :value="4">科研所</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 联系人 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      <span class="text-red-500">*</span>联系人:
                    </label>
                    <input 
                      type="text" 
                      v-model="formData.contactPerson" 
                      placeholder="联系人姓名"
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <!-- 所在城市 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      <span class="text-red-500">*</span>所在城市:
                    </label>
                    <div class="relative">
                      <select 
                        v-model="formData.region" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 appearance-none"
                        required
                      >
                        <option value="" disabled>请选择所在城市</option>
                        <option value="江苏">江苏</option>
                        <option value="北京">北京</option>
                        <option value="上海">上海</option>
                        <option value="广东">广东</option>
                        <option value="浙江">浙江</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 服务区域 -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">服务区域:</label>
                  <div class="relative">
                    <select 
                      v-model="formData.serviceArea" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 appearance-none"
                    >
                      <option value="" disabled>请选择服务区域</option>
                      <option value="全国">全国</option>
                      <option value="华东">华东</option>
                      <option value="华南">华南</option>
                      <option value="华北">华北</option>
                      <option value="西南">西南</option>
                      <option value="东北">东北</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- 联系方式 -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    <span class="text-red-500">*</span>联系方式:
                  </label>
                  <input 
                    type="tel" 
                    v-model="formData.contactPhone" 
                    placeholder="请输入手机号码"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <!-- 联系地址 -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    <span class="text-red-500">*</span>联系地址:
                  </label>
                  <input 
                    type="text" 
                    v-model="formData.detailedAddress" 
                    placeholder="请输入详细地址"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <!-- 地图位置 -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">地址位置（拖动标记到您的位置）:</label>
                  <div class="h-72 w-full bg-gray-100 rounded-md overflow-hidden relative">
                    <div class="absolute inset-0 flex items-center justify-center">
                      <img src="/img/map-placeholder.jpg" alt="地图" class="w-full h-full object-cover" />
                    </div>
                    <div class="absolute bottom-2 left-2 right-2 bg-white text-xs p-2 rounded shadow-md">
                      地址位置（提示: 地标采集功能可视显示地标，在地图上标记您的位置来帮助设置）
                    </div>
                  </div>
                </div>
                
                <!-- 提交按钮 -->
                <div class="flex justify-end">
                  <button 
                    type="submit"
                    class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    保存并继续
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
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

// 表单数据
const formData = reactive({
  companyName: '',
  companyType: '',
  contactPerson: '',
  region: '',
  serviceArea: '全国',
  contactPhone: '',
  detailedAddress: '',
  locationLatitude: 0,
  locationLongitude: 0,
  subdomain: '',
  tenantName: '',
  tenantDesc: ''
})

// 获取企业入驻信息
const fetchEnterpriseRegistration = async () => {
  try {
    const response = await enterpriseRegistrationApi.getEnterpriseRegistration()
    if (response.data) {
      // 填充表单数据
      formData.companyName = response.data.companyName || ''
      formData.companyType = response.data.companyType || ''
      formData.contactPerson = response.data.contactPerson || ''
      formData.region = response.data.region || ''
      formData.serviceArea = response.data.serviceArea || '全国'
      formData.detailedAddress = response.data.detailedAddress || ''
      formData.locationLatitude = response.data.locationLatitude || 0
      formData.locationLongitude = response.data.locationLongitude || 0
    }
  } catch (error) {
    console.error('获取企业入驻信息失败:', error)
  }
}

// 提交基本信息
const submitBasicInfo = async () => {
  try {
    // 企业名称会同时作为租户名称
    formData.tenantName = formData.companyName
    // 生成子域名（使用企业名称的拼音首字母）
    formData.subdomain = pinyin(formData.companyName).toLowerCase()
    
    const response = await enterpriseRegistrationApi.createEnterpriseRegistration(formData)
    if (response.success) {
      // 跳转到认证页面
      router.push('/person/enterprise-certification')
    }
  } catch (error) {
    console.error('提交企业入驻信息失败:', error)
    alert('提交失败，请稍后重试')
  }
}

// 简单的拼音转换函数（实际应用中应使用专业库）
const pinyin = (text) => {
  // 这只是一个示例，实际应用中应该使用专业的拼音转换库
  return text.replace(/[\u4e00-\u9fa5]/g, '').trim() || 'company' + Math.floor(Math.random() * 1000)
}

// 页面加载时获取企业入驻信息
onMounted(() => {
  fetchEnterpriseRegistration()
})
</script>

<style scoped>
/* 自定义样式 */
.basic-info-form label {
  color: #333;
}
</style>
