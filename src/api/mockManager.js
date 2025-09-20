// API管理器 - 统一管理真实API和Mock API的调用
import * as JobAPI from './JOBAPI.js'
import * as CandidateAPI from './CANDIDATEAPI.js'
import * as MockAPI from './MOCKAPI.js'

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
export { JobAPI, CandidateAPI, MockAPI }
