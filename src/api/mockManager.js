// API管理器 - 统一管理真实API和Mock API的调用
import * as JobAPI from './JobAPI.js'
import * as CandidateAPI from './CandidateAPI.js'
import * as AIJobAPI from './AIJobAPI.js'
import * as UserAPI from './UserAPI.js'
import * as AIMatchAPI from './AIMatchAPI.js'
import * as MockAPI from './MockAPI.js'

// ==================== API配置 ====================

// 判断是否使用Mock数据
// 在开发环境默认使用Mock数据，生产环境需要配置环境变量
const USE_MOCK = process.env.VUE_APP_USE_MOCK !== 'false' && (process.env.NODE_ENV === 'development' || process.env.VUE_APP_USE_MOCK === 'true')

/**
 * API调用管理器
 * 根据环境配置自动切换真实API和Mock API
 */
class APIManager {
  constructor() {
    this.useMock = USE_MOCK
  }

  // ==================== 职位相关API ====================

  /**
   * 获取职位列表
   */
  async getJobList() {
    if (this.useMock) {
      return await MockAPI.mockGetJobList()
    } else {
      return await JobAPI.getJobList()
    }
  }

  /**
   * 根据ID获取职位详情
   */
  async getJobDetail(jobId) {
    if (this.useMock) {
      return await MockAPI.mockGetJobDetail(jobId)
    } else {
      return await JobAPI.getJobDetail(jobId)
    }
  }

  /**
   * 创建新职位
   */
  async createJob(jobData) {
    if (this.useMock) {
      return await MockAPI.mockCreateJob(jobData)
    } else {
      return await JobAPI.createJob(jobData)
    }
  }

  /**
   * 更新职位信息
   */
  async updateJob(jobId, jobData) {
    if (this.useMock) {
      // Mock环境暂不实现更新功能
      return { success: true, message: 'Mock update success' }
    } else {
      return await JobAPI.updateJob(jobId, jobData)
    }
  }

  /**
   * 删除职位
   */
  async deleteJob(jobId) {
    if (this.useMock) {
      // Mock环境暂不实现删除功能
      return { success: true, message: 'Mock delete success' }
    } else {
      return await JobAPI.deleteJob(jobId)
    }
  }

  /**
   * AI解析职位描述
   */
  async parseJobDescription(description) {
    if (this.useMock) {
      return await MockAPI.mockParseJobDescription(description)
    } else {
      return await JobAPI.parseJobDescription(description)
    }
  }

  /**
   * 分析职位需求
   */
  async analyzeJobRequirements(jobId) {
    if (this.useMock) {
      return await MockAPI.mockAnalyzeJobRequirements(jobId)
    } else {
      return await JobAPI.analyzeJobRequirements(jobId)
    }
  }

  /**
   * 获取职位候选人统计
   */
  async getJobCandidateStats(jobId) {
    if (this.useMock) {
      return await MockAPI.mockGetJobCandidateStats(jobId)
    } else {
      return await JobAPI.getJobCandidateStats(jobId)
    }
  }

  /**
   * 搜索职位
   */
  async searchJobs(searchParams) {
    if (this.useMock) {
      // Mock环境暂不实现搜索功能
      return { success: true, data: [], message: 'Mock search not implemented' }
    } else {
      return await JobAPI.searchJobs(searchParams)
    }
  }

  // ==================== 候选人相关API ====================

  /**
   * 获取智能推荐候选人列表
   */
  async getSmartCandidates(params = {}) {
    if (this.useMock) {
      return await MockAPI.mockGetSmartCandidates(params)
    } else {
      return await CandidateAPI.getSmartCandidates(params)
    }
  }

  /**
   * 获取经验匹配候选人列表
   */
  async getExperienceCandidates(params = {}) {
    if (this.useMock) {
      return await MockAPI.mockGetExperienceCandidates(params)
    } else {
      return await CandidateAPI.getExperienceCandidates(params)
    }
  }

