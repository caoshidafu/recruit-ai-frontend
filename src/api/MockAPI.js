// AI解析相关的Mock数据和接口

// 前端工程师候选人数据
const frontendCandidates = [
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
    recommendReason: "该候选人技术栈与岗位需求高度匹配，拥有丰富的电商平台开发经验，曾主导多个核心功能模块开发，具备大型项目架构设计能力。其在Vue.js、React、TypeScript等核心技术方面表现出色，工作经验丰富且稳定性良好，是优秀的高级前端工程师候选人。",
    negativeLabels: ["薪资期望偏高", "对新技术学习速度较慢"],
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
    recommendReason: "该候选人具备丰富的前端架构设计经验，曾带领10人技术团队，在Vue.js、React、Angular等多个主流框架方面都有深度实践。其技术管理能力突出，能够制定技术标准和规范，是优秀的技术专家候选人，适合承担技术领导职责。",
    negativeLabels: ["管理经验不足", "对新框架适应较慢"],
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
    recommendReason: "该候选人在Vue.js方面有扎实的经验基础，学习能力强，能够快速适应新技术。虽然工作经验相对较少，但基础扎实，发展潜力大，适合中级岗位培养，是值得投资的技术人才。",
    negativeLabels: ["经验相对不足", "复杂项目经验缺乏"],
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
    recommendReason: "该候选人React技术栈熟练，具有金融行业开发经验，对业务理解深入。在TypeScript方面有深度应用经验，代码质量高，架构设计能力强。其行业背景与技术能力的结合使其成为优质候选人。",
    negativeLabels: ["跨行业适应成本", "Vue.js经验相对不足"],
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
    recommendReason: "该候选人基础知识扎实，虽然经验较少但学习意愿强烈，能够立即入职开始工作。其积极的学习态度和良好的技术基础，使其具备快速成长的潜力，适合初级岗位培养。",
    negativeLabels: ["工作经验不足", "需要较长培养周期"],
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
    recommendReason: "该候选人具备全栈开发能力，拥有AI行业背景，技术视野广阔。其在前端技术的同时具备后端开发经验，能够更好地理解整体技术架构，是难得的复合型技术人才，适合承担更多技术责任。",
    negativeLabels: ["技术深度不足", "专业化程度有待提升"],
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

// Java后端工程师候选人数据
const backendCandidates = [
  {
    id: 101,
    name: "陈一",
        avatar: "https://i.pravatar.cc/150?img=11",
    title: "Java后端工程师",
    experience: 4,
    education: "本科",
        currentCompany: "某互联网公司",
        expectedSalary: "28K",
        location: "上海",
        status: "在职-看机会",
    skills: ["Java", "Spring Boot", "MySQL", "Redis", "微服务"],
    matchScore: 92,
    recommendReasons: ["Spring Boot经验丰富", "微服务架构实践", "数据库优化能力强"],
    recommendReason: "该候选人在Spring Boot方面经验丰富，具备微服务架构实践经验，在数据库优化方面能力突出。曾负责多个核心业务系统的架构设计和开发，具备丰富的后端开发经验，是优秀的高级Java工程师候选人。",
    negativeLabels: ["前端技术经验不足", "新技术学习速度较慢"],
    educationHistory: [
      {
        degree: "本科",
        school: "华东理工大学",
        major: "计算机科学与技术",
        duration: "2016-2020"
      }
    ],
        workHistory: [
          {
            company: "某互联网公司",
        position: "Java后端工程师",
        duration: "2022-至今",
        description: "负责核心业务后端开发，参与微服务架构设计和实施"
      },
      {
        company: "某软件公司",
        position: "Java开发工程师",
        duration: "2020-2022",
        description: "参与企业级应用开发，熟悉Spring生态体系"
      }
        ],
        radarData: {
      "学历背景": 85,
      "工作经历": 88,
      "技能匹配": 92,
      "项目经验": 89,
      "稳定性": 90,
      "发展潜力": 88
    }
  },
  {
    id: 102,
    name: "刘二",
        avatar: "https://i.pravatar.cc/150?img=12",
    title: "高级Java工程师",
    experience: 6,
    education: "硕士",
    currentCompany: "某大型电商公司",
    expectedSalary: "35K",
    location: "上海",
    status: "在职-看机会",
    skills: ["Java", "Spring Cloud", "MySQL", "Redis", "Elasticsearch", "Kafka"],
    matchScore: 95,
    recommendReasons: ["高并发系统经验", "分布式架构设计", "电商业务理解深入"],
    recommendReason: "该候选人在高并发系统开发方面经验丰富，擅长分布式架构设计，对电商业务理解深入。其技术能力全面，架构设计能力强，能够解决复杂的技术问题，是优秀的后端技术专家候选人。",
    negativeLabels: ["管理经验相对不足", "跨领域技术经验有限"],
        educationHistory: [
          {
        degree: "硕士",
        school: "上海交通大学",
        major: "软件工程",
        duration: "2015-2018"
      }
    ],
        workHistory: [
          {
        company: "某大型电商公司",
        position: "高级Java工程师",
        duration: "2020-至今",
        description: "负责电商核心交易系统开发，处理日均千万级订单"
      },
      {
        company: "某金融科技公司",
        position: "Java工程师",
        duration: "2018-2020",
        description: "参与支付系统开发，熟悉高并发和金融业务"
      }
        ],
        radarData: {
      "学历背景": 95,
      "工作经历": 92,
      "技能匹配": 95,
      "项目经验": 94,
      "稳定性": 88,
      "发展潜力": 90
    }
  },
  {
    id: 103,
    name: "周三",
        avatar: "https://i.pravatar.cc/150?img=13",
        title: "Java开发工程师",
    experience: 3,
    education: "本科",
    currentCompany: "某创业公司",
    expectedSalary: "22K",
    location: "上海",
    status: "离职-随时到岗",
    skills: ["Java", "Spring Boot", "MyBatis", "MySQL", "Docker"],
    matchScore: 85,
    recommendReasons: ["基础扎实", "可立即入职", "容器化部署经验"],
    recommendReason: "该候选人后端开发基础扎实，具备容器化部署经验，能够立即入职开始工作。虽然经验相对较少，但学习能力强，技术基础良好，适合初中级岗位培养。",
    negativeLabels: ["项目经验相对不足", "高并发处理经验缺乏"],
        educationHistory: [
          {
            degree: "本科",
        school: "上海大学",
        major: "软件工程",
        duration: "2018-2022"
      }
    ],
        workHistory: [
          {
        company: "某创业公司",
            position: "Java开发工程师",
        duration: "2022-2024",
        description: "负责公司核心业务系统开发，参与从0到1系统构建"
      }
        ],
        radarData: {
      "学历背景": 82,
      "工作经历": 78,
      "技能匹配": 85,
      "项目经验": 80,
      "稳定性": 92,
      "发展潜力": 88
    }
  },
  {
    id: 104,
    name: "吴四",
        avatar: "https://i.pravatar.cc/150?img=14",
    title: "资深Java工程师",
    experience: 8,
    education: "硕士",
    currentCompany: "某知名互联网公司",
    expectedSalary: "45K",
    location: "上海",
    status: "在职-看机会",
    skills: ["Java", "Spring Cloud", "分布式架构", "高并发优化", "团队管理"],
    matchScore: 88,
    recommendReasons: ["架构设计能力强", "团队管理经验", "技术深度和广度兼备"],
    recommendReason: "该候选人架构设计能力突出，具备丰富的团队管理经验，技术深度和广度兼备。能够带领技术团队完成复杂项目，具备强烈的技术领导力，是优秀的技术管理候选人。",
    negativeLabels: ["薪资期望较高", "对新技术学习意愿不强"],
        educationHistory: [
          {
            degree: "硕士",
        school: "复旦大学",
            major: "计算机科学与技术",
        duration: "2013-2016"
      }
    ],
        workHistory: [
          {
        company: "某知名互联网公司",
        position: "资深Java工程师",
            duration: "2019-至今",
        description: "负责核心业务架构设计，带领8人后端团队"
      },
      {
        company: "某大型企业",
        position: "高级Java工程师",
        duration: "2016-2019",
        description: "参与企业级系统重构，积累丰富的架构经验"
      }
        ],
        radarData: {
      "学历背景": 95,
      "工作经历": 95,
      "技能匹配": 88,
      "项目经验": 92,
      "稳定性": 85,
      "发展潜力": 90
    }
  },
  {
    id: 105,
    name: "郑五",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "全栈开发工程师",
    experience: 5,
    education: "本科",
    currentCompany: "某科技公司",
    expectedSalary: "30K",
    location: "上海",
    status: "在职-看机会",
    skills: ["Java", "Spring Boot", "Vue.js", "MySQL", "MongoDB"],
    matchScore: 87,
    recommendReasons: ["全栈能力", "前后端协作经验", "技术栈匹配度高"],
    recommendReason: "该候选人具备全栈开发能力，在前后端协作方面经验丰富，技术栈匹配度高。能够独立完成全栈开发任务，沟通协作能力强，是难得的复合型技术人才。",
    negativeLabels: ["技术专业化程度不足", "在某些领域深度有限"],
    educationHistory: [
      {
        degree: "本科",
        school: "同济大学",
        major: "软件工程",
        duration: "2015-2019"
      }
    ],
    workHistory: [
      {
        company: "某科技公司",
        position: "全栈开发工程师",
        duration: "2021-至今",
        description: "负责产品的前后端开发，具备完整产品开发经验"
      },
      {
        company: "某互联网公司",
        position: "Java开发工程师",
        duration: "2019-2021",
        description: "专注后端开发，后期拓展前端技能形成全栈能力"
      }
    ],
    radarData: {
      "学历背景": 85,
      "工作经历": 88,
      "技能匹配": 87,
      "项目经验": 90,
      "稳定性": 87,
      "发展潜力": 92
    }
  },
  {
    id: 106,
    name: "王六",
    avatar: "https://i.pravatar.cc/150?img=16",
    title: "Java架构师",
    experience: 10,
    education: "博士",
    currentCompany: "某大型集团公司",
    expectedSalary: "55K",
    location: "上海",
    status: "在职-看机会",
    skills: ["Java", "分布式架构", "微服务", "系统设计", "技术管理"],
    matchScore: 90,
    recommendReasons: ["架构设计专家", "大型系统经验", "技术领导力强"],
    recommendReason: "该候选人是资深的架构设计专家，在大型系统开发方面经验丰富，技术领导力强。能够从整体架构视角解决复杂问题，带领团队完成挑战性项目，是优秀的技术架构师候选人。",
    negativeLabels: ["薪资成本较高", "对具体实现参与度低"],
    educationHistory: [
      {
        degree: "博士",
        school: "中科院",
        major: "计算机系统结构",
        duration: "2010-2014"
      }
    ],
    workHistory: [
      {
        company: "某大型集团公司",
        position: "Java架构师",
        duration: "2018-至今",
        description: "负责集团技术架构规划，指导多个业务线技术决策"
      },
      {
        company: "某知名科技公司",
        position: "高级Java工程师",
        duration: "2014-2018",
        description: "从高级工程师成长为架构师，积累丰富架构经验"
      }
    ],
    radarData: {
      "学历背景": 100,
      "工作经历": 98,
      "技能匹配": 90,
      "项目经验": 95,
      "稳定性": 92,
      "发展潜力": 88
    }
  }
];

// 根据职位ID获取对应的候选人数据
function getCandidatesByJobId(jobId) {
  switch (jobId) {
    case 123: // 高级前端工程师
      return frontendCandidates;
    case 124: // Java后端工程师
      return backendCandidates;
    default:
      return frontendCandidates; // 默认返回前端候选人
  }
}

// 根据职位ID获取对应的职位详情
function getJobDetailById(jobId) {
  switch (jobId) {
    case 123:
      return {
        id: jobId,
        title: "高级前端工程师",
        department: "技术部",
        location: "北京",
        salaryRange: "25-35K"
      };
    case 124:
      return {
        id: jobId,
        title: "Java后端工程师",
        department: "技术部",
        location: "上海",
        salaryRange: "20-30K"
      };
    default:
      return {
        id: jobId,
        title: "高级前端工程师",
        department: "技术部",
        location: "北京",
        salaryRange: "25-35K"
      };
  }
}

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
      // 岗位描述
      description: "我们正在寻找一位经验丰富的高级前端工程师，负责公司核心产品的前端开发工作。该职位将参与完整的产品开发生命周期，从需求分析到上线维护，是一个充满挑战和成长机会的岗位。加入我们，你将与优秀的技术团队一起，使用最新的前端技术栈，构建用户体验卓越的Web应用。我们提供灵活的工作环境、完善的技术培训体系以及具有竞争力的薪酬福利。",
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
      // 岗位描述
      description: "诚聘Java后端工程师，负责构建高性能、高可用的后端服务系统。你将参与核心业务系统的设计与开发，处理大并发场景下的技术挑战，与产品、前端团队紧密协作，共同打造优秀的互联网产品。我们使用先进的技术栈，包括Spring Boot、微服务架构、分布式系统等，为你提供广阔的技术成长空间。团队氛围开放，鼓励技术创新和最佳实践分享。",
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
    
    // 根据职位ID获取对应的候选人数据
    const candidates = getCandidatesByJobId(jobId);
    
    // 根据匹配类型返回不同的候选人数据
    let filteredCandidates = candidates;
    let algorithmType = "AI_SMART_MATCH_V2";
    
    switch (type) {
      case '智能匹配':
        // 智能匹配：返回所有候选人，但按匹配分数排序
        filteredCandidates = candidates
          .sort((a, b) => b.matchScore - a.matchScore);
        algorithmType = "AI_SMART_MATCH_V2";
          break;
      case '经验匹配':
        // 经验匹配：按工作经验排序，优先显示经验丰富的
        filteredCandidates = candidates
          .sort((a, b) => b.experience - a.experience);
        algorithmType = "EXPERIENCE_MATCH_V1";
          break;
      case '学历匹配': {
        // 学历匹配：按学历等级排序
        const educationOrder = { '博士': 4, '硕士': 3, '本科': 2, '专科': 1 };
        filteredCandidates = candidates
          .sort((a, b) => (educationOrder[b.education] || 0) - (educationOrder[a.education] || 0));
        algorithmType = "EDUCATION_MATCH_V1";
          break;
      }
        default:
        filteredCandidates = candidates;
    }
    
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          candidates: filteredCandidates,
          total: filteredCandidates.length,
          matchingInfo: {
            type: type,
            isFromCache: isFromCache,
            processingTime: isFromCache ? '0.05s' : '1.5s',
            totalMatched: filteredCandidates.length,
            algorithm: algorithmType,
            jobId: jobId
          },
          jobDetail: getJobDetailById(jobId),
          userId: userId
        },
        message: `使用${type}成功获取${filteredCandidates.length}个匹配候选人`
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

