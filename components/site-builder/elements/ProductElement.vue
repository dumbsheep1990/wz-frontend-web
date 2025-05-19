<template>
  <div class="product-element" :style="computedStyle">
    <img :src="image" :alt="title" class="w-full h-40 object-cover rounded-md mb-2" />
    <div class="font-bold text-lg mb-1">{{ title }}</div>
    <div class="text-orange-500 font-semibold mb-2">￥{{ price }}</div>
    <div class="mb-2 text-xs text-gray-400">{{ tag }}</div>
    <button class="w-full py-2 bg-orange-500 text-white rounded" @click="$emit('buy')">立即购买</button>
  </div>
</template>
<script>
export default {
  name: 'ProductElement',
  props: {
    image: { type: String, default: '' },
    title: { type: String, default: '商品标题' },
    price: { type: [Number, String], default: 0 },
    tag: { type: String, default: '' }
  },
  computed: {
    computedStyle() { return { background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' } }
  }
}
</script> 