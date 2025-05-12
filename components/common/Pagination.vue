<template>
  <div class="flex justify-center items-center space-x-2">
    <button 
      @click="handlePageChange(currentPage - 1)" 
      :disabled="currentPage <= 1"
      class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      上一页
    </button>
    
    <!-- 页码显示 -->
    <template v-if="totalPages <= maxPageButtons">
      <div 
        v-for="page in totalPages" 
        :key="page" 
        class="w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        :class="currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </div>
    </template>
    
    <!-- 超过最大显示数量时的页码显示 -->
    <template v-else>
      <!-- 第一页 -->
      <div 
        v-if="showFirstButton"
        class="w-10 h-10 flex items-center justify-center rounded cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-blue-600 text-white': currentPage === 1 }"
        @click="handlePageChange(1)"
      >
        1
      </div>
      
      <!-- 左省略号 -->
      <div v-if="showLeftEllipsis" class="w-10 h-10 flex items-center justify-center">
        ...
      </div>
      
      <!-- 中间页码 -->
      <div 
        v-for="page in middlePages" 
        :key="page" 
        class="w-10 h-10 flex items-center justify-center rounded cursor-pointer"
        :class="currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </div>
      
      <!-- 右省略号 -->
      <div v-if="showRightEllipsis" class="w-10 h-10 flex items-center justify-center">
        ...
      </div>
      
      <!-- 最后一页 -->
      <div 
        v-if="showLastButton"
        class="w-10 h-10 flex items-center justify-center rounded cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-blue-600 text-white': currentPage === totalPages }"
        @click="handlePageChange(totalPages)"
      >
        {{ totalPages }}
      </div>
    </template>
    
    <button 
      @click="handlePageChange(currentPage + 1)" 
      :disabled="currentPage >= totalPages"
      class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      下一页
    </button>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

// 定义props
const props = defineProps({
  // 当前页码
  currentPage: {
    type: Number,
    required: true
  },
  // 总页数
  totalPages: {
    type: Number,
    required: true
  },
  // 最大显示按钮数
  maxPageButtons: {
    type: Number,
    default: 5
  }
})

// 定义事件
const emit = defineEmits(['page-change'])

// 页面改变处理
const handlePageChange = (page) => {
  if (page < 1 || page > props.totalPages) return
  emit('page-change', page)
}

// 计算中间显示的页码
const middlePages = computed(() => {
  if (props.totalPages <= props.maxPageButtons) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }
  
  // 计算左右偏移量
  const offset = Math.floor(props.maxPageButtons / 2)
  
  // 计算中间页码的起始和结束
  let start = props.currentPage - offset
  let end = props.currentPage + offset
  
  // 处理边界情况
  if (start < 1) {
    end = Math.min(props.totalPages - 1, end + (1 - start))
    start = 1
  }
  
  if (end > props.totalPages) {
    start = Math.max(2, start - (end - props.totalPages))
    end = props.totalPages
  }
  
  // 确保不包含第一页和最后一页
  if (start === 1) start = 2
  if (end === props.totalPages) end = props.totalPages - 1
  
  // 生成中间页码数组
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 是否显示第一页按钮
const showFirstButton = computed(() => props.totalPages > props.maxPageButtons)

// 是否显示最后一页按钮
const showLastButton = computed(() => props.totalPages > props.maxPageButtons)

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  if (props.totalPages <= props.maxPageButtons) return false
  return middlePages.value.length > 0 && middlePages.value[0] > 2
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  if (props.totalPages <= props.maxPageButtons) return false
  return middlePages.value.length > 0 && middlePages.value[middlePages.value.length - 1] < props.totalPages - 1
})
</script> 