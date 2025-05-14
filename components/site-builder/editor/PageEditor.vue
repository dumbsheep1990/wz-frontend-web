<template>
  <div class="page-editor h-full flex flex-col">
    <!-- 工具栏 -->
    <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <h3 class="font-medium text-gray-800">编辑页面: {{ page.name }}</h3>
        <div class="flex border rounded overflow-hidden text-sm">
          <button 
            @click="editorMode = 'design'" 
            class="px-3 py-1"
            :class="editorMode === 'design' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          >
            设计
          </button>
          <button 
            @click="editorMode = 'preview'" 
            class="px-3 py-1"
            :class="editorMode === 'preview' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          >
            预览
          </button>
          <button 
            @click="editorMode = 'code'" 
            class="px-3 py-1"
            :class="editorMode === 'code' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          >
            代码
          </button>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button 
          @click="undo" 
          class="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
          :disabled="!canUndo"
          :class="{ 'opacity-50 cursor-not-allowed': !canUndo }"
          title="撤销"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <button 
          @click="redo" 
          class="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
          :disabled="!canRedo"
          :class="{ 'opacity-50 cursor-not-allowed': !canRedo }"
          title="重做"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <button 
          @click="savePage" 
          class="px-3 py-1.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          保存页面
        </button>
      </div>
    </div>
    
    <!-- 编辑器主体 -->
    <div class="flex-1 flex">
      <!-- 组件面板 (仅在设计模式显示) -->
      <div v-if="editorMode === 'design'" class="w-64 border-r border-gray-200 bg-white overflow-auto">
        <div class="p-3 border-b border-gray-200">
          <h4 class="font-medium text-gray-700">组件</h4>
        </div>
        
        <div class="p-3">
          <input 
            type="text"
            v-model="componentSearch"
            placeholder="搜索组件..."
            class="w-full px-3 py-1.5 text-sm border rounded-md mb-3"
          />
          
          <!-- 组件分类和列表 -->
          <div v-for="category in filteredComponentCategories" :key="category.id" class="mb-4">
            <h5 
              class="font-medium text-sm text-gray-600 mb-2 cursor-pointer flex items-center"
              @click="toggleCategory(category.id)"
            >
              <svg 
                class="w-4 h-4 mr-1 transition-transform" 
                :class="expandedCategories.includes(category.id) ? 'transform rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              {{ category.name }}
            </h5>
            
            <div v-if="expandedCategories.includes(category.id)" class="pl-2">
              <div 
                v-for="component in category.components" 
                :key="component.type"
                class="p-2 mb-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-move flex items-center"
                draggable="true"
                @dragstart="dragStart($event, component)"
              >
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span class="text-sm">{{ component.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 中央编辑区域 -->
      <div class="flex-1 overflow-auto bg-gray-100 relative">
        <!-- 设计模式 -->
        <div v-if="editorMode === 'design'" class="p-4">
          <div 
            class="bg-white min-h-[500px] rounded-md shadow-sm border border-gray-200 p-4"
            @dragover.prevent
            @drop="handleDrop"
          >
            <!-- 空状态提示 -->
            <div v-if="!page.sections || page.sections.length === 0" class="flex flex-col items-center justify-center h-96 text-gray-400">
              <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-lg">将组件拖放到这里开始设计</p>
              <p class="text-sm mt-2">或者点击下方按钮添加区块</p>
              <button 
                @click="addSection('content')"
                class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                添加内容区块
              </button>
            </div>
            
            <!-- 区块列表 -->
            <div v-else>
              <div 
                v-for="(section, index) in page.sections" 
                :key="section.id"
                class="mb-6 border border-dashed border-gray-300 rounded-md p-4 relative"
                :class="{ 'border-orange-400 bg-orange-50': selectedElement?.id === section.id }"
                @click.stop="selectElement('section', section.id)"
              >
                <!-- 区块工具栏 -->
                <div class="absolute top-2 right-2 flex space-x-1 bg-white shadow-sm rounded-md border border-gray-200">
                  <button 
                    @click.stop="moveSection(index, -1)"
                    class="p-1 text-gray-500 hover:text-gray-700"
                    :disabled="index === 0"
                    :class="{ 'opacity-50 cursor-not-allowed': index === 0 }"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button 
                    @click.stop="moveSection(index, 1)"
                    class="p-1 text-gray-500 hover:text-gray-700"
                    :disabled="index === page.sections.length - 1"
                    :class="{ 'opacity-50 cursor-not-allowed': index === page.sections.length - 1 }"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button @click.stop="deleteSection(section.id)" class="p-1 text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- 区块标题 -->
                <div class="mb-3 flex items-center">
                  <h4 class="font-medium text-gray-700">{{ section.title }}</h4>
                  <span class="ml-2 px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">{{ section.type }}</span>
                </div>
                
                <!-- 组件放置区域 -->
                <div 
                  class="min-h-[100px] border border-dashed border-gray-200 rounded-md p-2"
                  @dragover.prevent
                  @drop="e => handleComponentDrop(e, section.id)"
                >
                  <!-- 组件列表 -->
                  <div v-if="section.components && section.components.length > 0">
                    <div 
                      v-for="component in section.components" 
                      :key="component.id"
                      class="p-3 mb-2 border border-gray-200 rounded-md bg-white relative"
                      :class="{ 'border-blue-400 ring-1 ring-blue-200': selectedElement?.id === component.id }"
                      @click.stop="selectElement('component', component.id)"
                    >
                      <!-- 组件工具栏 -->
                      <div class="absolute top-1 right-1 flex bg-white rounded-md shadow-sm border border-gray-100">
                        <button @click.stop="deleteComponent(section.id, component.id)" class="p-1 text-red-500 hover:text-red-700">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <!-- 组件内容 -->
                      <div class="flex items-center text-sm">
                        <span class="text-gray-500 mr-2">{{ component.type }}:</span>
                        <span>{{ component.name }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 空组件提示 -->
                  <div v-else class="flex flex-col items-center justify-center h-24 text-gray-400 text-sm">
                    <p>将组件拖放到这里</p>
                  </div>
                </div>
              </div>
              
              <!-- 添加区块按钮 -->
              <button 
                @click="addSection('content')"
                class="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                添加新区块
              </button>
            </div>
          </div>
        </div>
        
        <!-- 预览模式 -->
        <div v-else-if="editorMode === 'preview'" class="p-4">
          <div class="bg-white min-h-[500px] rounded-md shadow-sm border border-gray-200 p-4">
            <h1 class="text-2xl font-bold mb-4">{{ page.title }}</h1>
            
            <!-- 预览内容 -->
            <div v-for="section in page.sections" :key="section.id" class="mb-6">
              <h2 class="text-xl font-semibold mb-3">{{ section.title }}</h2>
              
              <div v-for="component in section.components" :key="component.id" class="mb-4">
                <!-- 根据组件类型渲染不同的预览 -->
                <div v-if="component.type === 'text'" class="prose">
                  <p>{{ component.content?.text || '文本内容示例' }}</p>
                </div>
                
                <div v-else-if="component.type === 'image'" class="border bg-gray-50 p-2 text-center rounded-md">
                  <p class="text-gray-500">[图片]: {{ component.content?.alt || '示例图片' }}</p>
                </div>
                
                <div v-else-if="component.type === 'button'" class="inline-block">
                  <button class="px-4 py-2 bg-orange-500 text-white rounded-md">
                    {{ component.content?.text || '按钮' }}
                  </button>
                </div>
                
                <div v-else class="border p-2 rounded-md">
                  <p class="text-gray-500">[{{ component.type }}]: {{ component.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 代码模式 -->
        <div v-else class="p-4">
          <div class="bg-gray-800 text-gray-200 p-4 rounded-md shadow-sm overflow-auto h-[600px]">
            <pre class="text-sm font-mono">{{ JSON.stringify(page, null, 2) }}</pre>
          </div>
        </div>
      </div>
      
      <!-- 属性面板 (仅在设计模式显示) -->
      <div v-if="editorMode === 'design'" class="w-80 border-l border-gray-200 bg-white overflow-auto">
        <div class="p-3 border-b border-gray-200">
          <h4 class="font-medium text-gray-700">属性</h4>
        </div>
        
        <div class="p-4">
          <!-- 页面属性 -->
          <div v-if="!selectedElement">
            <h5 class="font-medium text-sm text-gray-600 mb-3">页面设置</h5>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">页面标题</label>
              <input 
                v-model="page.title"
                type="text"
                class="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">页面描述</label>
              <textarea 
                v-model="page.description"
                rows="3"
                class="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">关键词</label>
              <input 
                type="text"
                placeholder="用逗号分隔多个关键词"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateKeywords"
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">页面布局</label>
              <select v-model="page.layout" class="w-full px-3 py-2 border rounded-md">
                <option value="default">默认布局</option>
                <option value="full-width">全宽布局</option>
                <option value="sidebar">侧边栏布局</option>
              </select>
            </div>
          </div>
          
          <!-- 区块属性 -->
          <div v-else-if="selectedElement.type === 'section'" class="space-y-4">
            <h5 class="font-medium text-sm text-gray-600 mb-3">区块设置</h5>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">区块标题</label>
              <input 
                v-model="selectedSection.title"
                type="text"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateSectionTitle"
              />
            </div>
            
            <!-- 更多区块属性... -->
          </div>
          
          <!-- 组件属性 -->
          <div v-else-if="selectedElement.type === 'component'" class="space-y-4">
            <h5 class="font-medium text-sm text-gray-600 mb-3">组件设置</h5>
            
            <div class="mb-4">
              <label class="block text-sm text-gray-600 mb-1">组件名称</label>
              <input 
                v-model="selectedComponent.name"
                type="text"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateComponentName"
              />
            </div>
            
            <!-- 根据组件类型显示不同的属性编辑器 -->
            <div v-if="selectedComponent.type === 'text'">
              <label class="block text-sm text-gray-600 mb-1">文本内容</label>
              <textarea 
                v-model="selectedComponent.content.text"
                rows="4"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateComponentContent"
              ></textarea>
            </div>
            
            <div v-else-if="selectedComponent.type === 'image'">
              <label class="block text-sm text-gray-600 mb-1">图片地址</label>
              <input 
                v-model="selectedComponent.content.src"
                type="text"
                class="w-full px-3 py-2 border rounded-md mb-2"
                @input="updateComponentContent"
              />
              
              <label class="block text-sm text-gray-600 mb-1">图片描述</label>
              <input 
                v-model="selectedComponent.content.alt"
                type="text"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateComponentContent"
              />
            </div>
            
            <div v-else-if="selectedComponent.type === 'button'">
              <label class="block text-sm text-gray-600 mb-1">按钮文本</label>
              <input 
                v-model="selectedComponent.content.text"
                type="text"
                class="w-full px-3 py-2 border rounded-md mb-2"
                @input="updateComponentContent"
              />
              
              <label class="block text-sm text-gray-600 mb-1">链接地址</label>
              <input 
                v-model="selectedComponent.content.link"
                type="text"
                class="w-full px-3 py-2 border rounded-md"
                @input="updateComponentContent"
              />
            </div>
            
            <!-- 通用样式设置 -->
            <div class="pt-4 border-t border-gray-200">
              <h5 class="font-medium text-sm text-gray-600 mb-3">样式设置</h5>
              
              <!-- 样式设置控件... -->
            </div>
          </div>
          
          <!-- 未选中元素时的提示 -->
          <div v-else class="text-center py-8 text-gray-500">
            <p>请选择一个元素以编辑其属性</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue';
import type { Page, Section, Component, ComponentDefinition } from '../../../types/siteBuilder';

const props = defineProps<{
  page: Page;
  canUndo: boolean;
  canRedo: boolean;
}>();

const emit = defineEmits(['update:page', 'save', 'undo', 'redo']);

// 状态
const editorMode = ref('design');
const componentSearch = ref('');
const selectedElement = ref<{
  type: 'section' | 'component';
  id: string;
} | null>(null);
const expandedCategories = ref<string[]>(['basic', 'layout', 'media']);
const draggingComponent = ref<ComponentDefinition | null>(null);

// 模拟组件分类数据
const componentCategories = [
  {
    id: 'basic',
    name: '基础组件',
    components: [
      { type: 'text', name: '文本', icon: 'text', description: '文本内容块', defaultSettings: {} },
      { type: 'heading', name: '标题', icon: 'heading', description: '标题文本', defaultSettings: {} },
      { type: 'button', name: '按钮', icon: 'button', description: '可点击的按钮', defaultSettings: {} },
      { type: 'divider', name: '分隔线', icon: 'divider', description: '水平分隔线', defaultSettings: {} }
    ]
  },
  {
    id: 'layout',
    name: '布局组件',
    components: [
      { type: 'container', name: '容器', icon: 'container', description: '内容容器', defaultSettings: {} },
      { type: 'row', name: '行', icon: 'row', description: '水平行', defaultSettings: {} },
      { type: 'column', name: '列', icon: 'column', description: '垂直列', defaultSettings: {} },
      { type: 'card', name: '卡片', icon: 'card', description: '卡片容器', defaultSettings: {} }
    ]
  },
  {
    id: 'media',
    name: '媒体组件',
    components: [
      { type: 'image', name: '图片', icon: 'image', description: '图片展示', defaultSettings: {} },
      { type: 'video', name: '视频', icon: 'video', description: '视频播放器', defaultSettings: {} },
      { type: 'carousel', name: '轮播图', icon: 'carousel', description: '图片轮播', defaultSettings: {} },
      { type: 'icon', name: '图标', icon: 'icon', description: '图标展示', defaultSettings: {} }
    ]
  },
  {
    id: 'form',
    name: '表单组件',
    components: [
      { type: 'input', name: '输入框', icon: 'input', description: '文本输入', defaultSettings: {} },
      { type: 'textarea', name: '文本域', icon: 'textarea', description: '多行文本输入', defaultSettings: {} },
      { type: 'checkbox', name: '复选框', icon: 'checkbox', description: '复选框', defaultSettings: {} },
      { type: 'radio', name: '单选框', icon: 'radio', description: '单选框', defaultSettings: {} }
    ]
  },
  {
    id: 'business',
    name: '业务组件',
    components: [
      { type: 'product-card', name: '产品卡片', icon: 'product', description: '产品展示卡片', defaultSettings: {} },
      { type: 'price-table', name: '价格表', icon: 'price', description: '价格对比表', defaultSettings: {} },
      { type: 'team-member', name: '团队成员', icon: 'team', description: '团队成员展示', defaultSettings: {} },
      { type: 'testimonial', name: '客户评价', icon: 'testimonial', description: '客户评价展示', defaultSettings: {} }
    ]
  }
];

// 根据搜索过滤组件
const filteredComponentCategories = computed(() => {
  if (!componentSearch.value) {
    return componentCategories;
  }
  
  const search = componentSearch.value.toLowerCase();
  return componentCategories.map(category => {
    return {
      ...category,
      components: category.components.filter(comp => 
        comp.name.toLowerCase().includes(search) || 
        comp.type.toLowerCase().includes(search) ||
        comp.description.toLowerCase().includes(search)
      )
    };
  }).filter(category => category.components.length > 0);
});

// 获取选中的区块
const selectedSection = computed(() => {
  if (!selectedElement.value || selectedElement.value.type !== 'section' || !props.page.sections) {
    return null;
  }
  
  return props.page.sections.find(s => s.id === selectedElement.value?.id) || null;
});

// 获取选中的组件
const selectedComponent = computed(() => {
  if (!selectedElement.value || selectedElement.value.type !== 'component' || !props.page.sections) {
    return null;
  }
  
  // 查找组件
  for (const section of props.page.sections) {
    const component = section.components.find(c => c.id === selectedElement.value?.id);
    if (component) {
      return component;
    }
  }
  
  return null;
});

// 切换组件分类的展开状态
const toggleCategory = (categoryId: string) => {
  if (expandedCategories.value.includes(categoryId)) {
    expandedCategories.value = expandedCategories.value.filter(id => id !== categoryId);
  } else {
    expandedCategories.value.push(categoryId);
  }
};

// 开始拖拽组件
const dragStart = (event: DragEvent, component: ComponentDefinition) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('componentType', component.type);
    draggingComponent.value = component;
  }
};

// 处理拖拽放置
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  if (!draggingComponent.value) return;
  
  // 创建新区块并添加组件
  addSection('content', '新内容区块', draggingComponent.value);
  draggingComponent.value = null;
};

// 处理组件拖拽到区块
const handleComponentDrop = (event: DragEvent, sectionId: string) => {
  event.preventDefault();
  if (!draggingComponent.value) return;
  
  // 添加组件到区块
  addComponent(sectionId, draggingComponent.value);
  draggingComponent.value = null;
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// 添加区块
const addSection = (type: string, title: string = '新区块', component?: ComponentDefinition) => {
  const updatedPage = { ...props.page };
  
  // 创建新区块
  const newSection: Section = {
    id: generateId(),
    type,
    title: title || `${type} 区块`,
    components: [],
    settings: {},
    style: {}
  };
  
  // 如果提供了组件，添加到区块
  if (component) {
    const newComponent: Component = {
      id: generateId(),
      type: component.type,
      name: component.name,
      settings: { ...component.defaultSettings },
      content: {},
      style: {}
    };
    
    newSection.components.push(newComponent);
  }
  
  // 添加区块到页面
  if (!updatedPage.sections) {
    updatedPage.sections = [];
  }
  
  updatedPage.sections.push(newSection);
  
  // 更新页面
  emit('update:page', updatedPage);
  
  // 选中新添加的区块
  selectedElement.value = { type: 'section', id: newSection.id };
  
  return newSection.id;
};

// 删除区块
const deleteSection = (sectionId: string) => {
  const updatedPage = { ...props.page };
  
  // 找到区块索引
  const sectionIndex = updatedPage.sections.findIndex(s => s.id === sectionId);
  if (sectionIndex === -1) return;
  
  // 删除区块
  updatedPage.sections.splice(sectionIndex, 1);
  
  // 清除选中元素
  if (selectedElement.value && selectedElement.value.type === 'section' && selectedElement.value.id === sectionId) {
    selectedElement.value = null;
  }
  
  // 更新页面
  emit('update:page', updatedPage);
};

// 移动区块
const moveSection = (index: number, direction: number) => {
  const updatedPage = { ...props.page };
  
  // 计算新位置
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= updatedPage.sections.length) return;
  
  // 交换位置
  const temp = updatedPage.sections[index];
  updatedPage.sections[index] = updatedPage.sections[newIndex];
  updatedPage.sections[newIndex] = temp;
  
  // 更新页面
  emit('update:page', updatedPage);
};

// 添加组件
const addComponent = (sectionId: string, componentDef: ComponentDefinition) => {
  const updatedPage = { ...props.page };
  
  // 找到区块
  const section = updatedPage.sections.find(s => s.id === sectionId);
  if (!section) return;
  
  // 创建新组件
  const newComponent: Component = {
    id: generateId(),
    type: componentDef.type,
    name: componentDef.name,
    settings: { ...componentDef.defaultSettings },
    content: {},
    style: {}
  };
  
  // 添加组件到区块
  section.components.push(newComponent);
  
  // 更新页面
  emit('update:page', updatedPage);
  
  // 选中新添加的组件
  selectedElement.value = { type: 'component', id: newComponent.id };
  
  return newComponent.id;
};

// 删除组件
const deleteComponent = (sectionId: string, componentId: string) => {
  const updatedPage = { ...props.page };
  
  // 找到区块
  const section = updatedPage.sections.find(s => s.id === sectionId);
  if (!section) return;
  
  // 找到组件索引
  const componentIndex = section.components.findIndex(c => c.id === componentId);
  if (componentIndex === -1) return;
  
  // 删除组件
  section.components.splice(componentIndex, 1);
  
  // 清除选中元素
  if (selectedElement.value && selectedElement.value.type === 'component' && selectedElement.value.id === componentId) {
    selectedElement.value = { type: 'section', id: sectionId };
  }
  
  // 更新页面
  emit('update:page', updatedPage);
};

// 选择元素
const selectElement = (type: 'section' | 'component', id: string) => {
  if (selectedElement.value && selectedElement.value.type === type && selectedElement.value.id === id) {
    selectedElement.value = null;
  } else {
    selectedElement.value = { type, id };
  }
};

// 更新区块标题
const updateSectionTitle = () => {
  if (!selectedSection.value) return;
  
  const updatedPage = { ...props.page };
  
  // 找到区块
  const section = updatedPage.sections.find(s => s.id === selectedElement.value?.id);
  if (!section) return;
  
  // 更新标题
  section.title = selectedSection.value.title;
  
  // 更新页面
  emit('update:page', updatedPage);
};

// 更新组件名称
const updateComponentName = () => {
  if (!selectedComponent.value) return;
  
  const updatedPage = { ...props.page };
  
  // 遍历所有区块
  for (const section of updatedPage.sections) {
    // 找到组件
    const component = section.components.find(c => c.id === selectedElement.value?.id);
    if (component) {
      // 更新名称
      component.name = selectedComponent.value.name;
      
      // 更新页面
      emit('update:page', updatedPage);
      
      break;
    }
  }
};

// 更新组件内容
const updateComponentContent = () => {
  if (!selectedComponent.value) return;
  
  const updatedPage = { ...props.page };
  
  // 遍历所有区块
  for (const section of updatedPage.sections) {
    // 找到组件
    const component = section.components.find(c => c.id === selectedElement.value?.id);
    if (component) {
      // 更新内容
      component.content = { ...selectedComponent.value.content };
      
      // 更新页面
      emit('update:page', updatedPage);
      
      break;
    }
  }
};

// 更新页面关键词
const updateKeywords = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  
  // 分割关键词
  const keywords = value.split(',').map(k => k.trim()).filter(k => k);
  
  // 更新页面
  const updatedPage = { ...props.page, keywords };
  emit('update:page', updatedPage);
};

// 保存页面
const savePage = () => {
  emit('save', props.page);
};

// 撤销
const undo = () => {
  emit('undo');
};

// 重做
const redo = () => {
  emit('redo');
};
</script> 