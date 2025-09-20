# 智能简历推荐系统 - 岗位推荐

基于Vue3的智能简历推荐系统，主要用于HR查看岗位和推荐候选人。

## 项目特性

- 📱 响应式设计，支持多设备访问
- 🎯 智能候选人推荐算法
- 📊 雷达图可视化候选人能力
- 🔄 多种推荐策略（智能推荐、经验推荐、学历推荐）
- 📋 岗位管理和详情展示
- 👥 候选人下拉式卡片设计，采用单列布局，支持无限滚动加载  
- 📱 无限滚动分页系统，下拉自动加载更多候选人，提升浏览体验
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
vue3-project/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/                # API接口目录
│   │   ├── index.js            # HTTP请求基础方法
│   │   ├── JobAPI.js           # 职位相关API接口
│   │   ├── CandidateAPI.js     # 候选人相关API接口
│   │   ├── MockAPI.js          # Mock API接口（包含模拟数据）
│   │   └── mockManager.js      # API管理器（统一调用入口）
│   ├── components/          # 组件目录
│   │   ├── CandidateCard.vue    # 候选人卡片组件
│   │   ├── JobCard.vue          # 岗位卡片组件
│   │   ├── JobDetail.vue        # 岗位详情组件
│   │   ├── RadarChart.vue       # 雷达图组件
│   │   └── ResizableSplitter.vue # 可拖拽分割器组件
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
候选人卡片组件，采用折叠/展开设计，默认显示关键信息，支持点击展开查看详细内容。

**Props:**
- `candidate`: 候选人对象，包含姓名、经验、学历、技能等信息

**功能:**
- **折叠状态**: 默认显示候选人头像、姓名、经验、职位、地点和匹配度
- **展开状态**: 点击头部区域展开，显示完整的教育经历、推荐理由、关键匹配点、技能标签、工作经历
- **交互设计**: 统一的展开/收起按钮，流畅的动画效果
- **操作按钮**: 展开状态下提供查看详情、联系候选人、AI分析等操作选项
- **现代化设计**: 圆角卡片、柔和阴影、悬停效果
- **响应式设计**: 移动端、平板、桌面端优化布局

**布局特点:**
- **紧凑展示**: 折叠状态下卡片紧凑，便于快速浏览多个候选人
- **一键展开**: 点击头部任意位置即可展开查看详细信息
- **匹配度突出**: 右侧绿色匹配度指示器，数值突出显示
- **展开按钮**: 圆形展开按钮，带有旋转动画指示状态
- **动画效果**: 展开内容使用slideDown动画，视觉体验流畅
- **双栏布局**: 展开状态下采用左右分栏设计，信息分布更加合理
- **左侧面板**: 显示教育经历、推荐理由、关键匹配点、技能标签
- **右侧面板**: 专门展示工作经历详情，便于深入了解候选人背景
- **智能滚动**: 左右面板独立滚动，自定义滚动条样式
- **响应式布局**: 移动端自动切换为垂直堆叠布局，确保最佳浏览体验
- **无限滚动**: 支持下拉自动加载更多候选人，无需手动翻页

### JobCard.vue
岗位卡片组件，在侧边栏显示岗位列表。

**Props:**
- `job`: 岗位对象
- `isActive`: 是否为当前选中岗位

**功能:**
- 岗位基本信息展示（标题、部门、地点、经验要求）
- 可视化选中状态（左侧彩色边框、背景渐变、选中图标）
- 候选人统计数据展示（候选人数、推荐数、面试中、需求人数）
- 优雅的动画效果（选中时的缩放、阴影变化）
- 点击选择岗位，自动加载对应候选人

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

### ResizableSplitter.vue
可拖拽分割器组件，用于调整面板的宽度比例。

**Props:**
- 无需传入props，通过事件回调传递拖拽距离

**事件:**
- `@resize`: 拖拽时触发，参数为deltaX（拖拽距离）

**功能:**
- **双重分割器支持**: 
  - 主分割器：调整侧边栏（岗位列表）和主内容区的宽度比例
  - 内容分割器：在分栏视图下调整岗位详情和候选人列表的宽度比例
- **智能拖拽**: 支持鼠标和触摸拖拽，带有视觉反馈
- **宽度限制**: 自动限制最小/最大宽度，防止面板过小或过大
- **平滑动画**: 悬停和拖拽时的平滑过渡效果
- **响应式设计**: 移动端增大触摸区域，优化交互体验

**使用方式:**
```vue
<!-- 主分割器 - 侧边栏和主内容区之间 -->
<ResizableSplitter 
  @resize="handleMainSplitterResize"
  class="main-splitter"
/>

<!-- 内容分割器 - 岗位详情和候选人列表之间 -->
<ResizableSplitter 
  v-if="viewMode === 'split'" 
  @resize="handleSplitterResize"
/>
```

**技术特点:**
- **宽度控制**: 主分割器控制侧边栏宽度（240px-480px），内容分割器控制左侧面板宽度（300px-800px）
- **拖拽限制**: 实时计算并限制拖拽范围，确保界面布局合理
- **用户体验**: 拖拽时显示虚线指示器，悬停时高亮显示可拖拽区域

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
- `getSmartCandidates(params)`: 获取智能推荐候选人，支持jobId参数过滤
- `getExperienceCandidates(params)`: 获取经验匹配候选人，支持jobId参数过滤
- `getEducationCandidates(params)`: 获取学历匹配候选人，支持jobId参数过滤
- `getCandidateDetail(candidateId)`: 获取候选人详情
- `getCandidateRadarData(candidateId)`: 获取候选人雷达图数据
- `searchCandidates(searchParams)`: 搜索候选人

**参数说明:**
- `jobId`: 职位ID，用于筛选该职位的相关候选人
- `limit`: 返回候选人数量限制
- `minExperience/maxExperience`: 经验年限筛选范围
- `degree`: 学历要求筛选

## 核心功能特性

### 无限滚动分页
- **下拉加载**: 当用户滚动到底部附近时自动加载更多候选人
- **加载指示器**: 提供优雅的加载动画和状态提示
- **性能优化**: 分批次加载数据，避免一次性加载大量数据
- **用户体验**: 无需手动点击翻页，流畅的浏览体验

### 职位选择交互
- **可视化选中状态**: 选中的职位卡片具有特殊的视觉效果
  - 左侧彩色边框指示器
  - 背景渐变效果
  - 右上角选中图标
  - 阴影和缩放动画
- **实时数据加载**: 切换职位时自动调用API获取对应候选人
- **数据筛选**: 不同职位显示不同的候选人组合

### 候选人展示优化
- **单列布局**: 改为垂直单列布局，提升信息可读性
- **匹配度突出**: 右侧绿色高亮显示匹配度分数
- **响应式滚动**: 自定义滚动条样式，流畅滚动体验

## 推荐策略

系统支持三种候选人推荐策略：

1. **智能推荐**: 基于综合匹配度的智能算法推荐
2. **经验推荐**: 优先推荐工作经验匹配的候选人
3. **学历推荐**: 优先推荐学历背景匹配的候选人

每种推荐策略都会根据当前选中的职位ID返回相应的候选人数据，实现精准匹配。

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
# 使用serve命令启动（原始）
npm run serve

# 使用dev命令启动（新增别名）
npm run dev
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
