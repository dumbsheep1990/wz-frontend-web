<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto p-4 flex-grow">
    <!-- Navigation breadcrumb -->
    <div class="text-sm text-gray-600 mb-4">
      <span>同乡-</span>
      <span v-if="postData">{{ postData.hometown }} {{ postData.title }}</span>
      <span v-else>加载中...</span>
    </div>
    
    <!-- Main content area with profile info -->
    <div class="bg-white rounded-md shadow-sm border mb-6">
      <!-- Loading state -->
      <div v-if="isLoading" class="p-8 text-center">
        <p class="text-gray-500">加载中...</p>
      </div>
      
      <template v-else-if="postData">
        <!-- Profile header with image/avatar -->
        <div class="border-b p-4">
          <div class="flex items-center">
            <img src="/logo-small.png" alt="Logo" class="w-12 h-12 mr-4">
            <h1 class="text-xl font-bold">{{ postData.title }}</h1>
          </div>
        </div>
      
        <!-- Profile info grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-b">
          <div class="flex flex-col">
            <span class="text-gray-500">居住地址:</span>
            <span>{{ postData.residenceAddress }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">性别:</span>
            <span>{{ postData.gender }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">学历:</span>
            <span>{{ postData.education }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">职业:</span>
            <span>{{ postData.occupation }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">工作地点:</span>
            <span>{{ postData.workPlace }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">职位:</span>
            <span>{{ postData.position }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">爱好:</span>
            <span>{{ postData.hobby }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">邮政:</span>
            <span>{{ postData.postalCode }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">籍贯:</span>
            <span>{{ postData.hometown }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">用户类型:</span>
            <span>{{ postData.userType }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">联系人A号:</span>
            <span>{{ postData.contactNumber }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-500">同乡人数:</span>
            <span>{{ postData.fellowCount }}</span>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="p-4 flex justify-end gap-2">
          <button class="px-4 py-2 bg-green-500 text-white rounded-md">申请入驻</button>
          <button class="px-4 py-2 border border-gray-300 rounded-md">关注</button>
        </div>
      </template>
      <!-- Error state if no data -->
      <div v-else class="p-8 text-center">
        <p class="text-red-500">无法加载数据，请稍后再试</p>
      </div>
    </div>
    
    <!-- Related navigation tabs -->
    <div class="mb-4">
      <ul class="flex border-b">
        <li v-for="tab in tabs" :key="tab.id" 
            :class="['px-4 py-2 cursor-pointer', activeTab === tab.id ? 'border-b-2 border-green-500 text-green-500 font-bold' : '']"
            @click="activeTab = tab.id">
          {{ tab.name }}
        </li>
      </ul>
    </div>
    
    <!-- Tab content area -->
    <div class="bg-white p-4 border rounded-md mb-6">
      <div v-if="isLoading" class="min-h-[200px] flex items-center justify-center">
        <p class="text-gray-500">加载中...</p>
      </div>
      <template v-else-if="postData">
        <div v-if="activeTab === 'intro'" class="min-h-[200px]">
          <p>{{ postData.introduction }}</p>
        </div>
        <div v-else-if="activeTab === 'posts'" class="min-h-[200px]">
          <p>帖子内容将在此处显示</p>
        </div>
        <div v-else class="min-h-[200px]">
          <p>{{ activeTab }} 内容将在此处显示</p>
        </div>
      </template>
      <div v-else class="min-h-[200px] flex items-center justify-center">
        <p class="text-red-500">无法加载数据，请稍后再试</p>
      </div>
    </div>
    
    <!-- Right sidebar with related content -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Left section - Comments counter -->
      <div class="col-span-2">
        <div class="border p-4 rounded-md mb-4">
          <p>共计 <span class="font-bold">0</span> 条数据</p>
        </div>
      </div>
      
      <!-- Right section - Recommendations -->
      <div class="col-span-1">
        <div class="border rounded-md mb-4">
          <div class="bg-gray-100 p-2 font-bold">推荐</div>
          <ul class="divide-y">
            <li v-for="(rec, index) in recommendations" :key="index" class="p-3">
              <NuxtLink :to="`/content/similar-post-detail/${rec.id}`" class="text-blue-600 hover:underline flex items-start">
                <div class="mr-2 min-w-[50px]">
                  <img :src="rec.image" :alt="rec.title" class="w-12 h-12 object-cover">
                </div>
                <div>
                  <p class="font-medium">{{ rec.title }}</p>
                  <p class="text-sm text-gray-500">{{ rec.summary }}</p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <!-- Service links -->
        <div class="border rounded-md mb-4">
          <div class="bg-gray-100 p-2 font-bold">生活服务</div>
          <div class="p-2 flex flex-wrap gap-2">
            <span v-for="(service, index) in services" :key="index" 
                  class="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
              {{ service }}
            </span>
          </div>
        </div>
        
        <!-- Article section -->
        <div class="border rounded-md mb-4">
          <div class="bg-gray-100 p-2 font-bold">文清府邸</div>
          <div class="p-2">
            <img src="/placeholder-image.jpg" alt="文清府邸" class="w-full h-32 object-cover mb-2">
          </div>
        </div>
        
        <!-- Government section -->
        <div class="border rounded-md">
          <div class="bg-gray-100 p-2 font-bold">在水一方政府</div>
          <div class="p-2">
            <img src="/placeholder-image.jpg" alt="政府" class="w-full h-32 object-cover mb-2">
          </div>
        </div>
      </div>
    </div>
    
    <!-- 入同分类列表 -->
    <CategoryList title="入同分类" class="mt-6" />
    </div>
    
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup>
import { fetchSimilarPostById, fetchRecommendedPosts } from '~/api/similar-posts';
import CategoryList from '~/components/similar/CategoryList.vue';
import AppFooter from '~/components/common/AppFooter.vue';

const route = useRoute();
const postId = route.params.id;

// Active tab state
const activeTab = ref('intro');
const tabs = [
  { id: 'intro', name: '简介' },
  { id: 'posts', name: '帖子' },
  { id: 'pics', name: '科普' },
  { id: 'news', name: '资讯' },
  { id: 'service', name: '服务' },
  { id: 'design', name: '建议设计' },
  { id: 'rules', name: '规章' },
  { id: 'qa', name: '问答' },
  { id: 'events', name: '同城活动' },
  { id: 'exchange', name: '同乡交流' },
  { id: 'trade', name: '同城交易' },
  { id: 'others', name: '闲聊市井' }
];

// State variables
const isLoading = ref(true);
const isLoadingRecommendations = ref(true);
const postData = ref(null);
const recommendations = ref([]);

// Load post data and recommendations on component mount
onMounted(async () => {
  await Promise.all([
    loadPostData(),
    loadRecommendations()
  ]);
});

// Load post data from API
async function loadPostData() {
  isLoading.value = true;
  try {
    const data = await fetchSimilarPostById(postId);
    postData.value = data;
  } catch (error) {
    console.error(`Failed to load post with ID ${postId}:`, error);
  } finally {
    isLoading.value = false;
  }
}

// Load recommended posts from API
async function loadRecommendations() {
  isLoadingRecommendations.value = true;
  try {
    const data = await fetchRecommendedPosts(4);
    recommendations.value = data;
  } catch (error) {
    console.error('Failed to load recommendations:', error);
  } finally {
    isLoadingRecommendations.value = false;
  }
}

// Service categories
const services = ref([
  '休闲约会', '金融贷款', '房产买卖', '东方一盏', 
  '五工机电', '装修材料店', '海鲜江湖', '清洁工具'
]);
</script>

<style scoped>
/* Additional styling if needed */
</style>
