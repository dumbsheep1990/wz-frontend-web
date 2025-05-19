<template>
  <div class="comment-element" :style="computedStyle">
    <div class="flex items-center mb-2">
      <img :src="avatar" class="w-8 h-8 rounded-full mr-2" />
      <span class="font-medium mr-2">{{ username }}</span>
      <span class="text-xs text-gray-400">{{ time }}</span>
    </div>
    <div class="mb-2 text-gray-700">{{ content }}</div>
    <div class="flex space-x-2 text-sm">
      <button @click="$emit('reply')" class="text-blue-500">回复</button>
      <button @click="$emit('like')" class="text-gray-500">👍 {{ likes }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommentElement',
  props: {
    avatar: { type: String, default: '' },
    username: { type: String, default: '用户' },
    time: { type: String, default: '' },
    content: { type: String, default: '评论内容' },
    likes: { type: Number, default: 0 }
  },
  computed: {
    computedStyle() { return { background: '#fafbfc', borderRadius: '8px', padding: '12px' } }
  }
}
</script> 