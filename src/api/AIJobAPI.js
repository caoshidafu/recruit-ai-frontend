import { get, post, put } from './index'

/**
 * AI职位创建API
 * 基于AI技术的智能职位创建和管理接口
 */

/**
 * 根据职位描述生成职位信息
 * @description 使用AI分析职位描述，自动生成职位卡片和详情信息
 * @param {Object} data - 请求数据
 * @param {string} data.description - 职位描述文本
 * @param {number} data.userId - 用户ID
 * @param {Object} data.companyInfo - 可选的公司信息
 * @param {Object} data.options - 可选配置选项
 * @param {string} data.options.industry - 行业类型
 * @param {string} data.options.department - 部门
 * @param {string} data.options.urgency - 紧急程度 ('low', 'normal', 'high')
 * @param {number} data.options.headcount - 招聘人数
 * @returns {Promise<Object>} 返回生成的职位信息
 * @url POST /jobs/ai-create
 * @example
 * // 基础调用
 * createJobByDescription({
 *   description: "招聘高级前端工程师...",
 *   userId: 1
 * })
 * 
 * // 带完整选项的调用
 * createJobByDescription({
 *   description: "招聘高级前端工程师...",
 *   userId: 1,
 *   companyInfo: {
 *     name: "科技有限公司",
 *     industry: "互联网"
 *   },
 *   options: {
 *     department: "技术部",
 *     urgency: "high",
 *     headcount: 2
 *   }
 * })
 */
export function createJobByDescription(data) {
  // 参数验证
  if (!data.description || !data.userId) {
    throw new Error('职位描述和用户ID是必填参数')
  }

  // 标准化参数格式
  const requestData = {
    description: data.description.trim(),
    userId: Number(data.userId),
    companyInfo: data.companyInfo || {},
    options: {
      industry: 'tech',
      department: '技术部',
      urgency: 'normal',
      headcount: 1,
      ...data.options
    }
  }

  return post('/jobs/ai-create', requestData)
}

/**
 * 获取职位候选人和详情（已废弃，请使用统一接口）
 * @description 根据职位ID获取关联的候选人列表和职位详情信息
 * @param {string} jobId - 职位ID
 * @param {Object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.limit - 每页数量
 * @param {string} params.matchType - 匹配类型
 * @returns {Promise} 返回职位详情和候选人列表
 * @url GET /api/jobs/{jobId}/candidates-and-details
 * @deprecated 请使用 AIMatchAPI.getJobCandidatesWithMatching 统一接口
 */
export function getJobCandidatesAndDetails(jobId, params = {}) {
  return get(`/jobs/${jobId}/candidates-and-details`, params)
}

/**
 * 批量获取职位信息
 * @description 根据职位ID列表批量获取职位详情和候选人信息
 * @param {Array} jobIds - 职位ID列表
 * @param {Object} options - 可选配置
 * @returns {Promise} 返回批量职位信息
 * @url POST /api/jobs/batch-details
 */
export function getBatchJobCandidatesAndDetails(jobIds, options = {}) {
  return post('/jobs/batch-details', { jobIds, ...options })
}

/**
 * 更新AI生成的职位
 * @description 更新AI生成的职位信息
 * @param {string} jobId - 职位ID
 * @param {Object} updateData - 更新数据
 * @returns {Promise} 返回更新结果
 * @url PUT /api/jobs/{jobId}/ai-update
 */
export function updateAIGeneratedJob(jobId, updateData) {
  return put(`/jobs/${jobId}/ai-update`, updateData)
}

/**
 * 重新生成职位信息
 * @description 使用AI重新分析和生成职位信息
 * @param {string} jobId - 职位ID
 * @param {Object} options - 重新生成选项
 * @returns {Promise} 返回重新生成的职位信息
 * @url POST /api/jobs/{jobId}/ai-regenerate
 */
export function regenerateJobByAI(jobId, options = {}) {
  return post(`/jobs/${jobId}/ai-regenerate`, options)
}

/**
 * 获取AI职位生成历史
 * @description 获取用户的AI职位生成历史记录
 * @param {string} userId - 用户ID
 * @param {Object} params - 查询参数
 * @returns {Promise} 返回生成历史
 * @url GET /api/jobs/ai-history
 */
export function getAIJobHistory(userId, params = {}) {
  return get('/jobs/ai-history', { userId, ...params })
}