/**
* Mock - 数据大盘接口：获取招聘数据大盘
* 功能描述：获取智能招聘驾驶舱所需的所有数据，包括概览指标、AI提醒、图表数据等
* 入参：无
* 返回参数：{ success: boolean, data: object, message: string }
* url地址：/dashboard/data
* 请求方式：GET
*/
export function mockGetDashboardData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dashboardData = {
        // 概览指标
        totalJobs: 8,
        totalCandidates: 156,
        interviewsToday: 3,
        offersPending: 5,
        
        // AI智能提醒
        aiAlerts: [
          {
            id: 'alert-1',
            title: '高级算法工程师急需补充',
            message: '该岗位已空缺15天，有3位匹配度超过90%的候选人待处理',
            action: '立即查看候选人',
            priority: 'high',
            icon: '🚨',
            count: 3,
            jobId: 123
          },
          {
            id: 'alert-2',
            title: '简历堆积提醒',
            message: 'Java后端工程师岗位有28份简历待筛选',
            action: '开始批量筛选',
            priority: 'medium',
            icon: '📚',
            count: 28,
            jobId: 124
          },
          {
            id: 'alert-3',
            title: '面试安排建议',
            message: '前端工程师岗位有5位候选人可安排本周面试',
            action: '查看面试日程',
            priority: 'low',
            icon: '📅',
            count: 5,
            jobId: 123
          }
        ],
        
        // 岗位健康度数据
        jobHealthData: {
          jobs: [
            { jobId: 123, title: '高级前端工程师', healthScore: 45, status: 'danger', candidates: 42 },
            { jobId: 124, title: 'Java后端工程师', healthScore: 78, status: 'warning', candidates: 28 },
            { jobId: 125, title: '产品经理', healthScore: 92, status: 'healthy', candidates: 35 },
            { jobId: 126, title: 'UI设计师', healthScore: 65, status: 'warning', candidates: 18 },
            { jobId: 127, title: '数据分析师', healthScore: 88, status: 'healthy', candidates: 22 },
            { jobId: 128, title: '运营专员', healthScore: 35, status: 'danger', candidates: 15 }
          ]
        },
        
        // 招聘进度分布数据
        recruitProgressData: {
          items: [
            { label: '简历筛选', value: 89 },
            { label: '初试进行', value: 24 },
            { label: '复试进行', value: 12 },
            { label: '终试进行', value: 8 },
            { label: '待发Offer', value: 5 },
            { label: '已入职', value: 18 }
          ]
        },
        
        // 候选人流量趋势数据（最近7天）
        candidateFlowData: {
          points: [
            { label: '12/19', value: 23, date: '2024-12-19', trend: { type: 'up', text: '↗️ 增长' } },
            { label: '12/20', value: 31, date: '2024-12-20', trend: { type: 'up', text: '↗️ 增长' } },
            { label: '12/21', value: 18, date: '2024-12-21', trend: { type: 'down', text: '↘️ 下降' } },
            { label: '12/22', value: 26, date: '2024-12-22', trend: { type: 'up', text: '↗️ 增长' } },
            { label: '12/23', value: 42, date: '2024-12-23', trend: { type: 'up', text: '↗️ 增长' } },
            { label: '12/24', value: 35, date: '2024-12-24', trend: { type: 'down', text: '↘️ 下降' } },
            { label: '12/25', value: 39, date: '2024-12-25', trend: { type: 'up', text: '↗️ 增长' } }
          ]
        },
        
        // 优先处理队列
        priorityQueue: [
          {
            id: 'queue-1',
            rank: 1,
            jobId: 123,
            jobTitle: '高级前端工程师',
            candidateCount: 3,
            avgMatchScore: 94,
            waitingTime: '等待15天',
            progress: 25,
            urgency: 'high',
            urgencyText: '紧急'
          },
          {
            id: 'queue-2',
            rank: 2,
            jobId: 124,
            jobTitle: 'Java后端工程师',
            candidateCount: 6,
            avgMatchScore: 87,
            waitingTime: '等待8天',
            progress: 60,
            urgency: 'medium',
            urgencyText: '重要'
          },
          {
            id: 'queue-3',
            rank: 3,
            jobId: 126,
            jobTitle: 'UI设计师',
            candidateCount: 4,
            avgMatchScore: 82,
            waitingTime: '等待5天',
            progress: 75,
            urgency: 'medium',
            urgencyText: '重要'
          },
          {
            id: 'queue-4',
            rank: 4,
            jobId: 127,
            jobTitle: '数据分析师',
            candidateCount: 2,
            avgMatchScore: 91,
            waitingTime: '等待3天',
            progress: 90,
            urgency: 'low',
            urgencyText: '一般'
          }
        ]
      }
      
      resolve({
        success: true,
        data: dashboardData,
        message: '数据大盘数据获取成功'
      })
    }, 800) // 模拟网络延迟
  })
}

export const MOCK_ENABLED = process.env.VUE_APP_MOCK_ENABLED !== 'false';