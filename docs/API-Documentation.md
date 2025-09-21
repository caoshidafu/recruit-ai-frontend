# AI招聘系统 - 核心API接口文档

## 概述

本文档描述了AI招聘系统的三个核心API接口。系统专注于AI解析相关的功能，提供完整的智能招聘流程支持。

## 接口规范

- **基础URL**: 根据环境配置自动确定
- **请求格式**: JSON
- **响应格式**: JSON
- **字符编码**: UTF-8
- **参数命名**: 统一使用下划线格式（job_id, user_id等）
- **全局用户ID**: user_id全局携带1（数字类型）
- **发布岗位ID**: 数字类型

### 统一响应格式

```json
{
  "success": boolean,
  "data": object|array,
  "message": string
}
```

## 业务流程说明

### 用户首次进入页面
1. 携带 `user_id=1` 调用**接口一**获取职位卡片和岗位详情列表
2. 使用返回数据第一条的发布岗位id调用**接口三**获取候选人信息

### 发布新岗位流程
1. 用户输入职位描述，点击"开始AI智能解析"
2. 携带 `user_id=1` 和岗位描述调用**接口二**生成职位画像
3. 通过返回的发布岗位id和 `user_id=1` 调用**接口三**获取候选人信息

## 核心API接口

### 接口一：职位卡片列表接口

**接口名称**: 获取职位卡片列表  
**功能描述**: 根据user_id获取职位卡片和岗位详情列表  
**请求方式**: GET  
**URL地址**: `/jobs/list`

**请求参数**:
- `user_id` (number, required): 用户ID，全局携带1

**请求示例**:
```
GET /jobs/list?user_id=1
```

**响应参数**:
```json
{
  "success": true,
  "data": {
    "jobCards": [
      {
        "id": 123,
        "title": "高级前端工程师",
        "department": "技术部",
        "location": "北京",
        "salaryRange": "25-35K",
        "experience": "3-5年",
        "education": "本科",
        "skills": ["Vue.js", "React", "TypeScript"],
        "status": "active",
        "publishDate": "2024-01-15",
        "applicationCount": 25,
        "urgency": "high",
        "responsibilities": [
          "负责前端项目架构设计和开发",
          "参与产品需求分析和技术方案制定",
          "优化前端性能，提升用户体验"
        ],
        "requirements": [
          "3年以上前端开发经验",
          "熟练掌握Vue.js、React等框架",
          "具备良好的团队协作能力"
        ],
        "benefits": ["六险一金", "弹性工作", "技术培训", "年终奖金"]
      },
      {
        "id": 124,
        "title": "Java后端工程师",
        "department": "技术部",
        "location": "上海",
        "salaryRange": "20-30K",
        "experience": "2-4年",
        "education": "本科",
        "skills": ["Java", "Spring Boot", "MySQL", "Redis"],
        "status": "active",
        "publishDate": "2024-01-10",
        "applicationCount": 18,
        "urgency": "medium",
        "responsibilities": [
          "负责后端服务架构设计和开发",
          "参与数据库设计和优化",
          "确保系统稳定性和安全性"
        ],
        "requirements": [
          "2年以上Java开发经验",
          "熟练掌握Spring Boot框架",
          "熟悉MySQL数据库操作"
        ],
        "benefits": ["五险一金", "带薪年假", "团建活动", "技能培训"]
      }
    ],
    "total": 2,
    "userId": 1
  },
  "message": "获取职位卡片列表成功"
}
```

### 接口二：职位画像生成接口

**接口名称**: 根据职位描述生成职位画像和岗位详情  
**功能描述**: 根据user_id和职位描述生成职位画像和岗位详情，返回发布岗位id  
**请求方式**: POST  
**URL地址**: `/jobs/generate-profile`

**请求参数**:
```json
{
  "user_id": 1,
  "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React框架，具备3年以上开发经验..."
}
```

**参数说明**:
- `user_id` (number, required): 用户ID，全局携带1
- `description` (string, required): 职位描述文本

**响应参数**:
```json
{
  "success": true,
  "data": {
    "jobProfile": {
      "id": 1642234567890,
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "salaryRange": "25-35K",
      "experience": "3-5年",
      "education": "本科",
      "skills": ["Vue.js", "React", "TypeScript"],
      "responsibilities": [
        "负责前端项目架构设计和开发",
        "参与产品需求分析和技术方案制定",
        "优化前端性能，提升用户体验"
      ],
      "requirements": [
        "3年以上前端开发经验",
        "熟练掌握Vue.js、React等框架",
        "具备良好的团队协作能力"
      ],
      "benefits": ["六险一金", "弹性工作", "技术培训", "年终奖金"],
      "status": "draft",
      "publishDate": "2024-01-15",
      "applicationCount": 0,
      "urgency": "high",
      "userId": 1,
      "description": "招聘高级前端工程师，要求熟练掌握Vue.js和React框架..."
    },
    "jobId": 1642234567890
  },
  "message": "职位画像生成成功"
}
```

