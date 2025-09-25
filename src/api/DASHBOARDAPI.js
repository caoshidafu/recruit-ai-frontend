import { get } from './index.js'

/**
 * 获取数据大盘概览数据
 * 功能描述：获取智能招聘驾驶舱的关键指标数据
 * 入参：无
 * 返回参数：{ code: number, message: string, data: { metrics: object, alerts: array, charts: object } }
 * url地址：/dashboard/overview
 * 请求方式：GET
 */
export function getDashboardOverview() {
    return get('/dashboard/overview')
}

/**
 * 获取岗位健康度数据
 * 功能描述：获取各岗位的招聘健康度统计数据
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/dashboard/position-health
 * 请求方式：GET
 */
export function getPositionHealthData() {
    return get('/dashboard/position-health')
}

/**
 * 获取招聘进度数据
 * 功能描述：获取招聘漏斗各阶段的统计数据
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/dashboard/recruitment-progress
 * 请求方式：GET
 */
export function getRecruitmentProgress() {
    return get('/dashboard/recruitment-progress')
}

/**
 * 获取候选人流量趋势数据
 * 功能描述：获取最近一周候选人数量变化趋势
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/dashboard/candidate-trends
 * 请求方式：GET
 */
export function getCandidateTrends() {
    return get('/dashboard/candidate-trends')
}

/**
 * 获取AI智能提醒数据
 * 功能描述：获取系统生成的智能提醒信息
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/dashboard/ai-alerts
 * 请求方式：GET
 */
export function getAIAlerts() {
    return get('/dashboard/ai-alerts')
}

/**
 * 获取优先处理队列数据
 * 功能描述：获取AI推荐的优先处理岗位队列
 * 入参：无
 * 返回参数：{ code: number, message: string, data: array }
 * url地址：/dashboard/priority-queue
 * 请求方式：GET
 */
export function getPriorityQueue() {
    return get('/dashboard/priority-queue')
}

/**
 * 获取完整数据大盘数据
 * 功能描述：获取数据大盘所需的所有数据
 * 入参：无
 * 返回参数：{ code: number, message: string, data: object }
 * url地址：/dashboard/data
 * 请求方式：GET
 */
export function getDashboardData() {
    return get('/dashboard/data')
}
