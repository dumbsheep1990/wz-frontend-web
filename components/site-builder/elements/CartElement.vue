<template>
  <div class="cart-element" :style="computedStyle">
    <h3 class="font-bold text-lg mb-2">购物车</h3>
    <div v-if="items.length > 0">
      <div v-for="item in items" :key="item.id" class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <img :src="item.image" class="w-10 h-10 object-cover rounded mr-2" />
          <span>{{ item.title }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <span>x{{ item.quantity }}</span>
          <span class="text-orange-500">￥{{ item.price }}</span>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <span class="font-bold">总计: ￥{{ total }}</span>
        <button class="px-4 py-2 bg-orange-500 text-white rounded" @click="$emit('checkout')">去结算</button>
      </div>
    </div>
    <div v-else class="text-gray-400">购物车为空</div>
  </div>
</template>
<script>
export default {
  name: 'CartElement',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    computedStyle() {
      return { background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
    }
  }
}
</script> 