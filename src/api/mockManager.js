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
   * 接口一：获取职位卡片列表
   * 功能描述：根据user_id获取职位卡片和岗位详情列表
   * 入参：userId: number
   * 返回参数：{ success: boolean, data: { jobCards: array, total: number, userId: number }, message: string }
   * url地址：/jobs/list
   * 请求方式：GET
   */
  async getJobCardsList(userId) {
    if (this.useMock) {
      return await MockAPI.mockGetJobCardsList(userId)
    } else {
      return await AIJobAPI.getJobCardsList(userId)
    }
  }

  /**
   * 接口二：根据职位描述生成职位画像和岗位详情
   * 功能描述：根据user_id和职位描述生成职位画像和岗位详情，返回发布岗位id
   * 入参：{ userId: number, description: string }
   * 返回参数：{ success: boolean, data: { jobProfile: object, jobId: number }, message: string }
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
   * 接口三：根据发布岗位id获取候选人列表
   * 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）
   * 入参：{ jobId: number, userId: number, type?: string }
   * 返回参数：{ success: boolean, data: { candidates: array, total: number, matchingInfo: object, jobDetail: object, userId: number }, message: string }
   * url地址：/candidates/match
   * 请求方式：POST
   */
  async getCandidatesByJobId(jobId, userId, type = '智能匹配') {
    if (this.useMock) {
      return await MockAPI.mockGetCandidatesByJobId(jobId, userId, type)
    } else {
      return await AIMatchAPI.getCandidatesByJobId(jobId, userId, type)
    }
  }

  // ==================== 向后兼容方法 ====================
  
  /**
   * 向后兼容：旧的获取职位列表方法
   * @deprecated 请使用 getJobCardsList 方法
   */
  async getJobList(params) {
    return await this.getJobCardsList(params.user_id)
  }

  /**
   * 向后兼容：智能候选人
   * @deprecated 请使用 getCandidatesByJobId 方法
   */
  async getSmartCandidates(params) {
    return await this.getCandidatesByJobId(params.jobId, params.user_id, '智能匹配')
  }

  /**
   * 向后兼容：经验候选人
   * @deprecated 请使用 getCandidatesByJobId 方法
   */
  async getExperienceCandidates(params) {
    return await this.getCandidatesByJobId(params.jobId, params.user_id, '经验匹配')
  }

  /**
   * 向后兼容：学历候选人
   * @deprecated 请使用 getCandidatesByJobId 方法
   */
  async getEducationCandidates(params) {
    return await this.getCandidatesByJobId(params.jobId, params.user_id, '学历匹配')
  }

  /**
   * 向后兼容：解析职位描述
   * 实际上应该使用 generateJobProfile 方法
   */
  async parseJobDescription(description, params) { // eslint-disable-line no-unused-vars
    // 模拟职位描述解析，返回解析结果
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            extractedInfo: {
              title: "高级前端工程师",
              department: "技术部",
              level: "高级",
              location: "北京",
              salary: "25-35K"
            },
            analysisResult: {
              keySkills: ["Vue.js", "React", "TypeScript"],
              requirements: ["3年以上前端开发经验", "熟练掌握主流框架"],
              responsibilities: ["负责前端项目架构设计", "参与产品需求分析"],
              benefits: ["六险一金", "弹性工作", "技术培训"]
            }
          },
          message: "职位描述解析成功"
        });
      }, 1000);
    });
  }

  /**
   * 向后兼容：AI匹配候选人
   * 实际上应该使用 getCandidatesByJobId 方法
   */
  async aiMatchCandidates(jobId, type) { // eslint-disable-line no-unused-vars
    return await this.getCandidatesByJobId(jobId, 1, '智能匹配')
  }

  /**
   * 向后兼容：创建职位
   * 模拟创建职位功能
   */
  async createJob(jobData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob = {
          id: Date.now(),
          ...jobData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        resolve({
          success: true,
          data: newJob,
          message: "职位创建成功"
        });
      }, 800);
    });
  }

  /**
   * 向后兼容：获取候选人AI分析
   * 模拟AI分析功能
   */
  async getCandidateAIAnalysis(candidateId, params) { // eslint-disable-line no-unused-vars
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            overallScore: 85,
            recommendation: '该候选人整体素质优秀，建议优先考虑',
            strengths: [
              "技术能力突出，掌握多种前端框架",
              "有丰富的项目实战经验",
              "学习能力强，能快速适应新技术"
            ],
            improvements: [
              "可以加强后端技术栈的了解",
              "团队管理经验有待提升"
            ],
            jobMatching: {
              skillMatch: 90,
              experienceMatch: 85,
              educationMatch: 80,
              cultureMatch: 85
            },
            recommendedActions: [
              {
                action: "安排技术面试",
                priority: "high",
                description: "重点考察Vue.js和React技能"
              },
              {
                action: "了解项目经验",
                priority: "medium", 
                description: "详细了解之前项目的技术架构"
              }
            ]
          },
          message: "AI分析完成"
        });
      }, 1500);
    });
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