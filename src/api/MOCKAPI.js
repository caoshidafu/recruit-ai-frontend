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
      {
        id: 5,
        name: "陈小明",
        avatar: "https://i.pravatar.cc/150?img=15",
        title: "高级全栈开发工程师",
        experience: 6,
        educationHistory: [
          {
            degree: "本科",
            school: "华中科技大学",
            major: "计算机科学与技术",
            duration: "2016-2020",
          },
        ],
        currentCompany: "某创业公司",
        expectedSalary: "36K",
        location: "深圳",
        status: "在职-想换工作",
        skills: [
          "Java",
          "Spring Boot",
          "Vue.js",
          "Docker",
          "MySQL",
          "NoSQL",
          "云原生",
          "DevOps",
        ],
        matchScore: 92,
        recommendReasons: [
          "全栈开发能力强，前后端都能胜任",
          "有创业公司快速迭代经验",
          "掌握最新的云原生技术栈",
        ],
        keyHighlights: [
          "全栈开发经验",
          "敏捷开发实践",
          "云原生架构设计",
        ],
        workHistory: [
          {
            company: "某创业公司",
            position: "高级全栈开发工程师",
            duration: "2021-至今",
            description: "负责产品的前后端开发和架构设计",
          },
          {
            company: "某互联网公司",
            position: "Java开发工程师",
            duration: "2020-2021",
            description: "参与核心业务系统开发",
          },
        ],
        radarData: {
          学历背景: 78,
          工作经历: 85,
          技能匹配: 92,
          项目经验: 88,
          稳定性: 70,
          发展潜力: 95,
        },
      },
      {
        id: 6,
        name: "刘婷婷",
        avatar: "https://i.pravatar.cc/150?img=25",
        title: "后端技术专家",
        experience: 8,
        educationHistory: [
          {
            degree: "硕士",
            school: "上海交通大学",
            major: "计算机技术",
            duration: "2014-2017",
          },
          {
            degree: "本科",
            school: "华东师范大学",
            major: "计算机科学与技术",
            duration: "2010-2014",
          },
        ],
        currentCompany: "某大厂",
        expectedSalary: "45K",
        location: "上海",
        status: "在职-看机会",
        skills: [
          "Java",
          "Spring Cloud",
          "Kafka",
          "Redis",
          "Elasticsearch",
          "Dubbo",
          "分布式系统",
          "高并发优化",
        ],
        matchScore: 94,
        recommendReasons: [
          "8年后端开发经验，技术功底扎实",
          "有大厂背景，接触过大规模系统",
          "在高并发和分布式领域有深入研究",
        ],
        keyHighlights: [
          "大厂技术专家经验",
          "高并发系统优化",
          "分布式架构设计",
        ],
        workHistory: [
          {
            company: "某大厂",
            position: "后端技术专家",
            duration: "2019-至今",
            description: "负责核心业务系统架构设计和性能优化",
          },
          {
            company: "某互联网公司",
            position: "高级Java工程师",
            duration: "2017-2019",
            description: "参与微服务架构改造项目",
          },
        ],
        radarData: {
          学历背景: 92,
          工作经历: 95,
          技能匹配: 96,
          项目经验: 94,
          稳定性: 88,
          发展潜力: 85,
        },
      },
      {
        id: 7,
        name: "杨宇航",
        avatar: "https://i.pravatar.cc/150?img=35",
        title: "资深架构师",
        experience: 9,
        educationHistory: [
          {
            degree: "本科",
            school: "中南大学",
            major: "软件工程",
            duration: "2012-2016",
          },
        ],
        currentCompany: "某独角兽公司",
        expectedSalary: "50K",
        location: "北京",
        status: "在职-看机会",
        skills: [
          "Java",
          "Go",
          "Kubernetes",
          "微服务架构",
          "系统设计",
          "性能调优",
          "技术管理",
          "DevOps",
        ],
        matchScore: 89,
        recommendReasons: [
          "9年丰富经验，从开发到架构全覆盖",
          "有技术管理经验，能带领团队",
          "在系统架构和性能优化方面有独到见解",
        ],
        keyHighlights: [
          "大型系统架构经验",
          "技术团队管理",
          "性能优化专家",
        ],
        workHistory: [
          {
            company: "某独角兽公司",
            position: "资深架构师",
            duration: "2020-至今",
            description: "负责核心产品架构设计和技术团队管理",
          },
          {
            company: "某互联网公司",
            position: "高级Java工程师",
            duration: "2018-2020",
            description: "参与公司核心业务系统重构",
          },
        ],
        radarData: {
          学历背景: 75,
          工作经历: 92,
          技能匹配: 90,
          项目经验: 95,
          稳定性: 85,
          发展潜力: 88,
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
      {
        id: 8,
        name: "徐海涛",
        avatar: "https://i.pravatar.cc/150?img=8",
        title: "高级系统架构师",
        experience: 10,
        educationHistory: [
          {
            degree: "本科",
            school: "西安电子科技大学",
            major: "计算机科学与技术",
            duration: "2011-2015",
          },
        ],
        currentCompany: "某云服务公司",
        expectedSalary: "48K",
        location: "北京",
        status: "在职-看机会",
        skills: ["Java", "分布式系统", "云计算", "Kubernetes", "微服务", "系统设计"],
        matchScore: 91,
        recommendReasons: [
          "10年后端开发经验，经历完整技术成长路径",
          "有大型分布式系统架构设计经验",
          "在云计算和容器化方面有深入实践",
        ],
        keyHighlights: ["云原生架构设计", "大规模系统管理", "技术团队建设"],
        workHistory: [
          {
            company: "某云服务公司",
            position: "高级系统架构师",
            duration: "2020-至今",
            description: "负责云平台核心服务架构设计",
          },
          {
            company: "某互联网公司",
            position: "资深Java工程师",
            duration: "2017-2020",
            description: "负责核心业务系统开发和优化",
          },
        ],
        radarData: {
          学历背景: 78,
          工作经历: 95,
          技能匹配: 90,
          项目经验: 92,
          稳定性: 88,
          发展潜力: 85,
        },
      },
      {
        id: 9,
        name: "马丽华",
        avatar: "https://i.pravatar.cc/150?img=9",
        title: "资深开发工程师",
        experience: 7,
        educationHistory: [
          {
            degree: "本科",
            school: "大连理工大学",
            major: "软件工程",
            duration: "2014-2018",
          },
        ],
        currentCompany: "某电商公司",
        expectedSalary: "42K",
        location: "杭州",
        status: "在职-想换工作",
        skills: ["Java", "Spring Boot", "MySQL", "Redis", "RocketMQ", "电商系统"],
        matchScore: 87,
        recommendReasons: [
          "7年电商系统开发经验，业务理解深入",
          "有大促活动系统保障经验",
          "熟悉高并发场景下的系统优化",
        ],
        keyHighlights: ["电商核心系统开发", "高并发系统保障", "业务系统优化"],
        workHistory: [
          {
            company: "某电商公司",
            position: "资深开发工程师",
            duration: "2019-至今",
            description: "负责电商核心交易系统开发和维护",
          },
          {
            company: "某互联网公司",
            position: "Java开发工程师",
            duration: "2018-2019",
            description: "参与用户系统和支付系统开发",
          },
        ],
        radarData: {
          学历背景: 80,
          工作经历: 88,
          技能匹配: 85,
          项目经验: 90,
          稳定性: 82,
          发展潜力: 85,
        },
      },
      {
        id: 10,
        name: "周志强",
        avatar: "https://i.pravatar.cc/150?img=10",
        title: "技术总监",
        experience: 12,
        educationHistory: [
          {
            degree: "硕士",
            school: "北京理工大学",
            major: "计算机应用技术",
            duration: "2008-2011",
          },
          {
            degree: "本科",
            school: "北京理工大学",
            major: "计算机科学与技术",
            duration: "2004-2008",
          },
        ],
        currentCompany: "某金融科技公司",
        expectedSalary: "60K",
        location: "北京",
        status: "在职-看机会",
        skills: ["Java", "架构设计", "团队管理", "技术规划", "金融系统", "风控系统"],
        matchScore: 84,
        recommendReasons: [
          "12年丰富经验，有完整的技术管理经历",
          "曾负责大型金融系统的技术架构",
          "有成功的团队建设和技术转型经验",
        ],
        keyHighlights: ["技术管理经验", "金融系统架构", "团队建设领导力"],
        workHistory: [
          {
            company: "某金融科技公司",
            position: "技术总监",
            duration: "2018-至今",
            description: "负责公司整体技术架构规划和团队管理",
          },
          {
            company: "某互联网公司",
            position: "架构师",
            duration: "2015-2018",
            description: "负责核心业务系统架构设计",
          },
        ],
        radarData: {
          学历背景: 88,
          工作经历: 95,
          技能匹配: 82,
          项目经验: 94,
          稳定性: 90,
          发展潜力: 78,
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
      {
        id: 11,
        name: "林雅琪",
        avatar: "https://i.pravatar.cc/150?img=11",
        title: "研发工程师",
        experience: 3,
        educationHistory: [
          {
            degree: "硕士",
            school: "复旦大学",
            major: "计算机科学与技术",
            duration: "2020-2023",
          },
          {
            degree: "本科",
            school: "同济大学",
            major: "软件工程",
            duration: "2016-2020",
          },
        ],
        currentCompany: "某互联网公司",
        expectedSalary: "28K",
        location: "上海",
        status: "在职-看机会",
        skills: ["Java", "Spring Boot", "Python", "数据分析", "机器学习", "算法优化"],
        matchScore: 82,
        recommendReasons: [
          "名校硕士背景，理论基础扎实",
          "有机器学习和数据分析实践经验",
          "学习能力强，技术成长快速",
        ],
        keyHighlights: ["名校学历背景", "机器学习项目经验", "快速学习能力"],
        workHistory: [
          {
            company: "某互联网公司",
            position: "研发工程师",
            duration: "2023-至今",
            description: "负责推荐系统算法优化和数据分析",
          },
        ],
        radarData: {
          学历背景: 95,
          工作经历: 70,
          技能匹配: 80,
          项目经验: 75,
          稳定性: 85,
          发展潜力: 95,
        },
      },
      {
        id: 12,
        name: "孙建国",
        avatar: "https://i.pravatar.cc/150?img=12",
        title: "软件开发工程师",
        experience: 5,
        educationHistory: [
          {
            degree: "博士",
            school: "中科院计算所",
            major: "计算机系统结构",
            duration: "2016-2021",
          },
          {
            degree: "本科",
            school: "哈尔滨工业大学",
            major: "计算机科学与技术",
            duration: "2012-2016",
          },
        ],
        currentCompany: "某研究院",
        expectedSalary: "35K",
        location: "北京",
        status: "在职-想换工作",
        skills: ["Java", "C++", "分布式计算", "系统优化", "并行处理", "性能调优"],
        matchScore: 86,
        recommendReasons: [
          "博士学历，理论功底深厚",
          "在系统性能优化方面有深入研究",
          "有丰富的学术研究和工程实践经验",
        ],
        keyHighlights: ["博士学历背景", "系统性能优化", "学术工程并重"],
        workHistory: [
          {
            company: "某研究院",
            position: "软件开发工程师",
            duration: "2021-至今",
            description: "负责高性能计算系统开发和优化",
          },
        ],
        radarData: {
          学历背景: 98,
          工作经历: 78,
          技能匹配: 85,
          项目经验: 82,
          稳定性: 80,
          发展潜力: 90,
        },
      },
      {
        id: 13,
        name: "黄小芳",
        avatar: "https://i.pravatar.cc/150?img=13",
        title: "Java开发工程师",
        experience: 4,
        educationHistory: [
          {
            degree: "硕士",
            school: "中山大学",
            major: "软件工程",
            duration: "2018-2021",
          },
          {
            degree: "本科",
            school: "华南理工大学",
            major: "计算机科学与技术",
            duration: "2014-2018",
          },
        ],
        currentCompany: "某金融公司",
        expectedSalary: "32K",
        location: "广州",
        status: "在职-看机会",
        skills: ["Java", "Spring", "MyBatis", "MySQL", "金融业务", "风控系统"],
        matchScore: 79,
        recommendReasons: [
          "985高校硕士学历，基础扎实",
          "有金融行业业务经验",
          "工作认真负责，学习能力强",
        ],
        keyHighlights: ["985高校背景", "金融业务经验", "稳定可靠"],
        workHistory: [
          {
            company: "某金融公司",
            position: "Java开发工程师",
            duration: "2021-至今",
            description: "负责金融风控系统开发和维护",
          },
        ],
        radarData: {
          学历背景: 90,
          工作经历: 75,
          技能匹配: 78,
          项目经验: 78,
          稳定性: 88,
          发展潜力: 85,
        },
      },
      {
        id: 14,
        name: "吴志远",
        avatar: "https://i.pravatar.cc/150?img=14",
        title: "高级开发工程师",
        experience: 6,
        educationHistory: [
          {
            degree: "硕士",
            school: "西北工业大学",
            major: "计算机技术",
            duration: "2016-2019",
          },
          {
            degree: "本科",
            school: "西北工业大学",
            major: "计算机科学与技术",
            duration: "2012-2016",
          },
        ],
        currentCompany: "某航空科技公司",
        expectedSalary: "38K",
        location: "西安",
        status: "在职-看机会",
        skills: ["Java", "Spring Boot", "微服务", "系统集成", "航空业务", "实时系统"],
        matchScore: 83,
        recommendReasons: [
          "211重点高校硕士背景",
          "有航空航天领域的系统开发经验",
          "具备复杂系统集成能力",
        ],
        keyHighlights: ["211高校背景", "航空系统经验", "系统集成专长"],
        workHistory: [
          {
            company: "某航空科技公司",
            position: "高级开发工程师",
            duration: "2019-至今",
            description: "负责航空管理系统开发和系统集成",
          },
        ],
        radarData: {
          学历背景: 88,
          工作经历: 82,
          技能匹配: 81,
          项目经验: 85,
          稳定性: 90,
          发展潜力: 82,
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
  
  // 根据jobId进行筛选，模拟不同职位有不同的推荐候选人
  if (params.jobId) {
    const jobId = parseInt(params.jobId);
    // 根据职位ID返回不同的候选人组合
    switch (jobId) {
      case 1: // 高级Java开发工程师
        candidates = candidates.filter(c => [1, 2, 5, 8, 9].includes(c.id));
        break;
      case 2: // 前端技术专家
        candidates = candidates.filter(c => [3, 6, 7].includes(c.id));
        break;
      case 3: // 产品经理
        candidates = candidates.filter(c => [4, 6, 10].includes(c.id));
        break;
      case 4: // 数据分析师
        candidates = candidates.filter(c => [7, 8, 11, 12].includes(c.id));
        break;
      case 5: // UI设计师
        candidates = candidates.filter(c => [3, 6, 13].includes(c.id));
        break;
      default:
        // 默认返回所有候选人
        break;
    }
  }
  
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
  
  // 根据jobId进行筛选，模拟不同职位有不同的经验匹配候选人
  if (params.jobId) {
    const jobId = parseInt(params.jobId);
    switch (jobId) {
      case 1: // 高级Java开发工程师
        candidates = candidates.filter(c => [1, 8, 9, 10].includes(c.id));
        break;
      case 2: // 前端技术专家
        candidates = candidates.filter(c => [2, 3, 7].includes(c.id));
        break;
      case 3: // 产品经理
        candidates = candidates.filter(c => [4, 6, 10].includes(c.id));
        break;
      case 4: // 数据分析师
        candidates = candidates.filter(c => [5, 8, 12].includes(c.id));
        break;
      case 5: // UI设计师
        candidates = candidates.filter(c => [2, 6, 7].includes(c.id));
        break;
      default:
        // 默认返回所有候选人
        break;
    }
  }
  
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
  
  // 根据jobId进行筛选，模拟不同职位有不同的学历匹配候选人
  if (params.jobId) {
    const jobId = parseInt(params.jobId);
    switch (jobId) {
      case 1: // 高级Java开发工程师
        candidates = candidates.filter(c => [11, 12, 13, 14].includes(c.id));
        break;
      case 2: // 前端技术专家
        candidates = candidates.filter(c => [11, 13, 14].includes(c.id));
        break;
      case 3: // 产品经理
        candidates = candidates.filter(c => [12, 13, 14].includes(c.id));
        break;
      case 4: // 数据分析师
        candidates = candidates.filter(c => [11, 12, 14].includes(c.id));
        break;
      case 5: // UI设计师
        candidates = candidates.filter(c => [11, 13].includes(c.id));
        break;
      default:
        // 默认返回所有候选人
        break;
    }
  }
  
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
