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
    interviewingCount: 0,
    // 添加职位卡片显示信息
    cardInfo: {
      title: jobData.title || '新职位',
      department: jobData.department || '技术部',
      level: jobData.level || '中级',
      location: jobData.location || '北京',
      salary: jobData.salary || '15-25K',
      status: 'active',
      publishedAt: jobData.publishedAt || new Date().toISOString(),
      urgency: 'normal', // 紧急程度：urgent, normal, low
      tags: extractJobTags(jobData.description || ''),
      stats: {
        applicants: 0,
        views: 1,
        publishDays: 0
      }
    }
  };
  
  // 将新职位添加到mockData.jobs中以保持数据持久性
  // 但注意：前端不应该重复添加到显示列表中
  mockData.jobs.unshift(newJob);
  
  return mockRequest(newJob);
}

// 辅助函数：从职位描述中提取标签
function extractJobTags(description) {
  const desc = description.toLowerCase();
  const tags = [];
  
  // 技术栈标签
  if (desc.includes('vue') || desc.includes('前端')) tags.push('Vue.js');
  if (desc.includes('react')) tags.push('React');
  if (desc.includes('java')) tags.push('Java');
  if (desc.includes('python')) tags.push('Python');
  if (desc.includes('node')) tags.push('Node.js');
  if (desc.includes('golang') || desc.includes('go语言')) tags.push('Go');
  
  // 工作性质标签
  if (desc.includes('全栈')) tags.push('全栈开发');
  if (desc.includes('架构') || desc.includes('系统设计')) tags.push('架构设计');
  if (desc.includes('团队') || desc.includes('管理')) tags.push('团队管理');
  if (desc.includes('创业') || desc.includes('初创')) tags.push('创业公司');
  
  // 技能标签
  if (desc.includes('微服务')) tags.push('微服务');
  if (desc.includes('云') || desc.includes('docker') || desc.includes('k8s')) tags.push('云原生');
  if (desc.includes('ai') || desc.includes('机器学习') || desc.includes('算法')) tags.push('AI/ML');
  
  return tags.slice(0, 3); // 最多返回3个标签
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

/**
 * Mock - AI解析职位描述
 * 功能描述：使用AI技术解析原始职位描述，提取结构化信息
 * 入参：{ description: string } - 原始职位描述文本
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/ai-parse
 * 请求方式：POST
 */
export function mockParseJobDescription(description) {
  // 模拟AI解析延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      const desc = description?.toLowerCase() || '';
      
      // 智能提取基本信息
      const extractedInfo = {
        title: extractTitle(description),
        department: extractDepartment(description),
        level: extractLevel(description),
        location: extractLocation(description),
        salary: extractSalary(description)
      };
      
      // 技能匹配
      const hasVue = desc.includes('vue');
      const hasReact = desc.includes('react');
      const hasNode = desc.includes('node');
      const hasJava = desc.includes('java');
      const hasPython = desc.includes('python');
      
      // 模拟AI解析结果
      const mockParsedData = {
        extractedInfo, // 新增：提取的基本信息
        skills: [
          ...(hasVue ? ['Vue.js', 'JavaScript', 'TypeScript'] : []),
          ...(hasReact ? ['React', 'JavaScript', 'TypeScript'] : []),
          ...(hasNode ? ['Node.js', 'Express'] : []),
          ...(hasJava ? ['Java', 'Spring Boot', 'MyBatis'] : []),
          ...(hasPython ? ['Python', 'Django', 'Flask'] : []),
          'Git', 'RESTful API', '代码规范'
        ].filter(Boolean),
        requirements: [
          `${extractExperience(description)}开发经验`,
          `熟练掌握${extractMainTech(description)}`,
          '具备良好的代码规范和团队协作能力',
          '有项目开发经验',
          '良好的学习能力和沟通能力'
        ],
        benefits: [
          '五险一金',
          '年终奖金',
          '弹性工作时间',
          '技术培训',
          '团队建设活动',
          '带薪年假'
        ],
        experience: extractExperience(description),
        education: extractEducation(description),
        workType: '全职',
        analysisConfidence: 0.92,
        suggestions: [
          '建议在职位描述中明确技术栈版本要求',
          '可以增加对候选人软技能的描述',
          '薪资范围建议更加具体'
        ]
      };
      
      resolve(mockRequest(mockParsedData));
    }, 2000); // 模拟2秒AI解析时间
  });
}

