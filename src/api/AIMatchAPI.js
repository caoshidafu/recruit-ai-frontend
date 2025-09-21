import { get, post } from './index.js'

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






/**
* 获取匹配结果详细分析
* 功能描述：获取候选人匹配结果的详细分析报告
* 入参：{ 
*   matchId: string,       // 匹配结果ID
*   analysisLevel?: string // 分析级别：'basic' | 'detailed' | 'comprehensive'
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     matchDetails: object,  // 匹配详情
*     scoreBreakdown: object,// 分数分解
*     recommendations: array,// 推荐建议
*     riskAssessment: object // 风险评估
*   }, 
*   message: string 
* }
* url地址：/candidates/match-analysis?match_id={matchId}
* 请求方式：GET
*/
export function getMatchAnalysis(matchId, analysisLevel = 'detailed') {
  return get('/candidates/match-analysis', { match_id: matchId, analysisLevel })
}

/**
* 保存匹配结果
* 功能描述：保存AI匹配的候选人结果，便于后续管理
* 入参：{ 
*   userId: number,        // 用户ID
*   jobDescription: string,// 职位描述
*   matchResults: array,   // 匹配结果
*   matchType: string      // 匹配类型
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     savedMatchId: string // 保存的匹配ID
*   }, 
*   message: string 
* }
* url地址：/candidates/save-match-results
* 请求方式：POST
*/
export function saveMatchResults(data) {
  return post('/candidates/save-match-results', data)
}

/**
* 获取用户的匹配历史
* 功能描述：获取用户的候选人匹配历史记录
* 入参：{ 
*   userId: number,        // 用户ID
*   limit?: number,        // 限制数量
*   offset?: number        // 偏移量
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     matchHistory: array, // 匹配历史列表
*     total: number        // 总数量
*   }, 
*   message: string 
* }
* url地址：/candidates/match-history?user_id={userId}
* 请求方式：GET
*/
export function getUserMatchHistory(userId, params = {}) {
  return get('/candidates/match-history', { user_id: userId, ...params })
}

/**
* 重新匹配候选人
* 功能描述：基于已保存的匹配记录重新进行匹配
* 入参：{ 
*   savedMatchId: string,  // 保存的匹配ID
*   newFilters?: object    // 新的筛选条件
* }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/candidates/rematch
* 请求方式：POST
*/
export function rematchCandidates(savedMatchId, newFilters = {}) {
  return post('/candidates/rematch', { saved_match_id: savedMatchId, ...newFilters })
}

/**
* 比较候选人匹配度
* 功能描述：比较多个候选人对同一职位的匹配度
* 入参：{ 
*   jobDescription: string,// 职位描述
*   candidateIds: array    // 候选人ID数组
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     comparison: array,   // 比较结果
*     ranking: array       // 排名结果
*   }, 
*   message: string 
* }
* url地址：/candidates/compare-match
* 请求方式：POST
*/
export function compareCandidateMatch(jobDescription, candidateIds) {
  return post('/candidates/compare-match', { jobDescription, candidateIds })
}
