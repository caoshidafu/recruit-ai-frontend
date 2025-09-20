// 模拟数据
const mockData = {
  jobs: [
    {
      id: 1,
      title: "高级后端开发工程师",
      department: "电商技术部",
      location: "北京",
      experience: "3年以上",
      urgency: "high",
      salary: "30-45K",
      headcount: 2,
      description: "负责公司核心产品的后端开发工作，参与技术架构设计",
      requirements: [
        "5年以上后端开发经验",
        "精通Java/Python等主流语言",
        "具备良好的架构设计能力",
        "优秀的团队协作能力",
      ],
      skills: ["Java", "Spring Boot", "MySQL", "Redis", "微服务"],
      benefits: ["六险一金", "弹性工作", "期权激励", "带薪年假"],
      candidateCount: 45,
      newCandidates: 8,
      interviewingCount: 5,
    },
    {
      id: 2,
      title: "前端开发工程师",
      department: "用户体验部",
      location: "上海",
      experience: "2年以上",
      urgency: "normal",
      salary: "20-30K",
      headcount: 1,
      description: "负责公司核心产品的前端开发工作，参与技术架构设计",
      requirements: [
        "5年以上前端开发经验",
        "精通React/Vue等主流框架",
        "具备良好的架构设计能力",
        "优秀的团队协作能力",
      ],
      skills: ["React", "TypeScript", "Node.js", "微前端"],
      benefits: ["六险一金", "弹性工作", "期权激励", "带薪年假"],
      candidateCount: 32,
      newCandidates: 5,
      interviewingCount: 3,
    },
  ],
  candidates: {
    smart: [
      {
        id: 1,
        name: "张三",
        avatar: "https://i.pravatar.cc/150?img=3",
        title: "高级Java工程师",
        experience: 5,
        educationHistory: [
          {
            degree: "本科",
            school: "北京大学",
            major: "计算机科学与技术",
            duration: "2015-2019",
          },
        ],
        currentCompany: "某知名电商公司",
        expectedSalary: "35K",
        location: "北京",
        status: "在职-看机会",
        skills: [
          "Java",
          "Spring Boot",
          "MySQL",
          "Redis",
          "Docker",
          "K8s",
          "SQL优化",
          "大模型开发",
        ],
        matchScore: 95,
        recommendReasons: [
          "技术栈高度匹配，精通Java和Spring全家桶",
          "有电商平台开发经验，了解业务领域",
          "曾负责过千万级用户系统的架构设计",
        ],
        keyHighlights: [
          "企业应用人事域相关工作",
          "电商平台核心交易系统",
          "微服务架构设计经验",
        ],
        workHistory: [
          {
            company: "某知名电商公司",
            position: "高级Java工程师",
            duration: "2020-至今",
            description: "负责电商平台核心交易系统开发",
          },
          {
            company: "某互联网公司",
            position: "Java工程师",
            duration: "2018-2020",
            description: "参与企业级应用开发",
          },
        ],
        radarData: {
          学历背景: 85,
          工作经历: 90,
          技能匹配: 95,
          项目经验: 92,
          稳定性: 80,
          发展潜力: 88,
        },
      },
      {
        id: 2,
        name: "李四",
        avatar: "https://i.pravatar.cc/150?img=4",
        title: "技术架构师",
        experience: 7,
        educationHistory: [
          {
            degree: "硕士",
            school: "清华大学",
            major: "软件工程",
            duration: "2017-2020",
          },
          {
            degree: "本科",
            school: "清华大学",
            major: "计算机科学与技术",
            duration: "2013-2017",
          },
        ],
        currentCompany: "某大型互联网公司",
        expectedSalary: "40K",
        location: "北京",
        status: "在职-看机会",
        skills: ["Java", "Spring Cloud", "DDD", "架构设计", "团队管理"],
        matchScore: 88,
        recommendReasons: [
          "丰富的架构设计经验",
          "带领过20人技术团队",
          "有从0到1搭建系统的经验",
        ],
        keyHighlights: ["大型分布式系统架构", "技术团队管理经验"],
        workHistory: [
          {
            company: "某大型互联网公司",
            position: "技术架构师",
            duration: "2019-至今",
            description: "负责技术架构规划和团队管理",
          },
        ],
        radarData: {
          学历背景: 95,
          工作经历: 88,
          技能匹配: 85,
          项目经验: 90,
          稳定性: 75,
          发展潜力: 92,
        },
      },
    ],
    experience: [
      {
        id: 3,
        name: "王五",
        avatar: "https://i.pravatar.cc/150?img=5",
        title: "资深后端工程师",
        experience: 6,
        educationHistory: [
          {
            degree: "本科",
            school: "浙江大学",
            major: "软件工程",
            duration: "2014-2018",
          },
        ],
        currentCompany: "某金融科技公司",
        expectedSalary: "38K",
        location: "北京",
        status: "在职-看机会",
        skills: ["Java", "Spring", "Kafka", "ElasticSearch"],
        matchScore: 85,
        recommendReasons: [
          "有金融系统开发经验",
          "熟悉高并发系统设计",
          "项目经验丰富",
        ],
        keyHighlights: ["金融支付系统开发", "亿级数据处理经验"],
        workHistory: [
          {
            company: "某金融科技公司",
            position: "资深后端工程师",
            duration: "2019-至今",
          },
        ],
        radarData: {
          学历背景: 80,
          工作经历: 85,
          技能匹配: 88,
          项目经验: 95,
          稳定性: 85,
          发展潜力: 82,
        },
      },
    ],
    education: [
      {
        id: 4,
        name: "赵六",
        avatar: "https://i.pravatar.cc/150?img=6",
        title: "算法工程师",
        experience: 4,
        educationHistory: [
          {
            degree: "博士",
            school: "中国科学院",
            major: "人工智能",
            duration: "2018-2022",
          },
          {
            degree: "本科",
            school: "北京邮电大学",
            major: "计算机科学与技术",
            duration: "2014-2018",
          },
        ],
        currentCompany: "某AI独角兽公司",
        expectedSalary: "32K",
        location: "北京",
        status: "在职-看机会",
        skills: ["Python", "机器学习", "深度学习", "大模型开发"],
        matchScore: 75,
        recommendReasons: [
          "学历背景优秀，有深厚的理论基础",
          "有机器学习相关项目经验",
          "发表过多篇技术论文",
        ],
        keyHighlights: ["机器学习算法开发", "大数据处理经验"],
        workHistory: [
          {
            company: "某AI独角兽公司",
            position: "算法工程师",
            duration: "2020-至今",
          },
        ],
        radarData: {
          学历背景: 98,
          工作经历: 70,
          技能匹配: 75,
          项目经验: 78,
          稳定性: 90,
          发展潜力: 95,
        },
      },
    ],
  },
};

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
