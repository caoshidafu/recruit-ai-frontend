# 智能简历推荐系统 - 岗位推荐

基于Vue3的智能简历推荐系统，主要用于HR查看岗位和推荐候选人。

## 项目特性

- 📱 响应式设计，支持多设备访问
- 🎯 智能候选人推荐算法
- 📊 雷达图可视化候选人能力
- 🔄 多种推荐策略（智能推荐、经验推荐、学历推荐）
- 📋 岗位管理和详情展示
- 🚀 多岗位候选人数据支持，根据不同职位返回专门的候选人信息
- ✨ 智能职位发布系统，支持AI解析职位描述和自动匹配候选人
- 🤖 三步智能发布流程：基本信息填写 → AI职位解析 → 智能候选人匹配
- 👥 候选人折叠式卡片设计，采用单列布局，支持无限滚动加载，默认折叠状态  
- 📱 无限滚动分页系统，下拉自动加载更多候选人，提升浏览体验
- 🎯 候选人卡片交互优化，支持点击展开/折叠详情，三个操作按钮采用差异化设计
- 🎨 候选人操作按钮全新设计：白色查看详情按钮、蓝色联系按钮、渐变AI分析按钮（含光效动画）
- 🎯 职位选择交互优化，选中状态可视化指示器，清晰展示当前选择
- 📐 双重可拖拽分割器，支持侧边栏和内容面板宽度动态调整，自由控制布局比例
- 🎨 现代化UI设计，圆角卡片、阴影效果、流畅动画
- ✨ 流畅的动画效果和交互体验

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vue CLI
- **样式**: 原生CSS + 响应式设计
- **数据可视化**: Chart.js
- **图标**: Emoji + 自定义图标

## 项目结构

```
recruit-ai-frontend/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/                # API接口目录
│   │   ├── index.js            # HTTP请求基础方法
│   │   ├── AIJobAPI.js         # AI职位创建API接口（核心业务）
│   │   ├── AIMatchAPI.js       # AI匹配API接口（核心业务）
│   │   ├── RecruitAPI.js       # 招聘系统真实API接口（新增）
│   │   ├── DASHBOARDAPI.js     # 数据大盘API接口（新增）
│   │   ├── MockAPI.js          # Mock API接口（精简版）
│   │   └── mockManager.js      # API管理器（统一调用入口，精简版）
│   ├── config/             # 配置目录
│   │   ├── baseURL.js          # 后端接口基础URL配置
│   │   └── README.md           # 配置说明文档
│   ├── components/          # 组件目录
│   │   ├── CandidateCard.vue              # 候选人卡片组件
│   │   ├── CandidateAIAnalysisModal.vue   # 候选人AI分析模态框组件
│   │   ├── JobCard.vue                    # 岗位卡片组件
│   │   ├── JobDetail.vue                  # 岗位详情组件
│   │   ├── RadarChart.vue                 # 雷达图组件
│   │   ├── ResizableSplitter.vue          # 可拖拽分割器组件
│   │   └── CreateJobModal.vue             # 创建职位模态框组件
│   ├── styles/             # 样式目录
│   │   └── global.css          # 全局样式
│   ├── App.vue             # 主应用组件
│   └── main.js             # 入口文件
├── docs/                  # 文档目录
│   └── API-Documentation.md   # API接口文档（精简版）
├── .gitignore
├── babel.config.js
├── jsconfig.json
├── package.json
├── README.md
└── vue.config.js
```

## API接口设计（精简版）

### API目录结构
- `src/api/index.js`: HTTP请求基础方法（get、post、put、del）
- `src/api/AIJobAPI.js`: AI职位创建API接口（核心业务）
- `src/api/AIMatchAPI.js`: AI匹配API接口（核心业务）
- `src/api/RecruitAPI.js`: 招聘系统真实API接口（新增，基于接口文档）
- `src/api/MockAPI.js`: Mock API接口实现（精简版，只包含AI解析相关数据）
- `src/api/mockManager.js`: API管理器，统一调用入口（精简版）

### API设计规范
- **路径参数规范**: 所有API请求路径不使用路径参数形式（如`/jobs/${jobId}/ai-regenerate`）
- **GET请求**: 使用查询参数（query parameters）传递数据
- **POST/PUT/DELETE请求**: 使用请求体（request body）传递数据
- **参数命名**: 统一使用下划线命名（job_id, user_id, candidate_id等）
- **数据类型**: 发布岗位id和user_id都是数字类型

### 三个核心AI解析接口

#### 1. 职位卡片列表接口 (AIJobAPI.js)
- `getJobCards(jobId, userId)`: 获取职位卡片列表
  - **请求方式**: GET
  - **URL**: `/jobs/cards?job_id={jobId}&user_id={userId}`
  - **功能**: 根据发布岗位id和user_id获取职位卡片列表
  - **参数**: jobId (number), userId (number)

