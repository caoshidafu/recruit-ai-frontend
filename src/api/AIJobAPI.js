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
 * @param {string} data.user_id - 用户ID
 * @param {Object} data.options - 可选配置
 * @returns {Promise} 返回生成的职位信息
 * @url POST /api/jobs/ai-create
 */
export function createJobByDescription(data) {
  return post('/jobs/ai-create', data)
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
