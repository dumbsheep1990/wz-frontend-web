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
              <div class="w-full absolute top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0">
                <div class="w-1/2 h-full bg-green-500"></div>
              </div>
              
              <div class="flex justify-between w-full relative z-10">
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">✓</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">基本信息</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">2</div>
                  <div class="text-sm mt-2 text-green-500 font-medium">企业认证</div>
                </div>
                
                <div class="flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 font-bold bg-gray-200">3</div>
                  <div class="text-sm mt-2 text-gray-500">提交成功</div>
                </div>
              </div>
            </div>
            
            <!-- 企业认证表单 -->
            <div class="certification-form">
              <h2 class="text-xl text-center font-bold mb-6 pb-2 border-b text-green-600">企业认证</h2>
              
              <form @submit.prevent="submitCertification">
                <!-- 文件上传区域 -->
                <div class="grid grid-cols-2 gap-6 mb-8">
                  <!-- 营业执照上传 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      <span class="text-red-500">*</span>营业执照:
                    </label>
                    <div 
                      class="h-32 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors relative"
                      @click="triggerFileUpload('businessLicense')"
                    >
                      <input 
                        type="file" 
                        id="businessLicense" 
                        class="hidden" 
                        @change="handleFileUpload('businessLicense', $event)"
                      >
                      <div v-if="!formData.businessLicense" class="text-center">
                        <span class="text-4xl text-gray-400 block">+</span>
                      </div>
                      <div v-else class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-60 rounded-md">
                        <div class="text-white">
                          <div class="text-center mb-1">{{ getFileName(formData.businessLicense) }}</div>
                          <button 
                            type="button" 
                            class="text-xs text-white underline"
                            @click.stop="removeFile('businessLicense')"
                          >
                            移除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 批文许可上传 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      批文许可:
                    </label>
                    <div 
                      class="h-32 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors relative"
                      @click="triggerFileUpload('approvalDoc')"
                    >
                      <input 
                        type="file" 
                        id="approvalDoc" 
                        class="hidden" 
                        @change="handleFileUpload('approvalDoc', $event)"
                      >
                      <div v-if="!formData.approvalDoc" class="text-center">
                        <span class="text-4xl text-gray-400 block">+</span>
                      </div>
                      <div v-else class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-60 rounded-md">
                        <div class="text-white">
                          <div class="text-center mb-1">{{ getFileName(formData.approvalDoc) }}</div>
                          <button 
                            type="button" 
                            class="text-xs text-white underline"
                            @click.stop="removeFile('approvalDoc')"
                          >
                            移除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 委托书上传 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      委托书:
                    </label>
                    <div 
                      class="h-32 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors relative"
                      @click="triggerFileUpload('authorizationLetter')"
                    >
                      <input 
                        type="file" 
                        id="authorizationLetter" 
                        class="hidden" 
                        @change="handleFileUpload('authorizationLetter', $event)"
                      >
                      <div v-if="!formData.authorizationLetter" class="text-center">
                        <span class="text-4xl text-gray-400 block">+</span>
                      </div>
                      <div v-else class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-60 rounded-md">
                        <div class="text-white">
                          <div class="text-center mb-1">{{ getFileName(formData.authorizationLetter) }}</div>
                          <button 
                            type="button" 
                            class="text-xs text-white underline"
                            @click.stop="removeFile('authorizationLetter')"
                          >
                            移除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 下载模板 -->
                  <div class="flex items-end">
                    <a href="#" class="text-blue-500 hover:text-blue-600 transition-colors" @click.prevent="downloadTemplate">下载模板</a>
                  </div>
                </div>
                
                <!-- 同意条款 -->
                <div class="mb-8">
                  <label class="inline-flex items-center">
                    <input type="checkbox" v-model="formData.agreeTerms" class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50">
                    <span class="ml-2 text-sm text-gray-700">本人/本机构已阅读并同意 <a href="#" class="text-orange-500 hover:text-orange-600 transition-colors">《信息发布责任书》</a></span>
                  </label>
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex justify-center space-x-4 mt-8">
                  <button 
                    type="button"
                    class="px-8 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                    @click="goBack"
                  >
                    上一步
                  </button>
                  <button 
                    type="submit"
                    class="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    :disabled="!formData.agreeTerms || !formData.businessLicense"
                  >
                    完成
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
import { ref, reactive, onMounted } from 'vue'
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
  businessLicense: null,
  approvalDoc: null,
  authorizationLetter: null,
  agreeTerms: false
})

// 触发文件上传框
const triggerFileUpload = (fieldName) => {
  document.getElementById(fieldName).click()
}

// 下载模板
const downloadTemplate = () => {
  // 实际应用中应该提供真实的模板下载链接
  alert('模板下载功能将在实际环境中实现')
}

// 处理文件上传
const handleFileUpload = (field, event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 检查文件类型
  const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    alert('请上传JPG、PNG或PDF格式的文件')
    return
  }
  
  // 检查文件大小
  if (file.size > 5 * 1024 * 1024) {
    alert('文件大小不能超过5MB')
    return
  }
  
  // 在实际应用中，这里应该上传文件到服务器，然后保存文件路径
  // 这里为了演示，我们直接将文件对象保存到表单数据中
  formData[field] = file
}

// 移除文件
const removeFile = (field) => {
  formData[field] = null
}

// 获取文件名
const getFileName = (file) => {
  if (!file) return ''
  return file.name || '已上传文件'
}

// 返回上一步
const goBack = () => {
  router.push('/person/enterprise-registration')
}

// 提交认证
const submitCertification = async () => {
  try {
    if (!formData.businessLicense) {
      alert('请上传营业执照')
      return
    }
    
    if (!formData.agreeTerms) {
      alert('请阅读并同意《信息发布责任书》')
      return
    }
    
    // 在实际应用中，这里应该先上传文件，然后将文件路径作为参数提交
    const formDataToSubmit = {
      business_license: formData.businessLicense ? formData.businessLicense.name : '',
      approval_document: formData.approvalDoc ? formData.approvalDoc.name : '',
      authorization_letter: formData.authorizationLetter ? formData.authorizationLetter.name : ''
    }
    
    const response = await enterpriseRegistrationApi.verifyEnterprise('mock-verification-code')
    if (response.success) {
      // 跳转到成功页面
      router.push('/person/enterprise-success')
    }
  } catch (error) {
    console.error('提交企业认证信息失败:', error)
    alert('提交失败，请稍后重试')
  }
}

// 页面加载时检查是否已完成基本信息填写
onMounted(async () => {
  try {
    const registration = await enterpriseRegistrationApi.getEnterpriseRegistration()
    if (!registration.data || !registration.data.id) {
      // 如果没有基本信息，重定向到基本信息页
      router.push('/person/enterprise-registration')
    }
  } catch (error) {
    console.error('获取企业入驻信息失败:', error)
    router.push('/person/enterprise-registration')
  }
})
</script>

<style scoped>
/* 自定义样式 */
.certification-form label {
  color: #333;
}
</style>