#### 2. 候选人匹配接口 (AIMatchAPI.js)
- `getCandidatesByJobId(jobId, userId, type)`: 根据发布岗位id获取候选人列表
  - **请求方式**: POST
  - **URL**: `/candidates/by-job`
  - **功能**: 根据发布岗位id获取候选人list，携带type默认是智能匹配
  - **参数**: { job_id: number, user_id: number, type?: string }
  - **特性**: 后端根据type判断是否匹配过，有则数据库中返回，否则就匹配

#### 3. 职位画像生成接口 (AIJobAPI.js)
- `generateJobProfile(userId, description)`: 根据职位描述生成职位画像和岗位详情
  - **请求方式**: POST
  - **URL**: `/jobs/generate-profile`
  - **功能**: 根据user_id和职位描述生成职位画像和岗位详情
  - **参数**: { user_id: number, description: string }

### 接口简化说明

系统已进行接口精简，删除了以下多余接口：
- 传统职位管理接口（JobAPI.js）
- 候选人管理接口（CandidateAPI.js）  
- 用户管理接口（UserAPI.js）
- 其他非AI解析相关的扩展接口

**保留的核心功能**：
- AI职位画像生成
- AI候选人智能匹配
- 职位卡片数据管理

### Mock数据配置（精简版）

系统现在只提供AI解析相关的Mock接口：

#### AI职位创建接口
- `mockGetJobCards(jobId, userId)`: 获取职位卡片列表
- `mockGenerateJobProfile(userId, description)`: 生成职位画像和岗位详情

#### AI匹配接口
- `mockGetCandidatesByJobId(jobId, userId, type)`: 根据发布岗位id获取候选人列表

#### 配置说明
- **开发环境**: 默认使用Mock数据
- **生产环境**: 设置 `VUE_APP_USE_MOCK=false` 使用真实API
- **Mock数据**: 精简版只包含AI解析必需的候选人和职位数据

### 使用示例

```javascript
import apiManager from '@/api/mockManager.js'

// 1. 获取职位卡片列表
const jobCards = await apiManager.getJobCards(123, 1)

// 2. 生成职位画像
const jobProfile = await apiManager.generateJobProfile(1, '招聘高级前端工程师，要求熟练掌握Vue.js...')

// 3. 获取匹配候选人
const candidates = await apiManager.getCandidatesByJobId(123, 1, '智能匹配')
```

## 项目总结

本项目专注于AI招聘系统的核心功能，通过三个核心接口实现：

1. **职位画像生成**: 基于AI技术解析职位描述，生成结构化职位信息
2. **智能候选人匹配**: 根据职位要求智能匹配最合适的候选人
3. **职位卡片管理**: 提供职位信息的展示和管理功能

### 技术特点

- **Vue 3 + Composition API**: 现代化前端框架
- **AI驱动**: 核心功能基于AI技术实现
- **Mock数据支持**: 完整的开发环境Mock数据
- **接口规范**: 统一的API设计规范，易于维护和扩展

---

## 最近更新

### 2024-01-22
- ✅ **岗位详情显示优化**
  - 为所有岗位Mock数据添加详细的岗位描述内容
  - 在岗位详情组件中新增"基本信息"部分，包括部门、地点、经验、学历、薪资信息
  - 完善岗位详情页面的信息展示，提供更全面的岗位信息

- ✅ **移除候选人关键匹配点显示**
  - 从候选人信息卡片中移除"关键匹配点"部分
  - 移除相关的CSS样式和数据字段
  - 简化候选人信息展示，保留推荐理由、技能标签等核心信息

### 2024-01-21
- ✅ **候选人信息和职位卡片显示修复**
  - 补充候选人详细信息：教育经历、工作经历
  - 修复职位卡片统计数据：添加候选人数、推荐数、面试中、需求人数字段
  - 优化候选人展示卡片的数据完整性，支持完整的候选人信息展示
  - 确保所有UI组件都有完整的数据支撑

- ✅ **Mock数据显示问题修复**
  - 优化候选人数据筛选逻辑，确保所有推荐类型都有充足的数据
  - 智能推荐：降低匹配分数门槛至70分，按分数降序排列
  - 经验推荐：降低年限要求至2年，按经验降序排列  
  - 学历推荐：包含所有学历背景，按学历等级降序排列
  - 添加调试信息输出，便于问题排查

- ✅ **API接口兼容性修复**
  - 修复App.vue中API调用方法名不匹配问题
  - 在mockManager.js中添加向后兼容方法
  - 扩充Mock候选人数据，增加到6个候选人
  - 修复ESLint警告，优化代码质量

---

