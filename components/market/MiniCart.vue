<template>
  <div class="relative">
    <!-- 购物车图标 -->
    <button 
      class="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      @click="toggleCart"
    >
      <span class="sr-only">购物车</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      
      <!-- 购物车数量角标 -->
      <span 
        v-if="cartItemCount > 0" 
        class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ displayCount }}
      </span>
    </button>
    
    <!-- 购物车下拉菜单 -->
    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border"
    >
      <div class="p-3 border-b">
        <h3 class="font-bold text-lg">购物车</h3>
      </div>
      
      <!-- 购物车内容 -->
      <div v-if="cartItems.length > 0" class="max-h-96 overflow-y-auto">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="p-3 border-b hover:bg-gray-50 flex"
        >
          <!-- 商品图片 -->
          <div class="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden mr-3">
            <img :src="item.image || '/img/default-product.png'" class="w-full h-full object-cover" alt="商品图片" />
          </div>
          
          <!-- 商品信息 -->
          <div class="flex-1 min-w-0 mr-3">
            <h4 class="text-sm font-medium truncate">{{ item.name }}</h4>
            <p class="text-orange-600 text-sm mt-1">¥{{ item.price }} × {{ item.quantity }}</p>
            <p class="text-gray-500 text-xs truncate mt-1">{{ item.companyName }}</p>
          </div>
          
          <!-- 删除按钮 -->
          <button 
            class="text-gray-400 hover:text-red-500"
            @click.stop="removeItem(item.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div v-else class="p-8 text-center text-gray-500">
        购物车是空的
      </div>
      
      <!-- 购物车结算 -->
      <div v-if="cartItems.length > 0" class="p-3 border-t">
        <div class="flex justify-between items-center mb-3">
          <span class="text-gray-600">合计:</span>
          <span class="text-orange-600 font-bold">¥{{ cartTotalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex space-x-2">
          <button 
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition-colors"
            @click="viewCart"
          >
            查看购物车
          </button>
          <button 
            class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors"
            @click="checkout"
          >
            去结算
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '../../composables/useCart'

const props = defineProps({
  // 这里可以添加需要的props
})

const emit = defineEmits(['view-cart', 'checkout'])

// 使用购物车composable
const { cartItems, cartItemCount, cartTotalPrice, removeCartItem } = useCart()

// 菜单是否打开
const isOpen = ref(false)

// 处理数量显示，超过99显示99+
const displayCount = computed(() => {
  return cartItemCount.value > 99 ? '99+' : cartItemCount.value
})

// 切换购物车菜单
const toggleCart = () => {
  isOpen.value = !isOpen.value
}

// 移除商品
const removeItem = (id) => {
  removeCartItem(id)
}

// 查看购物车
const viewCart = () => {
  emit('view-cart')
  isOpen.value = false
}

// 去结算
const checkout = () => {
  emit('checkout')
  isOpen.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  const target = event.target
  if (isOpen.value && !target.closest('.relative')) {
    isOpen.value = false
  }
}

// 组件挂载和卸载时添加/移除事件监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script> 