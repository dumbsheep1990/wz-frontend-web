<template>
  <div>
    <!-- 分享按钮 -->
    <button
      class="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
      @click="showShareOptions = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span v-if="showText">{{ text }}</span>
    </button>
    
    <!-- 分享选项弹窗 -->
    <div v-if="showShareOptions" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 relative">
        <!-- 关闭按钮 -->
        <button
          class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          @click="showShareOptions = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 class="text-xl font-bold mb-4 pr-8">分享产品</h3>
        
        <!-- 产品信息预览 -->
        <div v-if="product" class="flex items-start mb-6 border-b pb-4">
          <div class="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0 mr-3">
            <img 
              :src="product.images?.[0] || '/img/default-product.png'" 
              class="w-full h-full object-cover" 
              alt="产品图片" 
            />
          </div>
          <div>
            <h4 class="font-medium text-sm mb-1">{{ product.name }}</h4>
            <p class="text-orange-600 text-sm mb-1">¥{{ product.price }}</p>
            <p class="text-gray-500 text-xs">{{ product.companyName }}</p>
          </div>
        </div>
        
        <!-- 分享选项 -->
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="platform in sharePlatforms"
            :key="platform.id"
            class="flex flex-col items-center cursor-pointer hover:opacity-80"
            @click="shareToPlat形(platform.id)"
          >
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              :style="{ backgroundColor: platform.color }"
            >
              <i :class="['text-white text-xl', platform.icon]"></i>
            </div>
            <span class="text-xs text-gray-600">{{ platform.name }}</span>
          </div>
        </div>
        
        <!-- 复制链接区域 -->
        <div class="mt-6 pt-4 border-t">
          <div class="flex items-center">
            <input 
              ref="linkInput"
              type="text" 
              :value="shareLink" 
              readonly
              class="flex-grow px-3 py-2 border rounded-l text-sm bg-gray-50"
            />
            <button 
              class="bg-blue-500 text-white px-3 py-2 rounded-r text-sm"
              @click="copyLink"
            >
              {{ copySuccess ? '已复制' : '复制链接' }}
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2">您也可以复制链接分享给朋友</p>
        </div>
        
        <!-- 生成二维码 -->
        <div v-if="enableQrCode" class="mt-4 pt-4 border-t flex items-center justify-center">
          <div class="text-center">
            <div class="w-32 h-32 bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <!-- 这里可以接入实际的二维码生成 -->
              <span class="text-xs text-gray-500">二维码预览</span>
            </div>
            <p class="text-xs text-gray-500">扫描二维码查看产品</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  text: {
    type: String,
    default: '分享'
  },
  showText: {
    type: Boolean,
    default: true
  },
  enableQrCode: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['share'])

// 分享弹窗显示状态
const showShareOptions = ref(false)

// 复制状态
const copySuccess = ref(false)
const linkInput = ref(null)

// 组装分享链接
const shareLink = computed(() => {
  if (!props.product) return window.location.href
  return `${window.location.origin}/trade/product/${props.product.id}`
})

// 可用的分享平台
const sharePlatforms = [
  { id: 'wechat', name: '微信', icon: 'fab fa-weixin', color: '#07C160' },
  { id: 'weibo', name: '微博', icon: 'fab fa-weibo', color: '#E6162D' },
  { id: 'qq', name: 'QQ', icon: 'fab fa-qq', color: '#12B7F5' },
  { id: 'linkedin', name: '领英', icon: 'fab fa-linkedin', color: '#0077B5' },
  { id: 'facebook', name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2' },
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' },
  { id: 'email', name: '邮件', icon: 'fas fa-envelope', color: '#F56C2D' },
  { id: 'copy', name: '复制链接', icon: 'fas fa-link', color: '#718096' }
]

// 复制链接
const copyLink = () => {
  if (!linkInput.value) return
  
  linkInput.value.select()
  document.execCommand('copy')
  
  copySuccess.value = true
  setTimeout(() => {
    copySuccess.value = false
  }, 2000)
}

// 分享到特定平台
const shareToPlat形 = (platformId) => {
  // 这里可以根据平台ID实现不同的分享逻辑
  console.log(`Share to ${platformId}:`, shareLink.value)
  
  // 触发分享事件
  emit('share', {
    platform: platformId,
    url: shareLink.value,
    product: props.product
  })
  
  // 对于某些平台，可以直接打开分享链接
  switch (platformId) {
    case 'weibo':
      window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareLink.value)}&title=${encodeURIComponent(props.product?.name || '')}`)
      break
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink.value)}&text=${encodeURIComponent(props.product?.name || '')}`)
      break
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink.value)}`)
      break
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink.value)}`)
      break
    case 'email':
      window.location.href = `mailto:?subject=${encodeURIComponent(props.product?.name || '')}&body=${encodeURIComponent(shareLink.value)}`
      break
    case 'copy':
      copyLink()
      break
  }
  
  // 分享完成后关闭弹窗
  if (platformId !== 'copy') {
    showShareOptions.value = false
  }
}
</script> 