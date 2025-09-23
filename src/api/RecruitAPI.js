import { get, post } from './index.js'

/**
 * 招聘系统真实API
 * 基于后端接口文档的真实接口调用
 */

/**
 * 查询职位列表
 * 功能描述：获取的职位列表信息
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/api/v1/open/hackthon/position/list
 * 请求方式：GET
 */
export function getPositionList() {
  return get('/api/v1/open/hackthon/position/list')
}

/**
 * 查询推荐候选人列表
 * 功能描述：根据职位ID获取推荐的候选人列表
 * 入参：{ positionId: number }
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/api/v1/open/hackthon/recommend/candidate/list
 * 请求方式：GET
 */
export function getRecommendCandidateList(positionId) {
  return get('/api/v1/open/hackthon/recommend/candidate/list', { positionId })
}

/**
 * 创建推荐职位
 * 功能描述：创建新的推荐职位
 * 入参：{ positionName: string, positionDescription: string, positionDemand: string }
 * 返回参数：{ code: number, message: string, data: { positionId: number } }
 * url地址：/api/v1/open/hackthon/recommend/position/create
 * 请求方式：POST
 */
export function createRecommendPosition(positionData) {
  return post('/api/v1/open/hackthon/recommend/position/create', positionData)
}
