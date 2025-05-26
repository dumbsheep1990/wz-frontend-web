<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto p-4 flex-grow">
    <!-- Page header -->
    <div class="bg-green-100 p-2 rounded-t-md border border-green-500 mb-4">
      <h1 class="text-lg font-bold text-green-800">同乡/同事/同学</h1>
    </div>

    <!-- Main content table -->
    <div class="border rounded-md mb-4">
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left">标题</th>
            <th class="p-2 text-left">地点</th>
            <th class="p-2 text-left">发布者</th>
            <th class="p-2 text-left">发布时间</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoading && similarPosts.length === 0">
            <tr>
              <td colspan="4" class="p-4 text-center text-gray-500">加载中...</td>
            </tr>
          </template>
          <template v-else-if="similarPosts.length === 0">
            <tr>
              <td colspan="4" class="p-4 text-center text-gray-500">暂无数据</td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(post, index) in similarPosts" :key="post.id" class="border-t hover:bg-gray-50">
              <td class="p-2">
                <NuxtLink :to="`/content/similar-post-detail/${post.id}`" class="text-blue-600 hover:underline">
                  {{ post.title }}
                </NuxtLink>
              </td>
              <td class="p-2">{{ post.location }}</td>
              <td class="p-2">
                <div class="flex items-center">
                  <span>{{ post.author }}</span>
                  <span v-if="post.isVerified" class="ml-1 text-xs text-green-600">(已认证)</span>
                </div>
              </td>
              <td class="p-2 text-gray-500 text-sm">{{ post.publishTime }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-4">
      <button 
        v-if="currentPage > 1" 
        @click="changePage(currentPage - 1)"
        class="px-3 py-1 border rounded-md hover:bg-gray-100"
      >
        上一页
      </button>
      
      <template v-for="page in Math.min(5, Math.ceil(totalPosts / pageSize))" :key="page">
        <button 
          @click="changePage(page)"
          :class="[
            'px-3 py-1 rounded-md', 
            currentPage === page ? 'bg-green-500 text-white' : 'border hover:bg-gray-100'
          ]"
        >
          {{ page }}
        </button>
      </template>
      
      <button 
        v-if="currentPage < Math.ceil(totalPosts / pageSize)" 
        @click="changePage(currentPage + 1)"
        class="px-3 py-1 border rounded-md hover:bg-gray-100"
      >
        下一页
      </button>
    </div>

    <!-- 入同分类列表 -->
    <CategoryList title="入同分类" class="mt-6" />
    
    <!-- Sidebar content area for related posts or info -->
    <div class="mt-4">
      <h3 class="text-lg font-bold mb-2">推荐</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(rec, index) in recommendedPosts" :key="index" class="border p-2 rounded-md">
          <NuxtLink :to="`/content/similar-post-detail/${rec.id}`" class="text-blue-600 hover:underline">
            {{ rec.title }}
          </NuxtLink>
          <p class="text-sm text-gray-500">{{ rec.summary }}</p>
        </div>
      </div>
    </div>
    </div>
    
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup>
import { fetchSimilarPosts, fetchRecommendedPosts } from '~/api/similar-posts';
import CategoryList from '~/components/similar/CategoryList.vue';
import AppFooter from '~/components/common/AppFooter.vue';

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);
const totalPosts = ref(0);

// Loading states
const isLoading = ref(false);
const isLoadingRecommendations = ref(false);

// Data containers
const similarPosts = ref([]);
const recommendedPosts = ref([]);

// Fetch posts on component mount
onMounted(async () => {
  await loadPosts();
  await loadRecommendations();
});

// Load posts from API
async function loadPosts() {
  isLoading.value = true;
  try {
    const response = await fetchSimilarPosts({
      page: currentPage.value,
      pageSize: pageSize.value
    });
    
    similarPosts.value = response.data;
    totalPosts.value = response.total;
  } catch (error) {
    console.error('Failed to load similar posts:', error);
  } finally {
    isLoading.value = false;
  }
}

// Load recommended posts
async function loadRecommendations() {
  isLoadingRecommendations.value = true;
  try {
    const data = await fetchRecommendedPosts(4);
    recommendedPosts.value = data;
  } catch (error) {
    console.error('Failed to load recommendations:', error);
  } finally {
    isLoadingRecommendations.value = false;
  }
}

// Handle page change
async function changePage(page) {
  currentPage.value = page;
  await loadPosts();
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
