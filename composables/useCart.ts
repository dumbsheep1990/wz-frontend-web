import { ref, computed, watch } from 'vue'
import type { Product } from '../types/market'

export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  quantity: number
  image?: string
  companyId: number
  companyName: string
}

/**
 * 购物车相关功能的组合式函数
 */
export function useCart() {
  // 购物车数据
  const cartItems = ref<CartItem[]>([])
  
  // 购物车商品总数
  const cartItemCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  // 购物车商品总价
  const cartTotalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })
  
  // 加载购物车数据
  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart)
    }
  }
  
  // 保存购物车数据
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }
  
  // 监听购物车变化，自动保存
  watch(cartItems.value, () => {
    saveCart()
  }, { deep: true })
  
  // 添加商品到购物车
  const addToCart = (product: Product, quantity: number = 1) => {
    // 检查产品是否已经在购物车中
    const existingItem = cartItems.value.find(item => item.productId === product.id)
    
    if (existingItem) {
      // 如果已存在，增加数量
      existingItem.quantity += quantity
    } else {
      // 如果不存在，添加新项目
      const cartItem: CartItem = {
        id: Date.now(), // 生成唯一ID
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0],
        companyId: product.companyId,
        companyName: product.companyName
      }
      
      cartItems.value.push(cartItem)
    }
    
    // 保存购物车
    saveCart()
    
    return cartItems.value
  }
  
  // 更新购物车项数量
  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === itemId)
    
    if (item) {
      item.quantity = quantity
      
      // 如果数量为0，删除该项
      if (quantity <= 0) {
        removeCartItem(itemId)
      } else {
        saveCart()
      }
    }
    
    return cartItems.value
  }
  
  // 从购物车中移除项目
  const removeCartItem = (itemId: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== itemId)
    saveCart()
    
    return cartItems.value
  }
  
  // 清空购物车
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }
  
  // 初始化时加载购物车
  loadCart()
  
  return {
    cartItems,
    cartItemCount,
    cartTotalPrice,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart
  }
} 