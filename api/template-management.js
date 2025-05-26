/**
 * 模板管理 API 服务
 */
export default {
  /**
   * 获取模板列表
   * @returns {Promise} - 返回模板列表数据
   */
  getTemplates() {
    return $fetch('/api/users/templates', {
      method: 'GET'
    })
  },

  /**
   * 创建新模板
   * @param {Object} data - 模板数据
   * @returns {Promise} - 返回创建结果
   */
  createTemplate(data) {
    return $fetch('/api/users/templates', {
      method: 'POST',
      body: data
    })
  },

  /**
   * 更新模板
   * @param {Number} id - 模板ID
   * @param {Object} data - 更新的模板数据
   * @returns {Promise} - 返回更新结果
   */
  updateTemplate(id, data) {
    return $fetch(`/api/users/templates/${id}`, {
      method: 'PUT',
      body: data
    })
  },

  /**
   * 删除模板
   * @param {Number} id - 模板ID
   * @returns {Promise} - 返回删除结果
   */
  deleteTemplate(id) {
    return $fetch(`/api/users/templates/${id}`, {
      method: 'DELETE'
    })
  },

  /**
   * 启用/禁用模板
   * @param {Number} id - 模板ID
   * @param {Boolean} enabled - 是否启用
   * @returns {Promise} - 返回操作结果
   */
  toggleTemplateStatus(id, enabled) {
    return $fetch(`/api/users/templates/${id}/status`, {
      method: 'PUT',
      body: { enabled }
    })
  }
}