// 辅助函数：提取职位标题
function extractTitle(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('前端工程师') || desc.includes('前端开发')) {
    if (desc.includes('高级') || desc.includes('资深')) return '高级前端工程师';
    if (desc.includes('初级') || desc.includes('junior')) return '初级前端工程师';
    return '前端工程师';
  }
  if (desc.includes('后端工程师') || desc.includes('后端开发')) {
    if (desc.includes('高级') || desc.includes('资深')) return '高级后端工程师';
    return '后端工程师';
  }
  if (desc.includes('全栈工程师') || desc.includes('全栈开发')) return '全栈工程师';
  if (desc.includes('产品经理')) return '产品经理';
  if (desc.includes('ui设计师') || desc.includes('界面设计')) return 'UI设计师';
  if (desc.includes('数据分析师')) return '数据分析师';
  if (desc.includes('测试工程师')) return '测试工程师';
  
  return '软件工程师'; // 默认值
}

// 辅助函数：提取部门
function extractDepartment(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('技术部') || desc.includes('研发部') || desc.includes('开发部')) return '技术部';
  if (desc.includes('产品部')) return '产品部';
  if (desc.includes('设计部')) return '设计部';
  if (desc.includes('运营部')) return '运营部';
  if (desc.includes('市场部')) return '市场部';
  if (desc.includes('销售部')) return '销售部';
  
  // 根据职位类型推断部门
  if (desc.includes('工程师') || desc.includes('开发')) return '技术部';
  if (desc.includes('产品经理')) return '产品部';
  if (desc.includes('设计师')) return '设计部';
  
  return '技术部'; // 默认值
}

// 辅助函数：提取级别
function extractLevel(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('高级') || desc.includes('资深') || desc.includes('senior')) return '高级';
  if (desc.includes('中级') || desc.includes('中等')) return '中级';
  if (desc.includes('初级') || desc.includes('junior') || desc.includes('入门')) return '初级';
  if (desc.includes('专家') || desc.includes('架构师') || desc.includes('技术leader')) return '专家';
  
  // 根据经验年限推断
  if (desc.includes('5年以上') || desc.includes('5+年')) return '高级';
  if (desc.includes('3-5年') || desc.includes('3年以上')) return '中级';
  if (desc.includes('1-3年') || desc.includes('应届')) return '初级';
  
  return '中级'; // 默认值
}

// 辅助函数：提取工作地点
function extractLocation(description) {
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '苏州'];
  const desc = description || '';
  
  for (const city of cities) {
    if (desc.includes(city)) {
      return desc.includes('区') ? 
        desc.substring(desc.indexOf(city), desc.indexOf(city) + city.length + 3) : 
        city;
    }
  }
  
  return '北京'; // 默认值
}

// 辅助函数：提取薪资
function extractSalary(description) {
  const desc = description || '';
  
  // 匹配各种薪资格式
  const salaryRegex = /(\d+(?:\.\d+)?)\s*[-~到至]\s*(\d+(?:\.\d+)?)\s*[kK万]/g;
  const match = salaryRegex.exec(desc);
  
  if (match) {
    return `${match[1]}-${match[2]}K`;
  }
  
  // 匹配单一薪资
  const singleSalaryRegex = /(\d+(?:\.\d+)?)\s*[kK万]/g;
  const singleMatch = singleSalaryRegex.exec(desc);
  
  if (singleMatch) {
    const salary = parseFloat(singleMatch[1]);
    return `${Math.max(1, salary - 2)}-${salary + 3}K`;
  }
  
  return ''; // 没有找到薪资信息
}

// 辅助函数：提取经验要求
function extractExperience(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('5年以上') || desc.includes('5+年')) return '5年以上';
  if (desc.includes('3-5年')) return '3-5年';
  if (desc.includes('3年以上')) return '3年以上';
  if (desc.includes('1-3年')) return '1-3年';
  if (desc.includes('应届') || desc.includes('0-1年')) return '1年以下';
  
  return '3年以上'; // 默认值
}

// 辅助函数：提取主要技术
function extractMainTech(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('vue')) return 'Vue.js技术栈';
  if (desc.includes('react')) return 'React技术栈';
  if (desc.includes('java')) return 'Java技术栈';
  if (desc.includes('python')) return 'Python技术栈';
  if (desc.includes('node')) return 'Node.js技术栈';
  
  return '相关技术栈'; // 默认值
}

