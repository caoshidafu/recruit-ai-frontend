// AI解析相关的Mock数据和接口

// 候选人数据
const candidates = [
  {
    id: 1,
    name: "张三",
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "高级前端工程师",
    experience: 5,
    education: "本科",
    currentCompany: "某知名电商公司",
    expectedSalary: "35K",
    location: "北京",
    status: "在职-看机会",
    skills: ["Vue.js", "React", "TypeScript", "Node.js"],
    matchScore: 95,
    recommendReasons: ["技术栈高度匹配", "有电商平台开发经验"],
  },
  {
    id: 2,
    name: "李四",
    avatar: "https://i.pravatar.cc/150?img=4",
    title: "前端技术专家",
    experience: 7,
    education: "硕士",
    currentCompany: "某大型互联网公司",
    expectedSalary: "40K",
    location: "北京",
    status: "在职-看机会",
    skills: ["Vue.js", "React", "Angular", "架构设计"],
    matchScore: 88,
    recommendReasons: ["丰富的架构设计经验", "带领过技术团队"],
  },
  {
    id: 3,
    name: "王五",
    avatar: "https://i.pravatar.cc/150?img=5",
    title: "中级前端工程师",
    experience: 3,
    education: "本科",
    currentCompany: "某创业公司",
    expectedSalary: "25K",
    location: "北京",
    status: "在职-看机会",
    skills: ["Vue.js", "JavaScript", "CSS3", "Webpack"],
    matchScore: 82,
    recommendReasons: ["Vue.js经验丰富", "学习能力强"],
  },
  {
    id: 4,
    name: "赵六",
    avatar: "https://i.pravatar.cc/150?img=6",
    title: "资深前端工程师",
    experience: 6,
    education: "本科",
    currentCompany: "某金融科技公司",
    expectedSalary: "38K",
    location: "上海",
    status: "在职-看机会",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    matchScore: 85,
    recommendReasons: ["React技术栈熟练", "有金融行业经验"],
  },
  {
    id: 5,
    name: "钱七",
    avatar: "https://i.pravatar.cc/150?img=7",
    title: "前端开发工程师",
    experience: 2,
    education: "专科",
    currentCompany: "某外包公司",
    expectedSalary: "18K",
    location: "北京",
    status: "离职-随时到岗",
    skills: ["Vue.js", "JavaScript", "HTML5", "CSS3"],
    matchScore: 75,
    recommendReasons: ["基础扎实", "可立即入职"],
  },
  {
    id: 6,
    name: "孙八",
    avatar: "https://i.pravatar.cc/150?img=8",
    title: "全栈工程师",
    experience: 4,
    education: "硕士",
    currentCompany: "某AI公司",
    expectedSalary: "32K",
    location: "深圳",
    status: "在职-看机会",
    skills: ["Vue.js", "React", "Node.js", "Python"],
    matchScore: 90,
    recommendReasons: ["全栈能力", "AI行业背景"],
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
* Mock - 接口一：获取职位卡片列表
* 功能描述：根据user_id获取职位卡片和岗位详情列表
* 入参：userId: number
* 返回参数：{ success: boolean, data: { jobCards: array, total: number, userId: number }, message: string }
* url地址：/jobs/list
* 请求方式：GET
*/
export function mockGetJobCardsList(userId) {
  const jobCards = [
    {
      id: 123,
      title: "高级前端工程师",
      department: "技术部",
      location: "北京",
      salaryRange: "25-35K",
      experience: "3-5年",
      education: "本科",
      skills: ["Vue.js", "React", "TypeScript"],
      status: "active",
      publishDate: "2024-01-15",
      applicationCount: 25,
      urgency: "high",
      responsibilities: [
        "负责前端项目架构设计和开发",
        "参与产品需求分析和技术方案制定",
        "优化前端性能，提升用户体验"
      ],
      requirements: [
        "3年以上前端开发经验",
        "熟练掌握Vue.js、React等框架",
        "具备良好的团队协作能力"
      ],
      benefits: ["六险一金", "弹性工作", "技术培训", "年终奖金"]
    },
    {
      id: 124,
      title: "Java后端工程师",
      department: "技术部",
      location: "上海",
      salaryRange: "20-30K",
      experience: "2-4年",
      education: "本科",
      skills: ["Java", "Spring Boot", "MySQL", "Redis"],
      status: "active",
      publishDate: "2024-01-10",
      applicationCount: 18,
      urgency: "medium",
      responsibilities: [
        "负责后端服务架构设计和开发",
        "参与数据库设计和优化",
        "确保系统稳定性和安全性"
      ],
      requirements: [
        "2年以上Java开发经验",
        "熟练掌握Spring Boot框架",
        "熟悉MySQL数据库操作"
      ],
      benefits: ["五险一金", "带薪年假", "团建活动", "技能培训"]
    }
  ];
  
  return mockRequest({
    jobCards,
    total: jobCards.length,
    userId: userId
  });
}

/**
* Mock - 接口二：根据职位描述生成职位画像和岗位详情
* 功能描述：根据user_id和职位描述生成职位画像和岗位详情，返回发布岗位id
* 入参：{ userId: number, description: string }
* 返回参数：{ success: boolean, data: { jobProfile: object, jobId: number }, message: string }
* url地址：/jobs/generate-profile
* 请求方式：POST
*/
export function mockGenerateJobProfile(userId, description) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobId = Date.now(); // 生成新的发布岗位id
      const jobProfile = {
        id: jobId,
        title: "高级前端工程师",
        department: "技术部",
        location: "北京",
        salaryRange: "25-35K",
        experience: "3-5年",
        education: "本科",
        skills: ["Vue.js", "React", "TypeScript"],
        responsibilities: [
          "负责前端项目架构设计和开发",
          "参与产品需求分析和技术方案制定",
          "优化前端性能，提升用户体验"
        ],
        requirements: [
          "3年以上前端开发经验",
          "熟练掌握Vue.js、React等框架",
          "具备良好的团队协作能力"
        ],
        benefits: ["六险一金", "弹性工作", "技术培训", "年终奖金"],
        status: "draft",
        publishDate: new Date().toISOString().split('T')[0],
        applicationCount: 0,
        urgency: "high",
        userId: userId,
        description: description
      };
      
      resolve({
        success: true,
        data: { 
          jobProfile,
          jobId: jobId // 返回发布岗位id，供后续调用接口三使用
        },
        message: "职位画像生成成功"
      });
    }, 1200);
  });
}

/**
* Mock - 接口三：根据发布岗位id获取候选人列表
* 功能描述：根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）
* 入参：{ jobId: number, userId: number, type?: string }
* 返回参数：{ success: boolean, data: { candidates: array, total: number, matchingInfo: object, jobDetail: object, userId: number }, message: string }
* url地址：/candidates/match
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
            processingTime: isFromCache ? '0.05s' : '1.5s',
            totalMatched: candidates.length,
            algorithm: "AI_SMART_MATCH_V2"
          },
          jobDetail: {
            id: jobId,
            title: "高级前端工程师",
            department: "技术部",
            location: "北京",
            salaryRange: "25-35K"
          },
          userId: userId
        },
        message: `成功获取${candidates.length}个匹配候选人`
      });
    }, delay);
  });
}

export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';