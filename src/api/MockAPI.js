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
    recommendReasons: ["技术栈高度匹配", "有电商平台开发经验", "大型项目经验丰富"],
    keyHighlights: ["Vue.js专家", "React熟练", "TypeScript", "电商经验"],
    educationHistory: [
      {
        degree: "本科",
        school: "北京理工大学",
        major: "计算机科学与技术",
        duration: "2015-2019"
      }
    ],
    workHistory: [
      {
        company: "某知名电商公司",
        position: "高级前端工程师",
        duration: "2021-至今",
        description: "负责电商平台前端架构设计，主导多个核心功能模块开发"
      },
      {
        company: "某互联网公司",
        position: "前端工程师",
        duration: "2019-2021",
        description: "参与多个Web应用开发，积累丰富的前端开发经验"
      }
    ],
    radarData: {
      "学历背景": 85,
      "工作经历": 92,
      "技能匹配": 95,
      "项目经验": 90,
      "稳定性": 88,
      "发展潜力": 92
    }
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
    recommendReasons: ["丰富的架构设计经验", "带领过技术团队", "跨框架开发能力"],
    keyHighlights: ["架构专家", "团队Leader", "多框架精通", "技术深度"],
    educationHistory: [
      {
        degree: "硕士",
        school: "清华大学",
        major: "软件工程",
        duration: "2014-2017"
      }
    ],
    workHistory: [
      {
        company: "某大型互联网公司",
        position: "前端技术专家",
        duration: "2020-至今",
        description: "负责前端技术架构设计，带领10人前端团队，制定技术标准"
      },
      {
        company: "某知名科技公司",
        position: "高级前端工程师",
        duration: "2017-2020",
        description: "参与多个大型项目架构设计，积累丰富的技术管理经验"
      }
    ],
    radarData: {
      "学历背景": 98,
      "工作经历": 95,
      "技能匹配": 88,
      "项目经验": 92,
      "稳定性": 90,
      "发展潜力": 95
    }
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
    recommendReasons: ["Vue.js经验丰富", "学习能力强", "快速适应新技术"],
    keyHighlights: ["Vue.js熟练", "工程化经验", "学习能力", "创业公司经验"],
    educationHistory: [
      {
        degree: "本科",
        school: "北京邮电大学",
        major: "软件工程",
        duration: "2017-2021"
      }
    ],
    workHistory: [
      {
        company: "某创业公司",
        position: "前端工程师",
        duration: "2021-至今",
        description: "负责公司核心产品前端开发，参与从0到1的产品构建"
      }
    ],
    radarData: {
      "学历背景": 82,
      "工作经历": 78,
      "技能匹配": 85,
      "项目经验": 80,
      "稳定性": 88,
      "发展潜力": 90
    }
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
    recommendReasons: ["React技术栈熟练", "有金融行业经验", "TypeScript深度应用"],
    keyHighlights: ["React专家", "TypeScript", "金融行业", "GraphQL"],
    educationHistory: [
      {
        degree: "本科",
        school: "复旦大学",
        major: "计算机科学与技术",
        duration: "2014-2018"
      }
    ],
    workHistory: [
      {
        company: "某金融科技公司",
        position: "资深前端工程师",
        duration: "2020-至今",
        description: "负责金融产品前端开发，熟悉金融业务流程和合规要求"
      },
      {
        company: "某互联网公司",
        position: "前端工程师",
        duration: "2018-2020",
        description: "参与多个B端产品开发，积累丰富的React开发经验"
      }
    ],
    radarData: {
      "学历背景": 86,
      "工作经历": 88,
      "技能匹配": 85,
      "项目经验": 87,
      "稳定性": 92,
      "发展潜力": 85
    }
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
    recommendReasons: ["基础扎实", "可立即入职", "学习意愿强烈"],
    keyHighlights: ["基础扎实", "立即到岗", "Vue.js经验", "成本优势"],
    educationHistory: [
      {
        degree: "专科",
        school: "北京信息职业技术学院",
        major: "计算机应用技术",
        duration: "2019-2022"
      }
    ],
    workHistory: [
      {
        company: "某外包公司",
        position: "前端开发工程师",
        duration: "2022-2024",
        description: "参与多个中小型项目开发，熟悉Vue.js开发流程"
      }
    ],
    radarData: {
      "学历背景": 68,
      "工作经历": 70,
      "技能匹配": 75,
      "项目经验": 72,
      "稳定性": 85,
      "发展潜力": 88
    }
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
    recommendReasons: ["全栈能力", "AI行业背景", "技术视野广阔"],
    keyHighlights: ["全栈开发", "AI背景", "多语言精通", "创新能力"],
    educationHistory: [
      {
        degree: "硕士",
        school: "中山大学",
        major: "人工智能",
        duration: "2018-2021"
      }
    ],
    workHistory: [
      {
        company: "某AI公司",
        position: "全栈工程师",
        duration: "2021-至今",
        description: "负责AI产品的全栈开发，包括前端界面和后端算法集成"
      }
    ],
    radarData: {
      "学历背景": 95,
      "工作经历": 82,
      "技能匹配": 90,
      "项目经验": 88,
      "稳定性": 87,
      "发展潜力": 98
    }
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
      // 职位卡片统计数据
      candidateCount: 42,    // 候选人总数
      newCandidates: 8,      // 新推荐候选人数
      interviewingCount: 5,  // 面试中人数
      headcount: 3,          // 需求人数
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
      urgency: "normal",
      // 职位卡片统计数据
      candidateCount: 28,    // 候选人总数
      newCandidates: 6,      // 新推荐候选人数
      interviewingCount: 3,  // 面试中人数
      headcount: 2,          // 需求人数
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

/**
* Mock - 接口四：获取候选人AI分析
* 功能描述：根据候选人ID获取AI智能分析报告，包含能力评估、匹配度分析等
* 入参：{ candidateId: number, userId: number }
* 返回参数：{ success: boolean, data: { overallScore: number, recommendation: string, strengths: array, improvements: array, jobMatching: object, recommendedActions: array }, message: string }
* url地址：/candidates/ai-analysis
* 请求方式：POST
*/
export function mockGetCandidateAIAnalysis(candidateId, userId) { // eslint-disable-line no-unused-vars
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

export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';