// 辅助函数：提取学历要求
function extractEducation(description) {
  const desc = description?.toLowerCase() || '';
  
  if (desc.includes('硕士') || desc.includes('研究生')) return '硕士及以上';
  if (desc.includes('本科') || desc.includes('学士')) return '本科及以上';
  if (desc.includes('大专') || desc.includes('专科')) return '大专及以上';
  
  return '本科及以上'; // 默认值
}

/**
 * Mock - 分析职位需求
 * 功能描述：分析已创建职位的详细需求和匹配标准
 * 入参：{ jobId: number } - 职位ID
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/jobs/analyze/:id
 * 请求方式：POST
 */
export function mockAnalyzeJobRequirements(jobId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据jobId模拟不同的分析结果
      const isHighLevel = parseInt(jobId) % 2 === 0;
      
      const mockAnalysisData = {
        matchCriteria: {
          technicalSkills: {
            weight: 0.4,
            required: ['Vue.js', 'JavaScript', 'TypeScript'],
            preferred: ['Node.js', 'MySQL', 'Redis']
          },
          experience: {
            weight: 0.3,
            minYears: isHighLevel ? 5 : 3,
            maxYears: isHighLevel ? 10 : 8,
            relevantDomains: ['前端开发', 'Web开发', '全栈开发']
          },
          education: {
            weight: 0.2,
            minLevel: '本科',
            preferredMajors: ['计算机科学', '软件工程', '信息技术']
          },
          softSkills: {
            weight: 0.1,
            required: ['团队合作', '沟通能力', '学习能力']
          }
        },
        skillWeights: {
          'Vue.js': 0.25,
          'JavaScript': 0.20,
          'TypeScript': 0.15,
          'Node.js': 0.10,
          'MySQL': 0.08,
          'Redis': 0.07,
          'Git': 0.05,
          '前端框架': 0.10
        },
        recommendationStrategy: 'hybrid', // hybrid, experience-based, skill-based
        confidenceScore: 0.92,
        estimatedCandidatePool: 156
      };
      
      resolve(mockRequest(mockAnalysisData));
    }, 1500); // 模拟1.5秒分析时间
  });
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
 * Mock - AI智能匹配候选人
 * 功能描述：基于AI算法为新创建的职位智能匹配候选人
 * 入参：{ jobId: number, analysisDepth?: string } - 职位ID和分析深度
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/ai-match
 * 请求方式：POST
 */
export function mockAiMatchCandidates(jobId, analysisDepth = 'detailed') {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据分析深度和jobId调整结果
      const isDetailed = analysisDepth === 'detailed';
      const matchCount = isDetailed ? 6 : 3;
      const baseScore = parseInt(jobId) % 2 === 0 ? 90 : 85;
      
      // 模拟AI匹配分析结果
      const allCandidates = [
        {
          id: 1,
          matchScore: baseScore + 4,
          matchReasons: [
            '技能匹配度高：Vue.js、JavaScript、TypeScript',
            '工作经验符合要求：5年前端开发经验',
            '项目背景相似：大型电商平台开发经验'
          ],
          confidenceScore: 0.94,
          riskFactors: []
        },
        {
          id: 3,
          matchScore: 89,
          matchReasons: [
            '技术栈匹配：Vue.js、Node.js全栈经验',
            '学历背景优秀：211院校计算机专业',
            '团队协作能力强'
          ],
          confidenceScore: 0.89,
          riskFactors: ['地理位置较远']
        },
        {
          id: 5,
          matchScore: 85,
          matchReasons: [
            '前端技能扎实：JavaScript、CSS、HTML',
            '快速学习能力：能够快速掌握新技术',
            '工作态度积极'
          ],
          confidenceScore: 0.85,
          riskFactors: ['经验稍显不足']
        },
        {
          id: 7,
          matchScore: 82,
          matchReasons: [
            'React转Vue经验：具备框架迁移能力',
            '大厂背景：阿里巴巴3年工作经验',
            '技术视野广阔'
          ],
          confidenceScore: 0.82,
          riskFactors: ['薪资期望较高']
        },
        {
          id: 9,
          matchScore: 79,
          matchReasons: [
            '基础扎实：计算机基础知识牢固',
            '学习能力强：自主学习Vue.js',
            '工作稳定性好'
          ],
          confidenceScore: 0.79,
          riskFactors: ['缺乏大型项目经验']
        },
        {
          id: 11,
          matchScore: 76,
          matchReasons: [
            '后端转前端：全栈思维优势',
            '逻辑思维清晰：算法基础扎实',
            '责任心强'
          ],
          confidenceScore: 0.76,
          riskFactors: ['前端经验相对较少']
        }
      ];
      
      const mockMatchData = {
        candidates: allCandidates.slice(0, matchCount),
        matchSummary: {
          totalAnalyzed: 156,
          highMatch: 12,
          mediumMatch: 35,
          lowMatch: 109,
          averageMatchScore: 78.5
        },
        recommendations: [
          {
            type: 'priority',
            candidateId: 1,
            reason: '综合匹配度最高，建议优先联系'
          },
          {
            type: 'potential',
            candidateId: 3,
            reason: '潜力较大，可作为备选方案'
          },
          {
            type: 'training',
            candidateId: 5,
            reason: '基础良好，可通过培训提升'
          }
        ],
        analysisMetrics: {
          processingTime: '1.8s',
          dataPoints: 247,
          algorithmVersion: 'v2.1.3',
          confidenceLevel: 0.91
        }
      };
      
      resolve(mockRequest(mockMatchData));
    }, 2500); // 模拟2.5秒AI匹配分析时间
  });
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

