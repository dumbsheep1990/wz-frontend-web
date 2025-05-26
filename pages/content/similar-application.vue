<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto p-4 flex-grow">
      <!-- 页面标题 -->
      <div class="bg-green-100 p-2 rounded-t-md border border-green-500 mb-4">
        <h1 class="text-lg font-bold text-green-800">申请入同</h1>
      </div>

      <!-- 申请表单 -->
      <div class="bg-white border rounded-md p-4 mb-6">
        <form @submit.prevent="submitForm">
          <!-- 入同类型选择 -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2 font-bold">
              <span class="text-red-500">*</span> 类别选择
            </label>
            <div class="grid grid-cols-4 md:grid-cols-7 gap-2">
              <div
                v-for="category in categories"
                :key="category.code"
                @click="form.applicationType = category.code"
                :class="[
                  'px-3 py-2 text-center border rounded-md cursor-pointer transition-colors',
                  form.applicationType === category.code
                    ? 'bg-green-100 border-green-500'
                    : 'border-gray-200 hover:bg-gray-50'
                ]"
              >
                {{ category.name }}
              </div>
            </div>
            <p v-if="errors.applicationType" class="mt-1 text-red-500 text-sm">{{ errors.applicationType }}</p>
          </div>

          <!-- 基本信息 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 姓名 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 姓名
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入姓名"
              />
              <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
            </div>

            <!-- 性别 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 性别
              </label>
              <select
                v-model="form.gender"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">请选择</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
              <p v-if="errors.gender" class="mt-1 text-red-500 text-sm">{{ errors.gender }}</p>
            </div>

            <!-- 出生日期 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 出生日期
              </label>
              <input
                v-model="form.birthplace"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入出生日期"
              />
              <p v-if="errors.birthplace" class="mt-1 text-red-500 text-sm">{{ errors.birthplace }}</p>
            </div>

            <!-- 学历 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 学历
              </label>
              <select
                v-model="form.education"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">请选择</option>
                <option value="高中">高中</option>
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
                <option value="其他">其他</option>
              </select>
              <p v-if="errors.education" class="mt-1 text-red-500 text-sm">{{ errors.education }}</p>
            </div>

            <!-- 职业 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 职业
              </label>
              <input
                v-model="form.occupation"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入职业"
              />
              <p v-if="errors.occupation" class="mt-1 text-red-500 text-sm">{{ errors.occupation }}</p>
            </div>

            <!-- 工作岗位 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 工作岗位
              </label>
              <input
                v-model="form.workPosition"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入工作岗位"
              />
              <p v-if="errors.workPosition" class="mt-1 text-red-500 text-sm">{{ errors.workPosition }}</p>
            </div>

            <!-- 工作地点 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 工作地点
              </label>
              <input
                v-model="form.workPlace"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入工作地点"
              />
              <p v-if="errors.workPlace" class="mt-1 text-red-500 text-sm">{{ errors.workPlace }}</p>
            </div>

            <!-- 爱好 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                爱好
              </label>
              <input
                v-model="form.hobby"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入爱好，多个爱好用逗号分隔"
              />
            </div>

            <!-- 地址 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 地址
              </label>
              <input
                v-model="form.address"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入地址"
              />
              <p v-if="errors.address" class="mt-1 text-red-500 text-sm">{{ errors.address }}</p>
            </div>

            <!-- 联系方式类型 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 联系方式类型
              </label>
              <select
                v-model="form.contactType"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">请选择</option>
                <option value="手机">手机</option>
                <option value="微信">微信</option>
                <option value="QQ">QQ</option>
                <option value="邮箱">邮箱</option>
              </select>
              <p v-if="errors.contactType" class="mt-1 text-red-500 text-sm">{{ errors.contactType }}</p>
            </div>

            <!-- 联系方式值 -->
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">
                <span class="text-red-500">*</span> 联系方式
              </label>
              <input
                v-model="form.contactValue"
                type="text"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="请输入联系方式"
              />
              <p v-if="errors.contactValue" class="mt-1 text-red-500 text-sm">{{ errors.contactValue }}</p>
            </div>
          </div>

          <!-- 个人简介 -->
          <div class="mb-6">
            <label class="block text-gray-700 mb-2">
              个人简介 (120字以内)
            </label>
            <textarea
              v-model="form.description"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              maxlength="120"
              placeholder="请输入个人简介"
            ></textarea>
            <p class="text-right text-sm text-gray-500">{{ form.description.length }}/120</p>
          </div>

          <!-- 提交按钮 -->
          <div class="text-center">
            <button
              type="submit"
              class="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '提交中...' : '提 交' }}
            </button>
          </div>
        </form>
      </div>

      <!-- 入同分类列表 -->
      <CategoryList title="入同分类" class="mt-6" />
    </div>

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { fetchSimilarCategories } from '~/api/categories';
import { submitSimilarApplication } from '~/api/similar-application';
import CategoryList from '~/components/similar/CategoryList.vue';
import AppFooter from '~/components/common/AppFooter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref([]);
const isSubmitting = ref(false);

// 表单数据
const form = reactive({
  applicationType: '',
  name: '',
  gender: '',
  birthplace: '',
  education: '',
  occupation: '',
  workPosition: '',
  workPlace: '',
  hobby: '',
  address: '',
  contactType: '',
  contactValue: '',
  description: ''
});

// 错误信息
const errors = reactive({});

// 获取分类数据
onMounted(async () => {
  try {
    const response = await fetchSimilarCategories();
    categories.value = response.data;
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
});

// 验证表单
function validateForm() {
  errors.applicationType = !form.applicationType ? '请选择申请类型' : '';
  errors.name = !form.name ? '请输入姓名' : '';
  errors.gender = !form.gender ? '请选择性别' : '';
  errors.birthplace = !form.birthplace ? '请输入出生日期' : '';
  errors.education = !form.education ? '请选择学历' : '';
  errors.occupation = !form.occupation ? '请输入职业' : '';
  errors.workPosition = !form.workPosition ? '请输入工作岗位' : '';
  errors.workPlace = !form.workPlace ? '请输入工作地点' : '';
  errors.address = !form.address ? '请输入地址' : '';
  errors.contactType = !form.contactType ? '请选择联系方式类型' : '';
  errors.contactValue = !form.contactValue ? '请输入联系方式' : '';

  // 检查是否有错误
  return !Object.values(errors).some(error => error);
}

// 提交表单
async function submitForm() {
  if (!validateForm()) {
    // 滚动到第一个错误处
    const firstError = document.querySelector('.text-red-500');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  isSubmitting.value = true;

  try {
    // 调用API提交申请
    const response = await submitSimilarApplication(form);
    
    if (response.success) {
      // 成功后跳转到列表页
      alert('申请提交成功！');
      router.push('/content/similar-posts');
    } else {
      alert(response.message || '提交失败，请稍后重试');
    }
  } catch (error) {
    console.error('提交失败:', error);
    alert('提交失败，请稍后重试');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>
