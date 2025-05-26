/**
 * 企业入驻 API 服务
 */
export default {
  /**
   * 提交企业入驻申请
   * @param {Object} data - 企业入驻数据
   * @returns {Promise} - 返回提交结果
   */
  createEnterpriseRegistration(data) {
    return $fetch('/api/users/enterprise-registration', {
      method: 'POST',
      body: data
    })
  },

  /**
   * 获取企业入驻信息
   * @returns {Promise} - 返回企业入驻信息
   */
  getEnterpriseRegistration() {
    return $fetch('/api/users/enterprise-registration', {
      method: 'GET'
    })
  },

  /**
   * 更新企业入驻信息
   * @param {Object} data - 更新的企业入驻数据
   * @returns {Promise} - 返回更新结果
   */
  updateEnterpriseRegistration(data) {
    return $fetch('/api/users/enterprise-registration', {
      method: 'PUT',
      body: data
    })
  },

  /**
   * 验证企业
   * @param {String} verificationCode - 验证码
   * @returns {Promise} - 返回验证结果
   */
  verifyEnterprise(verificationCode) {
    return $fetch('/api/users/enterprise-registration/verify', {
      method: 'POST',
      body: { verification_code: verificationCode }
    })
  }
}
