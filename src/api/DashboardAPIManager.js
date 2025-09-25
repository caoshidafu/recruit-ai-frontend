// 数据大盘API管理器 - 专门用于数据大盘模块，强制使用Mock数据
import * as MockAPI from './MockAPI.js'

/**
 * 数据大盘API管理器
 * 该管理器专门用于数据大盘模块，始终使用Mock数据
 * 与岗位详情模块隔离，确保数据来源的一致性
 */
class DashboardAPIManager {
  constructor() {
    console.log('🎯 [DashboardAPIManager] 初始化 - 强制使用Mock数据')
  }

  /**
   * 获取数据大盘完整数据
   * 功能描述：获取数据大盘所需的所有Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: object, message: string }
   * 数据源：Mock数据
   */
  async getDashboardData() {
    console.log('📊 [DashboardAPIManager] 获取数据大盘数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      console.log('✅ [DashboardAPIManager] Mock数据获取成功')
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] Mock数据获取失败:', error)
      return {
        success: false,
        data: {},
        message: '数据大盘Mock数据获取失败'
      }
    }
  }

  /**
   * 获取数据大盘概览数据
   * 功能描述：获取智能招聘驾驶舱的关键指标Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: object, message: string }
   * 数据源：Mock数据
   */
  async getDashboardOverview() {
    console.log('📈 [DashboardAPIManager] 获取概览数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] 概览Mock数据获取失败:', error)
      return {
        success: false,
        data: {},
        message: '概览Mock数据获取失败'
      }
    }
  }

  /**
   * 获取岗位健康度Mock数据
   * 功能描述：获取各岗位的招聘健康度统计Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: array, message: string }
   * 数据源：Mock数据
   */
  async getPositionHealthData() {
    console.log('🎯 [DashboardAPIManager] 获取岗位健康度数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] 岗位健康度Mock数据获取失败:', error)
      return {
        success: false,
        data: [],
        message: '岗位健康度Mock数据获取失败'
      }
    }
  }

  /**
   * 获取招聘进度Mock数据
   * 功能描述：获取招聘漏斗各阶段的统计Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: array, message: string }
   * 数据源：Mock数据
   */
  async getRecruitmentProgress() {
    console.log('📊 [DashboardAPIManager] 获取招聘进度数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] 招聘进度Mock数据获取失败:', error)
      return {
        success: false,
        data: [],
        message: '招聘进度Mock数据获取失败'
      }
    }
  }

  /**
   * 获取候选人流量趋势Mock数据
   * 功能描述：获取最近一周候选人数量变化趋势Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: array, message: string }
   * 数据源：Mock数据
   */
  async getCandidateTrends() {
    console.log('📈 [DashboardAPIManager] 获取候选人趋势数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] 候选人趋势Mock数据获取失败:', error)
      return {
        success: false,
        data: [],
        message: '候选人趋势Mock数据获取失败'
      }
    }
  }

  /**
   * 获取AI智能提醒Mock数据
   * 功能描述：获取系统生成的智能提醒Mock信息
   * 入参：无
   * 返回参数：{ success: boolean, data: array, message: string }
   * 数据源：Mock数据
   */
  async getAIAlerts() {
    console.log('🤖 [DashboardAPIManager] 获取AI提醒数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] AI提醒Mock数据获取失败:', error)
      return {
        success: false,
        data: [],
        message: 'AI提醒Mock数据获取失败'
      }
    }
  }

  /**
   * 获取优先处理队列Mock数据
   * 功能描述：获取AI推荐的优先处理岗位队列Mock数据
   * 入参：无
   * 返回参数：{ success: boolean, data: array, message: string }
   * 数据源：Mock数据
   */
  async getPriorityQueue() {
    console.log('⚡ [DashboardAPIManager] 获取优先队列数据 - 使用Mock数据')
    try {
      const response = await MockAPI.mockGetDashboardData()
      return response
    } catch (error) {
      console.error('❌ [DashboardAPIManager] 优先队列Mock数据获取失败:', error)
      return {
        success: false,
        data: [],
        message: '优先队列Mock数据获取失败'
      }
    }
  }
}

// 创建并导出数据大盘API管理器实例
const dashboardAPIManager = new DashboardAPIManager()
export default dashboardAPIManager
