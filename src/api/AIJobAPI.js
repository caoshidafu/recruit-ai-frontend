import { get, post, put } from './index'

/**
 * AI职位创建API
 * 基于AI技术的智能职位创建和管理接口
 */

/**
 * 根据职位描述生成职位信息
 * 功能描述：使用AI分析职位描述，自动生成职位卡片和详情信息
 * 入参：{ description: string, userId: number }
 * 返回参数：{ success: boolean, data: object, message: string }
 * url地址：/jobs/ai-create
 * 请求方式：POST
 */
export function createJobByDescription(description, userId) {
  return post('/jobs/ai-create', { description, userId })
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
 * @url GET /api/jobs/ai-history?user_id={userId}
 */
export function getAIJobHistory(userId, params = {}) {
  return get('/jobs/ai-history', { user_id: userId, ...params })
}
