<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap -mx-4">
        <!-- 左侧边栏 -->
        <div class="w-full md:w-1/4 px-4 mb-6 md:mb-0">
          <div class="bg-white rounded-lg shadow p-6 sticky top-24">
            <!-- 用户头像和基本信息 -->
            <div class="text-center mb-6">
              <div class="inline-block relative mb-4">
                <img 
                  :src="user.avatar || '/img/default-avatar.png'" 
                  alt="用户头像" 
                  class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <div class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-xl font-semibold">{{ user.nickname || user.username }}</h3>
              <p class="text-gray-500 text-sm">{{ user.role || '普通会员' }}</p>
            </div>
            
            <!-- 用户统计信息 -->
            <div class="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <div class="text-lg font-bold text-blue-600">{{ userStats.points }}</div>
                <div class="text-xs text-gray-500">积分</div>
              </div>
              <div>
                <div class="text-lg font-bold text-blue-600">{{ userStats.favorites }}</div>
                <div class="text-xs text-gray-500">收藏</div>
              </div>
              <div>
                <div class="text-lg font-bold text-blue-600">{{ userStats.messages }}</div>
                <div class="text-xs text-gray-500">消息</div>
              </div>
            </div>
            
            <!-- 导航菜单 -->
            <nav>
              <ul class="space-y-2">
                <li v-for="item in personNavMenu" :key="item.id">
                  <button 
                    @click="activeTab = item.id"
                    class="flex items-center w-full px-4 py-2 rounded-md transition-colors"
                    :class="activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'"
                  >
                    <span class="mr-3">
                      <i :class="item.icon"></i>
                    </span>
                    <span>{{ item.name }}</span>
                    <span v-if="item.id === 'messages' && userStats.unreadMessages" class="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {{ userStats.unreadMessages }}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <!-- 右侧内容区域 -->
        <div class="w-full md:w-3/4 px-4">
          <div class="bg-white rounded-lg shadow p-6">
            <!-- 基本信息 -->
            <div v-if="activeTab === 'profile'">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b">基本信息</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                    <input 
                      type="text" 
                      v-model="user.username" 
                      readonly 
                      class="bg-gray-50 w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                    <input 
                      type="text" 
                      v-model="userForm.nickname" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input 
                      type="email" 
                      v-model="userForm.email" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                    <input 
                      type="tel" 
                      v-model="userForm.phone" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                  <textarea 
                    v-model="userForm.bio" 
                    rows="4" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div class="flex justify-end">
                  <button class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    保存修改
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 积分记录 -->
            <div v-if="activeTab === 'points'">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b">积分记录</h2>
              <div v-if="pointsRecords.length > 0">
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">来源</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">积分变动</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="record in pointsRecords" :key="record.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ record.createdAt }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.source }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span 
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            :class="record.type === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                          >
                            {{ record.type === 1 ? '+' : '-' }}{{ record.points }}
                          </span>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500">{{ record.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="mt-6 flex justify-center">
                  <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    加载更多
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-gray-500">暂无积分记录</p>
              </div>
            </div>
            
            <!-- 我的收藏 -->
            <div v-if="activeTab === 'favorites'">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b">我的收藏</h2>
              <div v-if="favorites.length > 0">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div 
                    v-for="item in favorites" 
                    :key="item.id"
                    class="flex bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div class="w-24 h-24 flex-shrink-0">
                      <img :src="item.cover || '/img/default-cover.jpg'" alt="封面" class="w-full h-full object-cover" />
                    </div>
                    <div class="flex-1 p-4">
                      <div class="flex justify-between">
                        <h3 class="font-medium text-lg mb-1 truncate">
                          <a :href="item.url" target="_blank" class="hover:text-blue-600">{{ item.title }}</a>
                        </h3>
                        <button 
                          @click="removeFavorite(item.id)"
                          class="text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-gray-500 text-sm mb-1 line-clamp-2">{{ item.summary }}</p>
                      <div class="text-xs text-gray-400">
                        收藏于 {{ item.createdAt }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                  <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    加载更多
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p class="text-gray-500">暂无收藏内容</p>
              </div>
            </div>
            
            <!-- 消息中心 -->
            <div v-if="activeTab === 'messages'">
              <h2 class="text-xl font-bold mb-6 pb-2 border-b">消息中心</h2>
              <div v-if="messages.length > 0">
                <div class="space-y-4">
                  <div 
                    v-for="message in messages" 
                    :key="message.id"
                    class="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    :class="{ 'border-blue-200 bg-blue-50': message.status === 0 }"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="font-medium" :class="{ 'font-bold': message.status === 0 }">
                        <span v-if="message.isImportant" class="inline-block mr-2 w-2 h-2 rounded-full bg-red-500"></span>
                        {{ message.title }}
                      </h3>
                      <div class="flex space-x-2">
                        <span class="text-xs text-gray-500">{{ message.createdAt }}</span>
                        <button 
                          v-if="message.status === 0"
                          @click="markAsRead(message.id)"
                          class="text-blue-600 text-xs hover:text-blue-800"
                        >
                          标为已读
                        </button>
                        <button 
                          @click="deleteMessage(message.id)"
                          class="text-gray-400 hover:text-red-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="text-gray-700 text-sm">{{ message.content }}</div>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-center">
                  <button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    加载更多
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-12">
                <div class="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-gray-500">暂无消息</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// 当前激活的标签页
const activeTab = ref('profile')

// 导航菜单
const personNavMenu = [
  { id: 'profile', name: '基本信息', icon: 'i-mdi-account' },
  { id: 'points', name: '积分记录', icon: 'i-mdi-cash-multiple' },
  { id: 'favorites', name: '我的收藏', icon: 'i-mdi-bookmark' },
  { id: 'messages', name: '消息中心', icon: 'i-mdi-email' },
  { id: 'orders', name: '订单管理', icon: 'i-mdi-shopping' },
  { id: 'security', name: '账号安全', icon: 'i-mdi-lock' }
]

// 用户基本信息
const user = reactive({
  id: 1,
  username: 'user123',
  nickname: '测试用户',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  email: 'user@example.com',
  phone: '13800138000',
  role: '普通会员',
  createdAt: '2023-01-01',
  bio: '这是一个测试账号'
})

// 用户表单数据（用于修改用户信息）
const userForm = reactive({
  nickname: user.nickname,
  email: user.email,
  phone: user.phone,
  bio: user.bio
})

// 用户统计数据
const userStats = reactive({
  points: 1250,
  favorites: 16,
  messages: 3,
  unreadMessages: 2
})

// 积分记录
const pointsRecords = ref([
  { id: 1, type: 1, points: 10, source: '每日签到', description: '连续签到3天', createdAt: '2023-07-29 08:15:32' },
  { id: 2, type: 1, points: 20, source: '发表评论', description: '评论《Vue3与Nuxt3搭建SSR站点实战教程》', createdAt: '2023-07-28 14:22:45' },
  { id: 3, type: 2, points: 100, source: '兑换商品', description: '兑换优惠券', createdAt: '2023-07-26 16:08:12' },
  { id: 4, type: 1, points: 50, source: '分享文章', description: '分享《TailwindCSS入门到精通》到微信', createdAt: '2023-07-22 09:35:18' }
])

// 收藏列表
const favorites = ref([
  {
    id: 1,
    title: 'Vue3与Nuxt3搭建SSR站点实战教程',
    cover: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    summary: '从零开始学习如何使用最新的Vue3和Nuxt3框架搭建SSR站点，包含完整案例代码。',
    url: '/content/1',
    createdAt: '2023-07-29 15:32:21'
  },
  {
    id: 2,
    title: 'TailwindCSS入门到精通：构建现代响应式UI',
    cover: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    summary: '全面学习TailwindCSS，从基础概念到高级应用，快速构建美观的用户界面。',
    url: '/content/3',
    createdAt: '2023-07-25 09:14:53'
  },
  {
    id: 3,
    title: '多租户SaaS平台架构设计与实践',
    cover: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80',
    summary: '深入解析多租户SaaS平台的架构设计原则、数据隔离策略及实现方案。',
    url: '/content/4',
    createdAt: '2023-07-20 17:28:36'
  }
])

// 消息列表
const messages = ref([
  {
    id: 1,
    title: '系统通知：积分规则调整',
    content: '亲爱的用户，我们调整了积分规则，每日首次登录可获得10积分，发表评论可获得5积分，详情请查看积分规则页面。',
    type: 1,
    status: 0,
    isImportant: 1,
    createdAt: '2023-07-30 10:15:22'
  },
  {
    id: 2,
    title: '您的评论收到回复',
    content: '您在《Vue3与Nuxt3搭建SSR站点实战教程》的评论收到了作者回复，点击查看详情。',
    type: 2,
    status: 0,
    isImportant: 0,
    createdAt: '2023-07-28 16:42:11'
  },
  {
    id: 3,
    title: '恭喜您获得签到奖励',
    content: '恭喜您已连续签到7天，获得额外20积分奖励！',
    type: 1,
    status: 1,
    isImportant: 0,
    createdAt: '2023-07-25 08:30:55'
  }
])

// 移除收藏
const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(item => item.id !== id)
  userStats.favorites = favorites.value.length
}

// 标记消息为已读
const markAsRead = (id) => {
  const message = messages.value.find(item => item.id === id)
  if (message && message.status === 0) {
    message.status = 1
    userStats.unreadMessages--
  }
}

// 删除消息
const deleteMessage = (id) => {
  const message = messages.value.find(item => item.id === id)
  messages.value = messages.value.filter(item => item.id !== id)
  
  if (message && message.status === 0) {
    userStats.unreadMessages--
  }
  userStats.messages = messages.value.length
}

// 模拟获取用户数据
onMounted(() => {
  // 这里可以替换为实际API调用
  // const fetchUserData = async () => {
  //   try {
  //     const res = await $fetch('/api/user/profile')
  //     Object.assign(user, res.data)
  //     Object.assign(userForm, {
  //       nickname: user.nickname,
  //       email: user.email,
  //       phone: user.phone,
  //       bio: user.bio
  //     })
  //   } catch (error) {
  //     console.error('获取用户信息失败:', error)
  //   }
  // }
  
  // fetchUserData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 