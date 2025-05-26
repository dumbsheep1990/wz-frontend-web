<template>
  <div class="category-list">
    <h3 class="text-lg font-bold mb-3" v-if="title">{{ title }}</h3>
    <div class="grid grid-cols-4 md:grid-cols-7 gap-2">
      <NuxtLink 
        v-for="category in categories" 
        :key="category.code"
        :to="getLink(category.code)"
        class="category-item"
      >
        <div class="px-3 py-2 text-center border border-gray-200 rounded-md hover:bg-green-50 hover:border-green-300 transition-colors">
          {{ category.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchSimilarCategories } from '~/api/categories';

const props = defineProps({
  title: {
    type: String,
    default: '入同分类'
  },
  baseLink: {
    type: String,
    default: '/content/similar-posts'
  }
});

const categories = ref([]);
const isLoading = ref(true);

// 在组件挂载时获取分类数据
onMounted(async () => {
  try {
    const response = await fetchSimilarCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to load categories:', error);
  } finally {
    isLoading.value = false;
  }
});

// 获取链接
function getLink(categoryCode) {
  return `${props.baseLink}?type=${encodeURIComponent(categoryCode)}`;
}
</script>

<style scoped>
.category-list {
  margin-bottom: 1.5rem;
}
.category-item {
  text-decoration: none;
  color: inherit;
}
</style>
