import { get, put, del } from './index.js'

/**
* 根据用户id返回关联的职位卡片和岗位详情list
* 功能描述：获取指定用户创建的所有职位信息，包括职位卡片和详情
* 入参：userId: number
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/users/jobs?user_id={userId}
* 请求方式：GET
*/
export function getUserJobs(userId) {
  return get('/users/jobs', { user_id: userId })
}

/**
* 获取用户职位统计信息
* 功能描述：获取用户的职位创建和管理统计信息
* 入参：{ userId: number } - 用户ID
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     totalJobs: number,           // 总职位数
*     activeJobs: number,          // 活跃职位数
*     draftJobs: number,           // 草稿职位数
*     totalCandidates: number,     // 总候选人数
*     recentActivity: array        // 最近活动
*   }, 
*   message: string 
* }
* url地址：/users/job-stats?user_id={userId}
* 请求方式：GET
*/
export function getUserJobStats(userId) {
  return get('/users/job-stats', { user_id: userId })
}

/**
* 更新用户职位状态
* 功能描述：批量更新用户的职位状态
* 入参：{ 
*   userId: number,        // 用户ID
*   jobIds: array,         // 职位ID数组
*   status: string         // 新状态 ('active', 'inactive', 'draft')
* }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/users/jobs/batch-update-status
* 请求方式：PUT
*/
export function updateUserJobsStatus(userId, jobIds, status) {
  return put('/users/jobs/batch-update-status', { user_id: userId, jobIds, status })
}

/**
* 删除用户职位
* 功能描述：删除用户指定的职位
* 入参：{ 
*   userId: number,        // 用户ID
*   jobIds: array          // 要删除的职位ID数组
* }
* 返回参数：{ success: boolean, message: string }
* url地址：/users/jobs/batch-delete
* 请求方式：DELETE
*/
export function deleteUserJobs(userId, jobIds) {
  return del('/users/jobs/batch-delete', { user_id: userId, jobIds })
}

/**
* 获取用户最近活动
* 功能描述：获取用户在招聘系统中的最近活动记录
* 入参：{ 
*   userId: number,        // 用户ID
*   limit?: number,        // 限制返回数量，默认20
*   activityType?: string  // 活动类型筛选 ('job_create', 'candidate_match', 'job_update')
* }
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     activities: array,   // 活动列表
*     hasMore: boolean     // 是否还有更多数据
*   }, 
*   message: string 
* }
* url地址：/users/recent-activities?user_id={userId}
* 请求方式：GET
*/
export function getUserRecentActivities(userId, params = {}) {
  return get('/users/recent-activities', { user_id: userId, ...params })
}

/**
* 获取用户偏好设置
* 功能描述：获取用户的招聘偏好设置
* 入参：{ userId: number } - 用户ID
* 返回参数：{ 
*   success: boolean, 
*   data: {
*     matchingPreferences: object,  // 匹配偏好
*     notificationSettings: object, // 通知设置
*     uiPreferences: object         // 界面偏好
*   }, 
*   message: string 
* }
* url地址：/users/preferences?user_id={userId}
* 请求方式：GET
*/
export function getUserPreferences(userId) {
  return get('/users/preferences', { user_id: userId })
}

/**
* 更新用户偏好设置
* 功能描述：更新用户的招聘偏好设置
* 入参：{ 
*   userId: string,               // 用户ID
*   matchingPreferences?: object, // 匹配偏好
*   notificationSettings?: object,// 通知设置
*   uiPreferences?: object        // 界面偏好
* }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/users/preferences
* 请求方式：PUT
*/
export function updateUserPreferences(userId, preferences) {
  return put('/users/preferences', { user_id: userId, ...preferences })
}
