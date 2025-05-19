<template>
  <img :src="src" :alt="alt" :style="computedStyle" />
</template>

<script>
export default {
  name: 'ImageElement',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: '图片'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    borderRadius: {
      type: String,
      default: '0px'
    }
  },
  computed: {
    computedStyle() {
      return {
        width: this.width,
        height: this.height,
        objectFit: this.objectFit,
        borderRadius: this.borderRadius
      }
    }
  }
}
</script> 