  /**
   * 获取学历匹配候选人列表
   */
  async getEducationCandidates(params = {}) {
    if (this.useMock) {
      return await MockAPI.mockGetEducationCandidates(params)
    } else {
      return await CandidateAPI.getEducationCandidates(params)
    }
  }

  /**
   * 根据ID获取候选人详情
   */
  async getCandidateDetail(candidateId) {
    if (this.useMock) {
      return await MockAPI.mockGetCandidateDetail(candidateId)
    } else {
      return await CandidateAPI.getCandidateDetail(candidateId)
    }
  }

  /**
   * 创建候选人
   */
  async createCandidate(candidateData) {
    if (this.useMock) {
      // Mock环境暂不实现创建功能
      return { success: true, message: 'Mock create success' }
    } else {
      return await CandidateAPI.createCandidate(candidateData)
    }
  }

  /**
   * 更新候选人信息
   */
  async updateCandidate(candidateId, candidateData) {
    if (this.useMock) {
      // Mock环境暂不实现更新功能
      return { success: true, message: 'Mock update success' }
    } else {
      return await CandidateAPI.updateCandidate(candidateId, candidateData)
    }
  }

  /**
   * 删除候选人
   */
  async deleteCandidate(candidateId) {
    if (this.useMock) {
      // Mock环境暂不实现删除功能
      return { success: true, message: 'Mock delete success' }
    } else {
      return await CandidateAPI.deleteCandidate(candidateId)
    }
  }

  /**
   * 搜索候选人
   */
  async searchCandidates(searchParams = {}) {
    if (this.useMock) {
      return await MockAPI.mockSearchCandidates(searchParams)
    } else {
      return await CandidateAPI.searchCandidates(searchParams)
    }
  }

  /**
   * 获取候选人雷达图数据
   */
  async getCandidateRadarData(candidateId) {
    if (this.useMock) {
      return await MockAPI.mockGetCandidateRadarData(candidateId)
    } else {
      return await CandidateAPI.getCandidateRadarData(candidateId)
    }
  }

  /**
   * 匹配候选人与职位
   */
  async matchCandidateToJob(candidateId, jobId) {
    if (this.useMock) {
      // Mock环境暂不实现匹配功能
      return { success: true, data: { matchScore: 85 }, message: 'Mock match success' }
    } else {
      return await CandidateAPI.matchCandidateToJob(candidateId, jobId)
    }
  }

  /**
   * AI智能匹配候选人
   */
  async aiMatchCandidates(jobId, analysisDepth = 'detailed') {
    if (this.useMock) {
      return await MockAPI.mockAiMatchCandidates(jobId, analysisDepth)
    } else {
      return await CandidateAPI.aiMatchCandidates(jobId, analysisDepth)
    }
  }

  /**
   * 获取候选人AI分析报告
   */
  async getCandidateAIAnalysis(candidateId, analysisType = 'detailed') {
    if (this.useMock) {
      return await MockAPI.mockGetCandidateAIAnalysis(candidateId, analysisType)
    } else {
      return await CandidateAPI.getCandidateAIAnalysis(candidateId, analysisType)
    }
  }

  // ==================== 新增：AI职位创建相关API ====================

  /**
   * 根据用户输入的职位描述生成职位卡片和岗位详情
   */
  async createJobByDescription(data) {
    if (this.useMock) {
      return await MockAPI.mockCreateJobByDescription(data)
    } else {
      return await AIJobAPI.createJobByDescription(data)
    }
  }

  /**
   * 根据发布新岗位id获取候选人信息以及岗位详情信息
   */
  async getJobCandidatesAndDetails(jobId) {
    if (this.useMock) {
      return await MockAPI.mockGetJobCandidatesAndDetails(jobId)
    } else {
      return await AIJobAPI.getJobCandidatesAndDetails(jobId)
    }
  }

