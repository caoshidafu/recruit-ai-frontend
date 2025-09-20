import { mockData } from '../data/mockData.js'

// Mock API配置
const MOCK_DELAY = 500; // 模拟网络延迟

/**
 * 模拟异步请求
 * @param {any} data 返回的数据
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Promise} 模拟的异步请求
 */
function mockRequest(data, delay = MOCK_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
        message: 'Success'
      });
    }, delay);
  });
}

/**
 * 模拟失败请求
 * @param {string} message 错误消息
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Promise} 模拟的失败请求
 */
function mockErrorRequest(message, delay = MOCK_DELAY) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        success: false,
        message: message,
        data: null
      });
    }, delay);
  });
}

// ==================== 职位相关Mock API ====================

/**
 * Mock - 获取职位列表
 * 功能描述：获取所有可用的职位信息列表
 * 入参：无
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/jobs/list
 * 请求方式：GET
 */
export function mockGetJobList() {
  return mockRequest(mockData.jobs);
}

/**
 * Mock - 根据ID获取职位详情
 * 功能描述：根据职位ID获取详细的职位信息
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/detail/:id
 * 请求方式：GET
 */
export function mockGetJobDetail(jobId) {
  const job = mockData.jobs.find(j => j.id === parseInt(jobId));
  if (job) {
    return mockRequest(job);
  } else {
    return mockErrorRequest('职位不存在');
  }
}

/**
 * Mock - 创建新职位
 * 功能描述：创建一个新的职位信息
 * 入参：{ title: string, department: string, location: string, ... } - 职位信息对象
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/create
 * 请求方式：POST
 */
export function mockCreateJob(jobData) {
  const newJob = {
    id: mockData.jobs.length + 1,
    ...jobData,
    candidateCount: 0,
    newCandidates: 0,
    interviewingCount: 0
  };
  mockData.jobs.push(newJob);
  return mockRequest(newJob);
}

/**
 * Mock - 获取职位候选人统计
 * 功能描述：获取指定职位的候选人数量统计信息
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/:id/candidates/stats
 * 请求方式：GET
 */
export function mockGetJobCandidateStats(jobId) {
  const job = mockData.jobs.find(j => j.id === parseInt(jobId));
  if (job) {
    return mockRequest({
      candidateCount: job.candidateCount,
      newCandidates: job.newCandidates,
      interviewingCount: job.interviewingCount
    });
  } else {
    return mockErrorRequest('职位不存在');
  }
}

// ==================== 候选人相关Mock API ====================

/**
 * Mock - 获取智能推荐候选人列表
 * 功能描述：根据算法推荐的候选人列表
 * 入参：{ jobId?: number, limit?: number } - 职位ID（可选）和限制数量
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/smart
 * 请求方式：GET
 */
export function mockGetSmartCandidates(params = {}) {
  let candidates = mockData.candidates.smart;
  if (params.limit) {
    candidates = candidates.slice(0, params.limit);
  }
  return mockRequest(candidates);
}

/**
 * Mock - 获取经验匹配候选人列表
 * 功能描述：根据工作经验匹配的候选人列表
 * 入参：{ jobId?: number, minExperience?: number, maxExperience?: number } - 筛选参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/experience
 * 请求方式：GET
 */
export function mockGetExperienceCandidates(params = {}) {
  let candidates = mockData.candidates.experience;
  if (params.minExperience) {
    candidates = candidates.filter(c => c.experience >= params.minExperience);
  }
  if (params.maxExperience) {
    candidates = candidates.filter(c => c.experience <= params.maxExperience);
  }
  if (params.limit) {
    candidates = candidates.slice(0, params.limit);
  }
  return mockRequest(candidates);
}

/**
 * Mock - 获取学历匹配候选人列表
 * 功能描述：根据学历背景匹配的候选人列表
 * 入参：{ jobId?: number, degree?: string } - 筛选参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/education
 * 请求方式：GET
 */
export function mockGetEducationCandidates(params = {}) {
  let candidates = mockData.candidates.education;
  if (params.degree) {
    candidates = candidates.filter(c => 
      c.educationHistory.some(edu => edu.degree === params.degree)
    );
  }
  if (params.limit) {
    candidates = candidates.slice(0, params.limit);
  }
  return mockRequest(candidates);
}

/**
 * Mock - 根据ID获取候选人详情
 * 功能描述：根据候选人ID获取详细的候选人信息
 * 入参：{ candidateId: number } - 候选人ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/detail/:id
 * 请求方式：GET
 */
export function mockGetCandidateDetail(candidateId) {
  // 在所有候选人分类中查找
  let candidate = null;
  for (const category of Object.values(mockData.candidates)) {
    candidate = category.find(c => c.id === parseInt(candidateId));
    if (candidate) break;
  }
  
  if (candidate) {
    return mockRequest(candidate);
  } else {
    return mockErrorRequest('候选人不存在');
  }
}

/**
 * Mock - 获取候选人雷达图数据
 * 功能描述：获取候选人的能力雷达图分析数据
 * 入参：{ candidateId: number } - 候选人ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/:id/radar
 * 请求方式：GET
 */
export function mockGetCandidateRadarData(candidateId) {
  // 在所有候选人分类中查找
  let candidate = null;
  for (const category of Object.values(mockData.candidates)) {
    candidate = category.find(c => c.id === parseInt(candidateId));
    if (candidate) break;
  }
  
  if (candidate && candidate.radarData) {
    return mockRequest(candidate.radarData);
  } else {
    return mockErrorRequest('候选人雷达图数据不存在');
  }
}

/**
 * Mock - 搜索候选人
 * 功能描述：根据关键词和筛选条件搜索候选人
 * 入参：{ keyword?: string, skills?: Array, location?: string, experience?: number } - 搜索参数
 * 返回参数：{ success: boolean, data: Array, message: string }
 * url地址：/candidates/search
 * 请求方式：GET
 */
export function mockSearchCandidates(searchParams = {}) {
  let allCandidates = [];
  // 合并所有分类的候选人
  for (const category of Object.values(mockData.candidates)) {
    allCandidates = [...allCandidates, ...category];
  }
  
  let filteredCandidates = allCandidates;
  
  // 关键词搜索
  if (searchParams.keyword) {
    const keyword = searchParams.keyword.toLowerCase();
    filteredCandidates = filteredCandidates.filter(c => 
      c.name.toLowerCase().includes(keyword) ||
      c.title.toLowerCase().includes(keyword) ||
      c.skills.some(skill => skill.toLowerCase().includes(keyword))
    );
  }
  
  // 技能筛选
  if (searchParams.skills && searchParams.skills.length > 0) {
    filteredCandidates = filteredCandidates.filter(c =>
      searchParams.skills.some(skill => 
        c.skills.includes(skill)
      )
    );
  }
  
  // 地点筛选
  if (searchParams.location) {
    filteredCandidates = filteredCandidates.filter(c => 
      c.location === searchParams.location
    );
  }
  
  // 经验筛选
  if (searchParams.experience) {
    filteredCandidates = filteredCandidates.filter(c => 
      c.experience >= searchParams.experience
    );
  }
  
  return mockRequest(filteredCandidates);
}

// 是否启用Mock模式的配置
export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';
