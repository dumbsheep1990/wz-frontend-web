<template>
  <div class="bg-white rounded-lg shadow-sm mb-6">
    <div v-if="products.length > 0">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="border rounded overflow-hidden hover:shadow-md transition-shadow"
          @click="handleItemClick(product.id)"
        >
          <div class="h-48 overflow-hidden bg-gray-100">
            <img 
              :src="product.images?.[0] || '/img/default-product.png'" 
              class="w-full h-full object-cover" 
              alt="产品图片" 
            />
          </div>
          <div class="p-4">
            <h3 class="font-bold text-blue-600 mb-2 truncate">
              <NuxtLink :to="`/trade/product/${product.id}`" class="hover:underline">
                {{ product.name }}
              </NuxtLink>
            </h3>
            <p class="text-orange-600 font-medium mb-2">¥{{ product.price }} 元/吨</p>
            <p class="text-gray-600 text-sm truncate">{{ product.companyName }}</p>
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>销量:{{ product.sales }}</span>
              <span>库存:{{ product.stock }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 无数据 -->
    <div v-else class="p-8 text-center">
      <p class="text-gray-500">{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义props
const props = defineProps({
  // 产品列表
  products: {
    type: Array,
    required: true,
    default: () => []
  },
  // 空数据时显示的文本
  emptyText: {
    type: String,
    default: '暂无符合条件的产品信息'
  }
})

// 定义事件
const emit = defineEmits(['item-click'])

// 点击列表项
const handleItemClick = (id) => {
  emit('item-click', id)
}
</script> 