  /**
   * 批量获取职位的候选人和详情信息
   */
  async getBatchJobCandidatesAndDetails(jobIds) {
    if (this.useMock) {
      // Mock环境暂不实现批量获取功能
      return { success: true, data: [], message: 'Mock batch get not implemented' }
    } else {
      return await AIJobAPI.getBatchJobCandidatesAndDetails(jobIds)
    }
  }

  /**
   * 更新AI生成的职位信息
   */
  async updateAIGeneratedJob(jobId, updateData) {
    if (this.useMock) {
      // Mock环境暂不实现更新功能
      return { success: true, message: 'Mock AI update success' }
    } else {
      return await AIJobAPI.updateAIGeneratedJob(jobId, updateData)
    }
  }

  /**
   * 重新生成职位信息
   */
  async regenerateJobByAI(jobId, options = {}) {
    if (this.useMock) {
      // Mock环境暂不实现重新生成功能
      return { success: true, message: 'Mock AI regenerate success' }
    } else {
      return await AIJobAPI.regenerateJobByAI(jobId, options)
    }
  }

  /**
   * 获取AI职位生成历史
   */
  async getAIJobGenerationHistory(params) {
    if (this.useMock) {
      // Mock环境暂不实现历史功能
      return { success: true, data: { history: [], total: 0 }, message: 'Mock history not implemented' }
    } else {
      return await AIJobAPI.getAIJobGenerationHistory(params)
    }
  }

  // ==================== 新增：用户相关API ====================

  /**
   * 根据用户id返回关联的职位卡片和岗位详情list
   */
  async getUserJobs(userId, params = {}) {
    if (this.useMock) {
      return await MockAPI.mockGetUserJobs(userId, params)
    } else {
      return await UserAPI.getUserJobs(userId, params)
    }
  }

  /**
   * 获取用户职位统计信息
   */
  async getUserJobStats(userId) {
    if (this.useMock) {
      return await MockAPI.mockGetUserJobStats(userId)
    } else {
      return await UserAPI.getUserJobStats(userId)
    }
  }

  /**
   * 更新用户职位状态
   */
  async updateUserJobsStatus(userId, jobIds, status) {
    if (this.useMock) {
      // Mock环境暂不实现更新功能
      return { success: true, message: 'Mock status update success' }
    } else {
      return await UserAPI.updateUserJobsStatus(userId, jobIds, status)
    }
  }

  /**
   * 删除用户职位
   */
  async deleteUserJobs(userId, jobIds) {
    if (this.useMock) {
      // Mock环境暂不实现删除功能
      return { success: true, message: 'Mock delete success' }
    } else {
      return await UserAPI.deleteUserJobs(userId, jobIds)
    }
  }

  /**
   * 获取用户最近活动
   */
  async getUserRecentActivities(userId, params = {}) {
    if (this.useMock) {
      // Mock环境暂不实现活动功能
      return { success: true, data: { activities: [], hasMore: false }, message: 'Mock activities not implemented' }
    } else {
      return await UserAPI.getUserRecentActivities(userId, params)
    }
  }

  /**
   * 获取用户偏好设置
   */
  async getUserPreferences(userId) {
    if (this.useMock) {
      // Mock环境暂不实现偏好功能
      return { success: true, data: {}, message: 'Mock preferences not implemented' }
    } else {
      return await UserAPI.getUserPreferences(userId)
    }
  }

  /**
   * 更新用户偏好设置
   */
  async updateUserPreferences(userId, preferences) {
    if (this.useMock) {
      // Mock环境暂不实现偏好功能
      return { success: true, message: 'Mock preferences update success' }
    } else {
      return await UserAPI.updateUserPreferences(userId, preferences)
    }
  }

  // ==================== 新增：AI匹配相关API ====================

  /**
   * 根据用户输入的职位描述匹配候选人
   */
  async matchCandidatesByDescription(data) {
    if (this.useMock) {
      return await MockAPI.mockMatchCandidatesByDescription(data)
    } else {
      return await AIMatchAPI.matchCandidatesByDescription(data)
    }
  }

