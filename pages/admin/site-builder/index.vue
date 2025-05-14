<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-orange-600">万知市场 | 站点构建器</h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
              <span>我的站点</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">张三</span>
            <div class="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              <img src="/img/avatar.jpg" alt="头像" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="container mx-auto py-8 px-4">
      <!-- 站点列表页 -->
      <div v-if="!selectedSite">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">我的站点</h2>
          <button 
            @click="showCreateSiteModal = true"
            class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            创建新站点
          </button>
        </div>

        <!-- 过滤和搜索 -->
        <div class="flex justify-between mb-6">
          <div class="flex space-x-2">
            <button 
              v-for="filter in statusFilters" 
              :key="filter.value"
              @click="currentFilter = filter.value"
              class="px-3 py-1 text-sm rounded-md"
              :class="currentFilter === filter.value ? 'bg-orange-100 text-orange-600' : 'bg-white text-gray-600 hover:bg-gray-100'"
            >
              {{ filter.label }}
            </button>
          </div>
          <div class="relative">
            <input 
              type="text"
              v-model="searchQuery"
              placeholder="搜索站点..."
              class="px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- 站点列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="site in filteredSites" 
            :key="site.id"
            class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div class="h-40 bg-gray-100 relative">
              <img 
                :src="site.thumbnail || '/img/default-site.jpg'" 
                alt="站点预览图" 
                class="w-full h-full object-cover"
              />
              <div 
                class="absolute top-2 right-2 px-2 py-1 text-xs rounded-md"
                :class="{
                  'bg-green-100 text-green-800': site.status === 'published',
                  'bg-yellow-100 text-yellow-800': site.status === 'draft',
                  'bg-gray-100 text-gray-800': site.status === 'archived'
                }"
              >
                {{ getStatusLabel(site.status) }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ site.name }}</h3>
              <p class="text-sm text-gray-500 mb-3">{{ site.description }}</p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span>更新于: {{ formatDate(site.updatedAt) }}</span>
                <span class="mx-2">•</span>
                <span>{{ site.pages.length }}个页面</span>
              </div>
              <div class="flex space-x-2">
                <button 
                  @click="editSite(site)"
                  class="flex-1 px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
                >
                  编辑
                </button>
                <button 
                  @click="previewSite(site)"
                  class="flex-1 px-3 py-1.5 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  预览
                </button>
                <button 
                  @click="showSiteMenu(site)"
                  class="px-2 py-1.5 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 添加新站点卡片 -->
          <div 
            @click="showCreateSiteModal = true"
            class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-dashed border-gray-300 flex flex-col items-center justify-center h-full cursor-pointer"
          >
            <div class="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-800 mb-1">创建新站点</h3>
            <p class="text-sm text-gray-500">开始建设你的自定义站点</p>
          </div>
        </div>
      </div>

      <!-- 站点编辑器界面（当选中站点时显示） -->
      <div v-else>
        <SiteEditorPanel 
          :site="selectedSite" 
          @back="selectedSite = null"
          @save="saveSite"
        />
      </div>
    </main>

    <!-- 创建新站点弹窗 -->
    <div v-if="showCreateSiteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">创建新站点</h2>
          <button @click="showCreateSiteModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="createSite">
          <div class="mb-4">
            <label for="site-name" class="block text-sm font-medium text-gray-700 mb-1">站点名称</label>
            <input 
              id="site-name"
              v-model="newSite.name"
              type="text" 
              required
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="输入站点名称"
            />
          </div>
          
          <div class="mb-4">
            <label for="site-desc" class="block text-sm font-medium text-gray-700 mb-1">站点描述</label>
            <textarea 
              id="site-desc"
              v-model="newSite.description"
              rows="3"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="简要描述站点内容和用途"
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">选择模板</label>
            <div class="grid grid-cols-3 gap-3">
              <div 
                v-for="template in siteTemplates" 
                :key="template.id"
                @click="newSite.templateId = template.id"
                class="border rounded-md overflow-hidden cursor-pointer"
                :class="newSite.templateId === template.id ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'"
              >
                <img :src="template.thumbnail" alt="模板预览" class="w-full h-20 object-cover" />
                <div class="p-2 text-xs text-center">{{ template.name }}</div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              @click="showCreateSiteModal = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              创建
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Site, SiteTemplate } from '../../../types/siteBuilder'

