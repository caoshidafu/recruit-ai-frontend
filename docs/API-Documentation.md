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

- **Base URL**: `http://localhost:3000/api`
- **Content-Type**: `application/json`
- **字符编码**: `UTF-8`

### 四个核心后端接口

1. **根据用户输入的职位描述生成职位卡片和岗位详情**
2. **根据用户输入的职位描述匹配候选人（默认智能匹配，携带type）**
3. **根据发布新岗位id获取候选人信息以及岗位详情信息**
4. **根据用户id返回关联的职位卡片和岗位详情list**

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

#### 请求示例

```json
{
  "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React，有5年以上开发经验，能够独立负责项目开发，薪资25-40K，工作地点北京",
  "userId": 1,
  "companyInfo": {
    "name": "科技有限公司",
    "industry": "互联网"
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
**功能描述**: 获取指定用户创建的所有职位信息，包括职位卡片和详情  
**URL地址**: `/users/{userId}/jobs`  
**请求方式**: `GET`

#### 路径参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | number | ✅ | 用户ID |

#### 查询参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| status | string | ❌ | 职位状态筛选 ('active', 'inactive', 'draft') |
| limit | number | ❌ | 限制返回数量，默认10 |
| offset | number | ❌ | 偏移量，默认0 |

#### 请求示例

```
GET /users/user_12345/jobs?status=active&limit=5&offset=0
```

#### 返回参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| success | boolean | 请求是否成功 |
| data | object | 返回数据 |
| data.jobs | array | 职位列表，每个包含jobCard和jobDetails |
| data.total | number | 总数量 |
| data.summary | object | 统计摘要信息 |
| message | string | 响应消息 |

#### jobs 数组元素结构

```json
{
  "jobCard": { /* jobCard结构 */ },
  "jobDetails": { /* jobDetails结构 */ }
}
```

#### summary 结构

```json
{
  "totalJobs": 12,
  "activeJobs": 8,
  "draftJobs": 2,
  "totalCandidates": 156,
  "avgMatchScore": 85
}
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

### 5. 根据职位描述匹配候选人

**接口名称**: 根据用户输入的职位描述匹配候选人（默认智能匹配，携带type）  
**功能描述**: 基于用户输入的职位描述，使用AI技术匹配最适合的候选人  
**URL地址**: `/candidates/ai-match-by-description`  
**请求方式**: `POST`

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
// 1. 创建职位
const jobResult = await apiManager.createJobByDescription({
  description: "招聘高级前端工程师...",
  userId: 1
});

const jobId = jobResult.data.jobId;

// 2. 匹配候选人
const matchResult = await apiManager.matchCandidatesByDescription({
  description: "招聘高级前端工程师...",
  matchType: "smart",
  limit: 10
});

// 3. 获取职位和候选人详情
const detailsResult = await apiManager.getJobCandidatesAndDetails(jobId);

// 4. 获取用户所有职位
const userJobsResult = await apiManager.getUserJobs("user_12345");
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
