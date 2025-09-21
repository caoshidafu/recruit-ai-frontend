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
  "description": "招聘一名高级前端工程师，负责Vue.js项目开发，需要3年以上经验，熟悉TypeScript和组件化开发"
}
```

### 响应数据

```json
{
  "success": true,
  "data": {
    "jobCard": {
      "id": "job_ai_001",
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "experience": "3年以上",
      "urgency": "normal",
      "salary": "25-40K",
      "headcount": 1,
      "candidateCount": 0,
      "newCandidates": 0,
      "interviewingCount": 0,
      "aiGenerated": true,
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "jobDetails": {
      "id": "job_ai_001",
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
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "userId": "user_001",
      "aiGenerated": true,
      "aiConfidence": 0.92
    },
    "extractedInfo": {
      "title": "高级前端工程师",
      "experience": "3年以上",
      "skills": ["Vue.js", "TypeScript", "组件化开发"],
      "education": "本科及以上",
      "workType": "全职"
    },
    "analysisConfidence": 0.92,
    "suggestions": [
      "建议在职位描述中明确技术栈版本要求",
      "可以增加对候选人软技能的描述",
      "薪资范围建议更加具体"
    ]
  },
  "message": "职位解析成功"
}
```

---

## 接口2：根据职位描述匹配候选人

### 请求参数

```json
{
  "description": "招聘一名高级前端工程师，负责Vue.js项目开发，需要3年以上经验",
  "type": "smart",
  "limit": 10,
  "filters": {
    "experience": "3年以上",
    "location": "北京",
    "expectedSalary": "20-40K"
  }
}
```

### 响应数据

```json
{
  "success": true,
  "data": {
    "matchType": "smart",
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
    }
  },
  "message": "候选人匹配成功"
}
```

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
    "jobDetails": {
      "id": "job_ai_001",
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
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "userId": "user_001",
      "aiGenerated": true,
      "aiConfidence": 0.92,
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
  "userId": "user_001",
  "filters": {
    "status": "all",
    "aiGenerated": true,
    "dateRange": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    }
  },
  "pagination": {
    "page": 1,
    "limit": 10
  },
  "sortBy": "createdAt",
  "sortOrder": "desc"
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
        "jobCard": {
          "id": "job_001",
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
          "aiGenerated": true,
          "createdAt": "2024-01-15T10:00:00Z",
          "status": "active"
        },
        "jobDetails": {
          "id": "job_001",
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
          "createdAt": "2024-01-15T10:00:00Z",
          "updatedAt": "2024-01-15T10:00:00Z",
          "userId": "user_001",
          "aiGenerated": true,
          "aiConfidence": 0.92
        }
      },
      {
        "jobCard": {
          "id": "job_002",
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
          "aiGenerated": true,
          "createdAt": "2024-01-10T14:30:00Z",
          "status": "active"
        },
        "jobDetails": {
          "id": "job_002",
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
          "createdAt": "2024-01-10T14:30:00Z",
          "updatedAt": "2024-01-10T14:30:00Z",
          "userId": "user_001",
          "aiGenerated": true,
          "aiConfidence": 0.88
        }
      }
    ],
    "summary": {
      "totalJobs": 15,
      "activeJobs": 12,
      "pausedJobs": 2,
      "closedJobs": 1,
      "aiGeneratedJobs": 10,
      "manualJobs": 5,
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

### AI生成置信度说明

- **aiConfidence**: AI生成内容的置信度 (0-1)
  - 0.9-1.0: 高置信度
  - 0.7-0.9: 中等置信度
  - 0.5-0.7: 低置信度
  - <0.5: 需要人工审核

---

*此文档基于AI招聘系统的Mock数据生成，用于前端开发和测试。*
