// API管理器 - 统一管理真实API和Mock API的调用（只保留AI解析相关接口）
import * as AIJobAPI from './AIJobAPI.js'
import * as AIMatchAPI from './AIMatchAPI.js'
import * as MockAPI from './MockAPI.js'

// ==================== API配置 ====================

// 判断是否使用Mock数据
const USE_MOCK = process.env.VUE_APP_USE_MOCK !== 'false' && (process.env.NODE_ENV === 'development' || process.env.VUE_APP_USE_MOCK === 'true')

/**
 * API调用管理器 - 只保留AI解析相关的核心接口
 * 根据环境配置自动切换真实API和Mock API
 */
class APIManager {
  constructor() {
    this.useMock = USE_MOCK
  }

  // ==================== AI职位创建相关API ====================

  /**
   * 获取职位卡片列表
   * 功能描述：根据发布岗位id和user_id获取职位卡片列表
   * 入参：jobId: number, userId: number
   * 返回参数：{ success: boolean, data: object, message: string }
   * url地址：/jobs/cards
   * 请求方式：GET
   */
  async getJobCards(jobId, userId) {
    if (this.useMock) {
      return await MockAPI.mockGetJobCards(jobId, userId)
    } else {
      return await AIJobAPI.getJobCards(jobId, userId)
    }
  }

  /**
   * 根据职位描述生成职位画像和岗位详情
   * 功能描述：根据user_id和职位描述生成职位画像和岗位详情
   * 入参：{ userId: number, description: string }
   * 返回参数：{ success: boolean, data: object, message: string }
   * url地址：/jobs/generate-profile
   * 请求方式：POST
   */
  async generateJobProfile(userId, description) {
    if (this.useMock) {
      return await MockAPI.mockGenerateJobProfile(userId, description)
    } else {
      return await AIJobAPI.generateJobProfile(userId, description)
    }
  }

  // ==================== AI匹配相关API ====================

  /**
   * 根据发布岗位id获取候选人列表
   * 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）
   * 入参：{ jobId: number, userId: number, type?: string }
   * 返回参数：{ success: boolean, data: object, message: string }
   * url地址：/candidates/by-job
   * 请求方式：POST
   */
  async getCandidatesByJobId(jobId, userId, type = '智能匹配') {
    if (this.useMock) {
      return await MockAPI.mockGetCandidatesByJobId(jobId, userId, type)
    } else {
      return await AIMatchAPI.getCandidatesByJobId(jobId, userId, type)
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
export { AIJobAPI, AIMatchAPI, MockAPI }