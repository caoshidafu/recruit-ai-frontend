# AI招聘系统 API接口文档

## 📋 目录

- [概述](#概述)
- [接口规范](#接口规范)
- [AI职位创建接口](#ai职位创建接口)
- [用户管理接口](#用户管理接口)
- [AI匹配接口](#ai匹配接口)
- [传统职位管理接口](#传统职位管理接口)
- [候选人管理接口](#候选人管理接口)
- [错误码说明](#错误码说明)

---

## 概述

本文档描述了AI招聘系统的所有API接口，包括四个核心业务接口和扩展功能接口。系统采用RESTful API设计规范，支持JSON数据格式。

### 基础信息

- **Base URL**: `http://localhost:8080/recruit/ai`
- **Content-Type**: `application/json`
- **字符编码**: `UTF-8`

### 四个核心后端接口

1. **根据用户输入的职位描述生成职位卡片和岗位详情**
2. **统一候选人匹配接口（合并原接口2和3）** - 根据岗位ID和用户ID获取候选人信息和岗位详情
3. **根据用户id返回关联的职位卡片和岗位详情list**

> **接口整合说明**：原接口2（根据职位描述匹配候选人）和接口3（根据岗位id获取候选人信息）已合并为新的统一接口。后端通过判断是否有缓存数据来决定是否需要重新匹配，提供更高效的服务。

---

## 接口规范

### 请求格式

```json
{
  "参数名": "参数值"
}
```

### 响应格式

```json
{
  "success": boolean,     // 请求是否成功
  "data": object|array,   // 返回的数据
  "message": string,      // 响应消息
  "timestamp": string     // 时间戳（可选）
}
```

### 状态码

- `200` - 请求成功
- `400` - 请求参数错误
- `401` - 未授权
- `404` - 资源不存在
- `500` - 服务器内部错误

---

## AI职位创建接口

### 1. 根据职位描述生成职位卡片和详情

**接口名称**: 根据用户输入的职位描述生成职位卡片和岗位详情  
**功能描述**: 使用AI技术解析用户输入的职位描述，生成结构化的职位卡片和详细信息  
**URL地址**: `/jobs/ai-create`  
**请求方式**: `POST`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| description | string | ✅ | 用户输入的职位描述文本 |
| userId | number | ✅ | 用户ID |
| companyInfo | object | ❌ | 可选的公司信息 |
| options | object | ❌ | 可选配置选项 |
| options.industry | string | ❌ | 行业类型，默认'tech' |
| options.department | string | ❌ | 部门，默认'技术部' |
| options.urgency | string | ❌ | 紧急程度 ('low', 'normal', 'high')，默认'normal' |
| options.headcount | number | ❌ | 招聘人数，默认1 |

#### 请求示例

**基础调用**:
```json
{
  "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React，有5年以上开发经验，能够独立负责项目开发，薪资25-40K，工作地点北京",
  "userId": 1
}
```

**带完整选项的调用**:
```json
{
  "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React，有5年以上开发经验，能够独立负责项目开发，薪资25-40K，工作地点北京",
  "userId": 1,
  "companyInfo": {
    "name": "科技有限公司",
    "industry": "互联网"
  },
  "options": {
    "department": "技术部",
    "urgency": "high",
    "headcount": 2
  }
}
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回数据 |
| data.jobId | string | 生成的职位ID |
| data.jobCard | object | 职位卡片信息 |
| data.jobDetails | object | 职位详细信息 |
| message | string | 响应消息 |

#### jobCard 结构

```json
{
  "id": "job_1705123456789_abc123def",
  "title": "高级前端工程师",
  "department": "技术部",
  "level": "高级",
  "location": "北京",
  "salary": "25-40K",
  "status": "active",
  "publishedAt": "2024-01-15T10:00:00Z",
  "urgency": "normal",
  "tags": ["Vue.js", "React", "前端开发"],
  "stats": {
    "applicants": 0,
    "views": 1,
    "publishDays": 0
  },
  "userId": 1
}
```

#### jobDetails 结构

```json
{
  "id": "job_1705123456789_abc123def",
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
  "description": "招聘高级前端工程师...",
  "requirements": [
    "5年以上前端开发经验",
    "精通Vue.js、React等框架",
    "具备良好的团队协作能力"
  ],
  "skills": ["Vue.js", "React", "JavaScript", "TypeScript"],
  "benefits": ["五险一金", "弹性工作", "股权激励"],
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "userId": 1,
  "aiGenerated": true,
  "aiConfidence": 0.92
}
```

#### 返回示例

```json
{
  "success": true,
  "data": {
    "jobId": "job_1705123456789_abc123def",
    "jobCard": { /* jobCard结构 */ },
    "jobDetails": { /* jobDetails结构 */ }
  },
  "message": "AI职位创建成功"
}
```

### 2. 根据岗位ID获取候选人和详情

**接口名称**: 根据发布新岗位id获取候选人信息以及岗位详情信息  
**功能描述**: 根据已发布的岗位ID，获取关联的候选人列表和岗位详细信息  
**URL地址**: `/jobs/{jobId}/candidates-and-details`  
**请求方式**: `GET`

#### 路径参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobId | string | ✅ | 职位ID |

#### 请求示例

```
GET /jobs/job_1705123456789_abc123def/candidates-and-details
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回数据 |
| data.jobDetails | object | 岗位详细信息 |
| data.candidates | array | 匹配的候选人列表 |
| data.matchSummary | object | 匹配摘要信息 |
| message | string | 响应消息 |

#### candidates 数组元素结构

```json
{
  "id": 1,
  "name": "张三",
  "avatar": "https://example.com/avatar.jpg",
  "title": "高级前端工程师",
  "experience": 5,
  "location": "北京",
  "expectedSalary": "35K",
  "skills": ["Vue.js", "React", "JavaScript"],
  "matchScore": 95,
  "matchReason": [
    "技能匹配度高",
    "工作经验符合要求",
    "地理位置合适"
  ],
  "educationHistory": [
    {
      "degree": "本科",
      "school": "北京大学",
      "major": "计算机科学与技术",
      "duration": "2015-2019"
    }
  ]
}
```

#### matchSummary 结构

```json
{
  "totalMatched": 5,
  "averageScore": 87,
  "highMatch": 2,
  "mediumMatch": 2,
  "lowMatch": 1,
  "lastUpdated": "2024-01-15T10:00:00Z"
}
```

#### 返回示例

```json
{
  "success": true,
  "data": {
    "jobDetails": { /* jobDetails结构 */ },
    "candidates": [ /* candidates数组 */ ],
    "matchSummary": { /* matchSummary结构 */ }
  },
  "message": "获取成功"
}
```

---

## 用户管理接口

### 3. 获取用户职位列表

**接口名称**: 根据用户id返回关联的职位卡片和岗位详情list  
**功能描述**: 获取指定用户创建的所有职位信息，包括职位卡片和详情，支持多种筛选和排序选项  
**URL地址**: `/users/{userId}/jobs`  
**请求方式**: `GET`

#### 路径参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | number | ✅ | 用户ID |

#### 查询参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| status | string | ❌ | 职位状态筛选 ('active', 'inactive', 'draft', 'closed', 'all')，默认'all' |
| department | string | ❌ | 部门筛选 |
| location | string | ❌ | 地点筛选 |
| urgency | string | ❌ | 紧急程度筛选 ('low', 'normal', 'high') |
| dateRange.startDate | string | ❌ | 开始日期 (YYYY-MM-DD) |
| dateRange.endDate | string | ❌ | 结束日期 (YYYY-MM-DD) |
| searchKeyword | string | ❌ | 搜索关键词（职位标题、描述） |
| limit | number | ❌ | 限制返回数量，默认10，最大100 |
| offset | number | ❌ | 偏移量，默认0 |
| page | number | ❌ | 页码，默认1（如果指定page，将覆盖offset计算） |
| sortBy | string | ❌ | 排序字段，默认'createdAt' |
| sortOrder | string | ❌ | 排序顺序 ('asc', 'desc')，默认'desc' |
| includeStats | boolean | ❌ | 是否包含统计信息，默认true |

#### sortBy 可选值

- `title` - 职位标题
- `department` - 部门
- `createdAt` - 创建时间（默认）
- `candidateCount` - 候选人数量

#### 请求示例

**基础调用**:
```
GET /users/1/jobs
```

**获取活跃职位，按创建时间倒序**:
```
GET /users/1/jobs?status=active&sortBy=createdAt&sortOrder=desc&limit=5
```

**复合筛选查询**:
```
GET /users/1/jobs?status=active&department=技术部&urgency=high&searchKeyword=前端&page=1&limit=20
```

**时间范围筛选**:
```
GET /users/1/jobs?dateRange.startDate=2024-01-01&dateRange.endDate=2024-12-31&sortBy=candidateCount&sortOrder=desc
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回数据 |
| data.jobs | array | 职位列表，每个包含jobCard和jobDetails |
| data.total | number | 总数量 |
| data.currentPage | number | 当前页码 |
| data.totalPages | number | 总页数 |
| data.summary | object | 统计摘要信息 |
| data.recentActivity | array | 最近活动（可选） |
| message | string | 响应消息 |

#### jobs 数组元素结构

```json
{
  "jobCard": {
    "title": "高级前端工程师",
    "department": "技术部",
    "location": "北京",
    "urgency": "high",
    "candidateCount": 45,
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
    "description": "负责公司核心产品的前端开发...",
    "requirements": ["5年以上前端开发经验", "精通Vue.js、React等框架"],
    "skills": ["Vue.js", "JavaScript", "TypeScript", "Node.js"],
    "benefits": ["五险一金", "弹性工作", "股权激励"],
    "userId": 1
  }
}
```

#### summary 结构

```json
{
  "totalJobs": 15,
  "activeJobs": 12,
  "pausedJobs": 2,
  "closedJobs": 1,
  "totalCandidates": 287,
  "totalInterviewing": 25,
  "totalOffers": 8
}
```

#### recentActivity 结构

```json
[
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
```

#### 返回示例

```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "jobCard": { /* jobCard结构 */ },
        "jobDetails": { /* jobDetails结构 */ }
      }
    ],
    "total": 12,
    "summary": { /* summary结构 */ }
  },
  "message": "获取用户职位成功"
}
```

### 4. 获取用户职位统计

**接口名称**: 获取用户职位统计信息  
**功能描述**: 获取用户的职位创建和管理统计信息  
**URL地址**: `/users/{userId}/job-stats`  
**请求方式**: `GET`

#### 路径参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | number | ✅ | 用户ID |

#### 返回参数

```json
{
  "success": true,
  "data": {
    "totalJobs": 12,
    "activeJobs": 8,
    "draftJobs": 2,
    "inactiveJobs": 2,
    "totalCandidates": 156,
    "totalViews": 2340,
    "avgMatchScore": 87.5,
    "recentActivity": [
      {
        "type": "job_create",
        "jobTitle": "高级前端工程师",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ]
  },
  "message": "获取用户统计信息成功"
}
```

---

## AI匹配接口

### 2. 统一候选人匹配接口（推荐使用）

**接口名称**: 根据岗位ID和用户ID获取候选人信息和岗位详情  
**功能描述**: 统一的候选人匹配接口，支持实时匹配和缓存匹配，后端根据forceRefresh参数决定是否需要重新匹配  
**URL地址**: `/jobs/{jobId}/candidates`  
**请求方式**: `POST`

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| jobId | string/number | ✅ | 岗位ID（URL参数） |
| userId | string/number | ✅ | 用户ID |
| matchType | string | ❌ | 匹配类型，默认'smart' |
| forceRefresh | boolean | ❌ | 是否强制重新匹配，默认false |
| limit | number | ❌ | 限制返回候选人数量，默认10，最大50 |
| offset | number | ❌ | 分页偏移量，默认0 |
| filters | object | ❌ | 额外的筛选条件 |
| filters.minScore | number | ❌ | 最小匹配分数 |
| filters.location | string | ❌ | 地理位置 |
| filters.minExperience | number | ❌ | 最少工作年限 |
| filters.maxExperience | number | ❌ | 最多工作年限 |
| filters.skills | array | ❌ | 必需技能数组 |
| filters.education | string | ❌ | 学历要求 |
| sortBy | string | ❌ | 排序字段，默认'matchScore' |
| sortOrder | string | ❌ | 排序顺序，默认'desc' |

#### matchType 可选值

- `smart` - 智能匹配（默认）
- `skill` - 技能匹配
- `experience` - 经验匹配
- `education` - 学历匹配

#### sortBy 可选值

- `matchScore` - 匹配分数（默认）
- `experience` - 工作经验
- `education` - 学历
- `appliedTime` - 申请时间

#### 请求示例

**基础调用（使用缓存）**:
```json
{
  "userId": 1
}
```

**智能匹配，强制刷新**:
```json
{
  "userId": 1,
  "matchType": "smart",
  "forceRefresh": true,
  "limit": 20
}
```

**技能匹配，带筛选条件**:
```json
{
  "userId": 1,
  "matchType": "skill",
  "filters": {
    "minScore": 80,
    "location": "北京",
    "skills": ["Vue.js", "React"]
  },
  "sortBy": "matchScore",
  "limit": 10
}
```

**分页查询**:
```json
{
  "userId": 1,
  "matchType": "experience",
  "filters": {
    "minExperience": 3,
    "maxExperience": 8
  },
  "limit": 10,
  "offset": 20,
  "sortBy": "experience",
  "sortOrder": "desc"
}
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回的数据 |
| data.jobDetail | object | 岗位详情信息 |
| data.candidates | array | 匹配的候选人列表 |
| data.matchAnalysis | object | 匹配分析结果 |
| data.pagination | object | 分页信息 |
| data.isFromCache | boolean | 是否来自缓存 |
| data.lastMatchTime | string | 上次匹配时间 |
| data.processingTime | string | 处理时间 |
| message | string | 响应消息 |

#### pagination 结构

```json
{
  "total": 45,
  "currentPage": 1,
  "totalPages": 5,
  "hasNext": true,
  "hasPrevious": false,
  "limit": 10,
  "offset": 0
}
```

#### matchAnalysis 结构

```json
{
  "totalMatched": 8,
  "averageScore": 87,
  "matchCriteria": {
    "skillMatch": 92,
    "experienceMatch": 85,
    "educationMatch": 88
  },
  "scoreDistribution": {
    "excellent": 3,
    "good": 3,
    "fair": 2
  },
  "processingTime": "0.05s",
  "algorithmVersion": "v2.1"
}
```

#### 返回示例

```json
{
  "success": true,
  "data": {
    "jobDetail": {
      "id": 1,
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "salary": "25-40K",
      "candidateCount": 8,
      "matchingDate": "2024-01-15T10:30:00Z"
    },
    "candidates": [
      {
        "id": 1,
        "name": "张三",
        "title": "前端工程师",
        "experience": "5年",
        "education": "本科",
        "location": "北京",
        "matchScore": 94,
        "skills": ["Vue.js", "JavaScript", "TypeScript"],
        "matchReasons": [
          "技能匹配度高：Vue.js、JavaScript、TypeScript",
          "工作经验符合要求：5年前端开发经验"
        ]
      }
    ],
    "matchAnalysis": {
      "totalMatched": 8,
      "averageScore": 87,
      "matchCriteria": {
        "skillMatch": 92,
        "experienceMatch": 85,
        "educationMatch": 88
      },
      "processingTime": "0.05s"
    },
    "isFromCache": true,
    "lastMatchTime": "2024-01-15T10:30:00Z"
  },
  "message": "成功获取岗位 高级前端工程师 的 8 个匹配候选人（来自缓存）"
}
```

#### 接口逻辑说明

1. **缓存机制**: 后端会检查是否已有该岗位的匹配缓存
2. **智能判断**: 如果 `forceRefresh=false` 且有缓存，直接返回缓存结果
3. **实时匹配**: 如果 `forceRefresh=true` 或无缓存，执行实时AI匹配
4. **类型支持**: 支持多种匹配类型，满足不同筛选需求
5. **性能优化**: 缓存响应速度更快，实时匹配提供最新结果

---

### 5. 根据职位描述匹配候选人（兼容旧接口）

**接口名称**: 根据用户输入的职位描述匹配候选人（默认智能匹配，携带type）  
**功能描述**: 基于用户输入的职位描述，使用AI技术匹配最适合的候选人  
**URL地址**: `/candidates/ai-match-by-description`  
**请求方式**: `POST`  
**状态**: `已废弃` - 推荐使用统一候选人匹配接口

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| description | string | ✅ | 职位描述文本 |
| matchType | string | ❌ | 匹配类型，默认'smart' |
| limit | number | ❌ | 限制返回候选人数量，默认10 |
| filters | object | ❌ | 额外的筛选条件 |

#### matchType 可选值

- `smart` - 智能匹配（默认）
- `skill` - 技能匹配
- `experience` - 经验匹配
- `education` - 学历匹配

#### 请求示例

```json
{
  "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React，有5年以上开发经验",
  "matchType": "smart",
  "limit": 5,
  "filters": {
    "location": "北京",
    "minSalary": 20000
  }
}
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回数据 |
| data.candidates | array | 匹配的候选人列表 |
| data.matchAnalysis | object | 匹配分析结果 |
| data.suggestions | array | 优化建议 |
| message | string | 响应消息 |

#### matchAnalysis 结构

```json
{
  "totalAnalyzed": 245,
  "matchedCount": 5,
  "averageScore": 87,
  "matchDistribution": {
    "excellent": 2,
    "good": 2,
    "fair": 1
  },
  "processingTime": "1.8s"
}
```

#### 返回示例

```json
{
  "success": true,
  "data": {
    "candidates": [ /* candidates数组 */ ],
    "matchAnalysis": { /* matchAnalysis结构 */ },
    "suggestions": [
      "建议重点关注匹配度90分以上的候选人",
      "可以考虑适当放宽经验要求以获得更多候选人"
    ]
  },
  "message": "AI匹配完成"
}
```

### 6. 获取用户匹配历史

**接口名称**: 获取用户的匹配历史  
**功能描述**: 获取用户的候选人匹配历史记录  
**URL地址**: `/candidates/match-history/{userId}`  
**请求方式**: `GET`

#### 路径参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | number | ✅ | 用户ID |

#### 查询参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| limit | number | ❌ | 限制数量，默认10 |
| offset | number | ❌ | 偏移量，默认0 |

#### 返回示例

```json
{
  "success": true,
  "data": {
    "matchHistory": [
      {
        "id": "match_001",
        "jobDescription": "招聘高级前端工程师，要求熟练掌握Vue.js和React",
        "matchType": "smart",
        "matchedCount": 8,
        "averageScore": 87,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "total": 2
  },
  "message": "获取匹配历史成功"
}
```

---

## 传统职位管理接口

### 7. 获取职位列表

**接口名称**: 获取职位列表  
**URL地址**: `/jobs/list`  
**请求方式**: `GET`

### 8. 获取职位详情

**接口名称**: 根据ID获取职位详情  
**URL地址**: `/jobs/detail/{id}`  
**请求方式**: `GET`

### 9. 创建职位

**接口名称**: 创建新职位  
**URL地址**: `/jobs/create`  
**请求方式**: `POST`

### 10. 更新职位

**接口名称**: 更新职位信息  
**URL地址**: `/jobs/update/{id}`  
**请求方式**: `PUT`

### 11. 删除职位

**接口名称**: 删除职位  
**URL地址**: `/jobs/delete/{id}`  
**请求方式**: `DELETE`

---

## 候选人管理接口

### 12. 获取候选人详情

**接口名称**: 根据ID获取候选人详情  
**URL地址**: `/candidates/detail/{id}`  
**请求方式**: `GET`

### 13. 搜索候选人

**接口名称**: 搜索候选人  
**URL地址**: `/candidates/search`  
**请求方式**: `GET`

### 14. 获取候选人雷达图

**接口名称**: 获取候选人雷达图数据  
**URL地址**: `/candidates/{id}/radar`  
**请求方式**: `GET`

---

## 错误码说明

### 通用错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权访问 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 业务错误码

| 错误码 | 说明 |
|--------|------|
| 10001 | 职位描述不能为空 |
| 10002 | 用户ID不能为空 |
| 10003 | 职位ID不存在 |
| 10004 | 候选人ID不存在 |
| 20001 | AI解析失败 |
| 20002 | 匹配算法执行失败 |
| 30001 | 数据库连接失败 |
| 30002 | 数据保存失败 |

### 错误响应示例

```json
{
  "success": false,
  "data": null,
  "message": "职位描述不能为空",
  "error": {
    "code": 10001,
    "details": "description field is required"
  }
}
```

---

## 接口使用示例

### 完整的AI招聘流程

```javascript
// 1. 根据职位描述创建职位
const jobResult = await apiManager.createJobByDescription(
  "招聘高级前端工程师，要求熟练掌握Vue.js和React，有5年以上开发经验，薪资25-40K，工作地点北京",
  1
);

const jobId = jobResult.data.jobId;

// 2. 使用统一匹配接口获取候选人
const matchResult = await apiManager.getJobCandidatesWithMatching(jobId, 1);

// 3. 获取用户所有职位列表
const userJobsResult = await apiManager.getUserJobs(1);
```

### 三个核心接口详细使用示例

#### 接口1: 创建AI职位

```javascript
// 基础使用
const createBasicJob = async () => {
  try {
    const response = await apiManager.createJobByDescription(
      "招聘高级前端工程师...",
      1
    );
    console.log('职位创建成功:', response.data.jobId);
  } catch (error) {
    console.error('创建失败:', error.message);
  }
};

// 高级使用（带完整配置）
const createAdvancedJob = async () => {
  try {
    const response = await apiManager.createJobByDescription(
      "招聘资深全栈工程师，负责核心产品开发...",
      1
    );
    return response.data;
  } catch (error) {
    throw new Error(`职位创建失败: ${error.message}`);
  }
};
```

#### 接口2: 统一候选人匹配

```javascript
// 智能匹配（使用缓存）
const smartMatch = async (jobId) => {
  const response = await apiManager.getJobCandidatesWithMatching(jobId, 1);
  return response.data.candidates;
};

// 技能匹配（带筛选）
const skillMatch = async (jobId) => {
  const response = await apiManager.getJobCandidatesWithMatching(jobId, 1);
  return response.data;
};

// 分页查询候选人
const paginatedMatch = async (jobId, page = 1) => {
  const response = await apiManager.getJobCandidatesWithMatching(jobId, 1);
  return {
    candidates: response.data.candidates,
    pagination: response.data.pagination,
    isFromCache: response.data.isFromCache
  };
};
```

#### 接口3: 用户职位管理

```javascript
// 获取用户所有职位
const getAllUserJobs = async (userId) => {
  const response = await apiManager.getUserJobs(userId);
  return response.data;
};

// 按条件筛选职位
const filterUserJobs = async (userId) => {
  const response = await apiManager.getUserJobs(userId);
  return response.data.jobs;
};

// 搜索用户职位
const searchUserJobs = async (userId, keyword) => {
  const response = await apiManager.getUserJobs(userId);
  return response.data.jobs;
};

// 分页获取职位
const getPaginatedJobs = async (userId, page = 1, pageSize = 10) => {
  const response = await apiManager.getUserJobs(userId);
  return {
    jobs: response.data.jobs,
    pagination: {
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
      total: response.data.total
    },
    summary: response.data.summary
  };
};
```

### 错误处理最佳实践

```javascript
const handleAPICall = async (apiCall) => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    // 参数验证错误
    if (error.message.includes('必填参数')) {
      console.error('参数错误:', error.message);
      // 显示用户友好的错误信息
    }
    // 网络或服务器错误
    else if (error.response) {
      console.error('服务器错误:', error.response.status, error.response.data);
    } else {
      console.error('未知错误:', error.message);
    }
    throw error;
  }
};

// 使用示例
const safeCreateJob = () => handleAPICall(() => 
  apiManager.createJobByDescription("职位描述", 1)
);
```

---

## 版本信息

- **文档版本**: v1.0.0
- **API版本**: v1.0
- **更新日期**: 2024-01-15
- **维护者**: AI招聘系统开发团队

---

## 联系方式

如有疑问，请联系开发团队：
- 邮箱: dev@example.com
- 技术支持: support@example.com
