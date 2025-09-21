// AI解析相关的Mock数据和接口

// 候选人数据
const candidates = [
  {
    id: 1,
    name: "张三",
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "高级Java工程师",
    experience: 5,
    currentCompany: "某知名电商公司",
    expectedSalary: "35K",
    location: "北京",
    status: "在职-看机会",
    skills: ["Java", "Spring Boot", "MySQL", "Redis"],
    matchScore: 95,
    recommendReasons: ["技术栈高度匹配", "有电商平台开发经验"],
  },
  {
    id: 2,
    name: "李四",
    avatar: "https://i.pravatar.cc/150?img=4",
    title: "技术架构师",
    experience: 7,
    currentCompany: "某大型互联网公司",
    expectedSalary: "40K",
    location: "北京",
    status: "在职-看机会",
    skills: ["Java", "Spring Cloud", "DDD", "架构设计"],
    matchScore: 88,
    recommendReasons: ["丰富的架构设计经验", "带领过技术团队"],
  }
];

// Mock API配置
const MOCK_DELAY = 500;

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
* Mock - 获取职位卡片列表
* 功能描述：根据发布岗位id和user_id获取职位卡片列表
* 入参：jobId: number, userId: number
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/jobs/cards
* 请求方式：GET
*/
export function mockGetJobCards(jobId, userId) {
  const jobCards = [{
    id: jobId,
    title: "高级前端工程师",
    department: "技术部",
    location: "北京",
    salaryRange: "25-35K",
    skills: ["Vue.js", "React", "TypeScript"],
    status: "active"
  }];
  
  return mockRequest({
    jobCards,
    total: jobCards.length,
    userId: userId
  });
}

/**
* Mock - 根据职位描述生成职位画像和岗位详情
* 功能描述：根据user_id和职位描述生成职位画像和岗位详情
* 入参：{ userId: number, description: string }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/jobs/generate-profile
* 请求方式：POST
*/
export function mockGenerateJobProfile(userId, description) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobProfile = {
        id: `job_${Date.now()}`,
        title: "高级前端工程师",
        department: "技术部",
        location: "北京",
        salaryRange: "25-35K",
        skills: ["Vue.js", "React", "TypeScript"],
        requirements: [
          "3年以上前端开发经验",
          "熟练掌握Vue.js框架",
          "具备良好的团队协作能力"
        ],
        userId: userId
      };
      
      resolve({
        success: true,
        data: { jobProfile },
        message: "职位画像生成成功"
      });
    }, 1200);
  });
}

/**
* Mock - 根据发布岗位id获取候选人列表
* 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配
* 入参：{ jobId: number, userId: number, type?: string }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/candidates/by-job
* 请求方式：POST
*/
export function mockGetCandidatesByJobId(jobId, userId, type = '智能匹配') {
  return new Promise((resolve) => {
    const isFromCache = Math.random() > 0.3;
    const delay = isFromCache ? 100 : 2000;
    
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          candidates,
          total: candidates.length,
          matchingInfo: {
            type: type,
            isFromCache: isFromCache,
            processingTime: isFromCache ? '0.05s' : '1.5s'
          },
          jobDetail: {
            id: jobId,
            title: "高级前端工程师",
            department: "技术部"
          },
          userId: userId
        },
        message: `成功获取${candidates.length}个匹配候选人`
      });
    }, delay);
  });
}

export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';