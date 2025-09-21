import { get, post } from './index.js'

/**
* 根据用户输入的职位描述匹配候选人（默认智能匹配，携带type）
* 功能描述：基于用户输入的职位描述，使用AI技术匹配最适合的候选人
* 入参：{ 
*   description: string,   // 职位描述文本
*   matchType?: string,    // 匹配类型：'smart'(默认智能匹配) | 'skill' | 'experience' | 'education'
*   limit?: number,        // 限制返回候选人数量，默认10
*   filters?: object       // 额外的筛选条件
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     candidates: array,     // 匹配的候选人列表
*     matchAnalysis: object, // 匹配分析结果
*     suggestions: array     // 优化建议
*   }, 
*   message: string 
* }
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function matchCandidatesByDescription(data) {
  const { matchType = 'smart', ...otherData } = data
  return post('/candidates/ai-match-by-description', { 
    matchType, 
    ...otherData 
  })
}

/**
* 智能匹配候选人（快捷方法）
* 功能描述：使用智能算法匹配候选人的快捷方法
* 入参：{ 
*   description: string,   // 职位描述
*   limit?: number,        // 限制数量
*   filters?: object       // 筛选条件
* }
* 返回参数：同 matchCandidatesByDescription
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function smartMatchCandidates(description, options = {}) {
  return matchCandidatesByDescription({
    description,
    matchType: 'smart',
    ...options
  })
}

/**
* 技能匹配候选人
* 功能描述：基于技能要求匹配候选人
* 入参：{ 
*   description: string,   // 职位描述
*   requiredSkills?: array,// 必需技能
*   limit?: number         // 限制数量
* }
* 返回参数：同 matchCandidatesByDescription
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function skillMatchCandidates(description, options = {}) {
  return matchCandidatesByDescription({
    description,
    matchType: 'skill',
    ...options
  })
}

/**
* 经验匹配候选人
* 功能描述：基于工作经验匹配候选人
* 入参：{ 
*   description: string,   // 职位描述
*   experienceRange?: object, // 经验年限范围
*   limit?: number         // 限制数量
* }
* 返回参数：同 matchCandidatesByDescription
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function experienceMatchCandidates(description, options = {}) {
  return matchCandidatesByDescription({
    description,
    matchType: 'experience',
    ...options
  })
}

/**
* 学历匹配候选人
* 功能描述：基于学历背景匹配候选人
* 入参：{ 
*   description: string,   // 职位描述
*   educationRequirement?: string, // 学历要求
*   limit?: number         // 限制数量
* }
* 返回参数：同 matchCandidatesByDescription
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function educationMatchCandidates(description, options = {}) {
  return matchCandidatesByDescription({
    description,
    matchType: 'education',
    ...options
  })
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
* url地址：/candidates/match-analysis/{matchId}
* 请求方式：GET
*/
export function getMatchAnalysis(matchId, analysisLevel = 'detailed') {
  return get(`/candidates/match-analysis/${matchId}`, { analysisLevel })
}

/**
* 保存匹配结果
* 功能描述：保存AI匹配的候选人结果，便于后续管理
* 入参：{ 
*   userId: string,        // 用户ID
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
*   userId: string,        // 用户ID
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
* url地址：/candidates/match-history/{userId}
* 请求方式：GET
*/
export function getUserMatchHistory(userId, params = {}) {
  return get(`/candidates/match-history/${userId}`, params)
}

/**
* 重新匹配候选人
* 功能描述：基于已保存的匹配记录重新进行匹配
* 入参：{ 
*   savedMatchId: string,  // 保存的匹配ID
*   newFilters?: object    // 新的筛选条件
* }
* 返回参数：同 matchCandidatesByDescription
* url地址：/candidates/rematch/{savedMatchId}
* 请求方式：POST
*/
export function rematchCandidates(savedMatchId, newFilters = {}) {
  return post(`/candidates/rematch/${savedMatchId}`, newFilters)
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
