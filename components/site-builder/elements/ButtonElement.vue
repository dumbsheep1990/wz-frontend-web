<template>
  <button :style="computedStyle" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonElement',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'primary' // 可选 primary, secondary, danger
    },
    size: {
      type: String,
      default: 'medium' // 可选 small, medium, large
    },
    rounded: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: '#ff9800'
    },
    color: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    computedStyle() {
      return {
        background: this.background,
        color: this.color,
        borderRadius: this.rounded ? '6px' : '0px',
        padding: this.size === 'large' ? '12px 32px' : this.size === 'small' ? '4px 12px' : '8px 20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: this.size === 'large' ? '18px' : this.size === 'small' ? '13px' : '15px'
      }
    }
  }
}
</script> 