/**
 * Mock - 获取候选人AI分析报告
 * 功能描述：使用AI技术深度分析候选人的能力、优势、改进建议等
 * 入参：{ candidateId: number, analysisType?: string } - 候选人ID和分析类型
 * 返回参数：{ success: boolean, data: Object, message: string }
 * url地址：/candidates/:id/ai-analysis
 * 请求方式：GET
 */
export function mockGetCandidateAIAnalysis(candidateId, analysisType = 'detailed') {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 在所有候选人分类中查找
      let candidate = null;
      for (const category of Object.values(mockData.candidates)) {
        candidate = category.find(c => c.id === parseInt(candidateId));
        if (candidate) break;
      }
      
      if (!candidate) {
        resolve({
          success: false,
          message: '候选人不存在',
          data: null
        });
        return;
      }
      
      // 根据候选人ID和分析类型生成个性化的AI分析
      const baseScore = candidate.matchScore || 85;
      
      // 根据分析类型调整分析深度
      const isBasicAnalysis = analysisType === 'basic';
      const isComprehensive = analysisType === 'comprehensive';
      const isHighPerformer = baseScore >= 90;
      const isMidPerformer = baseScore >= 80 && baseScore < 90;
      
      // 根据候选人技能生成分析内容
      const hasJavaSkills = candidate.skills.some(skill => skill.toLowerCase().includes('java'));
      const hasFrontendSkills = candidate.skills.some(skill => 
        ['vue', 'react', 'javascript', 'typescript'].some(tech => skill.toLowerCase().includes(tech))
      );
      const hasBackendSkills = candidate.skills.some(skill => 
        ['spring', 'mysql', 'redis', 'kafka'].some(tech => skill.toLowerCase().includes(tech))
      );
      
      // 生成优势分析
      const strengths = [];
      if (isHighPerformer) {
        strengths.push('技术能力突出，在相关领域有深入的专业知识');
        strengths.push('工作经验丰富，具备解决复杂技术问题的能力');
      }
      if (hasJavaSkills) {
        strengths.push('Java技术栈熟练，具备企业级应用开发经验');
      }
      if (hasFrontendSkills) {
        strengths.push('前端技术掌握扎实，能够开发现代化的用户界面');
      }
      if (hasBackendSkills) {
        strengths.push('后端架构设计能力强，熟悉分布式系统开发');
      }
      if (candidate.experience >= 5) {
        strengths.push('工作经验丰富，具备良好的项目管理和团队协作能力');
      }
      if (candidate.educationHistory?.some(edu => ['硕士', '博士'].includes(edu.degree))) {
        strengths.push('学历背景优秀，理论基础扎实，学习能力强');
      }
      
      // 生成改进建议
      const improvements = [];
      if (!isHighPerformer && isMidPerformer) {
        improvements.push('建议在核心技术深度上继续提升，关注最新技术趋势');
      }
      if (!isMidPerformer) {
        improvements.push('需要加强技术基础，建议通过项目实践提升技能水平');
      }
      if (candidate.experience < 3) {
        improvements.push('工作经验相对较少，建议多参与复杂项目积累实践经验');
      }
      if (!candidate.skills.some(skill => skill.toLowerCase().includes('docker'))) {
        improvements.push('建议学习容器化技术，提升系统部署和运维能力');
      }
      if (!hasBackendSkills && hasFrontendSkills) {
        improvements.push('建议补充后端技术知识，成为更全面的全栈开发者');
      }
      if (!hasFrontendSkills && hasBackendSkills) {
        improvements.push('可以学习前端技术，提升用户界面开发能力');
      }
      
      // 岗位匹配度分析
      const jobMatching = {
        skillMatch: Math.min(baseScore + Math.random() * 10 - 5, 100),
        experienceMatch: Math.min(Math.max(candidate.experience * 15, 60), 95),
        educationMatch: candidate.educationHistory?.[0]?.degree === '博士' ? 95 : 
                       candidate.educationHistory?.[0]?.degree === '硕士' ? 85 : 75,
        cultureMatch: Math.min(baseScore + Math.random() * 15 - 7, 95)
      };
      
      // 推荐行动
      const recommendedActions = [];
      if (isHighPerformer) {
        recommendedActions.push({
          icon: '🔥',
          title: '优先联系',
          description: '该候选人综合能力突出，建议立即安排面试',
          priority: 'high'
        });
        recommendedActions.push({
          icon: '💼',
          title: '职位匹配',
          description: '可考虑为其提供更具挑战性的岗位机会',
          priority: 'medium'
        });
      } else if (isMidPerformer) {
        recommendedActions.push({
          icon: '📞',
          title: '深入沟通',
          description: '建议进行详细的技术面试，了解实际能力水平',
          priority: 'high'
        });
        recommendedActions.push({
          icon: '📚',
          title: '能力培养',
          description: '可作为储备人才，通过培训提升技能',
          priority: 'medium'
        });
      } else {
        recommendedActions.push({
          icon: '🎯',
          title: '基础评估',
          description: '建议先进行基础技能测试，确认基本能力',
          priority: 'medium'
        });
        recommendedActions.push({
          icon: '📈',
          title: '成长计划',
          description: '制定详细的培训计划，帮助候选人快速成长',
          priority: 'low'
        });
      }
      
      // 根据地理位置添加建议
      if (candidate.location !== '北京') {
        recommendedActions.push({
          icon: '📍',
          title: '地理因素',
          description: `候选人位于${candidate.location}，需考虑远程工作或搬迁意愿`,
          priority: 'medium'
        });
      }
      
      // 模拟AI分析结果
      const mockAnalysisData = {
        overallScore: baseScore,
        recommendation: isHighPerformer ? 
          '该候选人综合实力强，技术能力突出，建议优先考虑并快速推进面试流程' :
          isMidPerformer ?
          '候选人具备良好的基础能力，有一定发展潜力，可作为重点关注对象' :
          '候选人基础能力尚可，需要进一步评估和培养，可考虑作为储备人选',
        strengths: strengths.slice(0, isBasicAnalysis ? 3 : isComprehensive ? 7 : 5), // 根据分析类型调整显示数量
        improvements: improvements.slice(0, isBasicAnalysis ? 2 : isComprehensive ? 6 : 4), // 根据分析类型调整显示数量
        jobMatching: {
          skillMatch: Math.round(jobMatching.skillMatch),
          experienceMatch: Math.round(jobMatching.experienceMatch),
          educationMatch: Math.round(jobMatching.educationMatch),
          cultureMatch: Math.round(jobMatching.cultureMatch)
        },
        recommendedActions: recommendedActions.slice(0, 3), // 最多显示3个行动建议
        analysisMetrics: {
          confidence: 0.92,
          dataPoints: 156,
          analysisTime: '2.3s',
          algorithmVersion: 'v3.2.1'
        },
        generatedAt: new Date().toISOString()
      };
      
      resolve({
        success: true,
        data: mockAnalysisData,
        message: 'AI分析完成'
      });
    }, 1800); // 模拟1.8秒AI分析时间
  });
}

