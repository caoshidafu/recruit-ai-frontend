# 智能简历推荐系统 - 岗位推荐

基于Vue3的智能简历推荐系统，主要用于HR查看岗位和推荐候选人。

## 项目特性

- 📱 响应式设计，支持多设备访问
- 🎯 智能候选人推荐算法
- 📊 雷达图可视化候选人能力
- 🔄 多种推荐策略（智能推荐、经验推荐、学历推荐）
- 📋 岗位管理和详情展示
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
│   ├── api/                # API接口目录（精简版）
│   │   ├── index.js            # HTTP请求基础方法
│   │   ├── AIJobAPI.js         # AI职位创建API接口（核心业务）
│   │   ├── AIMatchAPI.js       # AI匹配API接口（核心业务）
│   │   ├── MockAPI.js          # Mock API接口（精简版）
│   │   └── mockManager.js      # API管理器（统一调用入口，精简版）
│   ├── config/             # 配置目录
│   │   ├── index.js            # 全局配置管理（域名、API等）
│   │   └── env.example.js      # 环境变量配置示例
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

### 2024-01-21
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

**项目版本**: v1.0.1  
**最后更新**: 2024-01-21