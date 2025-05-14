<template>
  <div>
    <!-- 产品对比浮动栏 -->
    <div 
      v-if="compareCount > 0" 
      class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-40"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- 对比栏标题 -->
          <div class="flex items-center">
            <h3 class="font-bold mr-2">产品对比</h3>
            <span class="text-sm text-gray-500">已选择 {{ compareCount }}/{{ maxCompareCount }} 项</span>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-3">
            <button 
              class="text-gray-500 hover:text-gray-700 text-sm"
              @click="clearCompareList"
            >
              清空
            </button>
            <button 
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm transition-colors"
              :disabled="compareCount < 2"
              :class="{'opacity-50 cursor-not-allowed': compareCount < 2}"
              @click="openCompareView"
            >
              开始对比
            </button>
          </div>
        </div>
        
        <!-- 产品列表 -->
        <div class="flex mt-3 space-x-4">
          <div 
            v-for="(product, index) in compareList" 
            :key="product.id" 
            class="w-1/4 border rounded p-2 bg-white relative"
          >
            <button 
              class="absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center hover:bg-gray-300"
              @click="removeFromCompare(product.id)"
            >
              ×
            </button>
            <div class="flex items-center">
              <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3 flex-shrink-0">
                <img 
                  :src="product.images?.[0] || '/img/default-product.png'" 
                  class="w-full h-full object-cover" 
                  alt="产品图片" 
                />
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-medium truncate">{{ product.name }}</h4>
                <p class="text-orange-600 text-sm mt-1">¥{{ product.price }}</p>
              </div>
            </div>
          </div>
          
          <!-- 空白位置 -->
          <div 
            v-for="i in emptySlots" 
            :key="`empty-${i}`" 
            class="w-1/4 border rounded p-2 bg-gray-50 flex items-center justify-center"
          >
            <div class="text-gray-400 text-sm">请添加产品</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 产品对比弹窗 -->
    <div 
      v-if="showCompareView" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto py-8"
    >
      <div class="bg-white rounded-lg shadow-lg max-w-6xl w-full mx-4 relative">
        <!-- 标题栏 -->
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-xl font-bold">产品对比</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 text-2xl"
            @click="showCompareView = false"
          >
            ×
          </button>
        </div>
        
        <!-- 对比表格 -->
        <div class="p-6 overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="p-3 border bg-gray-50 text-left w-1/5">属性</th>
                <th 
                  v-for="product in compareList" 
                  :key="`head-${product.id}`" 
                  class="p-3 border bg-gray-50 text-center"
                >
                  <div class="flex flex-col items-center">
                    <div class="w-20 h-20 bg-gray-100 rounded overflow-hidden mb-2 mx-auto">
                      <img 
                        :src="product.images?.[0] || '/img/default-product.png'" 
                        class="w-full h-full object-cover" 
                        alt="产品图片" 
                      />
                    </div>
                    <div class="font-medium">{{ product.name }}</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- 价格 -->
              <tr>
                <td class="p-3 border font-medium">价格</td>
                <td 
                  v-for="product in compareList" 
                  :key="`price-${product.id}`" 
                  class="p-3 border text-center text-orange-600 font-medium"
                >
                  ¥{{ product.price }}
                </td>
              </tr>
              
              <!-- 规格 -->
              <tr>
                <td class="p-3 border font-medium">规格</td>
                <td 
                  v-for="product in compareList" 
                  :key="`spec-${product.id}`" 
                  class="p-3 border text-center"
                >
                  {{ product.specification || '暂无' }}
                </td>
              </tr>
              
              <!-- 材质 -->
              <tr>
                <td class="p-3 border font-medium">材质</td>
                <td 
                  v-for="product in compareList" 
                  :key="`material-${product.id}`" 
                  class="p-3 border text-center"
                >
                  {{ product.material || '暂无' }}
                </td>
              </tr>
              
              <!-- 库存 -->
              <tr>
                <td class="p-3 border font-medium">库存</td>
                <td 
                  v-for="product in compareList" 
                  :key="`stock-${product.id}`" 
                  class="p-3 border text-center"
                >
                  {{ product.stock }} 吨
                </td>
              </tr>
              
              <!-- 最小订购量 -->
              <tr>
                <td class="p-3 border font-medium">最小订购量</td>
                <td 
                  v-for="product in compareList" 
                  :key="`minOrder-${product.id}`" 
                  class="p-3 border text-center"
                >
                  {{ product.minOrder || 1 }} 吨
                </td>
              </tr>
              
              <!-- 企业 -->
              <tr>
                <td class="p-3 border font-medium">所属企业</td>
                <td 
                  v-for="product in compareList" 
                  :key="`company-${product.id}`" 
                  class="p-3 border text-center"
                >
                  <a :href="`/market/${product.companyId}`" class="text-blue-500 hover:underline">
                    {{ product.companyName }}
                  </a>
                </td>
              </tr>
              
              <!-- 销量 -->
              <tr>
                <td class="p-3 border font-medium">销量</td>
                <td 
                  v-for="product in compareList" 
                  :key="`sales-${product.id}`" 
                  class="p-3 border text-center"
                >
                  {{ product.sales }} 吨
                </td>
              </tr>
              
              <!-- 操作 -->
              <tr>
                <td class="p-3 border font-medium">操作</td>
                <td 
                  v-for="product in compareList" 
                  :key="`action-${product.id}`" 
                  class="p-3 border text-center"
                >
                  <div class="flex flex-col space-y-2 items-center">
                    <a :href="`/trade/product/${product.id}`" class="text-blue-500 hover:underline">
                      查看详情
                    </a>
                    <button 
                      class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      @click="addToCart(product)"
                    >
                      加入购物车
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCompare } from '../../composables/useCompare'
import { useCart } from '../../composables/useCart'

const props = defineProps({
  // 可以添加需要的props
})

// 对比功能
const { 
  compareList, 
  compareCount, 
  maxCompareCount, 
  removeFromCompare, 
  clearCompareList 
} = useCompare()

// 购物车功能
const { addToCart } = useCart()

// 空槽数量
const emptySlots = computed(() => {
  return Math.max(0, maxCompareCount - compareCount.value)
})

// 对比视图显示状态
const showCompareView = ref(false)

// 打开对比视图
const openCompareView = () => {
  if (compareCount.value >= 2) {
    showCompareView.value = true
  }
}
</script> 