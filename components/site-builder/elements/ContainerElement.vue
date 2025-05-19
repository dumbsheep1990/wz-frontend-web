<template>
  <div :style="computedStyle" class="container-element">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContainerElement',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: 'auto'
    },
    background: {
      type: String,
      default: '#fff'
    },
    padding: {
      type: String,
      default: '0px'
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
        background: this.background,
        padding: this.padding,
        borderRadius: this.borderRadius
      }
    }
  }
}
</script> 