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

本文档描述了AI招聘系统的所有API接口，包括三个核心业务接口和扩展功能接口。系统采用RESTful API设计规范，支持JSON数据格式。

### 基础信息

- **Base URL**: `http://localhost:8080/recruit/ai`
- **Content-Type**: `application/json`
- **字符编码**: `UTF-8`

### 三个核心后端接口

1. **职位卡片列表接口** - 根据发布岗位id和user_id获取职位卡片列表
2. **候选人匹配接口** - 根据发布岗位id获取候选人list，携带type默认是智能匹配
3. **职位画像生成接口** - 根据user_id和职位描述生成职位画像和岗位详情

> **重要说明**：所有API请求路径均不使用路径参数形式（如`/jobs/${jobId}/ai-regenerate`）。GET请求使用查询参数（query parameters），POST/PUT/DELETE请求使用请求体（request body）传递参数。

---

## 接口规范

### 请求格式

#### GET请求
```
GET /api/endpoint?param1=value1&param2=value2
```

#### POST/PUT/DELETE请求
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
  "message": string       // 响应消息
}
```

### 通用参数说明

- **job_id**: 发布岗位ID，数字类型
- **user_id**: 用户ID，数字类型
- **type**: 匹配类型，字符串类型，默认为"智能匹配"

---

## AI职位创建接口

### 1. 获取职位卡片列表

**接口描述**: 根据发布岗位id和user_id获取职位卡片列表

**请求信息**:
- **URL**: `/jobs/cards`
- **Method**: `GET`
- **参数**: 
  - `job_id` (number): 发布岗位ID
  - `user_id` (number): 用户ID

**请求示例**:
```
GET /jobs/cards?job_id=123&user_id=1
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "jobCards": [
      {
        "id": "job_001",
        "title": "高级前端工程师",
        "department": "技术部",
        "location": "北京",
        "salaryRange": "25-35K",
        "experience": "3-5年",
        "education": "本科",
        "skills": ["Vue.js", "React", "TypeScript"],
        "status": "active",
        "publishDate": "2024-01-15",
        "applicationCount": 25
      }
    ],
    "total": 1
  },
  "message": "获取职位卡片列表成功"
}
```

### 2. 根据职位描述生成职位画像和岗位详情

**接口描述**: 根据user_id和职位描述生成职位画像和岗位详情

**请求信息**:
- **URL**: `/jobs/generate-profile`
- **Method**: `POST`
- **参数**: 
  - `user_id` (number): 用户ID
  - `description` (string): 职位描述

**请求示例**:
```json
{
  "user_id": 1,
  "description": "招聘高级前端工程师，负责Vue.js项目开发，要求3年以上经验，熟悉TypeScript"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "jobProfile": {
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "salaryRange": "25-35K",
      "experience": "3-5年",
      "education": "本科及以上",
      "skills": ["Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
      "responsibilities": [
        "负责前端项目架构设计和开发",
        "参与产品需求分析和技术方案制定",
        "优化前端性能，提升用户体验"
      ],
      "requirements": [
        "3年以上前端开发经验",
        "熟练掌握Vue.js框架",
        "熟悉TypeScript开发"
      ]
    },
    "aiAnalysis": {
      "matchingKeywords": ["Vue.js", "TypeScript", "前端工程师"],
      "suggestedSalary": "25-35K",
      "marketDemand": "high",
      "competitiveAnalysis": "该职位在当前市场需求较高"
    }
  },
  "message": "职位画像生成成功"
}
```

---

## AI匹配接口

### 1. 根据发布岗位id获取候选人列表

**接口描述**: 根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）

**请求信息**:
- **URL**: `/candidates/by-job`
- **Method**: `POST`
- **参数**: 
  - `job_id` (number): 发布岗位ID
  - `user_id` (number): 用户ID
  - `type` (string, 可选): 匹配类型，默认为"智能匹配"

**请求示例**:
```json
{
  "job_id": 123,
  "user_id": 1,
  "type": "智能匹配"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "id": 1,
        "name": "张三",
        "title": "前端工程师",
        "experience": 4,
        "education": "本科",
        "location": "北京",
        "skills": ["Vue.js", "React", "TypeScript"],
        "avatar": "https://example.com/avatar1.jpg",
        "matchScore": 92,
        "matchReasons": [
          "技能匹配度高：Vue.js, TypeScript",
          "工作经验符合要求：4年",
          "地理位置匹配"
        ],
        "salary": "28K",
        "status": "available"
      }
    ],
    "total": 15,
    "matchingInfo": {
      "type": "智能匹配",
      "isFromCache": false,
      "processingTime": "2.3s",
      "totalMatched": 15,
      "highMatch": 8,
      "mediumMatch": 5,
      "lowMatch": 2
    },
    "jobDetail": {
      "id": 123,
      "title": "高级前端工程师",
      "department": "技术部",
      "salaryRange": "25-35K"
    }
  },
  "message": "成功获取岗位匹配候选人（实时匹配）"
}
```

### 2. 获取匹配结果详细分析

**请求信息**:
- **URL**: `/candidates/match-analysis`
- **Method**: `GET`
- **参数**: 
  - `match_id` (string): 匹配结果ID
  - `analysisLevel` (string, 可选): 分析级别，默认为"detailed"

**请求示例**:
```
GET /candidates/match-analysis?match_id=match_123&analysisLevel=detailed
```

### 3. 保存匹配结果

**请求信息**:
- **URL**: `/candidates/save-match-results`
- **Method**: `POST`

### 4. 获取用户的匹配历史

**请求信息**:
- **URL**: `/candidates/match-history`
- **Method**: `GET`
- **参数**: 
  - `user_id` (number): 用户ID

### 5. 重新匹配候选人

**请求信息**:
- **URL**: `/candidates/rematch`
- **Method**: `POST`
- **参数**: 
  - `saved_match_id` (string): 保存的匹配ID
  - 其他筛选条件

**请求示例**:
```json
{
  "saved_match_id": "match_123",
  "location": "上海",
  "experience": "3-5年"
}
```

### 6. 比较候选人匹配度

**请求信息**:
- **URL**: `/candidates/compare-match`
- **Method**: `POST`

---

## 用户管理接口

### 1. 根据用户id返回关联的职位卡片和岗位详情list

**请求信息**:
- **URL**: `/users/jobs`
- **Method**: `GET`
- **参数**: 
  - `user_id` (number): 用户ID

**请求示例**:
```
GET /users/jobs?user_id=1
```

### 2. 获取用户职位统计信息

**请求信息**:
- **URL**: `/users/job-stats`
- **Method**: `GET`
- **参数**: 
  - `user_id` (number): 用户ID

### 3. 更新用户职位状态

**请求信息**:
- **URL**: `/users/jobs/batch-update-status`
- **Method**: `PUT`
- **参数**: 
  - `user_id` (number): 用户ID
  - `jobIds` (array): 职位ID数组
  - `status` (string): 新状态

**请求示例**:
```json
{
  "user_id": 1,
  "jobIds": [123, 124, 125],
  "status": "active"
}
```

### 4. 删除用户职位

**请求信息**:
- **URL**: `/users/jobs/batch-delete`
- **Method**: `DELETE`
- **参数**: 
  - `user_id` (number): 用户ID
  - `jobIds` (array): 要删除的职位ID数组

### 5. 获取用户最近活动

**请求信息**:
- **URL**: `/users/recent-activities`
- **Method**: `GET`
- **参数**: 
  - `user_id` (number): 用户ID

### 6. 获取用户偏好设置

**请求信息**:
- **URL**: `/users/preferences`
- **Method**: `GET`
- **参数**: 
  - `user_id` (number): 用户ID

### 7. 更新用户偏好设置

**请求信息**:
- **URL**: `/users/preferences`
- **Method**: `PUT`
- **参数**: 
  - `user_id` (number): 用户ID
  - 偏好设置对象

---

## 传统职位管理接口

### 1. 获取职位列表

**请求信息**:
- **URL**: `/jobs/list`
- **Method**: `GET`

### 2. 根据ID获取职位详情

**请求信息**:
- **URL**: `/jobs/detail`
- **Method**: `GET`
- **参数**: 
  - `job_id` (number): 职位ID

**请求示例**:
```
GET /jobs/detail?job_id=123
```

### 3. 创建新职位

**请求信息**:
- **URL**: `/jobs/create`
- **Method**: `POST`

### 4. 更新职位信息

**请求信息**:
- **URL**: `/jobs/update`
- **Method**: `PUT`
- **参数**: 
  - `job_id` (number): 职位ID
  - 职位信息对象

**请求示例**:
```json
{
  "job_id": 123,
  "title": "高级前端工程师",
  "department": "技术部"
}
```

### 5. 删除职位

**请求信息**:
- **URL**: `/jobs/delete`
- **Method**: `DELETE`
- **参数**: 
  - `job_id` (number): 职位ID

### 6. 获取职位候选人统计

**请求信息**:
- **URL**: `/jobs/candidates/stats`
- **Method**: `GET`
- **参数**: 
  - `job_id` (number): 职位ID

### 7. 搜索职位

**请求信息**:
- **URL**: `/jobs/search`
- **Method**: `GET`

### 8. AI解析职位描述

**请求信息**:
- **URL**: `/jobs/ai-parse`
- **Method**: `POST`

### 9. 分析职位需求

**请求信息**:
- **URL**: `/jobs/analyze`
- **Method**: `POST`
- **参数**: 
  - `job_id` (number): 职位ID

---

## 候选人管理接口

### 1. 获取推荐候选人列表

**请求信息**:
- **URL**: `/candidates/recommend`
- **Method**: `GET`

### 2. 根据ID获取候选人详情

**请求信息**:
- **URL**: `/candidates/detail`
- **Method**: `GET`
- **参数**: 
  - `candidate_id` (number): 候选人ID

**请求示例**:
```
GET /candidates/detail?candidate_id=456
```

### 3. 创建候选人

**请求信息**:
- **URL**: `/candidates/create`
- **Method**: `POST`

### 4. 更新候选人信息

**请求信息**:
- **URL**: `/candidates/update`
- **Method**: `PUT`
- **参数**: 
  - `candidate_id` (number): 候选人ID
  - 候选人信息对象

### 5. 删除候选人

**请求信息**:
- **URL**: `/candidates/delete`
- **Method**: `DELETE`
- **参数**: 
  - `candidate_id` (number): 候选人ID

### 6. 搜索候选人

**请求信息**:
- **URL**: `/candidates/search`
- **Method**: `GET`

### 7. 获取候选人雷达图数据

**请求信息**:
- **URL**: `/candidates/radar`
- **Method**: `GET`
- **参数**: 
  - `candidate_id` (number): 候选人ID

### 8. 匹配候选人与职位

**请求信息**:
- **URL**: `/candidates/match`
- **Method**: `POST`

### 9. AI智能匹配候选人

**请求信息**:
- **URL**: `/candidates/ai-match`
- **Method**: `POST`

### 10. 获取候选人AI分析报告

**请求信息**:
- **URL**: `/candidates/ai-analysis`
- **Method**: `GET`
- **参数**: 
  - `candidate_id` (number): 候选人ID
  - `analysisType` (string, 可选): 分析类型

---

## 错误码说明

### HTTP状态码

- `200` - 请求成功
- `400` - 请求参数错误
- `401` - 未授权访问
- `403` - 禁止访问
- `404` - 资源不存在
- `500` - 服务器内部错误

### 业务错误码

```json
{
  "success": false,
  "error": {
    "code": "BUSINESS_ERROR_CODE",
    "message": "错误描述信息"
  },
  "data": null
}
```

**常见错误码**:

- `INVALID_PARAMS` - 参数验证失败
- `USER_NOT_FOUND` - 用户不存在
- `JOB_NOT_FOUND` - 职位不存在
- `CANDIDATE_NOT_FOUND` - 候选人不存在
- `MATCHING_FAILED` - 匹配失败
- `AI_ANALYSIS_FAILED` - AI分析失败
- `INSUFFICIENT_PERMISSIONS` - 权限不足
- `RATE_LIMIT_EXCEEDED` - 请求频率超限

---

## 附录

### 数据字典

#### 职位状态
- `active` - 活跃
- `inactive` - 非活跃
- `draft` - 草稿

#### 候选人状态
- `available` - 可用
- `busy` - 忙碌
- `unavailable` - 不可用

#### 匹配类型
- `智能匹配` - AI智能匹配（默认）
- `技能匹配` - 基于技能匹配
- `经验匹配` - 基于经验匹配
- `学历匹配` - 基于学历匹配

### 更新日志

**v2.0.0** (2024-01-20)
- 重构API路径，移除所有路径参数形式
- GET请求改为使用查询参数
- POST/PUT/DELETE请求改为使用请求体传递参数
- 统一参数命名规范（job_id, user_id, candidate_id等）
- 优化接口文档结构和说明