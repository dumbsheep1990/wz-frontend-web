<template>
  <div>
    <!-- 询价表单弹窗 -->
    <div 
      v-if="visible" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-auto py-8"
      @click.self="close"
    >
      <div class="bg-white rounded-lg w-full max-w-2xl mx-4 relative">
        <!-- 标题栏 -->
        <div class="p-4 border-b flex justify-between items-center">
          <h2 class="text-xl font-bold">产品询价</h2>
          <button 
            class="text-gray-500 hover:text-gray-700 text-2xl"
            @click="close"
          >
            ×
          </button>
        </div>
        
        <!-- 表单内容 -->
        <div class="p-6">
          <!-- 产品信息 -->
          <div v-if="product" class="mb-6 border-b pb-4">
            <div class="flex items-start">
              <div class="w-20 h-20 bg-gray-100 rounded flex-shrink-0 mr-4 overflow-hidden">
                <img 
                  :src="product.images?.[0] || '/img/default-product.png'" 
                  class="w-full h-full object-cover" 
                  alt="产品图片" 
                />
              </div>
              <div>
                <h3 class="font-medium mb-1">{{ product.name }}</h3>
                <p class="text-orange-600 font-medium mb-1">¥{{ product.price }} 元/吨</p>
                <p class="text-gray-500 text-sm">{{ product.companyName }}</p>
              </div>
            </div>
          </div>
          
          <form @submit.prevent="submitInquiry">
            <!-- 数量 -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">询价数量*</label>
              <div class="flex">
                <input 
                  v-model.number="formData.quantity" 
                  type="number" 
                  min="1" 
                  required
                  class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span class="ml-2 px-3 py-2 bg-gray-100 border rounded">吨</span>
              </div>
            </div>
            
            <!-- 联系人 -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系人*</label>
              <input 
                v-model="formData.contactName" 
                type="text" 
                required
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="请填写您的姓名"
              />
            </div>
            
            <!-- 联系电话 -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系电话*</label>
              <input 
                v-model="formData.contactPhone" 
                type="tel" 
                required
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="请填写您的联系电话"
              />
            </div>
            
            <!-- 联系邮箱 -->
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">联系邮箱</label>
              <input 
                v-model="formData.contactEmail" 
                type="email" 
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="请填写您的电子邮箱"
              />
            </div>
            
            <!-- 留言 -->
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">询价留言</label>
              <textarea 
                v-model="formData.message" 
                rows="3" 
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="请填写您的具体需求，如规格要求、交货时间等"
              ></textarea>
            </div>
            
            <!-- 提交按钮 -->
            <div>
              <button 
                type="submit" 
                class="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded transition-colors"
                :disabled="loading"
              >
                {{ loading ? '提交中...' : '提交询价' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- 表单说明 -->
        <div class="px-6 pb-6 text-sm text-gray-500">
          <p>提交询价后，供应商将尽快与您联系。请保持电话畅通。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  product: {
    type: Object,
    default: null
  },
  initialQuantity: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['close', 'submit'])

const loading = ref(false)

// 表单数据
const formData = reactive({
  productId: 0,
  quantity: props.initialQuantity,
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  message: ''
})

// 监听props变化
watch(() => props.visible, (newValue) => {
  if (newValue && props.product) {
    formData.productId = props.product.id
    formData.quantity = props.initialQuantity
  }
})

watch(() => props.initialQuantity, (newValue) => {
  formData.quantity = newValue
})

// 提交询价
const submitInquiry = async () => {
  loading.value = true
  
  try {
    // 在这里可以添加表单验证逻辑
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 发送提交事件
    emit('submit', { ...formData })
    
    // 关闭表单
    close()
    
    // 重置表单
    resetForm()
  } catch (error) {
    console.error('提交询价失败:', error)
    // 这里可以添加错误处理逻辑，如显示错误提示
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.quantity = props.initialQuantity
  formData.contactName = ''
  formData.contactPhone = ''
  formData.contactEmail = ''
  formData.message = ''
}

// 关闭表单
const close = () => {
  emit('close')
}
</script> 