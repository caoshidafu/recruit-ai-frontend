import { get, post } from './index'

/**
 * AI职位创建API
 * 基于AI技术的智能职位创建和管理接口
 */

/**
 * 获取职位卡片列表
 * 功能描述：根据发布岗位id和user_id获取职位卡片列表
 * 入参：jobId: number, userId: number
 * 返回参数：{ success: boolean, data: object, message: string }
 * url地址：/jobs/cards
 * 请求方式：GET
 */
export function getJobCards(jobId, userId) {
  return get('/jobs/cards', { job_id: jobId, user_id: userId })
}

/**
 * 根据职位描述生成职位画像和岗位详情
 * 功能描述：根据user_id和职位描述生成职位画像和岗位详情
 * 入参：{ userId: number, description: string }
 * 返回参数：{ success: boolean, data: object, message: string }
 * url地址：/jobs/generate-profile
 * 请求方式：POST
 */
export function generateJobProfile(userId, description) {
  return post('/jobs/generate-profile', { user_id: userId, description })
}
