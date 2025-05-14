import { ref, computed, watch } from 'vue'
import type { Product } from '../types/market'

/**
 * 产品对比功能的组合式函数
 */
export function useCompare() {
  // 对比列表
  const compareList = ref<Product[]>([])
  
  // 最大对比数量
  const maxCompareCount = 4
  
  // 对比列表中产品数量
  const compareCount = computed(() => compareList.value.length)
  
  // 是否可以添加产品到对比列表
  const canAddToCompare = computed(() => compareCount.value < maxCompareCount)
  
  // 加载对比列表
  const loadCompareList = () => {
    const savedList = localStorage.getItem('compareList')
    if (savedList) {
      try {
        const parsedList = JSON.parse(savedList)
        // 确保只保留最大数量
        compareList.value = parsedList.slice(0, maxCompareCount)
      } catch (e) {
        console.error('加载对比列表失败:', e)
        compareList.value = []
      }
    }
  }
  
  // 保存对比列表
  const saveCompareList = () => {
    localStorage.setItem('compareList', JSON.stringify(compareList.value))
  }
  
  // 监听对比列表变化，自动保存
  watch(compareList.value, () => {
    saveCompareList()
  }, { deep: true })
  
  // 添加产品到对比列表
  const addToCompare = (product: Product): boolean => {
    // 检查产品是否已在对比列表中
    const exists = compareList.value.some(item => item.id === product.id)
    if (exists) {
      return false
    }
    
    // 检查是否达到最大数量
    if (compareList.value.length >= maxCompareCount) {
      return false
    }
    
    // 添加到对比列表
    compareList.value.push(product)
    saveCompareList()
    
    return true
  }
  
  // 从对比列表中移除产品
  const removeFromCompare = (productId: number): boolean => {
    const initialLength = compareList.value.length
    compareList.value = compareList.value.filter(item => item.id !== productId)
    
    // 检查是否有产品被移除
    const removed = initialLength > compareList.value.length
    
    if (removed) {
      saveCompareList()
    }
    
    return removed
  }
  
  // 清空对比列表
  const clearCompareList = () => {
    compareList.value = []
    saveCompareList()
  }
  
  // 检查产品是否在对比列表中
  const isInCompareList = (productId: number): boolean => {
    return compareList.value.some(item => item.id === productId)
  }
  
  // 初始化时加载对比列表
  loadCompareList()
  
  return {
    compareList,
    compareCount,
    maxCompareCount,
    canAddToCompare,
    addToCompare,
    removeFromCompare,
    clearCompareList,
    isInCompareList
  }
} 