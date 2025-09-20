# 智能简历推荐系统 - 岗位推荐

基于Vue3的智能简历推荐系统，主要用于HR查看岗位和推荐候选人。

## 项目特性

- 📱 响应式设计，支持多设备访问
- 🎯 智能候选人推荐算法
- 📊 雷达图可视化候选人能力
- 🔄 多种推荐策略（智能推荐、经验推荐、学历推荐）
- 📋 岗位管理和详情展示
- 👥 候选人下拉式卡片设计，提升用户体验
- ✨ 流畅的动画效果和交互体验

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vue CLI
- **样式**: 原生CSS + 响应式设计
- **数据可视化**: Chart.js
- **图标**: Emoji + 自定义图标

## 项目结构

```
vue3-project/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/                # API接口目录
│   │   ├── index.js            # HTTP请求基础方法
│   │   ├── JOBAPI.js           # 职位相关API接口
│   │   ├── CANDIDATEAPI.js     # 候选人相关API接口
│   │   ├── MOCKAPI.js          # Mock API接口
│   │   └── mockManager.js      # API管理器（统一调用入口）
│   ├── components/          # 组件目录
│   │   ├── CandidateCard.vue    # 候选人卡片组件
│   │   ├── JobCard.vue          # 岗位卡片组件
│   │   ├── JobDetail.vue        # 岗位详情组件
│   │   └── RadarChart.vue       # 雷达图组件
│   ├── data/               # 数据目录
│   │   └── mockData.js         # 模拟数据
│   ├── styles/             # 样式目录
│   │   └── global.css          # 全局样式
│   ├── App.vue             # 主应用组件
│   └── main.js             # 入口文件
├── .gitignore
├── babel.config.js
├── jsconfig.json
├── package.json
├── README.md
└── vue.config.js
```

## 组件说明

### CandidateCard.vue
候选人卡片组件，采用下拉展开式设计，提供简洁的折叠视图和详细的展开内容。

**Props:**
- `candidate`: 候选人对象，包含姓名、经验、学历、技能等信息

**功能:**
- **折叠状态**: 显示候选人头像、姓名、匹配度、基本信息和快速操作按钮
- **展开状态**: 显示完整的技能标签、关键匹配点、推荐理由、教育经历、工作经历
- **交互体验**: 点击卡片头部展开/收起，流畅的动画效果
- **快速操作**: 支持一键联系、详细信息查看、AI分析等功能
- **响应式设计**: 移动端优化布局

### JobCard.vue
岗位卡片组件，在侧边栏显示岗位列表。

**Props:**
- `job`: 岗位对象
- `isActive`: 是否为当前选中岗位

**功能:**
- 岗位基本信息展示
- 选中状态高亮
- 点击选择岗位

### JobDetail.vue
岗位详情组件，显示完整的岗位信息。

**Props:**
- `job`: 岗位对象
- `showDetail`: 是否显示详情

**功能:**
- 岗位详细描述
- 任职要求
- 薪资福利
- 可折叠展示

### RadarChart.vue
雷达图组件，用于可视化候选人能力维度。

**Props:**
- `data`: 雷达图数据
- `width`: 图表宽度（默认300）
- `height`: 图表高度（默认300）

**功能:**
- 6个维度能力展示
- 响应式图表
- 平滑动画效果

## 数据结构

### 岗位数据 (Job)
```javascript
{
  id: String,           // 岗位ID
  title: String,        // 岗位标题
  department: String,   // 部门
  location: String,     // 工作地点
  salary: String,       // 薪资范围
  experience: String,   // 经验要求
  education: String,    // 学历要求
  description: String,  // 岗位描述
  requirements: Array,  // 任职要求
  benefits: Array       // 薪资福利
}
```

### 候选人数据 (Candidate)
```javascript
{
  id: String,           // 候选人ID
  name: String,         // 姓名
  avatar: String,       // 头像URL
  title: String,        // 职位标题
  experience: String,   // 工作经验
  education: String,    // 学历信息
  location: String,     // 所在地
  matchScore: Number,   // 匹配度 (0-100)
  skills: Array,        // 技能标签
  radarData: Object     // 雷达图数据
}
```

## API接口设计

### API目录结构
- `src/api/index.js`: HTTP请求基础方法（get、post、put、del）
- `src/api/JOBAPI.js`: 职位相关API接口
- `src/api/CANDIDATEAPI.js`: 候选人相关API接口  
- `src/api/MOCKAPI.js`: Mock API接口实现
- `src/api/mockManager.js`: API管理器，统一调用入口

### 使用方式

```javascript
import apiManager from './api/mockManager.js'

// 获取职位列表
const response = await apiManager.getJobList()

// 获取智能推荐候选人
const candidates = await apiManager.getSmartCandidates()
```

### Mock模式配置

系统支持Mock模式和真实API模式切换：

- **开发环境**: 默认使用Mock数据
- **生产环境**: 需要配置 `VUE_APP_USE_MOCK=false` 使用真实API
- **Mock数据**: 基于 `src/data/mockData.js` 提供模拟数据

### 主要API接口

#### 职位相关接口
- `getJobList()`: 获取职位列表
- `getJobDetail(jobId)`: 获取职位详情
- `createJob(jobData)`: 创建新职位
- `updateJob(jobId, jobData)`: 更新职位信息
- `getJobCandidateStats(jobId)`: 获取职位候选人统计

#### 候选人相关接口
- `getSmartCandidates()`: 获取智能推荐候选人
- `getExperienceCandidates()`: 获取经验匹配候选人
- `getEducationCandidates()`: 获取学历匹配候选人
- `getCandidateDetail(candidateId)`: 获取候选人详情
- `getCandidateRadarData(candidateId)`: 获取候选人雷达图数据
- `searchCandidates(searchParams)`: 搜索候选人

## 推荐策略

系统支持三种候选人推荐策略：

1. **智能推荐**: 基于综合匹配度的智能算法推荐
2. **经验推荐**: 优先推荐工作经验匹配的候选人
3. **学历推荐**: 优先推荐学历背景匹配的候选人

## 安装和运行

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run serve
```

### 生产构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 开发规范

- 使用Vue 3 Composition API
- 组件采用单文件组件(SFC)格式
- 遵循Vue官方风格指南
- 使用语义化的CSS类名
- 支持响应式设计

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
