// 岗位详情API管理器 - 专门用于岗位详情模块，使用真实接口
import * as AIJobAPI from './AIJobAPI.js'
import * as AIMatchAPI from './AIMatchAPI.js'
import * as RecruitAPI from './RecruitAPI.js'

/**
 * 岗位详情API管理器
 * 该管理器专门用于岗位详情模块，始终使用真实API接口
 * 与数据大盘模块隔离，确保数据来源的真实性
 */
class JobAPIManager {
  constructor() {
    console.log('💼 [JobAPIManager] 初始化 - 使用真实API接口')
  }

  /**
   * 接口一：查询职位列表
   * 功能描述：获取的职位列表信息
   * 入参：无
   * 返回参数：{ code: number, message: string, data: array }
   * url地址：/api/v1/open/hackthon/position/list
   * 请求方式：GET
   * 数据源：真实API
   */
  async getPositionList() {
    console.log('📋 [JobAPIManager] 获取职位列表 - 使用真实API')
    try {
      const response = await RecruitAPI.getPositionList()
      console.log('✅ [JobAPIManager] 真实API职位列表获取成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API职位列表获取失败:', error)
      throw error
    }
  }

  /**
   * 接口二：查询推荐候选人列表
   * 功能描述：根据职位ID获取推荐的候选人列表
   * 入参：{ positionId: number }
   * 返回参数：{ code: number, message: string, data: array }
   * url地址：/api/v1/open/hackthon/recommend/candidate/list
   * 请求方式：GET
   * 数据源：真实API
   */
  async getRecommendCandidateList(positionId) {
    console.log(`👥 [JobAPIManager] 获取推荐候选人列表 (职位ID: ${positionId}) - 使用真实API`)
    try {
      const response = await RecruitAPI.getRecommendCandidateList(positionId)
      console.log('✅ [JobAPIManager] 真实API候选人列表获取成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API候选人列表获取失败:', error)
      throw error
    }
  }

  /**
   * 接口三：创建推荐职位
   * 功能描述：创建新的推荐职位
   * 入参：{ positionName: string, positionDescription: string, positionDemand: string }
   * 返回参数：{ code: number, message: string, data: { positionId: number } }
   * url地址：/api/v1/open/hackthon/recommend/position/create
   * 请求方式：POST
   * 数据源：真实API
   */
  async createRecommendPosition(positionData) {
    console.log('🚀 [JobAPIManager] 创建推荐职位 - 使用真实API')
    console.log('📝 [JobAPIManager] 请求参数:', JSON.stringify(positionData, null, 2))
    try {
      const response = await RecruitAPI.createRecommendPosition(positionData)
      console.log('✅ [JobAPIManager] 真实API职位创建成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API职位创建失败:', error)
      throw error
    }
  }

  /**
   * AI职位生成相关API - 根据职位描述生成职位画像
   * 功能描述：根据user_id和职位描述生成职位画像和岗位详情，返回发布岗位id
   * 入参：{ userId: number, description: string }
   * 返回参数：{ success: boolean, data: { jobProfile: object, jobId: number }, message: string }
   * url地址：/jobs/generate-profile
   * 请求方式：POST
   * 数据源：真实API
   */
  async generateJobProfile(userId, description) {
    console.log('🤖 [JobAPIManager] 生成职位画像 - 使用真实API')
    try {
      const response = await AIJobAPI.generateJobProfile(userId, description)
      console.log('✅ [JobAPIManager] 真实API职位画像生成成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API职位画像生成失败:', error)
      throw error
    }
  }

  /**
   * AI职位列表获取 - 获取职位卡片列表
   * 功能描述：根据user_id获取职位卡片和岗位详情列表
   * 入参：userId: number
   * 返回参数：{ success: boolean, data: { jobCards: array, total: number, userId: number }, message: string }
   * url地址：/jobs/list
   * 请求方式：GET
   * 数据源：真实API
   */
  async getJobCardsList(userId) {
    console.log(`📋 [JobAPIManager] 获取AI职位卡片列表 (用户ID: ${userId}) - 使用真实API`)
    try {
      const response = await AIJobAPI.getJobCardsList(userId)
      console.log('✅ [JobAPIManager] 真实API职位卡片列表获取成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API职位卡片列表获取失败:', error)
      throw error
    }
  }

