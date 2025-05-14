<template>
  <div class="site-preview">
    <iframe
      v-if="site"
      :src="`/api/site-builder/preview/${site.id}`"
      class="w-full h-full border-0"
      ref="previewFrame"
    ></iframe>
    
    <!-- 加载中状态 -->
    <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-orange-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">加载预览...</p>
      </div>
    </div>
    
    <!-- 预览控制器 -->
    <div class="preview-controls fixed top-4 right-4 bg-white rounded-md shadow-md border border-gray-200 p-2 flex items-center space-x-2">
      <!-- 设备选择器 -->
      <div class="flex border rounded overflow-hidden">
        <button 
          @click="setDevice('desktop')" 
          class="p-1.5"
          :class="currentDevice === 'desktop' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          title="桌面版"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          @click="setDevice('tablet')" 
          class="p-1.5"
          :class="currentDevice === 'tablet' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          title="平板版"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          @click="setDevice('mobile')" 
          class="p-1.5"
          :class="currentDevice === 'mobile' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'"
          title="手机版"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      <!-- 刷新按钮 -->
      <button 
        @click="refreshPreview" 
        class="p-1.5 text-gray-700 hover:bg-gray-100 rounded"
        title="刷新预览"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      
      <!-- 在新窗口打开按钮 -->
      <button 
        @click="openInNewWindow" 
        class="p-1.5 text-gray-700 hover:bg-gray-100 rounded"
        title="在新窗口打开"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import type { Site } from '../../../types/siteBuilder';

const props = defineProps<{
  site: Site | null;
}>();

const previewFrame = ref<HTMLIFrameElement | null>(null);
const currentDevice = ref('desktop');

// 设备尺寸配置
const deviceSizes = {
  desktop: { width: '100%', height: '100%' },
  tablet: { width: '768px', height: '1024px' },
  mobile: { width: '375px', height: '667px' }
};

// 设置预览设备
const setDevice = (device: string) => {
  currentDevice.value = device;
  
  // 更新iframe样式
  if (previewFrame.value) {
    const size = deviceSizes[device as keyof typeof deviceSizes];
    previewFrame.value.style.width = size.width;
    previewFrame.value.style.height = size.height;
    
    // 居中显示
    if (device !== 'desktop') {
      previewFrame.value.style.margin = '0 auto';
      previewFrame.value.style.display = 'block';
    } else {
      previewFrame.value.style.margin = '0';
    }
  }
};

// 刷新预览
const refreshPreview = () => {
  if (previewFrame.value) {
    previewFrame.value.src = previewFrame.value.src;
  }
};

// 在新窗口打开
const openInNewWindow = () => {
  if (props.site) {
    window.open(`/api/site-builder/preview/${props.site.id}`, '_blank');
  }
};

// 监听站点变化，刷新预览
watch(() => props.site, (newSite) => {
  if (newSite && previewFrame.value) {
    refreshPreview();
  }
});

// 组件挂载后，设置默认设备
onMounted(() => {
  setDevice(currentDevice.value);
});
</script>

<style scoped>
.site-preview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f9f9f9;
}

.preview-controls {
  z-index: 100;
}
</style> 