### 接口三：候选人匹配接口

**接口名称**: 根据发布岗位id获取候选人列表  
**功能描述**: 根据发布岗位id获取候选人list，携带type默认是智能匹配（后端根据type判断是否匹配过，有则数据库中返回，否则就匹配）  
**请求方式**: POST  
**URL地址**: `/candidates/match`

**请求参数**:
```json
{
  "job_id": 123,
  "user_id": 1,
  "type": "智能匹配"
}
```

**参数说明**:
- `job_id` (number, required): 发布岗位ID
- `user_id` (number, required): 用户ID，全局携带1
- `type` (string, optional): 匹配类型，默认为"智能匹配"

**响应参数**:
```json
{
  "success": true,
  "data": {
    "candidates": [
      {
        "id": 1,
        "name": "张三",
        "avatar": "https://i.pravatar.cc/150?img=3",
        "title": "高级Java工程师",
        "experience": 5,
        "currentCompany": "某知名电商公司",
        "expectedSalary": "35K",
        "location": "北京",
        "status": "在职-看机会",
        "skills": ["Java", "Spring Boot", "MySQL", "Redis"],
        "matchScore": 95,
        "recommendReasons": [
          "技术栈高度匹配",
          "有电商平台开发经验"
        ]
      },
      {
        "id": 2,
        "name": "李四",
        "avatar": "https://i.pravatar.cc/150?img=4",
        "title": "技术架构师",
        "experience": 7,
        "currentCompany": "某大型互联网公司",
        "expectedSalary": "40K",
        "location": "北京",
        "status": "在职-看机会",
        "skills": ["Java", "Spring Cloud", "DDD", "架构设计"],
        "matchScore": 88,
        "recommendReasons": [
          "丰富的架构设计经验",
          "带领过技术团队"
        ]
      }
    ],
    "total": 2,
    "matchingInfo": {
      "type": "智能匹配",
      "isFromCache": false,
      "processingTime": "1.5s",
      "totalMatched": 2,
      "algorithm": "AI_SMART_MATCH_V2"
    },
    "jobDetail": {
      "id": 123,
      "title": "高级前端工程师",
      "department": "技术部",
      "location": "北京",
      "salaryRange": "25-35K"
    },
    "userId": 1
  },
  "message": "成功获取2个匹配候选人"
}
```

## 错误处理

### 错误响应格式

```json
{
  "success": false,
  "data": null,
  "message": "错误描述信息"
}
```

### 常见错误码

- `400`: 请求参数错误
- `404`: 资源不存在
- `500`: 服务器内部错误

## 开发环境配置

### Mock数据

开发环境默认使用Mock数据，生产环境需要配置环境变量：

```bash
# 开发环境（默认使用Mock）
VUE_APP_USE_MOCK=true

# 生产环境（使用真实API）
VUE_APP_USE_MOCK=false
```

### API调用示例

```javascript
import apiManager from '@/api/mockManager.js'

// 接口一：获取职位卡片列表
const jobCards = await apiManager.getJobCardsList(1)

// 接口二：生成职位画像
const jobProfile = await apiManager.generateJobProfile(1, '招聘前端工程师...')

// 接口三：获取匹配候选人
const candidates = await apiManager.getCandidatesByJobId(123, 1, '智能匹配')
```

## 版本信息

- **当前版本**: v2.0.0
- **最后更新**: 2024-01-15
- **兼容性**: 支持所有现代浏览器

## 注意事项

1. 所有API请求都需要提供有效的用户ID（全局使用1）
2. GET请求使用查询参数，POST请求使用请求体
3. 不再使用路径参数形式（如 `/jobs/${jobId}/ai-regenerate`）
4. 参数命名统一使用下划线格式
5. 发布岗位id和user_id都是数字类型
6. 职位描述生成接口有较长的处理时间（1-3秒），请做好加载状态处理
7. 候选人匹配接口支持缓存机制，重复请求可能返回缓存结果

## 接口调用时序图

```
用户首次进入页面:
用户 -> 接口一(user_id=1) -> 获取职位卡片列表
用户 -> 接口三(第一条数据的job_id, user_id=1) -> 获取候选人信息

发布新岗位:
用户 -> 接口二(user_id=1, description) -> 生成职位画像，返回job_id
用户 -> 接口三(返回的job_id, user_id=1) -> 获取候选人信息
```