<template>
  <div class="site-editor">
    <!-- 顶部工具栏 -->
    <div class="bg-white border-b border-gray-200 flex justify-between items-center p-4">
      <div class="flex items-center">
        <button 
          @click="$emit('back')" 
          class="mr-4 text-gray-600 hover:text-gray-800"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="text-xl font-bold text-gray-800">编辑站点: {{ site.name }}</h2>
      </div>
      <div class="flex space-x-3">
        <button 
          @click="openPreview" 
          class="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          预览
        </button>
        <button 
          @click="handleSave" 
          class="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          保存
        </button>
        <button 
          @click="handlePublish" 
          class="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          发布
        </button>
      </div>
    </div>
    
    <!-- 主体内容 -->
    <div class="flex h-[calc(100vh-60px)]">
      <!-- 左侧菜单 -->
      <div class="w-64 border-r border-gray-200 bg-white">
        <div class="p-4 border-b border-gray-200">
          <h3 class="font-medium text-gray-700">站点管理</h3>
        </div>
        <ul class="py-2">
          <li 
            v-for="item in menuItems" 
            :key="item.id"
            @click="activeMenu = item.id"
            class="px-4 py-2 text-sm cursor-pointer"
            :class="activeMenu === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-700 hover:bg-gray-50'"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      
      <!-- 中部内容区 -->
      <div class="flex-1 overflow-auto bg-gray-50">
        <!-- 页面管理 -->
        <div v-if="activeMenu === 'pages'" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-gray-800">页面管理</h3>
            <button 
              @click="showAddPageModal = true"
              class="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
            >
              添加页面
            </button>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <table class="w-full text-left">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 text-sm font-medium text-gray-500">页面名称</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-500">URL</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-500">首页</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-500">最后更新</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="page in site.pages" 
                  :key="page.id"
                  class="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td class="px-4 py-3">{{ page.name }}</td>
                  <td class="px-4 py-3 text-gray-500">/{{ page.slug }}</td>
                  <td class="px-4 py-3">
                    <span 
                      v-if="page.isHomepage" 
                      class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                    >
                      首页
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(page.updatedAt) }}</td>
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button 
                        @click="editPage(page.id)"
                        class="p-1 text-blue-500 hover:text-blue-700"
                        title="编辑页面"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        @click="confirmDeletePage(page.id)"
                        class="p-1 text-red-500 hover:text-red-700"
                        :disabled="page.isHomepage"
                        :class="{ 'opacity-50 cursor-not-allowed': page.isHomepage }"
                        title="删除页面"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        v-if="!page.isHomepage"
                        @click="setAsHomepage(page.id)"
                        class="p-1 text-green-500 hover:text-green-700"
                        title="设为首页"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- 其他内容面板 -->
        <div v-else-if="activeMenu === 'design'" class="p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">设计中心</h3>
          <p>请选择左侧页面进行编辑</p>
        </div>
        
        <!-- 其他设置面板... -->
      </div>
    </div>
    
    <!-- 添加页面弹窗 -->
    <div v-if="showAddPageModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">添加新页面</h2>
          <button @click="showAddPageModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="addNewPage">
          <div class="mb-4">
            <label for="page-name" class="block text-sm font-medium text-gray-700 mb-1">页面名称</label>
            <input 
              id="page-name"
              v-model="newPage.name"
              type="text" 
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="输入页面名称"
            />
          </div>
          
          <div class="mb-4">
            <label for="page-slug" class="block text-sm font-medium text-gray-700 mb-1">URL路径</label>
            <div class="flex items-center">
              <span class="text-gray-500 mr-1">/</span>
              <input 
                id="page-slug"
                v-model="newPage.slug"
                type="text" 
                required
                class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="page-url"
              />
            </div>
          </div>
          
          <div class="mb-6">
            <label class="flex items-center">
              <input 
                type="checkbox"
                v-model="newPage.isHomepage"
                class="rounded text-orange-500 focus:ring-orange-400"
              />
              <span class="ml-2 text-sm text-gray-700">设为首页</span>
            </label>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showAddPageModal = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              添加
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { Site, Page } from '../../types/siteBuilder'

const props = defineProps<{
  site: Site
}>()

const emit = defineEmits(['back', 'save'])

// 侧边菜单
const menuItems = [
  { id: 'pages', label: '页面管理' },
  { id: 'design', label: '设计中心' },
  { id: 'theme', label: '主题设置' },
  { id: 'navigation', label: '导航管理' },
  { id: 'settings', label: '站点设置' }
]

// 状态
const activeMenu = ref('pages')
const showAddPageModal = ref(false)
const newPage = ref({
  name: '',
  slug: '',
  isHomepage: false
})

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}

// 打开预览
const openPreview = () => {
  window.open(`/preview/site/${props.site.id}`, '_blank')
}

// 保存站点
const handleSave = () => {
  console.log('保存站点', props.site)
  emit('save', props.site)
}

// 发布站点
const handlePublish = () => {
  console.log('发布站点', props.site)
  // 更新站点状态
  const updatedSite = {
    ...props.site,
    status: 'published',
    publishedAt: new Date().toISOString()
  }
  emit('save', updatedSite)
}

// 编辑页面
const editPage = (pageId: string) => {
  console.log('编辑页面', pageId)
  // 这里可以实现页面编辑逻辑
}

// 确认删除页面
const confirmDeletePage = (pageId: string) => {
  if (confirm('确定要删除此页面吗？此操作无法撤销。')) {
    deletePage(pageId)
  }
}

// 删除页面
const deletePage = (pageId: string) => {
  console.log('删除页面', pageId)
  // 这里可以实现页面删除逻辑
  const updatedSite = {
    ...props.site,
    pages: props.site.pages.filter(page => page.id !== pageId)
  }
  emit('save', updatedSite)
}

// 设为首页
const setAsHomepage = (pageId: string) => {
  console.log('设为首页', pageId)
  // 更新页面状态
  const updatedPages = props.site.pages.map(page => ({
    ...page,
    isHomepage: page.id === pageId
  }))
  
  const updatedSite = {
    ...props.site,
    pages: updatedPages
  }
  
  emit('save', updatedSite)
}

// 添加新页面
const addNewPage = () => {
  console.log('添加新页面', newPage.value)
  
  // 如果设为首页，将其他页面设置为非首页
  let updatedPages = [...props.site.pages]
  if (newPage.value.isHomepage) {
    updatedPages = updatedPages.map(page => ({
      ...page,
      isHomepage: false
    }))
  }
  
  // 创建新页面
  const page: Page = {
    id: Date.now().toString(),
    name: newPage.value.name,
    slug: newPage.value.slug || newPage.value.name.toLowerCase().replace(/\s+/g, '-'),
    title: newPage.value.name,
    description: '',
    keywords: [],
    isHomepage: newPage.value.isHomepage,
    layout: 'default',
    sections: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  // 添加到站点
  const updatedSite = {
    ...props.site,
    pages: [...updatedPages, page]
  }
  
  emit('save', updatedSite)
  
  // 关闭弹窗并重置表单
  showAddPageModal.value = false
  newPage.value = {
    name: '',
    slug: '',
    isHomepage: false
  }
}
</script> 