import { get, post } from './index.js'

/**
 * AI职位创建API
 * 基于AI技术的智能职位创建和管理接口
 */

/**
 * 接口一：获取职位卡片列表
 * 功能描述：根据user_id获取职位卡片和岗位详情列表
 * 入参：userId: number
 * 返回参数：{ success: boolean, data: { jobCards: array, total: number, userId: number }, message: string }
 * url地址：/jobs/list
 * 请求方式：GET
 */
export function getJobCardsList(userId) {
  return get('/jobs/list', { user_id: userId })
}

/**
 * 接口二：根据职位描述生成职位画像和岗位详情
 * 功能描述：根据user_id和职位描述生成职位画像和岗位详情，返回发布岗位id
 * 入参：{ userId: number, description: string }
 * 返回参数：{ success: boolean, data: { jobProfile: object, jobId: number }, message: string }
 * url地址：/jobs/generate-profile
 * 请求方式：POST
 */
export function generateJobProfile(userId, description) {
  return post('/jobs/generate-profile', { user_id: userId, description })
}
