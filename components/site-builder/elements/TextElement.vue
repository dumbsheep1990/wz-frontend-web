<template>
  <div :style="computedStyle">{{ content }}</div>
</template>

<script>
export default {
  name: 'TextElement',
  props: {
    content: {
      type: String,
      default: '文本内容'
    },
    fontSize: {
      type: String,
      default: '16px'
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    color: {
      type: String,
      default: '#333'
    }
  },
  computed: {
    computedStyle() {
      return {
        fontSize: this.fontSize,
        textAlign: this.textAlign,
        color: this.color
      }
    }
  }
}
</script> 