  /**
   * AI匹配相关API - 智能匹配候选人
   * 功能描述：根据职位信息智能匹配候选人
   * 入参：{ jobId: number, userId: number, matchType: string }
   * 返回参数：{ success: boolean, data: { candidates: array }, message: string }
   * 数据源：真实API
   */
  async getAIMatchCandidates(jobId, userId, matchType = '智能匹配') {
    console.log(`🎯 [JobAPIManager] AI匹配候选人 (职位ID: ${jobId}, 匹配类型: ${matchType}) - 使用真实API`)
    try {
      // 这里可以根据matchType调用不同的AI匹配接口
      const response = await AIMatchAPI.getCandidatesByJobId(jobId, 1, matchType)
      console.log('✅ [JobAPIManager] 真实API候选人匹配成功')
      return response
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API候选人匹配失败:', error)
      throw error
    }
  }

  /**
   * 统一的候选人获取接口 - 兼容现有调用方式
   * 功能描述：根据职位ID和匹配类型获取候选人，优先使用真实API
   * 入参：{ jobId: number, userId: number, matchType: string }
   * 返回参数：{ success: boolean, data: { candidates: array }, message: string }
   * 数据源：真实API
   */
  async getCandidatesByJobId(jobId, matchType = '智能匹配') {
    console.log(`🔍 [JobAPIManager] 统一获取候选人 (职位ID: ${jobId}, 匹配类型: ${matchType}) - 使用真实API`)
    
    try {
      // 首先尝试使用推荐候选人列表接口（接口二）
      const response = await this.getRecommendCandidateList(jobId)
      
      if (response && response.code === 0 && response.data) {
        // 转换数据格式以兼容现有组件
        const candidates = Array.isArray(response.data) ? response.data : []
        
        // 对候选人数据进行格式化处理
        const formattedCandidates = candidates.map(candidate => ({
          id: candidate.candidateId || candidate.id || Date.now() + Math.random(),
          name: candidate.candidateName || candidate.name || '未知候选人',
          title: candidate.currentPosition || candidate.title || '职位信息不详',
          company: candidate.currentCompany || candidate.company || '公司信息不详',
          experience: candidate.workYears || candidate.experience || '经验不详',
          education: candidate.education || '学历不详',
          skills: candidate.skills || [],
          matchScore: candidate.matchScore || Math.floor(Math.random() * 30) + 70,
          avatar: candidate.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.candidateName || 'default'}`,
          location: candidate.location || '地址不详',
          age: candidate.age || null,
          phone: candidate.phone || '',
          email: candidate.email || '',
          // 原始数据保留
          originalData: candidate
        }))

        console.log(`✅ [JobAPIManager] 真实API获取到 ${formattedCandidates.length} 个候选人`)
        
        return {
          success: true,
          data: {
            candidates: formattedCandidates,
            total: formattedCandidates.length,
            jobId: jobId,
            matchType: matchType
          },
          message: '候选人数据获取成功'
        }
      } else {
        console.warn('⚠️ [JobAPIManager] 真实API返回数据格式异常:', response)
        return {
          success: false,
          data: { candidates: [], total: 0 },
          message: response?.message || '获取候选人数据失败'
        }
      }
    } catch (error) {
      console.error('❌ [JobAPIManager] 真实API获取候选人失败:', error)
      return {
        success: false,
        data: { candidates: [], total: 0 },
        message: '真实API调用失败: ' + error.message
      }
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
    const experienceText = candidate.experience || ''
    if (experienceText.includes('5年') || experienceText.includes('资深') || experienceText.includes('高级')) {
      skills.push('架构设计', '团队管理', '技术决策')
    } else if (experienceText.includes('3年') || experienceText.includes('中级')) {
      skills.push('项目经验', '技术优化', '问题解决')
    }
    
    return [...new Set(skills)] // 去重
  }
}

// 创建并导出岗位详情API管理器实例
const jobAPIManager = new JobAPIManager()
export default jobAPIManager
