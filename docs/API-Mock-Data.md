# AI招聘系统 - 四个核心接口Mock数据文档

## 📋 目录

- [概述](#概述)
- [接口1：根据职位描述生成职位卡片和岗位详情](#接口1根据职位描述生成职位卡片和岗位详情)
- [接口2：根据职位描述匹配候选人](#接口2根据职位描述匹配候选人)
- [接口3：根据职位ID获取候选人和岗位详情](#接口3根据职位id获取候选人和岗位详情)
- [接口4：根据用户ID获取关联职位列表](#接口4根据用户id获取关联职位列表)

---

## 概述

本文档提供AI招聘系统四个核心后端接口的详细Mock数据示例，包括请求参数和响应数据的完整JSON格式。

### 四个核心接口

1. **根据用户输入的职位描述生成职位卡片和岗位详情**
2. **根据用户输入的职位描述匹配候选人（默认智能匹配，携带type）**
3. **根据发布新岗位id获取候选人信息以及岗位详情信息**
4. **根据用户id返回关联的职位卡片和岗位详情list**

---

## 接口1：根据职位描述生成职位卡片和岗位详情

### 请求参数

```json
{
  "user_id": "user_001",
  "description": "招聘一名高级前端工程师，负责Vue.js项目开发，需要3年以上经验，熟悉TypeScript和组件化开发"
}
```

### 响应数据

```json
{
  "success": true,
  "data": {
    "id": "job_ai_001",
    "jobCard": {
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "experience": "3年以上",
      "urgency": "normal",
      "salary": "25-40K",
      "headcount": 1,
      "candidateCount": 0,
      "newCandidates": 0,
      "interviewingCount": 0
    },
    "jobDetails": {
      "basicInfo": {
        "title": "高级前端工程师",
        "department": "技术部",
        "level": "高级",
        "location": "北京",
        "salary": "25-40K",
        "workType": "全职",
        "experience": "3年以上",
        "education": "本科及以上"
      },
      "description": "负责公司核心产品的前端开发，参与技术架构设计，使用Vue.js等现代前端框架开发高质量的用户界面",
      "requirements": [
        "3年以上前端开发经验",
        "熟练掌握Vue.js",
        "具备良好的代码规范和团队协作能力",
        "有项目开发经验",
        "良好的学习能力和沟通能力"
      ],
      "skills": [
        "Vue.js",
        "JavaScript",
        "TypeScript",
        "Git",
        "RESTful API",
        "代码规范"
      ],
      "benefits": [
        "五险一金",
        "年终奖金",
        "弹性工作时间",
        "技术培训",
        "团队建设活动",
        "带薪年假"
      ],
      "userId": 1
    }
  },
  "message": "职位解析成功"
}
```

---

## 接口2：根据职位描述匹配候选人

### Type 枚举说明

后端定义的匹配类型枚举值：
- **1** - 智能推荐（AI综合匹配，默认类型）
- **2** - 技能匹配（基于技能要求匹配）
- **3** - 经验匹配（基于工作经验匹配）

### 请求参数

接口2通过接口1返回的职位ID和匹配类型来获取候选人匹配结果。

#### 智能推荐示例 (type: 1)

```json
{
  "id": 1,
  "type": 1
}
```

#### 技能匹配示例 (type: 2)

```json
{
  "id": 1,
  "type": 2
}
```

#### 经验匹配示例 (type: 3)

```json
{
  "id": 1,
  "type": 3
}
```

**参数说明：**
- `id`: 职位ID（从接口1返回的职位ID）
- `type`: 匹配类型枚举值（1=智能推荐，2=技能匹配，3=经验匹配）

### 响应数据

#### 智能推荐响应 (type: 1)

```json
{
  "success": true,
  "data": {
    "matchType": 1,
    "totalCount": 25,
    "matchedCount": 10,
    "candidates": [
      {
        "id": 1,
        "name": "张三",
        "avatar": "https://i.pravatar.cc/150?img=1",
        "title": "高级前端工程师",
        "experience": 5,
        "educationHistory": [
          {
            "degree": "本科",
            "school": "北京理工大学",
            "major": "计算机科学与技术",
            "duration": "2016-2020"
          }
        ],
        "currentCompany": "某互联网公司",
        "expectedSalary": "35K",
        "location": "北京",
        "status": "在职-看机会",
        "skills": [
          "Vue.js",
          "React",
          "JavaScript",
          "TypeScript",
          "Node.js",
          "微前端"
        ],
        "matchScore": 95,
        "recommendReasons": [
          "技能匹配度极高，精通Vue.js和TypeScript",
          "5年丰富的前端开发经验",
          "有大型项目架构经验"
        ],
        "keyHighlights": [
          "Vue.js专家",
          "TypeScript精通",
          "架构经验"
        ],
        "workHistory": [
          {
            "company": "某互联网公司",
            "position": "高级前端工程师",
            "duration": "2020-至今",
            "description": "负责公司核心产品前端架构设计和开发"
          }
        ],
        "radarData": {
          "学历背景": 85,
          "工作经历": 92,
          "技能匹配": 95,
          "项目经验": 90,
          "稳定性": 88,
          "发展潜力": 92
        }
      },
      {
        "id": 2,
        "name": "李四",
        "avatar": "https://i.pravatar.cc/150?img=2",
        "title": "前端开发工程师",
        "experience": 4,
        "educationHistory": [
          {
            "degree": "硕士",
            "school": "清华大学",
            "major": "软件工程",
            "duration": "2018-2021"
          }
        ],
        "currentCompany": "某科技公司",
        "expectedSalary": "32K",
        "location": "北京",
        "status": "在职-考虑机会",
        "skills": [
          "Vue.js",
          "JavaScript",
          "TypeScript",
          "Webpack",
          "Element UI"
        ],
        "matchScore": 88,
        "recommendReasons": [
          "清华大学硕士学历",
          "Vue.js技术栈匹配",
          "有组件库开发经验"
        ],
        "keyHighlights": [
          "985高校背景",
          "Vue.js熟练",
          "组件库经验"
        ],
        "workHistory": [
          {
            "company": "某科技公司",
            "position": "前端开发工程师",
            "duration": "2021-至今",
            "description": "负责企业级前端应用开发和组件库维护"
          }
        ],
        "radarData": {
          "学历背景": 98,
          "工作经历": 85,
          "技能匹配": 88,
          "项目经验": 82,
          "稳定性": 90,
          "发展潜力": 95
        }
      }
    ],
    "searchSummary": {
      "totalCandidates": 25,
      "highMatch": 8,
      "mediumMatch": 12,
      "lowMatch": 5,
      "averageScore": 82.5
    },
    "matchCriteria": {
      "skillsWeight": 0.4,
      "experienceWeight": 0.3,
      "educationWeight": 0.2,
      "locationWeight": 0.1
    },
    "aiAnalysis": {
      "confidence": 0.92,
      "processingTime": "1.2s",
      "algorithmVersion": "v2.1",
      "matchingStrategy": "综合智能匹配"
    }
  },
  "message": "智能推荐匹配成功"
}
```

#### 技能匹配响应 (type: 2)

```json
{
  "success": true,
  "data": {
    "matchType": 2,
    "totalCount": 18,
    "matchedCount": 8,
    "candidates": [
      {
        "id": 3,
        "name": "王五",
        "avatar": "https://i.pravatar.cc/150?img=3",
        "title": "Vue.js专家",
        "experience": 6,
        "skills": [
          "Vue.js",
          "TypeScript",
          "Node.js",
          "Vite",
          "Pinia",
          "Vue Router"
        ],
        "matchScore": 96,
        "skillMatchDetails": {
          "Vue.js": {
            "required": true,
            "level": "专家级",
            "score": 98,
            "evidence": ["6年Vue.js开发经验", "Vue.js源码贡献者"]
          },
          "TypeScript": {
            "required": true,
            "level": "熟练",
            "score": 95,
            "evidence": ["大型TS项目经验", "类型系统设计"]
          },
          "Node.js": {
            "required": false,
            "level": "熟练",
            "score": 90,
            "evidence": ["全栈开发经验", "API设计"]
          }
        },
        "recommendReasons": [
          "Vue.js技能匹配度100%",
          "TypeScript深度应用经验",
          "技术栈完全符合要求"
        ]
      }
    ],
    "skillAnalysis": {
      "requiredSkillsMatch": 100,
      "preferredSkillsMatch": 85,
      "bonusSkillsMatch": 70,
      "overallSkillScore": 92
    },
    "matchCriteria": {
      "skillsWeight": 0.8,
      "experienceWeight": 0.15,
      "educationWeight": 0.05
    }
  },
  "message": "技能匹配成功"
}
```

#### 经验匹配响应 (type: 3)

```json
{
  "success": true,
  "data": {
    "matchType": 3,
    "totalCount": 32,
    "matchedCount": 12,
    "candidates": [
      {
        "id": 4,
        "name": "赵六",
        "avatar": "https://i.pravatar.cc/150?img=4",
        "title": "资深前端架构师",
        "experience": 7,
        "experienceDetails": {
          "totalYears": 7,
          "frontendYears": 7,
          "seniorYears": 4,
          "architectureYears": 2
        },
        "projectExperience": [
          {
            "projectName": "大型电商平台",
            "role": "前端架构师",
            "teamSize": 15,
            "duration": "2年",
            "technologies": ["Vue.js", "微前端", "Node.js"],
            "achievements": ["架构设计", "性能优化", "团队管理"]
          },
          {
            "projectName": "企业级管理系统",
            "role": "技术负责人",
            "teamSize": 8,
            "duration": "1.5年",
            "technologies": ["React", "TypeScript", "GraphQL"],
            "achievements": ["技术选型", "代码规范", "CI/CD"]
          }
        ],
        "matchScore": 93,
        "experienceMatchDetails": {
          "yearRequirement": "5-8年",
          "actualYears": 7,
          "matchLevel": "完全匹配",
          "experienceQuality": "优秀",
          "projectComplexity": "大型项目",
          "leadershipExperience": true
        },
        "recommendReasons": [
          "7年经验完全符合要求",
          "有大型项目架构经验",
          "技术深度和广度俱佳"
        ]
      }
    ],
    "experienceAnalysis": {
      "averageExperience": 6.8,
      "experienceDistribution": {
        "5-6年": 4,
        "6-7年": 5,
        "7-8年": 3
      },
      "seniorLevelRatio": 0.75,
      "architectureExperienceRatio": 0.42
    },
    "matchCriteria": {
      "experienceWeight": 0.6,
      "projectComplexityWeight": 0.25,
      "skillsWeight": 0.15
    }
  },
  "message": "经验匹配成功"
}
```

#### Type 枚举使用说明

| Type值 | 匹配类型 | 说明 | 权重分配 |
|--------|----------|------|----------|
| 1 | 智能推荐 | AI综合匹配，综合考虑技能、经验、学历等因素 | 技能40% + 经验30% + 学历20% + 位置10% |
| 2 | 技能匹配 | 主要基于技能要求进行匹配，适合技术岗位 | 技能80% + 经验15% + 学历5% |
| 3 | 经验匹配 | 主要基于工作经验进行匹配，适合管理岗位 | 经验60% + 项目复杂度25% + 技能15% |

**使用建议：**
- **type: 1** - 适合大多数场景，提供最均衡的匹配结果
- **type: 2** - 适合技术要求高的岗位，如架构师、专家级工程师
- **type: 3** - 适合管理岗位或对经验有严格要求的职位

---

## 接口3：根据职位ID获取候选人和岗位详情

### 请求参数

```json
{
  "jobId": "job_ai_001",
  "candidateFilters": {
    "status": "all",
    "minScore": 70,
    "limit": 20,
    "sortBy": "matchScore"
  }
}
```

### 响应数据

```json
{
  "success": true,
  "data": {
    "id": "job_ai_001",
    "jobDetails": {
      "basicInfo": {
        "title": "高级前端工程师",
        "department": "技术部",
        "level": "高级",
        "location": "北京",
        "salary": "25-40K",
        "workType": "全职",
        "experience": "3年以上",
        "education": "本科及以上"
      },
      "description": "负责公司核心产品的前端开发，参与技术架构设计，使用Vue.js等现代前端框架开发高质量的用户界面",
      "requirements": [
        "3年以上前端开发经验",
        "熟练掌握Vue.js",
        "具备良好的代码规范和团队协作能力",
        "有项目开发经验",
        "良好的学习能力和沟通能力"
      ],
      "skills": [
        "Vue.js",
        "JavaScript",
        "TypeScript",
        "Git",
        "RESTful API",
        "代码规范"
      ],
      "benefits": [
        "五险一金",
        "年终奖金",
        "弹性工作时间",
        "技术培训",
        "团队建设活动",
        "带薪年假"
      ],
      "userId": 1,
      "status": "active",
      "candidateCount": 25,
      "interviewCount": 5,
      "offerCount": 2
    },
    "candidates": [
      {
        "id": 1,
        "name": "张三",
        "avatar": "https://i.pravatar.cc/150?img=1",
        "title": "高级前端工程师",
        "experience": 5,
        "currentCompany": "某互联网公司",
        "expectedSalary": "35K",
        "location": "北京",
        "status": "在职-看机会",
        "skills": [
          "Vue.js",
          "React",
          "JavaScript",
          "TypeScript",
          "Node.js",
          "微前端"
        ],
        "matchScore": 95,
        "applicationStatus": "待面试",
        "appliedAt": "2024-01-16T09:30:00Z",
        "lastContact": "2024-01-17T14:20:00Z",
        "recommendReasons": [
          "技能匹配度极高，精通Vue.js和TypeScript",
          "5年丰富的前端开发经验",
          "有大型项目架构经验"
        ],
        "keyHighlights": [
          "Vue.js专家",
          "TypeScript精通",
          "架构经验"
        ],
        "radarData": {
          "学历背景": 85,
          "工作经历": 92,
          "技能匹配": 95,
          "项目经验": 90,
          "稳定性": 88,
          "发展潜力": 92
        }
      }
    ],
    "statistics": {
      "totalCandidates": 25,
      "newApplications": 8,
      "inInterview": 5,
      "offered": 2,
      "rejected": 3,
      "averageMatchScore": 82.5,
      "topSkills": [
        { "skill": "Vue.js", "count": 20 },
        { "skill": "JavaScript", "count": 25 },
        { "skill": "TypeScript", "count": 18 }
      ]
    },
    "recommendedActions": [
      "联系匹配度90+的候选人进行初步沟通",
      "关注新申请的8位候选人",
      "安排面试时间给待面试候选人"
    ]
  },
  "message": "获取职位详情和候选人信息成功"
}
```

---

## 接口4：根据用户ID获取关联职位列表

### 请求参数

```json
{
  "userId": 1,
  "filters": {
    "status": "all",
    "dateRange": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
  },
  "pagination": {
    "page": 1,
    "limit": 10
  },
  "sortBy": "title",
  "sortOrder": "asc"
}
```

### 响应数据

```json
{
  "success": true,
  "data": {
    "totalCount": 15,
    "currentPage": 1,
    "totalPages": 2,
    "jobs": [
      {
        "id": "job_001",
        "jobCard": {
          "title": "高级前端工程师",
          "department": "技术部",
          "location": "北京",
          "experience": "5年以上",
          "urgency": "high",
          "salary": "25-40K",
          "headcount": 1,
          "candidateCount": 45,
          "newCandidates": 8,
          "interviewingCount": 5,
          "status": "active"
        },
        "jobDetails": {
          "basicInfo": {
            "title": "高级前端工程师",
            "department": "技术部",
            "level": "高级",
            "location": "北京",
            "salary": "25-40K",
            "workType": "全职",
            "experience": "5年以上",
            "education": "本科及以上"
          },
          "description": "负责公司核心产品的前端开发，参与技术架构设计",
          "requirements": [
            "5年以上前端开发经验",
            "精通Vue.js、React等框架",
            "具备良好的团队协作能力"
          ],
          "skills": [
            "Vue.js",
            "JavaScript",
            "TypeScript",
            "Node.js"
          ],
          "benefits": [
            "五险一金",
            "弹性工作",
            "股权激励",
            "技术培训"
          ],
          "userId": 1
        }
      },
      {
        "id": "job_002",
        "jobCard": {
          "title": "Java后端工程师",
          "department": "技术部",
          "location": "上海",
          "experience": "3年以上",
          "urgency": "normal",
          "salary": "20-35K",
          "headcount": 2,
          "candidateCount": 32,
          "newCandidates": 5,
          "interviewingCount": 3,
          "status": "active"
        },
        "jobDetails": {
          "basicInfo": {
            "title": "Java后端工程师",
            "department": "技术部",
            "level": "中级",
            "location": "上海",
            "salary": "20-35K",
            "workType": "全职",
            "experience": "3年以上",
            "education": "本科及以上"
          },
          "description": "负责公司后端服务开发和维护，参与系统架构设计",
          "requirements": [
            "3年以上Java开发经验",
            "熟悉Spring Boot框架",
            "具备良好的代码规范"
          ],
          "skills": [
            "Java",
            "Spring Boot",
            "MySQL",
            "Redis",
            "微服务"
          ],
          "benefits": [
            "五险一金",
            "年终奖金",
            "技术培训",
            "弹性工作"
          ],
          "userId": 1
        }
      }
    ],
    "summary": {
      "totalJobs": 15,
      "activeJobs": 12,
      "pausedJobs": 2,
      "closedJobs": 1,
      "totalCandidates": 287,
      "totalInterviewing": 25,
      "totalOffers": 8
    },
    "recentActivity": [
      {
        "type": "new_application",
        "jobId": "job_001",
        "jobTitle": "高级前端工程师",
        "candidateName": "王五",
        "timestamp": "2024-01-17T16:45:00Z"
      },
      {
        "type": "interview_scheduled",
        "jobId": "job_002",
        "jobTitle": "Java后端工程师",
        "candidateName": "赵六",
        "timestamp": "2024-01-17T15:30:00Z"
      }
    ]
  },
  "message": "获取用户职位列表成功"
}
```

---

## 数据结构说明

### 通用响应格式

```json
{
  "success": boolean,      // 请求是否成功
  "data": object|array,    // 返回的数据
  "message": string,       // 响应消息
  "timestamp": string,     // 响应时间戳（可选）
  "requestId": string      // 请求ID（可选）
}
```

### 候选人匹配评分说明

- **matchScore**: 综合匹配分数 (0-100)
- **radarData**: 六维能力评估
  - 学历背景 (0-100)
  - 工作经历 (0-100) 
  - 技能匹配 (0-100)
  - 项目经验 (0-100)
  - 稳定性 (0-100)
  - 发展潜力 (0-100)

### 职位状态说明

- **status**: 职位状态
  - active: 活跃招聘中
  - paused: 暂停招聘
  - closed: 已关闭
  - draft: 草稿状态

---

*此文档基于AI招聘系统的Mock数据生成，用于前端开发和测试。*
