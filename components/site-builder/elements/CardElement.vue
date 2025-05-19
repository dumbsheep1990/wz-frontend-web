<template>
  <div :style="computedStyle" class="card-element">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardElement',
  props: {
    shadow: {
      type: String,
      default: '0 2px 8px rgba(0,0,0,0.08)'
    },
    padding: {
      type: String,
      default: '16px'
    },
    borderRadius: {
      type: String,
      default: '8px'
    },
    border: {
      type: String,
      default: '1px solid #eee'
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    computedStyle() {
      return {
        boxShadow: this.shadow,
        padding: this.padding,
        borderRadius: this.borderRadius,
        border: this.border,
        background: this.background
      }
    }
  }
}
</script> 