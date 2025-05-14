<template>
  <div>
    <!-- 图片预览蒙层 -->
    <div 
      v-if="visible" 
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
      @click.self="close"
    >
      <div class="relative max-w-4xl max-h-screen p-4">
        <!-- 关闭按钮 -->
        <button 
          class="absolute top-0 right-0 m-4 text-white text-2xl z-10"
          @click="close"
        >
          ×
        </button>
        
        <!-- 上一张/下一张按钮 -->
        <button 
          v-if="images.length > 1" 
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
          @click="prevImage"
        >
          ←
        </button>
        <button 
          v-if="images.length > 1" 
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
          @click="nextImage"
        >
          →
        </button>
        
        <!-- 大图 -->
        <div class="flex items-center justify-center">
          <img 
            :src="currentImage" 
            class="max-w-full max-h-[80vh] object-contain"
            alt="产品图片预览" 
          />
        </div>
        
        <!-- 缩略图列表 -->
        <div v-if="images.length > 1" class="flex justify-center mt-4 space-x-2">
          <div 
            v-for="(img, index) in images" 
            :key="index"
            class="w-16 h-16 border-2 cursor-pointer"
            :class="{'border-orange-500': currentImage === img, 'border-gray-300': currentImage !== img}"
            @click="setImage(index)"
          >
            <img :src="img" class="w-full h-full object-cover" :alt="`缩略图${index + 1}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array,
    default: () => []
  },
  initialIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)
const currentImage = ref('')

// 监听props变化
watch(() => props.visible, (newValue) => {
  if (newValue && props.images.length > 0) {
    setImage(props.initialIndex)
  }
})

watch(() => props.initialIndex, (newValue) => {
  if (props.visible && props.images.length > 0) {
    setImage(newValue)
  }
})

// 设置当前图片
const setImage = (index) => {
  if (index >= 0 && index < props.images.length) {
    currentIndex.value = index
    currentImage.value = props.images[index]
  }
}

// 下一张图片
const nextImage = () => {
  const nextIndex = (currentIndex.value + 1) % props.images.length
  setImage(nextIndex)
}

// 上一张图片
const prevImage = () => {
  const prevIndex = (currentIndex.value - 1 + props.images.length) % props.images.length
  setImage(prevIndex)
}

// 关闭预览
const close = () => {
  emit('close')
}

// 初始化
if (props.visible && props.images.length > 0) {
  setImage(props.initialIndex)
}
</script> 