// ==================== 新增：AI职位创建相关Mock API ====================

/**
* Mock - 根据用户输入的职位描述生成职位卡片和岗位详情
* 功能描述：使用AI技术解析用户输入的职位描述，生成结构化的职位卡片和详细信息
* 入参：{ user_id: number, description: string, companyInfo?: object }
* 返回参数：{ success: boolean, data: { jobId: string, jobCard: object, jobDetails: object }, message: string }
* url地址：/jobs/ai-create
* 请求方式：POST
*/
export function mockCreateJobByDescription(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { description, user_id } = data;
      
      // 模拟AI解析生成职位信息
      const parsedInfo = mockParseJobDescription(description);
      
      parsedInfo.then(result => {
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const jobCard = {
          id: jobId,
          title: result.data.extractedInfo.title,
          department: result.data.extractedInfo.department,
          level: result.data.extractedInfo.level,
          location: result.data.extractedInfo.location,
          salary: result.data.extractedInfo.salary,
          status: 'active',
          publishedAt: new Date().toISOString(),
          urgency: 'normal',
          tags: extractJobTags(description),
          stats: {
            applicants: 0,
            views: 1,
            publishDays: 0
          },
          userId: user_id
        };
        
        const jobDetails = {
          id: jobId,
          basicInfo: {
            title: result.data.extractedInfo.title,
            department: result.data.extractedInfo.department,
            level: result.data.extractedInfo.level,
            location: result.data.extractedInfo.location,
            salary: result.data.extractedInfo.salary,
            workType: result.data.workType,
            experience: result.data.experience,
            education: result.data.education
          },
          description: description,
          requirements: result.data.requirements,
          skills: result.data.skills,
          benefits: result.data.benefits,
          userId: user_id
        };
        
        resolve({
          success: true,
          data: {
            jobId: jobId,
            jobCard: jobCard,
            jobDetails: jobDetails
          },
          message: 'AI职位创建成功'
        });
      });
    }, 2500); // 模拟AI处理时间
  });
}