// 模拟站点数据
const mockSites: Site[] = [
  {
    id: '1',
    name: '绍兴市天宏钢贸官网',
    description: '专业钢铁产品供应商，提供多种型号钢材',
    domain: 'tianhong.wanzhimarket.com',
    logo: '/img/logo1.png',
    favicon: '/img/favicon1.ico',
    tenantId: '101',
    theme: {
      primaryColor: '#FF5722',
      secondaryColor: '#2196F3',
      accentColor: '#4CAF50',
      textColor: '#333333',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      headerStyle: 'standard',
      borderRadius: 'medium',
      customCSS: ''
    },
    pages: [
      { id: '1-1', name: '首页', slug: 'home', title: '首页', description: '', keywords: [], isHomepage: true, layout: 'default', sections: [], createdAt: '2023-06-01', updatedAt: '2023-08-15' },
      { id: '1-2', name: '产品中心', slug: 'products', title: '产品中心', description: '', keywords: [], isHomepage: false, layout: 'default', sections: [], createdAt: '2023-06-01', updatedAt: '2023-08-10' },
      { id: '1-3', name: '关于我们', slug: 'about', title: '关于我们', description: '', keywords: [], isHomepage: false, layout: 'default', sections: [], createdAt: '2023-06-01', updatedAt: '2023-07-20' }
    ],
    navigation: {
      type: 'horizontal',
      items: [],
      style: {}
    },
    footer: {},
    createdAt: '2023-06-01',
    updatedAt: '2023-08-15',
    publishedAt: '2023-08-01',
    status: 'published',
    thumbnail: '/img/site-thumbnail1.jpg'
  },
  {
    id: '2',
    name: '钱江旅店形象站',
    description: '高品质旅店服务，让您宾至如归',
    domain: 'qianjianglvdian.wanzhimarket.com',
    logo: '/img/logo2.png',
    favicon: '/img/favicon2.ico',
    tenantId: '102',
    theme: {
      primaryColor: '#3F51B5',
      secondaryColor: '#FFC107',
      accentColor: '#E91E63',
      textColor: '#212121',
      backgroundColor: '#FAFAFA',
      fontFamily: 'Roboto, sans-serif',
      headerStyle: 'centered',
      borderRadius: 'small',
      customCSS: ''
    },
    pages: [
      { id: '2-1', name: '首页', slug: 'home', title: '首页', description: '', keywords: [], isHomepage: true, layout: 'default', sections: [], createdAt: '2023-07-01', updatedAt: '2023-08-05' },
      { id: '2-2', name: '客房预订', slug: 'booking', title: '客房预订', description: '', keywords: [], isHomepage: false, layout: 'default', sections: [], createdAt: '2023-07-01', updatedAt: '2023-08-01' }
    ],
    navigation: {
      type: 'horizontal',
      items: [],
      style: {}
    },
    footer: {},
    createdAt: '2023-07-01',
    updatedAt: '2023-08-05',
    publishedAt: null,
    status: 'draft',
    thumbnail: '/img/site-thumbnail2.jpg'
  }
];

// 模拟模板数据
const siteTemplates: SiteTemplate[] = [
  { id: 't1', name: '企业展示', thumbnail: '/img/template1.jpg', description: '适合企业官网使用的模板' },
  { id: 't2', name: '产品展示', thumbnail: '/img/template2.jpg', description: '重点突出产品的模板' },
  { id: 't3', name: '简约风格', thumbnail: '/img/template3.jpg', description: '简洁大方的设计风格' }
];

// 状态
const sites = ref(mockSites);
const selectedSite = ref<Site | null>(null);
const showCreateSiteModal = ref(false);
const currentFilter = ref('all');
const searchQuery = ref('');

const statusFilters = [
  { label: '全部', value: 'all' },
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
  { label: '已归档', value: 'archived' }
];

const newSite = ref({
  name: '',
  description: '',
  templateId: 't1'
});

// 筛选站点
const filteredSites = computed(() => {
  let result = sites.value;
  
  // 状态筛选
  if (currentFilter.value !== 'all') {
    result = result.filter(site => site.status === currentFilter.value);
  }
  
  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(site => 
      site.name.toLowerCase().includes(query) || 
      site.description.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// 获取状态标签
const getStatusLabel = (status: string) => {
  const statusMap = {
    'published': '已发布',
    'draft': '草稿',
    'archived': '已归档'
  };
  return statusMap[status] || status;
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

// 编辑站点
const editSite = (site: Site) => {
  selectedSite.value = JSON.parse(JSON.stringify(site)); // 创建深拷贝
};

// 预览站点
const previewSite = (site: Site) => {
  // 在新标签页中打开预览地址
  window.open(`/preview/site/${site.id}`, '_blank');
};

// 显示站点菜单
const showSiteMenu = (site: Site) => {
  // 实现站点操作菜单逻辑
  console.log('显示站点菜单', site.id);
};

// 创建新站点
const createSite = () => {
  // 创建站点逻辑
  console.log('创建站点', newSite.value);
  
  // 模拟创建站点
  const newSiteObj: Site = {
    id: `${Date.now()}`,
    name: newSite.value.name,
    description: newSite.value.description,
    domain: '',
    logo: '',
    favicon: '',
    tenantId: '103', // 假设当前租户ID
    theme: {
      primaryColor: '#FF5722',
      secondaryColor: '#2196F3',
      accentColor: '#4CAF50',
      textColor: '#333333',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      headerStyle: 'standard',
      borderRadius: 'medium',
      customCSS: ''
    },
    pages: [
      { id: `${Date.now()}-1`, name: '首页', slug: 'home', title: '首页', description: '', keywords: [], isHomepage: true, layout: 'default', sections: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    ],
    navigation: {
      type: 'horizontal',
      items: [],
      style: {}
    },
    footer: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,
    status: 'draft',
    thumbnail: '/img/default-site.jpg'
  };
  
  // 添加到列表
  sites.value.unshift(newSiteObj);
  
  // 关闭弹窗并清空表单
  showCreateSiteModal.value = false;
  newSite.value = {
    name: '',
    description: '',
    templateId: 't1'
  };
  
  // 打开编辑器
  selectedSite.value = newSiteObj;
};

// 保存站点
const saveSite = (site: Site) => {
  // 保存站点逻辑
  console.log('保存站点', site);
  
  // 查找并更新站点
  const index = sites.value.findIndex(s => s.id === site.id);
  if (index !== -1) {
    sites.value[index] = { ...site, updatedAt: new Date().toISOString() };
  }
  
  // 关闭编辑器
  selectedSite.value = null;
};
</script> 