  /**
   * 智能匹配候选人（快捷方法）
   */
  async smartMatchCandidates(description, options = {}) {
    if (this.useMock) {
      return await MockAPI.mockMatchCandidatesByDescription({
        description,
        matchType: 'smart',
        ...options
      })
    } else {
      return await AIMatchAPI.smartMatchCandidates(description, options)
    }
  }

  /**
   * 技能匹配候选人
   */
  async skillMatchCandidates(description, options = {}) {
    if (this.useMock) {
      return await MockAPI.mockMatchCandidatesByDescription({
        description,
        matchType: 'skill',
        ...options
      })
    } else {
      return await AIMatchAPI.skillMatchCandidates(description, options)
    }
  }

  /**
   * 经验匹配候选人
   */
  async experienceMatchCandidates(description, options = {}) {
    if (this.useMock) {
      return await MockAPI.mockMatchCandidatesByDescription({
        description,
        matchType: 'experience',
        ...options
      })
    } else {
      return await AIMatchAPI.experienceMatchCandidates(description, options)
    }
  }

  /**
   * 学历匹配候选人
   */
  async educationMatchCandidates(description, options = {}) {
    if (this.useMock) {
      return await MockAPI.mockMatchCandidatesByDescription({
        description,
        matchType: 'education',
        ...options
      })
    } else {
      return await AIMatchAPI.educationMatchCandidates(description, options)
    }
  }

  /**
   * 获取匹配结果详细分析
   */
  async getMatchAnalysis(matchId, analysisLevel = 'detailed') {
    if (this.useMock) {
      // Mock环境暂不实现分析功能
      return { success: true, data: {}, message: 'Mock analysis not implemented' }
    } else {
      return await AIMatchAPI.getMatchAnalysis(matchId, analysisLevel)
    }
  }

  /**
   * 保存匹配结果
   */
  async saveMatchResults(data) {
    if (this.useMock) {
      // Mock环境暂不实现保存功能
      return { success: true, data: { savedMatchId: 'mock_match_' + Date.now() }, message: 'Mock save success' }
    } else {
      return await AIMatchAPI.saveMatchResults(data)
    }
  }

  /**
   * 获取用户的匹配历史
   */
  async getUserMatchHistory(userId, params = {}) {
    if (this.useMock) {
      return await MockAPI.mockGetUserMatchHistory(userId, params)
    } else {
      return await AIMatchAPI.getUserMatchHistory(userId, params)
    }
  }

  /**
   * 重新匹配候选人
   */
  async rematchCandidates(savedMatchId, newFilters = {}) {
    if (this.useMock) {
      // Mock环境暂不实现重新匹配功能
      return { success: true, data: {}, message: 'Mock rematch not implemented' }
    } else {
      return await AIMatchAPI.rematchCandidates(savedMatchId, newFilters)
    }
  }

  /**
   * 比较候选人匹配度
   */
  async compareCandidateMatch(jobDescription, candidateIds) {
    if (this.useMock) {
      // Mock环境暂不实现比较功能
      return { success: true, data: { comparison: [], ranking: [] }, message: 'Mock compare not implemented' }
    } else {
      return await AIMatchAPI.compareCandidateMatch(jobDescription, candidateIds)
    }
  }

  // ==================== 工具方法 ====================

  /**
   * 设置是否使用Mock数据
   */
  setUseMock(useMock) {
    this.useMock = useMock
  }

  /**
   * 获取当前是否使用Mock数据
   */
  getUseMock() {
    return this.useMock
  }
}

// 创建API管理器实例
const apiManager = new APIManager()

// 导出API管理器实例
export default apiManager

// 同时导出各个API模块，供需要直接调用的场景使用
export { JobAPI, CandidateAPI, AIJobAPI, UserAPI, AIMatchAPI, MockAPI }