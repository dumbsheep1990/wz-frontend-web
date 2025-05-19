<template>
  <form class="form-element" :style="computedStyle" @submit.prevent="$emit('submit', formData)">
    <h3 v-if="title" class="font-bold text-lg mb-4">{{ title }}</h3>
    <div v-for="field in fields" :key="field.name" class="mb-3">
      <label class="block text-sm text-gray-600 mb-1">{{ field.label }}</label>
      <input v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
        :type="field.type"
        v-model="formData[field.name]"
        :placeholder="field.placeholder"
        class="w-full px-3 py-2 border rounded-md"
      />
      <select v-else-if="field.type === 'select'"
        v-model="formData[field.name]"
        class="w-full px-3 py-2 border rounded-md"
      >
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <div v-else-if="field.type === 'radio'" class="flex space-x-4">
        <label v-for="opt in field.options" :key="opt.value" class="flex items-center">
          <input type="radio" :name="field.name" :value="opt.value" v-model="formData[field.name]" class="mr-1" />
          {{ opt.label }}
        </label>
      </div>
      <div v-else-if="field.type === 'checkbox'" class="flex space-x-4">
        <label v-for="opt in field.options" :key="opt.value" class="flex items-center">
          <input type="checkbox" :value="opt.value" v-model="formData[field.name]" class="mr-1" />
          {{ opt.label }}
        </label>
      </div>
    </div>
    <button type="submit" class="w-full py-2 bg-orange-500 text-white rounded">{{ submitText }}</button>
  </form>
</template>
<script>
export default {
  name: 'FormElement',
  props: {
    title: { type: String, default: '' },
    fields: {
      type: Array,
      default: () => []
    },
    submitText: { type: String, default: '提交' }
  },
  data() {
    return {
      formData: {}
    }
  },
  watch: {
    fields: {
      immediate: true,
      handler(fields) {
        fields.forEach(f => {
          if (this.formData[f.name] === undefined) {
            this.$set(this.formData, f.name, f.type === 'checkbox' ? [] : '')
          }
        })
      }
    }
  },
  computed: {
    computedStyle() {
      return { background: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }
    }
  }
}
</script> 