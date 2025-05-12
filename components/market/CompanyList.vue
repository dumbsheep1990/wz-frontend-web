<template>
  <div class="bg-white rounded-lg shadow-sm mb-6">
    <div v-if="companies.length > 0">
      <div 
        v-for="company in companies" 
        :key="company.id" 
        class="border-b border-gray-200 p-4 hover:bg-gray-50"
        @click="handleItemClick(company.id)"
      >
        <div class="flex flex-col md:flex-row md:items-center">
          <!-- 公司信息 -->
          <div class="md:flex-grow mb-4 md:mb-0">
            <div class="flex items-start">
              <div class="mr-4">
                <img 
                  :src="company.logo || '/img/default-company.png'" 
                  class="w-20 h-20 object-cover border border-gray-200 rounded" 
                  alt="公司logo" 
                />
              </div>
              <div>
                <h3 class="text-lg font-bold text-blue-600 mb-1">
                  <NuxtLink :to="`/market/${company.id}`" class="hover:underline">
                    {{ company.name }}
                  </NuxtLink>
                </h3>
                <p class="text-gray-600 mb-1">{{ company.address }}</p>
                <p class="text-gray-600 mb-1">成立时间：{{ company.establishTime }}</p>
                <p class="text-gray-600">营业额：{{ company.revenue }}</p>
              </div>
            </div>
          </div>
          
          <!-- 公司联系信息 -->
          <div class="flex flex-col space-y-2 md:w-48">
            <div class="text-sm">
              <span class="text-gray-500">行业类型：</span>
              <span>{{ company.industryType }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">分类：</span>
              <span>{{ company.category }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">浏览量：</span>
              <span>{{ company.views }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">点赞：</span>
              <span>{{ company.likes }}</span>
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
  // 企业列表
  companies: {
    type: Array,
    required: true,
    default: () => []
  },
  // 空数据时显示的文本
  emptyText: {
    type: String,
    default: '暂无符合条件的企业信息'
  }
})

// 定义事件
const emit = defineEmits(['item-click'])

// 点击列表项
const handleItemClick = (id) => {
  emit('item-click', id)
}
</script> 