/**
* Mock - 根据发布新岗位id获取候选人信息以及岗位详情信息
* 功能描述：根据已发布的岗位ID，获取关联的候选人列表和岗位详细信息
* 入参：{ jobId: string }
* 返回参数：{ success: boolean, data: { jobDetails: object, candidates: array, matchSummary: object }, message: string }
* url地址：/jobs/{jobId}/candidates-and-details
* 请求方式：GET
*/
export function mockGetJobCandidatesAndDetails(jobId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟根据jobId获取职位详情
      const jobDetails = {
        id: jobId,
        title: "高级前端工程师",
        department: "技术部",
        level: "高级",
        location: "北京",
        salary: "25-40K",
        description: "负责公司核心产品的前端开发工作",
        requirements: [
          "5年以上前端开发经验",
          "精通Vue.js、React等主流框架",
          "具备良好的代码规范意识"
        ],
        skills: ["Vue.js", "JavaScript", "TypeScript", "Node.js"],
        benefits: ["五险一金", "弹性工作", "技术培训"],
        createdAt: new Date().toISOString()
      };
      
      // 获取匹配的候选人（使用现有的智能推荐数据）
      const candidates = mockData.candidates.smart.slice(0, 5).map(candidate => ({
        ...candidate,
        matchScore: Math.floor(Math.random() * 20) + 80, // 80-100分
        matchReason: [
          "技能匹配度高",
          "工作经验符合要求", 
          "地理位置合适"
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
      
      const matchSummary = {
        totalMatched: candidates.length,
        averageScore: Math.floor(candidates.reduce((sum, c) => sum + c.matchScore, 0) / candidates.length),
        highMatch: candidates.filter(c => c.matchScore >= 90).length,
        mediumMatch: candidates.filter(c => c.matchScore >= 80 && c.matchScore < 90).length,
        lowMatch: candidates.filter(c => c.matchScore < 80).length,
        lastUpdated: new Date().toISOString()
      };
      
      resolve({
        success: true,
        data: {
          jobDetails: jobDetails,
          candidates: candidates,
          matchSummary: matchSummary
        },
        message: '获取成功'
      });
    }, 1000);
  });
}

// ==================== 新增：用户相关Mock API ====================

