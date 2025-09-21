import { post } from './index.js'

/**
 * AI匹配API
 * 基于AI技术的智能候选人匹配接口
 */

/**
* 根据发布岗位id获取候选人列表
* 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）
* 入参：{ jobId: number, userId: number, type?: string }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/candidates/by-job
* 请求方式：POST
*/
export function getCandidatesByJobId(jobId, userId, type = '智能匹配') {
  return post('/candidates/by-job', { job_id: jobId, user_id: userId, type })
}