<template>
  <div class="bg-white rounded-lg shadow-sm mb-6">
    <div class="p-4 border-b">
      <h2 class="text-lg font-bold">{{ title }}</h2>
    </div>
    
    <div v-if="products.length > 0" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          v-for="product in displayProducts" 
          :key="product.id" 
          class="flex border rounded p-2 hover:shadow-md transition-shadow"
        >
          <div class="w-20 h-20 flex-shrink-0 overflow-hidden bg-gray-100 mr-3">
            <img 
              :src="product.images?.[0] || '/img/default-product.png'" 
              class="w-full h-full object-cover" 
              alt="产品图片" 
            />
          </div>
          <div class="flex-grow min-w-0">
            <h3 class="text-sm font-medium text-blue-600 truncate">
              <NuxtLink :to="`/trade/product/${product.id}`" class="hover:underline">
                {{ product.name }}
              </NuxtLink>
            </h3>
            <p class="text-orange-600 text-sm font-medium mt-1">¥{{ product.price }}</p>
            <p class="text-gray-500 text-xs truncate mt-1">{{ product.companyName }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 无数据 -->
    <div v-else class="p-4 text-center text-gray-500">
      暂无推荐产品
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '为您推荐'
  },
  products: {
    type: Array,
    default: () => []
  },
  maxCount: {
    type: Number,
    default: 4
  }
})

// 根据maxCount限制显示数量
const displayProducts = computed(() => {
  return props.products.slice(0, props.maxCount)
})
</script> 