/**
* Mock - 根据用户id返回关联的职位卡片和岗位详情list
* 功能描述：获取指定用户创建的所有职位信息，包括职位卡片和详情
* 入参：{ userId: number, status?: string, limit?: number, offset?: number }
* 返回参数：{ success: boolean, data: { jobs: array, total: number, summary: object }, message: string }
* url地址：/users/{userId}/jobs
* 请求方式：GET
*/
export function mockGetUserJobs(userId, params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟用户的职位数据
      const userJobs = [
        {
          jobCard: {
            id: "job_001",
            title: "高级前端工程师",
            department: "技术部",
            level: "高级",
            location: "北京",
            salary: "25-40K",
            status: "active",
            publishedAt: "2024-01-15T10:00:00Z",
            urgency: "high",
            tags: ["Vue.js", "React", "TypeScript"],
            stats: {
              applicants: 23,
              views: 156,
              publishDays: 7
            },
            userId: 1
          },
          jobDetails: {
            id: "job_001",
            basicInfo: {
              title: "高级前端工程师",
              department: "技术部",
              level: "高级",
              location: "北京",
              salary: "25-40K",
              workType: "全职",
              experience: "5年以上",
              education: "本科及以上"
            },
            description: "负责公司核心产品的前端开发，参与技术架构设计",
            requirements: [
              "5年以上前端开发经验",
              "精通Vue.js、React等框架",
              "具备良好的团队协作能力"
            ],
            skills: ["Vue.js", "JavaScript", "TypeScript", "Node.js"],
            benefits: ["五险一金", "弹性工作", "股权激励", "技术培训"],
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-15T10:00:00Z",
            userId: 1,
            aiGenerated: true,
            aiConfidence: 0.92
          }
        },
        {
          jobCard: {
            id: "job_002", 
            title: "产品经理",
            department: "产品部",
            level: "中级",
            location: "上海",
            salary: "20-30K",
            status: "active",
            publishedAt: "2024-01-10T14:30:00Z",
            urgency: "normal",
            tags: ["产品设计", "用户研究", "数据分析"],
            stats: {
              applicants: 15,
              views: 89,
              publishDays: 12
            },
            userId: 1
          },
          jobDetails: {
            id: "job_002",
            basicInfo: {
              title: "产品经理",
              department: "产品部", 
              level: "中级",
              location: "上海",
              salary: "20-30K",
              workType: "全职",
              experience: "3-5年",
              education: "本科及以上"
            },
            description: "负责产品规划和设计，推动产品功能迭代",
            requirements: [
              "3-5年产品管理经验",
              "具备良好的需求分析能力",
              "熟悉用户体验设计"
            ],
            skills: ["产品设计", "用户研究", "数据分析", "项目管理"],
            benefits: ["五险一金", "年终奖", "培训机会"],
            createdAt: "2024-01-10T14:30:00Z",
            updatedAt: "2024-01-10T14:30:00Z",
            userId: 1,
            aiGenerated: false,
            aiConfidence: null
          }
        }
      ];
      
      // 根据参数筛选
      let filteredJobs = userJobs;
      if (params.status) {
        filteredJobs = filteredJobs.filter(job => job.jobCard.status === params.status);
      }
      
      // 分页处理
      const total = filteredJobs.length;
      const offset = params.offset || 0;
      const limit = params.limit || 10;
      filteredJobs = filteredJobs.slice(offset, offset + limit);
      
      const summary = {
        totalJobs: total,
        activeJobs: userJobs.filter(job => job.jobCard.status === 'active').length,
        draftJobs: userJobs.filter(job => job.jobCard.status === 'draft').length,
        totalCandidates: userJobs.reduce((sum, job) => sum + job.jobCard.stats.applicants, 0),
        avgMatchScore: 85
      };
      
      resolve({
        success: true,
        data: {
          jobs: filteredJobs,
          total: total,
          summary: summary
        },
        message: '获取用户职位成功'
      });
    }, 800);
  });
}

/**
* Mock - 获取用户职位统计信息
* 功能描述：获取用户的职位创建和管理统计信息
* 入参：{ userId: number }
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/users/{userId}/job-stats
* 请求方式：GET
*/
export function mockGetUserJobStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = {
        totalJobs: 12,
        activeJobs: 8,
        draftJobs: 2,
        inactiveJobs: 2,
        totalCandidates: 156,
        totalViews: 2340,
        avgMatchScore: 87.5,
        recentActivity: [
          {
            type: 'job_create',
            jobTitle: '高级前端工程师',
            timestamp: '2024-01-15T10:00:00Z'
          },
          {
            type: 'candidate_match',
            jobTitle: '产品经理',
            candidateCount: 5,
            timestamp: '2024-01-14T16:30:00Z'
          }
        ]
      };
      
      resolve({
        success: true,
        data: stats,
        message: '获取用户统计信息成功'
      });
    }, 500);
  });
}

