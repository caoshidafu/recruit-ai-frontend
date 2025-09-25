// API管理器 - 统一管理真实API和Mock API的调用（只保留AI解析相关接口）
import * as AIJobAPI from './AIJobAPI.js'
import * as AIMatchAPI from './AIMatchAPI.js'
import * as RecruitAPI from './RecruitAPI.js'
import * as DASHBOARDAPI from './DASHBOARDAPI.js'
import * as MockAPI from './MockAPI.js'

// ==================== API配置 ====================

// 判断是否使用Mock数据
// 注意：当前设置为使用真实API，如需使用Mock数据请修改为 true
const USE_MOCK = false // process.env.VUE_APP_USE_MOCK !== 'false' && (process.env.NODE_ENV === 'development' || process.env.VUE_APP_USE_MOCK === 'true')

/**
 * API调用管理器 - 只保留AI解析相关的核心接口
 * 根据环境配置自动切换真实API和Mock API
 */
class APIManager {
  constructor() {
    this.useMock = USE_MOCK
  }

  // ==================== 职位管理相关API ====================

  /**
   * 接口一：查询职位列表
   * 功能描述：获取的职位列表信息
   * 入参：无
   * 返回参数：{ code: number, message: string, data: array }
   * url地址：/api/v1/open/hackthon/position/list
   * 请求方式：GET
   */
  async getPositionList() {
    if (this.useMock) {
      return await MockAPI.mockGetJobCardsList(1) // Mock数据暂时保持原有结构
    } else {
      return await RecruitAPI.getPositionList()
    }
  }

  /**
   * 接口一：获取职位卡片列表（向后兼容）
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

  // ==================== 辅助方法 ====================
  
  /**
   * 基于候选人工作经历生成技能标签
   * @param {Object} candidate - 候选人信息
   * @returns {Array} 技能标签数组
   */
  generateSkillsFromExperience(candidate) {
    const skills = []
    
    // 基于职位名称推断技能
    const position = candidate.title || ''
    if (position.includes('Java') || position.includes('java')) {
      skills.push('Java', 'Spring', 'MySQL')
    } else if (position.includes('前端') || position.includes('Frontend') || position.includes('React') || position.includes('Vue')) {
      skills.push('JavaScript', 'Vue.js', 'React', 'HTML/CSS')
    } else if (position.includes('Python') || position.includes('python')) {
      skills.push('Python', 'Django', 'Flask')
    } else if (position.includes('产品') || position.includes('Product')) {
      skills.push('产品设计', '需求分析', 'Axure')
    } else if (position.includes('运营') || position.includes('Operation')) {
      skills.push('数据分析', '用户运营', '内容运营')
    } else {
      // 默认技能
      skills.push('团队协作', '沟通能力', '学习能力')
    }
    
    // 基于工作年限添加经验相关技能
    const workYears = candidate.workYears || 0
    if (workYears >= 5) {
      skills.push('项目管理', '团队领导')
    } else if (workYears >= 3) {
      skills.push('项目经验', '业务理解')
    }
    
    // 基于学历添加技能
    const education = candidate.eduExperience?.[0]?.degreeName || ''
    if (education.includes('硕士') || education.includes('博士')) {
      skills.push('学术研究', '数据分析')
    }
    
    // 去重并限制数量
    return [...new Set(skills)].slice(0, 4)
  }

  // ==================== AI匹配相关API ====================

