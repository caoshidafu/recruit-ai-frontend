import { post } from './index.js'
import { getRecommendCandidateList } from './RecruitAPI.js'

/**
 * AI匹配API
 * 基于AI技术的智能候选人匹配接口
 */

/**
 * 接口三：根据发布岗位id获取候选人列表
 * 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）
 * 入参：{ jobId: number, userId: number, type?: string }
 * 返回参数：{ success: boolean, data: { candidates: array, total: number, matchingInfo: object, jobDetail: object, userId: number }, message: string }
 * url地址：/candidates/match
 * 请求方式：POST
 */
export function getCandidatesByJobId(jobId, userId, type = '智能匹配') {
  return post('/candidates/match', { job_id: jobId, user_id: userId, type })
}

/**
 * 获取候选人AI分析（使用真实接口数据）
 * 功能描述：根据职位ID获取推荐候选人列表，并提取特定候选人的AI分析数据
 * 入参：{ positionId: number, resumeId: number }
 * 返回参数：基于真实接口返回的候选人AI分析数据
 * url地址：通过RecruitAPI.getRecommendCandidateList获取
 * 请求方式：GET
 */
export function getCandidateAIAnalysis(positionId, resumeId) {
  return getRecommendCandidateList(positionId).then(response => {
    if (response.code === 0 && response.data) {
      // 从候选人列表中找到指定的候选人
      const candidate = response.data.find(item => item.resumeId === resumeId)
      
      if (candidate) {
        // 将真实接口数据转换为组件所需的格式
        return {
          code: 0,
          message: "成功",
          data: {
            overallScore: candidate.matchScore || 0,
            recommendation: candidate.recommendReason || "",
            strengths: candidate.positiveLabels || [],
            improvements: candidate.negativeLabels || [],
            jobMatching: {
              eduBackgroundScore: candidate.eduBackgroundScore || 0,
              skillMatchScore: candidate.skillMatchScore || 0,
              projectExperienceScore: candidate.projectExperienceScore || 0,
              stabilityScore: candidate.stabilityScore || 0,
              developmentPotentialScore: candidate.developmentPotentialScore || 0
            },
            candidateInfo: {
              resumeId: candidate.resumeId,
              name: candidate.name,
              workYears: candidate.workYears,
              workLocation: candidate.workLocation,
              workExperience: candidate.workExperience || [],
              eduExperience: candidate.eduExperience || []
            }
          }
        }
      } else {
        throw new Error('候选人信息未找到')
      }
    } else {
      throw new Error(response.message || '获取候选人数据失败')
    }
  })
}

/**
 * 接口四：获取候选人AI分析（保留原有mock接口）
 * 功能描述：根据候选人ID获取AI智能分析报告，包含能力评估、匹配度分析等
 * 入参：{ candidateId: number, userId: number }
 * 返回参数：{ success: boolean, data: { overallScore: number, recommendation: string, strengths: array, improvements: array, jobMatching: object, recommendedActions: array }, message: string }
 * url地址：/candidates/ai-analysis
 * 请求方式：POST
 */
export function getCandidateAIAnalysisMock(candidateId, userId) {
  return post('/candidates/ai-analysis', { candidate_id: candidateId, user_id: userId })
}