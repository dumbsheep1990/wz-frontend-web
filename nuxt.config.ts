import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@pinia/nuxt',
    // 未来可扩展：uniapp 适配、TailwindCSS
  ],
  css: [
    '@/assets/css/tailwind.css',
  ],
  typescript: {
    strict: true
  },
  app: {
    head: {
      title: 'wz-front-web',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '基于 Nuxt3 的 SSR 站点' }
      ]
    }
  }
}) 