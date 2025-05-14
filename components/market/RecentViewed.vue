<template>
  <div v-if="displayProducts.length > 0" class="bg-white rounded-lg shadow-sm mb-6 p-4">
    <h2 class="text-lg font-bold mb-4">最近浏览</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div 
        v-for="product in displayProducts" 
        :key="product.id" 
        class="border rounded overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="h-24 overflow-hidden bg-gray-100">
          <img 
            :src="product.images?.[0] || '/img/default-product.png'" 
            class="w-full h-full object-cover" 
            alt="产品图片" 
          />
        </div>
        <div class="p-2">
          <h3 class="text-sm font-medium text-blue-600 truncate">
            <NuxtLink :to="`/trade/product/${product.id}`" class="hover:underline">
              {{ product.name }}
            </NuxtLink>
          </h3>
          <p class="text-orange-600 text-sm font-medium mt-1">¥{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  maxCount: {
    type: Number,
    default: 6
  }
})

// 根据maxCount限制显示数量
const displayProducts = computed(() => {
  return props.products.slice(0, props.maxCount)
})
</script> 