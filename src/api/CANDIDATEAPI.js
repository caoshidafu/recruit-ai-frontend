import { get, post, put, del } from './index.js'

/**
 * 获取推荐候选人列表（统一接口）
 * 功能描述：根据不同推荐类型获取候选人列表，支持智能推荐、学历推荐、经验推荐
 * 入参：{ 
 *   type?: string,        // 推荐类型：'smart'(智能推荐-默认) | 'education'(学历推荐) | 'experience'(经验推荐)
 *   jobId?: number,       // 职位ID（可选）
 *   limit?: number,       // 限制数量
 *   minExperience?: number, // 最小经验年限（经验推荐时使用）
 *   maxExperience?: number, // 最大经验年限（经验推荐时使用）
 *   degree?: string       // 学历要求（学历推荐时使用）
 * }
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/recommend
 * 请求方式：GET
 */
export function getRecommendedCandidates(params = {}) {
  // 设置默认推荐类型为智能推荐
  const { type = 'smart', ...otherParams } = params
  return get('/candidates/recommend', { type, ...otherParams })
}

/**
 * 获取智能推荐候选人列表（兼容性保留）
 * 功能描述：根据算法推荐的候选人列表
 * 入参：{ jobId?: number, limit?: number } - 职位ID（可选）和限制数量
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/recommend?type=smart
 * 请求方式：GET
 */
export function getSmartCandidates(params = {}) {
  return getRecommendedCandidates({ ...params, type: 'smart' })
}

/**
 * 获取经验匹配候选人列表（兼容性保留）
 * 功能描述：根据工作经验匹配的候选人列表
 * 入参：{ jobId?: number, minExperience?: number, maxExperience?: number } - 筛选参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/recommend?type=experience
 * 请求方式：GET
 */
export function getExperienceCandidates(params = {}) {
  return getRecommendedCandidates({ ...params, type: 'experience' })
}

/**
 * 获取学历匹配候选人列表（兼容性保留）
 * 功能描述：根据学历背景匹配的候选人列表
 * 入参：{ jobId?: number, degree?: string } - 筛选参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/recommend?type=education
 * 请求方式：GET
 */
export function getEducationCandidates(params = {}) {
  return getRecommendedCandidates({ ...params, type: 'education' })
}

/**
 * 根据ID获取候选人详情
 * 功能描述：根据候选人ID获取详细的候选人信息
 * 入参：{ candidateId: number } - 候选人ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/detail/:id
 * 请求方式：GET
 */
export function getCandidateDetail(candidateId) {
  return get(`/candidates/detail/${candidateId}`)
}

/**
 * 创建候选人
 * 功能描述：创建一个新的候选人信息
 * 入参：{ name: string, title: string, experience: number, ... } - 候选人信息对象
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/create
 * 请求方式：POST
 */
export function createCandidate(candidateData) {
  return post('/candidates/create', candidateData)
}

/**
 * 更新候选人信息
 * 功能描述：根据候选人ID更新候选人信息
 * 入参：{ candidateId: number, ...candidateData } - 候选人ID和更新的候选人信息
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/update/:id
 * 请求方式：PUT
 */
export function updateCandidate(candidateId, candidateData) {
  return put(`/candidates/update/${candidateId}`, candidateData)
}

/**
 * 删除候选人
 * 功能描述：根据候选人ID删除候选人信息
 * 入参：{ candidateId: number } - 候选人ID
 * 返回参数：{ success: boolean, message: string }
 * url地址：/candidates/delete/:id
 * 请求方式：DELETE
 */
export function deleteCandidate(candidateId) {
  return del(`/candidates/delete/${candidateId}`)
}

/**
 * 搜索候选人
 * 功能描述：根据关键词和筛选条件搜索候选人
 * 入参：{ keyword?: string, skills?: Array, location?: string, experience?: number } - 搜索参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/search
 * 请求方式：GET
 */
export function searchCandidates(searchParams = {}) {
  return get('/candidates/search', searchParams)
}

/**
 * 获取候选人雷达图数据
 * 功能描述：获取候选人的能力雷达图分析数据
 * 入参：{ candidateId: number } - 候选人ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/:id/radar
 * 请求方式：GET
 */
export function getCandidateRadarData(candidateId) {
  return get(`/candidates/${candidateId}/radar`)
}

/**
 * 匹配候选人与职位
 * 功能描述：分析候选人与指定职位的匹配度
 * 入参：{ candidateId: number, jobId: number } - 候选人ID和职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/match
 * 请求方式：POST
 */
export function matchCandidateToJob(candidateId, jobId) {
  return post('/candidates/match', { candidateId, jobId })
}

/**
 * AI智能匹配候选人
 * 功能描述：基于AI算法为新创建的职位智能匹配候选人
 * 入参：{ jobId: number, analysisDepth?: string } - 职位ID和分析深度（'basic', 'detailed', 'comprehensive'）
 * 返回参数：{ success: boolean, data: Object, message: string }
 * data包含：{ candidates: Array, matchReasons: Object, confidenceScores: Object, recommendations: Array }
 * url地址：/candidates/ai-match
 * 请求方式：POST
 */
export function aiMatchCandidates(jobId, analysisDepth = 'detailed') {
  return post('/candidates/ai-match', { jobId, analysisDepth })
}