  /**
   * 接口二：根据职位ID获取推荐候选人列表（使用真实接口）
   * 功能描述：根据职位ID获取推荐的候选人列表
   * 入参：{ positionId: number, userId: number, type?: string }
   * 返回参数：{ success: boolean, data: { candidates: array, total: number, matchingInfo: object }, message: string }
   * url地址：/api/v1/open/hackthon/recommend/candidate/list
   * 请求方式：GET
   */
  async getCandidatesByJobId(positionId, userId, type = '智能匹配') {
    if (this.useMock) {
      return await MockAPI.mockGetCandidatesByJobId(positionId, userId, type)
    } else {
      // 调用真实的接口二获取候选人数据
      const response = await RecruitAPI.getRecommendCandidateList(positionId)
      
      if (response && response.code === 0 && response.data) {
        // 将真实接口返回的数据映射为前端组件所需的格式
        const candidates = response.data.map(item => ({
          // 基本信息映射 - 根据接口文档注释
          id: item.resumeId, // resumeId作为候选人ID
          name: item.name, // candidate.name
          experience: item.workYears, // candidate.experience - 工作年限
          title: item.title, // candidate.title - 职位标题
          location: item.workLocation, // candidate.location - 工作地点
          matchScore: item.matchScore, // candidate.matchScore - 匹配分数
          
          // 能力评分
          eduBackgroundScore: item.eduBackgroundScore || 0, // 学历背景分
          skillMatchScore: item.skillMatchScore || 0, // 技能匹配分
          projectExperienceScore: item.projectExperienceScore || 0, // 项目经验分
          stabilityScore: item.stabilityScore || 0, // 稳定性分
          developmentPotentialScore: item.developmentPotentialScore || 0, // 发展潜力分
          
          // 推荐信息
          recommendReasons: item.positiveLabels || [], // candidate.recommendReasons - 推荐理由
          negativeLabels: item.negativeLabels || [], // 负向标签 - 用于填充ai分析中的改进建议
          recommendReason: item.recommendReason || '', // ai分析内容
          
          // 工作经历映射
          workHistory: (item.workExperience || []).map(work => ({
            company: work.companyName || '',
            position: work.positionName || '',
            duration: work.workTimeBucket || '',
            description: work.detailedIntroduction || '',
            startDate: work.startDate || '',
            endDate: work.endDate || ''
          })),
          
          // 教育经历映射
          educationHistory: (item.eduExperience || []).map(edu => ({
            school: edu.schoolName || '',
            degree: edu.degreeName || '',
            major: edu.majorName || '',
            duration: `${edu.startDate ? new Date(edu.startDate).getFullYear() : ''}-${edu.endDate ? new Date(edu.endDate).getFullYear() : ''}`,
            startDate: edu.startDate || '',
            endDate: edu.endDate || ''
          })),
          
          // 雷达图数据映射 - 用于AI分析模态框
          radarData: {
            '学历': item.eduBackgroundScore || 80,
            '技能': item.skillMatchScore || 85,
            '经验': item.projectExperienceScore || 88,
            '稳定性': item.stabilityScore || 75,
            '潜力': item.developmentPotentialScore || 90
          },
          
          // 其他前端组件需要的字段
          avatar: `https://i.pravatar.cc/48?seed=${item.resumeId}`, // 生成头像
          skills: this.generateSkillsFromExperience(item), // 基于工作经历生成技能标签
          education: item.eduExperience?.[0]?.degreeName || '本科', // 最高学历
          
          // 保留原有字段以确保兼容性
          resumeId: item.resumeId,
          workYears: item.workYears,
          workLocation: item.workLocation,
          workExperience: item.workExperience || [],
          eduExperience: item.eduExperience || []
        }))
        
        return {
          success: true,
          data: {
            candidates: candidates,
            total: candidates.length,
            matchingInfo: {
              positionId: positionId,
              matchType: type,
              totalCandidates: candidates.length
            }
          },
          message: '候选人数据获取成功'
        }
      } else {
        console.error('接口二返回数据异常:', response)
        return {
          success: false,
          data: { candidates: [], total: 0 },
          message: response?.message || '获取候选人数据失败'
        }
      }
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

  // ==================== AI分析相关API ====================

  /**
   * 获取候选人AI分析（使用真实接口数据）
   * 功能描述：根据职位ID和候选人简历ID获取AI智能分析报告，包含能力评估、匹配度分析等
   * 入参：{ positionId: number, resumeId: number }
   * 返回参数：{ success: boolean, data: { overallScore: number, recommendation: string, strengths: array, improvements: array, jobMatching: object, recommendedActions: array }, message: string }
   */
  async getCandidateAIAnalysis(positionId, resumeId) {
    if (this.useMock) {
      return await MockAPI.mockGetCandidateAIAnalysis(positionId, resumeId)
    } else {
      return await AIMatchAPI.getCandidateAIAnalysis(positionId, resumeId)
    }
  }

  /**
   * 获取数据大盘数据
   * 功能描述：获取智能招聘驾驶舱所需的所有数据
   * 入参：无
   * 返回参数：{ success: boolean, data: object, message: string }
   * url地址：/dashboard/data
   * 请求方式：GET
   */
  async getDashboardData() {
    if (this.useMock) {
      return await MockAPI.mockGetDashboardData()
    } else {
      return await DASHBOARDAPI.getDashboardData()
    }
  }

  /**
   * 创建职位（新API）
   * @param {Object} positionData - 职位数据
   * @param {string} positionData.positionName - 职位名称
   * @param {string} positionData.positionDescription - 职位描述
   * @param {string} positionData.positionDemand - 任职要求
   */
  async createPosition(positionData) {
    try {
      console.log('🚀 [APIManager] 调用创建职位API（接口三）')
      console.log('📝 [APIManager] 请求参数:', JSON.stringify(positionData, null, 2))
      
      const response = await RecruitAPI.createRecommendPosition(positionData)
      
      console.log('📥 [APIManager] 原始API响应:', JSON.stringify(response, null, 2))
      console.log('🔍 [APIManager] 响应分析:')
      console.log('  - response:', response)
      console.log('  - response.code:', response?.code)
      console.log('  - response.data:', response?.data)
      console.log('  - response.message:', response?.message)
      console.log('  - typeof response.code:', typeof response?.code)
      
      // 检查响应是否存在
      if (!response) {
        console.log('❌ [APIManager] 响应为空')
        return {
          success: false,
          data: null,
          message: "服务器响应为空"
        }
      }

      // 根据接口文档，code为0表示创建成功
      // 同时检查字符串"0"的情况，以防后端返回字符串类型
      const isSuccess = response.code === 0 || response.code === "0"
      
      if (isSuccess) {
        console.log('✅ [APIManager] 职位创建成功，code=0')
        
        // 确保data存在，如果不存在则创建一个默认的
        const responseData = response.data || { positionId: Date.now() }
        
        const result = {
          success: true,
          data: responseData,
          message: response.message || "职位创建成功"
        }
        console.log('📤 [APIManager] 返回成功结果:', JSON.stringify(result, null, 2))
        return result
      } else {
        console.log('❌ [APIManager] 职位创建失败')
        console.log('  - 实际code值:', response.code)
        console.log('  - code类型:', typeof response.code)
        console.log('  - code === 0:', response.code === 0)
        console.log('  - code == 0:', response.code == 0)
        console.log('  - code === "0":', response.code === "0")
        
        const result = {
          success: false,
          data: null,
          message: response.message || `职位创建失败 (code: ${response.code})`
        }
        console.log('📤 [APIManager] 返回失败结果:', JSON.stringify(result, null, 2))
        return result
      }
    } catch (error) {
      console.error('💥 [APIManager] 创建职位API调用异常:', error)
      console.error('  - 错误类型:', error.constructor.name)
      console.error('  - 错误信息:', error.message)
      console.error('  - 错误堆栈:', error.stack)
      
      // 如果真实API失败，返回错误信息
      const result = {
        success: false,
        data: null,
        message: error.message || "网络错误，请重试"
      }
      console.log('📤 [APIManager] 返回异常结果:', JSON.stringify(result, null, 2))
      return result
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
export { AIJobAPI, AIMatchAPI, DASHBOARDAPI, MockAPI }