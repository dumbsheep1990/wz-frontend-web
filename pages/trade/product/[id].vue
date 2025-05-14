<template>
  <div class="container mx-auto px-4 py-5">
    <!-- 面包屑导航 -->
    <div class="mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-500">首页</NuxtLink> / 
      <NuxtLink to="/market" class="text-gray-500 hover:text-orange-500">万知市场</NuxtLink> / 
      <span class="text-orange-500">{{ product?.name || '产品详情' }}</span>
    </div>
    
    <div v-if="product" class="bg-white rounded shadow-sm">
      <!-- 产品基本信息 -->
      <div class="flex flex-col md:flex-row mb-6 p-6">
        <!-- 产品图片 -->
        <div class="md:w-2/5 lg:w-1/3 mb-6 md:mb-0 md:pr-6">
          <div 
            class="relative bg-gray-100 rounded-lg overflow-hidden h-80 cursor-pointer"
            @click="showPreview = true"
          >
            <img 
              :src="currentImage || '/img/default-product.png'" 
              class="w-full h-full object-contain" 
              alt="产品图片" 
            />
            <div class="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
              点击查看大图
            </div>
          </div>
          
          <!-- 缩略图列表 -->
          <div v-if="product.images && product.images.length > 0" class="flex mt-4 space-x-2">
            <div 
              v-for="(img, index) in product.images" 
              :key="index"
              class="w-20 h-20 border rounded cursor-pointer hover:border-orange-500 transition-colors"
              :class="{'border-orange-500': currentImage === img, 'border-gray-200': currentImage !== img}"
              @click="currentImage = img; currentImageIndex = index"
            >
              <img :src="img" class="w-full h-full object-cover" :alt="`产品图片${index + 1}`" />
            </div>
          </div>
        </div>
        
        <!-- 产品信息 -->
        <div class="md:w-3/5 lg:w-2/3">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
          
          <div class="mb-6">
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">所属企业：</span>
              <NuxtLink :to="`/market/${product.companyId}`" class="text-blue-500 hover:underline">
                {{ product.companyName }}
              </NuxtLink>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">价格：</span>
              <span class="text-xl font-semibold text-orange-600">¥{{ product.price }}</span>
              <span class="text-gray-500 ml-1">元/吨</span>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">规格：</span>
              <span>{{ product.specification || '暂无' }}</span>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">材质：</span>
              <span>{{ product.material || '暂无' }}</span>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">库存：</span>
              <span>{{ product.stock }} 吨</span>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">最小订购量：</span>
              <span>{{ product.minOrder || 1 }} 吨</span>
            </div>
            <div class="flex items-center mb-2">
              <span class="text-gray-500 mr-2 w-24">销量：</span>
              <span>{{ product.sales }} 吨</span>
            </div>
          </div>
          
          <!-- 购买数量选择 -->
          <div class="mb-6">
            <div class="flex items-center">
              <span class="text-gray-500 mr-2 w-24">数量：</span>
              <div class="flex border rounded">
                <button 
                  class="px-3 py-1 border-r"
                  @click="quantity > 1 ? quantity-- : null"
                >-</button>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  class="w-16 text-center py-1"
                  min="1"
                />
                <button 
                  class="px-3 py-1 border-l"
                  @click="quantity++"
                >+</button>
              </div>
              <span class="ml-2 text-gray-500">吨 (最小订购量: {{ product.minOrder || 1 }}吨)</span>
            </div>
          </div>
          
          <div class="flex space-x-4">
            <button 
              class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              @click="handleBuyNow"
            >
              立即询价
            </button>
            <button 
              class="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              @click="handleAddToCart"
            >
              加入购物车
            </button>
            <button 
              class="px-4 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              @click="handleAddToFavorite"
            >
              <i class="fas fa-heart"></i> 收藏
            </button>
          </div>
          
          <!-- 其他操作按钮 -->
          <div class="mt-4 flex space-x-4">
            <ShareProduct :product="product" text="分享" />
            
            <button 
              class="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
              @click="handleAddToCompare"
              :class="{'text-blue-500': isInCompareList}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span>{{ isInCompareList ? '取消对比' : '加入对比' }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 产品详情和联系方式 -->
      <div class="border-t">
        <div class="flex border-b">
          <div 
            class="px-6 py-3 font-medium cursor-pointer transition-colors"
            :class="activeTab === 'detail' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'"
            @click="activeTab = 'detail'"
          >
            产品详情
          </div>
          <div 
            class="px-6 py-3 font-medium cursor-pointer transition-colors"
            :class="activeTab === 'contact' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'"
            @click="activeTab = 'contact'"
          >
            联系方式
          </div>
          <div 
            class="px-6 py-3 font-medium cursor-pointer transition-colors"
            :class="activeTab === 'company' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'"
            @click="activeTab = 'company'"
          >
            企业信息
          </div>
          <div 
            class="px-6 py-3 font-medium cursor-pointer transition-colors"
            :class="activeTab === 'reviews' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600 hover:text-orange-500'"
            @click="activeTab = 'reviews'"
          >
            用户评价
          </div>
        </div>
        
        <!-- 产品详情 -->
        <div v-if="activeTab === 'detail'" class="p-6">
          <h2 class="text-xl font-bold mb-4">产品详情</h2>
          
          <!-- 产品参数表格 -->
          <div class="mb-6 overflow-hidden rounded border border-gray-200">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-4 py-2 border-b">参数名称</th>
                  <th class="px-4 py-2 border-b">参数值</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">产品型号</td>
                  <td class="px-4 py-2">{{ product.specification || '暂无' }}</td>
                </tr>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">材质</td>
                  <td class="px-4 py-2">{{ product.material || '暂无' }}</td>
                </tr>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">最小订购量</td>
                  <td class="px-4 py-2">{{ product.minOrder || 1 }} 吨</td>
                </tr>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">库存</td>
                  <td class="px-4 py-2">{{ product.stock }} 吨</td>
                </tr>
                <tr class="border-b hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">产品分类</td>
                  <td class="px-4 py-2">{{ product.category }}</td>
                </tr>
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-2 font-medium text-gray-500">更新时间</td>
                  <td class="px-4 py-2">{{ product.updatedAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="text-gray-700 leading-relaxed">
            <p>{{ product.description || '暂无详细描述' }}</p>
          </div>
        </div>
        
        <!-- 联系方式 -->
        <div v-if="activeTab === 'contact'" class="p-6">
          <h2 class="text-xl font-bold mb-4">联系方式</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center">
              <span class="text-gray-500 mr-2 w-20">联系人：</span>
              <span>{{ product.contactPerson || '暂无' }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2 w-20">联系电话：</span>
              <span>{{ product.contactPhone || '暂无' }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2 w-20">电子邮箱：</span>
              <span>{{ product.contactEmail || '暂无' }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-500 mr-2 w-20">地址：</span>
              <span>{{ product.address || '暂无' }}</span>
            </div>
          </div>
        </div>
        
        <!-- 企业信息 -->
        <div v-if="activeTab === 'company'" class="p-6">
          <h2 class="text-xl font-bold mb-4">企业信息</h2>
          <div class="mb-4">
            <NuxtLink :to="`/market/${product.companyId}`" class="text-blue-600 font-medium hover:underline">
              {{ product.companyName }}
            </NuxtLink>
          </div>
          <div class="text-gray-600">
            <p>请点击企业名称查看详细信息</p>
          </div>
        </div>
        
        <!-- 评价 -->
        <div v-if="activeTab === 'reviews'" class="p-6">
          <h2 class="text-xl font-bold mb-4">用户评价</h2>
          
          <!-- 评分统计 -->
          <div class="flex items-center mb-6">
            <div class="text-3xl font-bold text-orange-500 mr-4">4.8</div>
            <div class="flex text-yellow-400 text-xl mr-4">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <div class="text-gray-500">共 24 条评价</div>
          </div>
          
          <!-- 评价列表 -->
          <div class="space-y-4">
            <div v-for="(review, index) in mockReviews" :key="index" class="border-b pb-4">
              <div class="flex justify-between mb-2">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-gray-200 mr-2 overflow-hidden">
                    <img :src="review.avatar || '/img/default-avatar.png'" class="w-full h-full object-cover" alt="用户头像" />
                  </div>
                  <span class="font-medium">{{ review.username }}</span>
                </div>
                <div class="text-gray-500 text-sm">{{ review.date }}</div>
              </div>
              <div class="flex text-yellow-400 text-sm mb-2">
                <span v-for="i in 5" :key="i" class="mr-0.5">
                  {{ i <= review.rating ? '★' : '☆' }}
                </span>
              </div>
              <p class="text-gray-700">{{ review.content }}</p>
              <div v-if="review.images && review.images.length > 0" class="flex mt-2 space-x-2">
                <div 
                  v-for="(img, imgIndex) in review.images" 
                  :key="imgIndex"
                  class="w-16 h-16 rounded overflow-hidden cursor-pointer"
                  @click="previewReviewImage(review.images, imgIndex)"
                >
                  <img :src="img" class="w-full h-full object-cover" :alt="'评价图片'" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 相关产品区域 -->
    <div class="flex flex-col lg:flex-row gap-4 mt-8">
      <!-- 左侧：相关推荐 -->
      <div class="lg:w-3/4">
        <!-- 相关推荐产品 -->
        <div v-if="relatedProducts.length > 0">
          <h2 class="text-xl font-bold mb-4 text-gray-800">相关推荐</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              v-for="item in relatedProducts" 
              :key="item.id" 
              class="border rounded shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div class="h-40 overflow-hidden bg-gray-100">
                <img 
                  :src="item.images?.[0] || '/img/default-product.png'" 
                  class="w-full h-full object-cover" 
                  alt="产品图片" 
                />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-blue-600 mb-2 truncate">
                  <NuxtLink :to="`/trade/product/${item.id}`" class="hover:underline">
                    {{ item.name }}
                  </NuxtLink>
                </h3>
                <p class="text-orange-600 font-medium mb-2">¥{{ item.price }} 元/吨</p>
                <p class="text-gray-600 text-sm truncate">{{ item.companyName }}</p>
                <div class="flex justify-between mt-2 text-xs text-gray-500">
                  <span>销量:{{ item.sales }}</span>
                  <span>库存:{{ item.stock }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 最近浏览 -->
        <div class="mt-8">
          <RecentViewed :products="recentViewedProducts" />
        </div>
      </div>
      
      <!-- 右侧：推荐商品 -->
      <div class="lg:w-1/4">
        <RecommendProducts title="热销商品" :products="hotProducts" />
        <RecommendProducts title="新品上市" :products="newProducts" />
      </div>
    </div>
    
    <!-- 加载中 -->
    <div v-else-if="loading" class="bg-white rounded shadow-sm p-8 text-center">
      <p class="text-gray-500">正在加载产品信息...</p>
    </div>
    
    <!-- 无数据 -->
    <div v-else class="bg-white rounded shadow-sm p-8 text-center">
      <p class="text-gray-500">未找到相关产品信息</p>
      <NuxtLink to="/market" class="text-orange-500 hover:underline mt-4 inline-block">
        返回产品列表
      </NuxtLink>
    </div>
  </div>
  
  <!-- 图片预览组件 -->
  <ImagePreview 
    :visible="showPreview" 
    :images="product?.images || []" 
    :initial-index="currentImageIndex"
    @close="showPreview = false"
  />

  <!-- 询价表单 -->
  <InquiryForm
    :visible="showInquiryForm"
    :product="product"
    :initial-quantity="quantity"
    @close="showInquiryForm = false"
    @submit="handleInquirySubmit"
  />
  
  <!-- 产品对比组件 -->
  <CompareProducts />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMarket } from '../../../composables/useMarket'
import { useCart } from '../../../composables/useCart'
import { useCompare } from '../../../composables/useCompare'
import type { Product } from '../../../types/market'
import ImagePreview from '../../../components/market/ImagePreview.vue'
import RecentViewed from '../../../components/market/RecentViewed.vue'
import RecommendProducts from '../../../components/market/RecommendProducts.vue'
import InquiryForm from '../../../components/market/InquiryForm.vue'
import ShareProduct from '../../../components/market/ShareProduct.vue'
import CompareProducts from '../../../components/market/CompareProducts.vue'

const route = useRoute()
const productId = parseInt(route.params.id as string)

const { fetchProductDetail, fetchRelatedProducts } = useMarket()

const product = ref<Product | null>(null)
const loading = ref(true)
const relatedProducts = ref<Product[]>([])
const activeTab = ref('detail')
const currentImage = ref('')
const currentImageIndex = ref(0)
const quantity = ref(1)
const showPreview = ref(false)
const showInquiryForm = ref(false)

const recentViewedProducts = ref<Product[]>([])
const hotProducts = ref<Product[]>([])
const newProducts = ref<Product[]>([])

// 购物车功能
const { addToCart } = useCart()

// 对比功能
const { addToCompare, removeFromCompare, isInCompareList: checkInCompareList } = useCompare()

// 检查产品是否在对比列表中
const isInCompareList = computed(() => {
  if (!product.value) return false
  return checkInCompareList(product.value.id)
})

// 模拟评价数据
const mockReviews = [
  {
    username: '张先生',
    avatar: '',
    date: '2023-08-20',
    rating: 5,
    content: '产品质量很好，规格符合要求，发货速度快，服务态度也很好，值得推荐。',
    images: ['/img/reviews/review1.jpg', '/img/reviews/review2.jpg']
  },
  {
    username: '李经理',
    avatar: '',
    date: '2023-08-15',
    rating: 4,
    content: '钢材质量不错，但是发货有点慢，其他都挺满意的。',
    images: []
  },
  {
    username: '王工',
    avatar: '',
    date: '2023-08-10',
    rating: 5,
    content: '已经是第三次购买了，一如既往的好，希望以后能有更多优惠。',
    images: ['/img/reviews/review3.jpg']
  }
]

// 获取产品详情
const loadProductDetail = async () => {
  loading.value = true
  try {
    product.value = await fetchProductDetail(productId)
    if (product.value?.images && product.value.images.length > 0) {
      currentImage.value = product.value.images[0]
    }
    
    // 获取相关产品
    relatedProducts.value = await fetchRelatedProducts(productId)
    
    // 设置最小购买数量
    if (product.value?.minOrder) {
      quantity.value = product.value.minOrder
    }
    
    // 添加到最近浏览
    if (product.value) {
      addToRecentViewed(product.value)
    }
    
    // 模拟获取热销商品和新品
    loadHotAndNewProducts()
  } catch (error) {
    console.error('获取产品详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 添加到最近浏览
const addToRecentViewed = (product: Product) => {
  // 从本地存储获取最近浏览
  const recentViewed = localStorage.getItem('recentViewed')
  let recentViewedList: Product[] = recentViewed ? JSON.parse(recentViewed) : []
  
  // 检查是否已存在，如果存在则删除
  recentViewedList = recentViewedList.filter(item => item.id !== product.id)
  
  // 添加到列表开头
  recentViewedList.unshift(product)
  
  // 保留最多10个
  if (recentViewedList.length > 10) {
    recentViewedList = recentViewedList.slice(0, 10)
  }
  
  // 更新本地存储和状态
  localStorage.setItem('recentViewed', JSON.stringify(recentViewedList))
  recentViewedProducts.value = recentViewedList
}

// 加载热销和新品数据
const loadHotAndNewProducts = () => {
  // 模拟热销商品数据
  hotProducts.value = [
    {
      id: 201,
      name: "热轧H型钢HW200*200",
      companyId: 1,
      companyName: "绍兴市天宏钢贸有限公司",
      category: "H型钢",
      price: 5500,
      specification: "HW200*200*8*12",
      material: "Q235B",
      stock: 300,
      views: 180,
      sales: 65,
      createdAt: "2023-06-01",
      updatedAt: "2023-08-10"
    },
    {
      id: 202,
      name: "工字钢I20b",
      companyId: 2,
      companyName: "绍兴市家旺汽车销售服务中心",
      category: "工字钢",
      price: 5100,
      stock: 250,
      views: 160,
      sales: 55,
      createdAt: "2023-06-05",
      updatedAt: "2023-08-12"
    }
  ] as Product[]
  
  // 模拟新品数据
  newProducts.value = [
    {
      id: 301,
      name: "镀锌槽钢10#",
      companyId: 3,
      companyName: "钱江旅店",
      category: "槽钢",
      price: 4800,
      specification: "10#",
      material: "Q235B",
      stock: 400,
      views: 90,
      sales: 15,
      createdAt: "2023-08-01",
      updatedAt: "2023-08-15"
    },
    {
      id: 302,
      name: "不锈钢管φ32*3.0",
      companyId: 1,
      companyName: "绍兴市天宏钢贸有限公司",
      category: "不锈钢管",
      price: 32,
      specification: "φ32*3.0",
      material: "304",
      stock: 1000,
      views: 70,
      sales: 10,
      createdAt: "2023-08-10",
      updatedAt: "2023-08-16"
    }
  ] as Product[]
}

// 初始化时加载最近浏览数据
const initRecentViewed = () => {
  const recentViewed = localStorage.getItem('recentViewed')
  if (recentViewed) {
    recentViewedProducts.value = JSON.parse(recentViewed)
  }
}

// 查看评价图片
const previewReviewImage = (images: string[], index: number) => {
  // 这里可以实现评价图片预览逻辑
  console.log('预览评价图片:', images, index)
}

// 立即询价
const handleBuyNow = () => {
  if (!product.value) return
  console.log('立即询价:', product.value.name, '数量:', quantity.value)
  // 打开询价表单
  showInquiryForm.value = true
}

// 加入购物车
const handleAddToCart = () => {
  if (!product.value) return
  console.log('加入购物车:', product.value.name, '数量:', quantity.value)
  // 添加到购物车
  addToCart(product.value, quantity.value)
  
  // 显示添加成功提示
  alert(`已成功添加 ${quantity.value} 吨 ${product.value.name} 到购物车`)
}

// 收藏
const handleAddToFavorite = () => {
  if (!product.value) return
  console.log('收藏产品:', product.value.name)
  // 可以添加收藏的逻辑
}

// 处理询价表单提交
const handleInquirySubmit = (formData) => {
  console.log('询价表单提交:', formData)
  // 这里可以添加实际提交逻辑
  alert('询价已提交，我们会尽快与您联系')
}

// 添加到对比
const handleAddToCompare = () => {
  if (!product.value) return
  
  if (isInCompareList.value) {
    // 如果已在对比列表中，则移除
    removeFromCompare(product.value.id)
  } else {
    // 否则添加到对比列表
    const added = addToCompare(product.value)
    if (!added) {
      alert('对比列表已满，请先移除其他产品')
    }
  }
}

onMounted(() => {
  loadProductDetail()
  initRecentViewed()
})
</script> 