### 2024-09-23
- ✅ **真实API接口集成**
  - 更新baseURL配置为真实后端接口地址：https://is-ehr-recruit2.test.gifshow.com/recruit
  - 新增RecruitAPI.js文件，实现基于接口文档的三个真实接口：
    - getPositionList(): 查询职位列表
    - getRecommendCandidateList(positionId): 查询推荐候选人列表
    - createRecommendPosition(positionData): 创建推荐职位
  - 修改AIMatchAPI.js中的getCandidateAIAnalysis函数，使用真实接口二的数据
  - 候选人AI分析功能现在基于真实后端数据，包含匹配度、各项评分、正负向标签等

### 2024-09-24
- ✅ **接口二集成完成**
  - 完成接口二（推荐候选人列表）的真实API调用实现
  - 更新mockManager.js中的getCandidatesByJobId方法，直接调用真实接口二
  - 根据接口文档注释完成候选人字段的正确映射：
    - name -> candidate.name（候选人姓名）
    - workYears -> candidate.experience（工作年限）
    - title -> candidate.title（职位标题）
    - workLocation -> candidate.location（工作地点）
    - matchScore -> candidate.matchScore（匹配分数）
    - positiveLabels -> candidate.recommendReasons（推荐理由）
    - negativeLabels -> 改进建议（用于AI分析）
    - workExperience -> candidate.workHistory（工作经历）
    - eduExperience -> candidate.educationHistory（教育经历）
  - 更新AI分析功能参数，支持positionId和resumeId的新API调用方式
  - 修复CandidateCard和CandidateAIAnalysisModal组件的参数传递
  - 处理接口中缺失的技能标签字段，基于候选人职位和经历智能生成技能标签
  - 所有候选人数据现在完全来源于真实后端接口，实现了完整的接口二集成

- ✅ **真实域名配置更新**
  - 更新baseURL配置，移除环境变量判断，直接使用真实域名
  - 配置为：https://is-ehr-recruit2.test.gifshow.com/recruit
  - 确保所有API请求都使用真实的后端服务地址
  - 更新配置文件注释，提供完整的接口地址示例

- ✅ **候选人数据映射重构**
  - 根据接口文档重新设计候选人数据映射逻辑，移除所有本地分类排序
  - 直接使用接口返回的原始数据，不再进行智能推荐、经验推荐、学历推荐的分类处理
  - 完善候选人数据结构转换，包含完整的工作经历和教育经历信息
  - 新增AI分析数据结构，支持recommendReason、positiveLabels、negativeLabels等字段
  - 更新AI分析模态框组件，直接使用接口返回的AI分析数据
  - 优化各维度评分显示，包括学历背景、技能匹配、项目经验、稳定性、发展潜力等

### 2024-09-25
- ✅ **接口字段结构优化**
  - 修改JobDetail组件支持positionDescription数组格式，按顺序展示岗位描述
  - 更新接口二文档，将title字段改为currentJobName，保持字段命名一致性
  - 更新mockManager.js中的字段映射，支持新的数据结构
  - 优化岗位描述展示样式，支持数组格式的有序列表展示，增强视觉效果

- ✅ **AI分析模态框重构**
  - 移除AI分析接口请求逻辑，直接使用接口二返回的候选人AI分析数据
  - 实现recommendReason的流式打字机效果展示，提升用户体验
  - 重新设计AI分析展示结构：推荐理由→雷达图→优势标签→风险点标签
  - 优化优势标签展示，最多显示5个positiveLabels，采用绿色渐变卡片样式
  - 完善风险点标签展示，使用negativeLabels数据，采用红色渐变卡片样式
  - 保持现有雷达图组件不变，确保能力维度分析的连续性
  - 新增aiAnalysis数据结构映射，包含完整的AI分析字段
  - 修复雷达图数据映射问题，确保AI分析模态框中的雷达图能正常显示

### 2024-09-25 (晚)
- ✅ **数据大盘与岗位详情模块隔离**
  - 创建专门的DashboardAPIManager.js，确保数据大盘模块始终使用Mock数据
  - 创建专门的JobAPIManager.js，确保岗位详情模块始终使用真实API接口
  - 修改DashboardView组件，使用DashboardAPIManager替代原有的mockManager
  - 修改App.vue主应用，使用JobAPIManager处理所有岗位和候选人相关的API调用
  - 修改CreateJobModal组件，使用JobAPIManager进行职位创建，适配真实API返回格式
  - 实现两个模块的完全隔离：数据大盘模块专用Mock数据，岗位详情模块专用真实接口
  - 优化API调用日志，清晰标识数据来源（Mock数据 vs 真实API）
  - 确保数据一致性：数据大盘展示Mock统计数据，岗位详情展示真实业务数据

**项目版本**: v1.2.4  
**最后更新**: 2024-09-25