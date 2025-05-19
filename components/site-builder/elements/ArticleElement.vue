<template>
  <article class="article-element" :style="computedStyle">
    <img v-if="cover" :src="cover" class="w-full h-48 object-cover rounded mb-3" />
    <h2 class="text-xl font-bold mb-1">{{ title }}</h2>
    <div class="text-xs text-gray-400 mb-2">{{ author }} · {{ time }}</div>
    <div class="text-gray-700 leading-relaxed">{{ content }}</div>
  </article>
</template>
<script>
export default {
  name: 'ArticleElement',
  props: {
    title: { type: String, default: '文章标题' },
    author: { type: String, default: '作者' },
    time: { type: String, default: '' },
    content: { type: String, default: '正文内容' },
    cover: { type: String, default: '' }
  },
  computed: {
    computedStyle() { return { background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } }
  }
}
</script> 