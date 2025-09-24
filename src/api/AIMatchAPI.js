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
        // 将真实接口数据转换为AI分析组件所需的格式
        return {
          success: true,
          data: {
            // 整体评分（使用匹配分数）
            overallScore: candidate.matchScore || 0,
            
            // AI推荐意见（使用推荐理由）
            recommendation: candidate.recommendReason || "该候选人具有良好的综合素质，值得进一步考虑。",
            
            // 优势标签（正向标签）
            strengths: candidate.positiveLabels || [],
            
            // 改进建议（负向标签）
            improvements: candidate.negativeLabels || [],
            
            // 各维度匹配度评分
            jobMatching: {
              eduBackgroundScore: candidate.eduBackgroundScore || 0, // 学历背景分
              skillMatchScore: candidate.skillMatchScore || 0, // 技能匹配分
              projectExperienceScore: candidate.projectExperienceScore || 0, // 项目经验分
              stabilityScore: candidate.stabilityScore || 0, // 稳定性分
              developmentPotentialScore: candidate.developmentPotentialScore || 0 // 发展潜力分
            },
            
            // 候选人详细信息
            candidateInfo: {
              resumeId: candidate.resumeId,
              name: candidate.name, // candidate.name
              workYears: candidate.workYears, // candidate.experience
              title: candidate.title, // candidate.title
              workLocation: candidate.workLocation, // candidate.location
              
              // 工作经历
              workExperience: (candidate.workExperience || []).map(work => ({
                companyName: work.companyName || '',
                positionName: work.positionName || '',
                workTimeBucket: work.workTimeBucket || '',
                detailedIntroduction: work.detailedIntroduction || '',
                startDate: work.startDate || '',
                endDate: work.endDate || ''
              })),
              
              // 教育经历
              eduExperience: (candidate.eduExperience || []).map(edu => ({
                schoolName: edu.schoolName || '',
                degreeName: edu.degreeName || '',
                majorName: edu.majorName || '',
                startDate: edu.startDate || '',
                endDate: edu.endDate || ''
              }))
            },
            
            // 推荐行动建议（基于现有数据生成）
            recommendedActions: [
              {
                action: "安排初步沟通",
                reason: `该候选人匹配度为${candidate.matchScore || 0}%，建议优先安排沟通`,
                priority: candidate.matchScore >= 80 ? "high" : candidate.matchScore >= 60 ? "medium" : "low"
              },
              {
                action: "技能深度评估", 
                reason: `技能匹配分数为${candidate.skillMatchScore || 0}分，需要进一步评估技术能力`,
                priority: "medium"
              },
              {
                action: "背景调查",
                reason: `稳定性评分为${candidate.stabilityScore || 0}分，建议了解工作稳定性`,
                priority: candidate.stabilityScore < 70 ? "high" : "low"
              }
            ]
          },
          message: '候选人AI分析获取成功'
        }
      } else {
        return {
          success: false,
          data: null,
          message: '候选人信息未找到'
        }
      }
    } else {
      return {
        success: false, 
        data: null,
        message: response?.message || '获取候选人数据失败'
      }
    }
  }).catch(error => {
    console.error('获取候选人AI分析失败:', error)
    return {
      success: false,
      data: null,
      message: error.message || '获取候选人AI分析失败'
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