// ==================== 新增：AI匹配相关Mock API ====================

/**
* Mock - 根据用户输入的职位描述匹配候选人
* 功能描述：基于用户输入的职位描述，使用AI技术匹配最适合的候选人
* 入参：{ description: string, matchType?: string, limit?: number, filters?: object }
* 返回参数：{ success: boolean, data: { candidates: array, matchAnalysis: object, suggestions: array }, message: string }
* url地址：/candidates/ai-match-by-description
* 请求方式：POST
*/
export function mockMatchCandidatesByDescription(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { description, matchType = 'smart', limit = 10 } = data;
      
      // 根据匹配类型选择候选人池
      let candidatePool = [];
      switch (matchType) {
        case 'skill':
          candidatePool = mockData.candidates.smart.filter(c => 
            c.skills.some(skill => description.toLowerCase().includes(skill.toLowerCase()))
          );
          break;
        case 'experience':
          candidatePool = mockData.candidates.experience;
          break;
        case 'education':
          candidatePool = mockData.candidates.education;
          break;
        default:
          candidatePool = mockData.candidates.smart;
      }
      
      // 模拟AI匹配分析
      const matchedCandidates = candidatePool.slice(0, limit).map(candidate => ({
        ...candidate,
        matchScore: Math.floor(Math.random() * 25) + 75, // 75-100分
        matchReasons: [
          "职位描述与候选人技能高度匹配",
          "工作经验符合岗位要求",
          "教育背景与职位需求相符"
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        confidenceScore: Math.random() * 0.3 + 0.7, // 0.7-1.0
        riskFactors: Math.random() > 0.7 ? ["薪资期望可能偏高"] : []
      }));
      
      const matchAnalysis = {
        totalAnalyzed: 245,
        matchedCount: matchedCandidates.length,
        averageScore: Math.floor(matchedCandidates.reduce((sum, c) => sum + c.matchScore, 0) / matchedCandidates.length),
        matchDistribution: {
          excellent: matchedCandidates.filter(c => c.matchScore >= 90).length,
          good: matchedCandidates.filter(c => c.matchScore >= 80 && c.matchScore < 90).length,
          fair: matchedCandidates.filter(c => c.matchScore < 80).length
        },
        processingTime: '1.8s'
      };
      
      const suggestions = [
        "建议重点关注匹配度90分以上的候选人",
        "可以考虑适当放宽经验要求以获得更多候选人",
        "建议在职位描述中更明确地描述技能要求"
      ];
      
      resolve({
        success: true,
        data: {
          candidates: matchedCandidates,
          matchAnalysis: matchAnalysis,
          suggestions: suggestions
        },
        message: 'AI匹配完成'
      });
    }, 2000); // 模拟AI匹配处理时间
  });
}

/**
* Mock - 获取用户的匹配历史
* 功能描述：获取用户的候选人匹配历史记录
* 入参：{ userId: number, limit?: number, offset?: number }
* 返回参数：{ success: boolean, data: { matchHistory: array, total: number }, message: string }
* url地址：/candidates/match-history/{userId}
* 请求方式：GET
*/
export function mockGetUserMatchHistory(userId, params = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const matchHistory = [
        {
          id: "match_001",
          jobDescription: "招聘高级前端工程师，要求熟练掌握Vue.js和React",
          matchType: "smart",
          matchedCount: 8,
          averageScore: 87,
          createdAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "match_002", 
          jobDescription: "寻找有经验的产品经理，负责移动端产品",
          matchType: "experience",
          matchedCount: 5,
          averageScore: 82,
          createdAt: "2024-01-12T14:30:00Z"
        }
      ];
      
      const total = matchHistory.length;
      const offset = params.offset || 0;
      const limit = params.limit || 10;
      const paginatedHistory = matchHistory.slice(offset, offset + limit);
      
      resolve({
        success: true,
        data: {
          matchHistory: paginatedHistory,
          total: total
        },
        message: '获取匹配历史成功'
      });
    }, 600);
  });
}

// 是否启用Mock模式的配置
export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';
