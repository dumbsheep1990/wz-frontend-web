import { ref, computed } from 'vue'
import type { Site, Page, Section, Component, ComponentDefinition } from '../types/siteBuilder'

// 模拟生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function useSiteBuilder() {
  // 当前编辑的站点
  const currentSite = ref<Site | null>(null)
  // 当前编辑的页面
  const currentPage = ref<Page | null>(null)
  // 当前选中的元素
  const selectedElement = ref<{
    type: 'page' | 'section' | 'component',
    id: string
  } | null>(null)
  // 操作历史
  const undoStack = ref<Array<any>>([])
  const redoStack = ref<Array<any>>([])
  
  // 设置当前站点
  const setSite = (site: Site) => {
    currentSite.value = JSON.parse(JSON.stringify(site)) // 深拷贝
    if (site.pages.length > 0) {
      currentPage.value = site.pages[0]
    } else {
      currentPage.value = null
    }
    selectedElement.value = null
    // 清空历史
    undoStack.value = []
    redoStack.value = []
  }
  
  // 设置当前页面
  const setPage = (pageId: string) => {
    if (!currentSite.value) return
    
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (page) {
      currentPage.value = page
      selectedElement.value = { type: 'page', id: pageId }
    }
  }
  
  // 保存当前状态
  const saveState = () => {
    if (currentSite.value) {
      undoStack.value.push(JSON.stringify(currentSite.value))
      // 清空重做栈
      redoStack.value = []
    }
  }
  
  // 撤销
  const undo = () => {
    if (undoStack.value.length === 0 || !currentSite.value) return
    
    // 将当前状态保存到重做栈
    redoStack.value.push(JSON.stringify(currentSite.value))
    
    // 从撤销栈恢复状态
    const prevState = undoStack.value.pop()
    if (prevState) {
      currentSite.value = JSON.parse(prevState)
      
      // 更新当前页面
      if (currentPage.value) {
        const pageId = currentPage.value.id
        currentPage.value = currentSite.value.pages.find(p => p.id === pageId) || currentSite.value.pages[0]
      }
    }
  }
  
  // 重做
  const redo = () => {
    if (redoStack.value.length === 0 || !currentSite.value) return
    
    // 将当前状态保存到撤销栈
    undoStack.value.push(JSON.stringify(currentSite.value))
    
    // 从重做栈恢复状态
    const nextState = redoStack.value.pop()
    if (nextState) {
      currentSite.value = JSON.parse(nextState)
      
      // 更新当前页面
      if (currentPage.value) {
        const pageId = currentPage.value.id
        currentPage.value = currentSite.value.pages.find(p => p.id === pageId) || currentSite.value.pages[0]
      }
    }
  }
  
  // 添加新页面
  const addPage = (name: string, isHomepage: boolean = false) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 创建新页面
    const newPage: Page = {
      id: generateId(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      title: name,
      description: '',
      keywords: [],
      isHomepage,
      layout: 'default',
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // 如果是首页，将其他页面设置为非首页
    if (isHomepage) {
      currentSite.value.pages.forEach(page => {
        page.isHomepage = false
      })
    }
    
    // 添加到站点
    currentSite.value.pages.push(newPage)
    
    // 设置为当前页面
    currentPage.value = newPage
    selectedElement.value = { type: 'page', id: newPage.id }
    
    return newPage
  }
  
  // 删除页面
  const deletePage = (pageId: string) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面索引
    const index = currentSite.value.pages.findIndex(p => p.id === pageId)
    if (index === -1) return
    
    // 如果删除的是当前页面，选择另一个页面
    if (currentPage.value && currentPage.value.id === pageId) {
      // 选择另一个页面
      if (index < currentSite.value.pages.length - 1) {
        currentPage.value = currentSite.value.pages[index + 1]
      } else if (index > 0) {
        currentPage.value = currentSite.value.pages[index - 1]
      } else {
        currentPage.value = null
      }
      
      // 更新选中元素
      if (currentPage.value) {
        selectedElement.value = { type: 'page', id: currentPage.value.id }
      } else {
        selectedElement.value = null
      }
    }
    
    // 删除页面
    currentSite.value.pages.splice(index, 1)
  }
  
  // 添加区块
  const addSection = (pageId: string, sectionType: string, title: string = '') => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 创建新区块
    const newSection: Section = {
      id: generateId(),
      type: sectionType,
      title: title || `${sectionType} 区块`,
      components: [],
      settings: {},
      style: {}
    }
    
    // 添加到页面
    page.sections.push(newSection)
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
    
    // 选中新区块
    selectedElement.value = { type: 'section', id: newSection.id }
    
    return newSection
  }
  
  // 删除区块
  const deleteSection = (pageId: string, sectionId: string) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 找到区块索引
    const index = page.sections.findIndex(s => s.id === sectionId)
    if (index === -1) return
    
    // 删除区块
    page.sections.splice(index, 1)
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
    
    // 更新选中元素
    if (selectedElement.value && selectedElement.value.id === sectionId) {
      selectedElement.value = { type: 'page', id: pageId }
    }
  }
  
  // 添加组件
  const addComponent = (pageId: string, sectionId: string, compDef: ComponentDefinition) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 找到区块
    const section = page.sections.find(s => s.id === sectionId)
    if (!section) return
    
    // 创建新组件
    const newComponent: Component = {
      id: generateId(),
      type: compDef.type,
      name: compDef.name,
      settings: { ...compDef.defaultSettings },
      content: {},
      style: {}
    }
    
    // 添加到区块
    section.components.push(newComponent)
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
    
    // 选中新组件
    selectedElement.value = { type: 'component', id: newComponent.id }
    
    return newComponent
  }
  
  // 删除组件
  const deleteComponent = (pageId: string, sectionId: string, componentId: string) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 找到区块
    const section = page.sections.find(s => s.id === sectionId)
    if (!section) return
    
    // 找到组件索引
    const index = section.components.findIndex(c => c.id === componentId)
    if (index === -1) return
    
    // 删除组件
    section.components.splice(index, 1)
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
    
    // 更新选中元素
    if (selectedElement.value && selectedElement.value.id === componentId) {
      selectedElement.value = { type: 'section', id: sectionId }
    }
  }
  
  // 更新组件设置
  const updateComponentSettings = (pageId: string, sectionId: string, componentId: string, settings: Record<string, any>) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 找到区块
    const section = page.sections.find(s => s.id === sectionId)
    if (!section) return
    
    // 找到组件
    const component = section.components.find(c => c.id === componentId)
    if (!component) return
    
    // 更新设置
    component.settings = { ...component.settings, ...settings }
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
  }
  
  // 更新区块设置
  const updateSectionSettings = (pageId: string, sectionId: string, settings: Record<string, any>) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const page = currentSite.value.pages.find(p => p.id === pageId)
    if (!page) return
    
    // 找到区块
    const section = page.sections.find(s => s.id === sectionId)
    if (!section) return
    
    // 更新设置
    section.settings = { ...section.settings, ...settings }
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...page }
    }
  }
  
  // 更新页面设置
  const updatePageSettings = (pageId: string, settings: Partial<Page>) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 找到页面
    const pageIndex = currentSite.value.pages.findIndex(p => p.id === pageId)
    if (pageIndex === -1) return
    
    // 更新页面
    currentSite.value.pages[pageIndex] = {
      ...currentSite.value.pages[pageIndex],
      ...settings,
      updatedAt: new Date().toISOString()
    }
    
    // 如果设置为首页，将其他页面设置为非首页
    if (settings.isHomepage) {
      currentSite.value.pages.forEach((page, index) => {
        if (index !== pageIndex && page.isHomepage) {
          page.isHomepage = false
        }
      })
    }
    
    // 更新当前页面
    if (currentPage.value && currentPage.value.id === pageId) {
      currentPage.value = { ...currentSite.value.pages[pageIndex] }
    }
  }
  
  // 更新站点设置
  const updateSiteSettings = (settings: Partial<Site>) => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 更新站点
    currentSite.value = {
      ...currentSite.value,
      ...settings,
      updatedAt: new Date().toISOString()
    }
  }
  
  // 获取当前页面中的区块
  const currentSections = computed(() => {
    return currentPage.value?.sections || []
  })
  
  // 获取选中的元素
  const getSelectedElement = computed(() => {
    if (!selectedElement.value || !currentSite.value) return null
    
    if (selectedElement.value.type === 'page') {
      return currentSite.value.pages.find(p => p.id === selectedElement.value?.id)
    } else if (selectedElement.value.type === 'section' && currentPage.value) {
      return currentPage.value.sections.find(s => s.id === selectedElement.value?.id)
    } else if (selectedElement.value.type === 'component' && currentPage.value) {
      for (const section of currentPage.value.sections) {
        const component = section.components.find(c => c.id === selectedElement.value?.id)
        if (component) return component
      }
    }
    
    return null
  })
  
  // 选择元素
  const selectElement = (type: 'page' | 'section' | 'component', id: string) => {
    selectedElement.value = { type, id }
  }
  
  // 保存站点
  const saveSite = async () => {
    if (!currentSite.value) return
    
    // 更新时间戳
    currentSite.value.updatedAt = new Date().toISOString()
    
    // 这里应该调用API保存站点
    console.log('保存站点', currentSite.value)
    
    // 返回保存后的站点（模拟）
    return currentSite.value
  }
  
  // 发布站点
  const publishSite = async () => {
    if (!currentSite.value) return
    
    // 保存当前状态
    saveState()
    
    // 更新站点状态
    currentSite.value.status = 'published'
    currentSite.value.publishedAt = new Date().toISOString()
    currentSite.value.updatedAt = new Date().toISOString()
    
    // 这里应该调用API发布站点
    console.log('发布站点', currentSite.value)
    
    // 返回发布后的站点（模拟）
    return currentSite.value
  }
  
  return {
    currentSite,
    currentPage,
    selectedElement,
    currentSections,
    getSelectedElement,
    setSite,
    setPage,
    addPage,
    deletePage,
    addSection,
    deleteSection,
    addComponent,
    deleteComponent,
    updateComponentSettings,
    updateSectionSettings,
    updatePageSettings,
    updateSiteSettings,
    selectElement,
    saveState,
    undo,
    redo,
    saveSite,
    publishSite
  }
} 