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
          <div class="bg-white rounded-lg shadow">
            <!-- 选项卡导航 -->
            <div class="flex border-b">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-6 py-3 text-center border-b-2 transition-colors',
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </div>
            
            <!-- 模板管理内容 -->
            <div class="p-6">
              <!-- 模板列表 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- 新建模板按钮 -->
                <div class="border border-dashed border-red-300 rounded p-4 flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-gray-50 transition-colors" @click="createNewTemplate">
                  <div class="text-gray-400 text-4xl">+</div>
                  <div class="mt-2 text-gray-500">新建</div>
                </div>
                
                <!-- 模板卡片 -->
                <div 
                  v-for="template in templates" 
                  :key="template.id"
                  class="bg-gray-100 rounded overflow-hidden shadow-sm relative h-48"
                >
                  <!-- 模板预览 -->
                  <div class="h-full p-4 flex flex-col justify-center">
                    <img :src="template.preview" alt="模板预览" class="w-full object-contain h-32" />
                    <div class="text-sm text-center mt-2 text-gray-700">{{ template.name }}</div>
                    
                    <!-- 蓝色角标 -->
                    <div v-if="template.isNew" class="absolute top-0 left-0 bg-blue-500 text-white text-xs py-1 px-2 transform -rotate-45 translate-x-[-25%] translate-y-[10%]">
                      新品
                    </div>
                    
                    <!-- 操作按钮 -->
                    <div class="absolute top-2 right-2">
                      <button @click.stop="showOptions(template)" class="text-gray-500 hover:text-gray-700">
                        <span class="text-lg">⋮⋮⋮</span>
                      </button>
                      
                      <!-- 下拉菜单 -->
                      <div v-if="template.showOptions" class="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden z-10">
                        <button 
                          v-if="template.enabled" 
                          @click.stop="disableTemplate(template.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          停用
                        </button>
                        <button 
                          v-else 
                          @click.stop="enableTemplate(template.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          启用
                        </button>
                        <button 
                          @click.stop="configureTemplate(template.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          配置
                        </button>
                        <button 
                          @click.stop="deleteTemplate(template.id)" 
                          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 底部分页 -->
              <div class="mt-8 flex justify-center">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="changePage(currentPage - 1)" 
                    :disabled="currentPage === 1"
                    :class="[
                      'px-3 py-1 rounded-md',
                      currentPage === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    上一页
                  </button>
                  
                  <button 
                    v-for="page in totalPages" 
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                      'px-3 py-1 rounded-md',
                      currentPage === page
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button 
                    @click="changePage(currentPage + 1)" 
                    :disabled="currentPage === totalPages"
                    :class="[
                      'px-3 py-1 rounded-md',
                      currentPage === totalPages 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 新建模板弹窗 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6" @click.stop>
        <h3 class="text-lg font-medium text-gray-900 mb-4">新建模板</h3>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">模板名称</label>
          <input 
            type="text" 
            v-model="newTemplate.name" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="请输入模板名称"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">模板类型</label>
          <select 
            v-model="newTemplate.type" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="banner">Banner模板</option>
            <option value="product">产品模板</option>
            <option value="article">文章模板</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">预览图</label>
          <div 
            class="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
            @click="triggerFileUpload"
          >
            <input 
              type="file" 
              ref="fileInput" 
              class="hidden" 
              accept="image/*"
              @change="handleFileUpload"
            />
            <div v-if="!newTemplate.preview" class="py-4">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-1 text-sm text-gray-500">点击上传图片</p>
            </div>
            <div v-else class="py-4">
              <img :src="newTemplate.preview" alt="预览图" class="h-32 mx-auto object-contain" />
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="showCreateModal = false" 
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            @click="saveNewTemplate" 
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            :disabled="!newTemplate.name"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import templateManagementApi from '~/api/template-management'

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
  { id: 'templates', name: '模板管理', path: '/person/template-management', icon: 'fas fa-copy' },
  { id: 'messages', name: '消息中心', path: '/person/messages', icon: 'fas fa-envelope' },
  { id: 'points', name: '积分记录', path: '/person/points', icon: 'fas fa-star' },
  { id: 'favorites', name: '我的收藏', path: '/person/favorites', icon: 'fas fa-heart' },
  { id: 'settings', name: '账号设置', path: '/person/settings', icon: 'fas fa-cog' },
]

// 选项卡
const tabs = [
  { id: 'entry', name: '入驻信息' },
  { id: 'templates', name: '模板管理' },
  { id: 'services', name: '服务项目' },
  { id: 'info', name: '信息列表' },
  { id: 'collect', name: '收藏信息管理' },
  { id: 'leave', name: '留言列表' },
  { id: 'unit', name: '单排列表' },
]
const activeTab = ref('templates')

