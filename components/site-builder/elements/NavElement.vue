<template>
  <nav :style="computedStyle" class="nav-element">
    <ul :class="direction === 'vertical' ? 'flex flex-col' : 'flex flex-row'">
      <li v-for="item in items" :key="item.text" class="mr-4 mb-2 last:mr-0 last:mb-0">
        <a :href="item.link" class="flex items-center text-gray-700 hover:text-orange-500">
          <span v-if="item.icon" class="mr-1"><i :class="item.icon"></i></span>
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'NavElement',
  props: {
    items: {
      type: Array,
      default: () => ([{ text: '首页', link: '/' }])
    },
    direction: {
      type: String,
      default: 'horizontal' // horizontal, vertical
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    computedStyle() {
      return {
        background: this.background,
        padding: '8px 0',
        borderRadius: '6px'
      }
    }
  }
}
</script> 