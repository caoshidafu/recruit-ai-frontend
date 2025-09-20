import { get, post, put, del } from './index.js'

/**
 * 获取职位列表
 * 功能描述：获取所有可用的职位信息列表
 * 入参：无
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/jobs/list
 * 请求方式：GET
 */
export function getJobList() {
  return get('/jobs/list')
}

/**
 * 根据ID获取职位详情
 * 功能描述：根据职位ID获取详细的职位信息
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/detail/:id
 * 请求方式：GET
 */
export function getJobDetail(jobId) {
  return get(`/jobs/detail/${jobId}`)
}

/**
 * 创建新职位
 * 功能描述：创建一个新的职位信息
 * 入参：{ title: string, department: string, location: string, ... } - 职位信息对象
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/create
 * 请求方式：POST
 */
export function createJob(jobData) {
  return post('/jobs/create', jobData)
}

/**
 * 更新职位信息
 * 功能描述：根据职位ID更新职位信息
 * 入参：{ jobId: number, ...jobData } - 职位ID和更新的职位信息
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/update/:id
 * 请求方式：PUT
 */
export function updateJob(jobId, jobData) {
  return put(`/jobs/update/${jobId}`, jobData)
}

/**
 * 删除职位
 * 功能描述：根据职位ID删除职位信息
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, message: string }
 * url地址：/jobs/delete/:id
 * 请求方式：DELETE
 */
export function deleteJob(jobId) {
  return del(`/jobs/delete/${jobId}`)
}

/**
 * 获取职位候选人统计
 * 功能描述：获取指定职位的候选人数量统计信息
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/:id/candidates/stats
 * 请求方式：GET
 */
export function getJobCandidateStats(jobId) {
  return get(`/jobs/${jobId}/candidates/stats`)
}

/**
 * 搜索职位
 * 功能描述：根据关键词搜索职位
 * 入参：{ keyword: string, department?: string, location?: string } - 搜索参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/jobs/search
 * 请求方式：GET
 */
export function searchJobs(searchParams) {
  return get('/jobs/search', searchParams)
}

/**
 * AI解析职位描述
 * 功能描述：使用AI技术解析原始职位描述，提取结构化信息
 * 入参：{ description: string } - 原始职位描述文本
 * 返回参数：{ success: boolean, data: Object, message: string }
 * data包含：{ skills: Array, requirements: Array, benefits: Array, experience: string, education: string }
 * url地址：/jobs/ai-parse
 * 请求方式：POST
 */
export function parseJobDescription(description) {
  return post('/jobs/ai-parse', { description })
}

/**
 * 分析职位需求
 * 功能描述：分析已创建职位的详细需求和匹配标准
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * data包含：{ matchCriteria: Object, skillWeights: Object, recommendationStrategy: string }
 * url地址：/jobs/analyze/:id
 * 请求方式：POST
 */
export function analyzeJobRequirements(jobId) {
  return post(`/jobs/analyze/${jobId}`)
}