// 模板数据
const templates = ref([
  {
    id: 1,
    name: '模板系列1',
    preview: '/img/template-preview-1.png',
    type: 'banner',
    enabled: true,
    isNew: true,
    showOptions: false
  },
  {
    id: 2,
    name: '模板系列2',
    preview: '/img/template-preview-2.png',
    type: 'product',
    enabled: true,
    isNew: false,
    showOptions: false
  },
  {
    id: 3,
    name: '模板系列3',
    preview: '/img/template-preview-3.png',
    type: 'article',
    enabled: false,
    isNew: true,
    showOptions: false
  },
  {
    id: 4,
    name: '模板系列4',
    preview: '/img/template-preview-4.png',
    type: 'banner',
    enabled: true,
    isNew: false,
    showOptions: false
  }
])

// 模拟默认预览图
const defaultPreviews = {
  'banner': '/img/template-preview-1.png',
  'product': '/img/template-preview-2.png',
  'article': '/img/template-preview-3.png'
}

// 分页
const currentPage = ref(1)
const itemsPerPage = 6
const totalItems = ref(templates.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

// 新建模板
const showCreateModal = ref(false)
const fileInput = ref(null)
const newTemplate = reactive({
  name: '',
  type: 'banner',
  preview: null
})

// 显示模板操作选项
const showOptions = (template) => {
  // 先关闭所有其他模板的选项
  templates.value.forEach(t => {
    if (t.id !== template.id) {
      t.showOptions = false
    }
  })
  
  // 切换当前模板的选项显示状态
  template.showOptions = !template.showOptions
}

// 启用模板
const enableTemplate = async (id) => {
  try {
    await templateManagementApi.toggleTemplateStatus(id, true)
    const template = templates.value.find(t => t.id === id)
    if (template) {
      template.enabled = true
      template.showOptions = false
    }
  } catch (error) {
    console.error('启用模板失败:', error)
    alert('启用模板失败，请稍后重试')
  }
}

// 禁用模板
const disableTemplate = async (id) => {
  try {
    await templateManagementApi.toggleTemplateStatus(id, false)
    const template = templates.value.find(t => t.id === id)
    if (template) {
      template.enabled = false
      template.showOptions = false
    }
  } catch (error) {
    console.error('禁用模板失败:', error)
    alert('禁用模板失败，请稍后重试')
  }
}

// 配置模板
const configureTemplate = (id) => {
  const template = templates.value.find(t => t.id === id)
  if (template) {
    template.showOptions = false
    router.push(`/person/template-config/${id}`)
  }
}

// 删除模板
const deleteTemplate = async (id) => {
  if (!confirm('确定要删除这个模板吗？')) return
  
  try {
    await templateManagementApi.deleteTemplate(id)
    templates.value = templates.value.filter(t => t.id !== id)
    totalItems.value = templates.value.length
  } catch (error) {
    console.error('删除模板失败:', error)
    alert('删除模板失败，请稍后重试')
  }
}

// 创建新模板
const createNewTemplate = () => {
  // 重置表单
  newTemplate.name = ''
  newTemplate.type = 'banner'
  newTemplate.preview = null
  
  // 显示创建模态框
  showCreateModal.value = true
}

// 触发文件上传
const triggerFileUpload = () => {
  fileInput.value.click()
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    alert('请上传图片文件')
    return
  }
  
  // 检查文件大小
  if (file.size > 5 * 1024 * 1024) {
    alert('图片大小不能超过5MB')
    return
  }
  
  // 创建预览
  const reader = new FileReader()
  reader.onload = (e) => {
    newTemplate.preview = e.target.result
  }
  reader.readAsDataURL(file)
}

// 保存新模板
const saveNewTemplate = async () => {
  if (!newTemplate.name) {
    alert('请输入模板名称')
    return
  }
  
  try {
    // 使用默认预览图（如果没有上传）
    if (!newTemplate.preview) {
      newTemplate.preview = defaultPreviews[newTemplate.type]
    }
    
    const response = await templateManagementApi.createTemplate({
      name: newTemplate.name,
      type: newTemplate.type,
      preview: newTemplate.preview
    })
    
    // 添加到模板列表
    templates.value.push({
      id: response.id || Date.now(),
      name: newTemplate.name,
      type: newTemplate.type,
      preview: newTemplate.preview,
      enabled: true,
      isNew: true,
      showOptions: false
    })
    
    totalItems.value = templates.value.length
    showCreateModal.value = false
  } catch (error) {
    console.error('创建模板失败:', error)
    alert('创建模板失败，请稍后重试')
  }
}

// 切换页面
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// 获取模板列表
const fetchTemplates = async () => {
  try {
    const response = await templateManagementApi.getTemplates()
    if (response.data) {
      templates.value = response.data.map(item => ({
        ...item,
        showOptions: false
      }))
      totalItems.value = templates.value.length
    }
  } catch (error) {
    console.error('获取模板列表失败:', error)
  }
}

// 监听点击事件，用于关闭下拉菜单
const handleClickOutside = (event) => {
  templates.value.forEach(template => {
    if (template.showOptions) {
      template.showOptions = false
    }
  })
}

// 页面加载时获取模板列表
onMounted(() => {
  //fetchTemplates()
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 自定义样式 */
.border-dashed {
  border-style: dashed;
}
</style>
