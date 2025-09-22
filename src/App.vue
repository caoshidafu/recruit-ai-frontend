<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">智能简历推荐系统 - 岗位推荐</h1>
      <div class="header-right">
        <button class="icon-button">
          <span class="icon">🔔</span>
          <span class="badge">3</span>
        </button>
        <button class="icon-button">
          <span class="icon">⚙️</span>
        </button>
        <div class="user-info">
          <img src="https://i.pravatar.cc/32" alt="User" />
          <span>HR Manager</span>
        </div>
      </div>
    </header>

    <div class="app-body">
      <aside class="sidebar" :style="{ width: sidebarWidth + 'px' }">
        <div class="sidebar-section">
          <h2>在招岗位</h2>
          <div class="job-list">
            <JobCard
              v-for="job in jobs"
              :key="job.id"
              :job="job"
              :isActive="selectedJob?.id === job.id"
              @click="setSelectedJob(job)"
            />
          </div>

          <button class="create-job-btn" @click="showCreateJobModal = true">
            <span>➕</span> 发布新岗位
          </button>
        </div>
      </aside>

      <!-- 主分割器 - 在侧边栏和主内容区之间 -->
      <ResizableSplitter 
        @resize="handleMainSplitterResize"
        class="main-splitter"
      />

      <main class="main-content">
        <div class="content-header">
          <div class="job-summary">
            <h2>{{ selectedJob?.title }}</h2>
            <div class="job-tags">
              <span class="tag">{{ selectedJob?.department }}</span>
              <span class="tag">{{ selectedJob?.location }}</span>
              <span class="tag">{{ selectedJob?.experience }}</span>
            </div>
          </div>
          <div class="view-controls">
            <button
              :class="`view-btn ${viewMode === 'split' ? 'active' : ''}`"
              @click="viewMode = 'split'"
            >
              分栏视图
            </button>
            <button
              :class="`view-btn ${viewMode === 'candidates' ? 'active' : ''}`"
              @click="viewMode = 'candidates'"
            >
              候选人视图
            </button>
          </div>
        </div>

        <div :class="`content-body ${viewMode}`">
          <div v-if="viewMode === 'split'" class="left-panel" :style="{ width: leftPanelWidth + 'px' }">
            <JobDetail
              :job="selectedJob"
              :showDetail="showJobDetail"
              @toggle="showJobDetail = !showJobDetail"
            />
          </div>
          
          <!-- 可拖拽分割器 -->
          <ResizableSplitter 
            v-if="viewMode === 'split'" 
            @resize="handleSplitterResize"
          />

          <div class="candidates-panel">
            <div class="panel-header">
              <h3>推荐候选人 ({{ currentCandidates.length }})</h3>
              <select
                class="recommend-select"
                v-model="recommendType"
              >
                <option
                  v-for="option in recommendOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- 候选人网格布局 - 列式显示 -->
            <div 
              class="candidates-grid infinite-scroll"
              ref="candidatesContainer"
              @scroll="handleScroll"
            >
              <CandidateCard
                v-for="candidate in displayedCandidates"
                :key="candidate.id"
                :candidate="candidate"
                class="candidate-column"
              />
              
              <!-- 加载更多指示器 -->
              <div v-if="hasMore && !loadingMore" class="load-more-trigger">
                <div class="load-more-text">下拉查看更多候选人</div>
              </div>
              
              <!-- 加载中指示器 -->
              <div v-if="loadingMore" class="loading-more-indicator">
                <div class="loading-spinner"></div>
                <div class="loading-text">正在加载更多候选人...</div>
              </div>
              
              <!-- 没有更多数据指示器 -->
              <div v-if="!hasMore && displayedCandidates.length > 0" class="no-more-indicator">
                <div class="no-more-text">已显示全部候选人</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 创建职位模态框 -->
    <CreateJobModal 
      :visible="showCreateJobModal"
      @close="showCreateJobModal = false"
      @created="handleJobCreated"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import JobCard from './components/JobCard.vue'
import CandidateCard from './components/CandidateCard.vue'
import JobDetail from './components/JobDetail.vue'
import ResizableSplitter from './components/ResizableSplitter.vue'
import CreateJobModal from './components/CreateJobModal.vue'
import apiManager from './api/mockManager.js'

export default {
  name: 'App',
  components: {
    JobCard,
    CandidateCard,
    JobDetail,
    ResizableSplitter,
    CreateJobModal
  },
  setup() {
    // 响应式数据
    const jobs = ref([])
    const selectedJob = ref(null)
    const candidates = ref({
      smart: [],
      experience: [],
      education: []
    })
    const recommendType = ref('smart')
    const showJobDetail = ref(true)
    const viewMode = ref('split')
    const loading = ref(false)
    const showCreateJobModal = ref(false)
    
    // 分割器相关状态
    const leftPanelWidth = ref(400) // 左侧面板宽度，默认400px
    const minLeftWidth = ref(300) // 最小宽度
    const maxLeftWidth = ref(800) // 最大宽度
    
    // 主分割器相关状态（侧边栏和主内容区之间）
    const sidebarWidth = ref(320) // 侧边栏宽度，默认320px
    const minSidebarWidth = ref(240) // 最小宽度
    const maxSidebarWidth = ref(480) // 最大宽度
    
    // 无限滚动相关状态
    const pageSize = ref(5) // 每次加载5个候选人（因为每个都展开，内容更多）
    const displayedCount = ref(3) // 当前显示的候选人数量（初始显示3个完整展开的候选人）
    const loadingMore = ref(false) // 是否正在加载更多
    const candidatesContainer = ref(null) // 容器引用

    // 计算属性
    const currentCandidates = computed(() => {
      return candidates.value[recommendType.value] || []
    })

    // 无限滚动相关计算属性
    const displayedCandidates = computed(() => {
      return currentCandidates.value.slice(0, displayedCount.value)
    })

    const hasMore = computed(() => {
      return displayedCount.value < currentCandidates.value.length
    })

    const recommendOptions = [
      { value: 'smart', label: '智能推荐' },
      { value: 'experience', label: '经验推荐' },
      { value: 'education', label: '学历推荐' },
    ]

    // 方法
    const setSelectedJob = async (job) => {
      selectedJob.value = job
      await loadCandidatesForJob(job.id) // 调用新的API加载候选人
      // 重置无限滚动
      resetScrolling()
    }

    // 无限滚动处理方法
    const handleScroll = (event) => {
      const container = event.target
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight
      
      // 当滚动到底部附近（还有200px时）触发加载更多，因为展开的卡片更高
      if (scrollTop + clientHeight >= scrollHeight - 200 && hasMore.value && !loadingMore.value) {
        loadMoreCandidates()
      }
    }

    // 加载更多候选人
    const loadMoreCandidates = async () => {
      if (loadingMore.value || !hasMore.value) return
      
      try {
        loadingMore.value = true
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 增加显示数量
        const newCount = Math.min(
          displayedCount.value + pageSize.value,
          currentCandidates.value.length
        )
        displayedCount.value = newCount
        
      } catch (error) {
        console.error('加载更多候选人失败:', error)
      } finally {
        loadingMore.value = false
      }
    }

    // 重置滚动状态
    const resetScrolling = () => {
      displayedCount.value = 3 // 重置为初始显示3个候选人
      if (candidatesContainer.value) {
        candidatesContainer.value.scrollTop = 0
      }
    }
    
    // 处理分割器拖拽调整
    const handleSplitterResize = (deltaX) => {
      const newWidth = leftPanelWidth.value + deltaX
      
      // 限制在最小和最大宽度之间
      if (newWidth >= minLeftWidth.value && newWidth <= maxLeftWidth.value) {
        leftPanelWidth.value = newWidth
      }
    }
    
    // 处理主分割器拖拽调整（侧边栏和主内容区之间）
    const handleMainSplitterResize = (deltaX) => {
      const newWidth = sidebarWidth.value + deltaX
      
      // 限制在最小和最大宽度之间
      if (newWidth >= minSidebarWidth.value && newWidth <= maxSidebarWidth.value) {
        sidebarWidth.value = newWidth
      }
    }

    // 加载职位列表
    const loadJobs = async () => {
      try {
        loading.value = true
        const response = await apiManager.getJobCardsList(1)
        if (response.success) {
          jobs.value = response.data.jobCards
          if (jobs.value.length > 0 && !selectedJob.value) {
            selectedJob.value = jobs.value[0]
          }
        }
      } catch (error) {
        console.error('加载职位列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 根据职位ID加载候选人数据
    const loadCandidatesForJob = async (jobId) => {
      try {
        loading.value = true
        
        // 使用新的统一API接口获取候选人数据
        const response = await apiManager.getCandidatesByJobId(jobId, 1, '智能匹配')

        if (response.success) {
          // 将候选人数据分配到不同的类型中
          const candidatesData = response.data.candidates
          
          // 根据不同维度分配候选人到不同类别，确保每个类别都有合适的数据
          // 智能推荐：按匹配分数排序，包含所有候选人但优先显示高分的
          candidates.value.smart = candidatesData
            .filter(c => c.matchScore >= 70) // 更宽泛的分数范围
            .sort((a, b) => b.matchScore - a.matchScore) // 按分数降序排列
          
          // 经验推荐：按经验年限排序，包含有一定经验的候选人
          candidates.value.experience = candidatesData
            .filter(c => c.experience >= 2) // 包含2年以上经验的候选人
            .sort((a, b) => b.experience - a.experience) // 按经验降序排列
          
          // 学历推荐：按学历等级排序，包含所有学历背景
          const educationOrder = { '博士': 4, '硕士': 3, '本科': 2, '专科': 1 }
          candidates.value.education = candidatesData
            .sort((a, b) => (educationOrder[b.education] || 0) - (educationOrder[a.education] || 0)) // 按学历等级降序排列
          
          // 调试信息：输出筛选结果
          console.log('候选人数据筛选结果:')
          console.log('- 智能推荐:', candidates.value.smart.length, '人')
          console.log('- 经验推荐:', candidates.value.experience.length, '人') 
          console.log('- 学历推荐:', candidates.value.education.length, '人')
          console.log('- 原始数据总数:', candidatesData.length, '人')
        }
      } catch (error) {
        console.error('加载候选人数据失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 加载候选人数据（默认方法，用于初始化）
    const loadCandidates = async () => {
      const jobId = selectedJob.value?.id
      await loadCandidatesForJob(jobId)
    }

    // 处理职位创建完成事件
    const handleJobCreated = async (newJob) => {
      // 重新加载职位列表以获取最新数据（包含新创建的职位）
      await loadJobs()
      
      // 设置为当前选中的职位（新职位在列表顶部）
      selectedJob.value = newJob
      
      // 加载新职位的候选人数据
      await loadCandidatesForJob(newJob.id)
      
      // 重置滚动状态
      resetScrolling()
    }

    // 监听推荐类型变化，重置滚动
    watch(recommendType, () => {
      resetScrolling()
    })

    // 组件挂载时初始化数据
    onMounted(async () => {
      await loadJobs()
      await loadCandidates()
    })

    return {
      // 数据
      jobs,
      selectedJob,
      candidates,
      recommendType,
      showJobDetail,
      viewMode,
      loading,
      showCreateJobModal,
      pageSize,
      displayedCount,
      loadingMore,
      candidatesContainer,
      leftPanelWidth,
      minLeftWidth,
      maxLeftWidth,
      sidebarWidth,
      minSidebarWidth,
      maxSidebarWidth,
      // 计算属性
      currentCandidates,
      displayedCandidates,
      hasMore,
      recommendOptions,
      // 方法
      setSelectedJob,
      loadJobs,
      loadCandidates,
      loadCandidatesForJob,
      handleScroll,
      loadMoreCandidates,
      resetScrolling,
      handleSplitterResize,
      handleMainSplitterResize,
      handleJobCreated
    }
  }
}
</script>

<style>
/* 主分割器样式 */
.main-splitter {
  /* 继承ResizableSplitter的样式 */
  background: transparent;
  border-left: 1px solid #e8ecf3;
  border-right: 1px solid #e8ecf3;
}

.main-splitter:hover {
  background: rgba(102, 126, 234, 0.08);
  border-left-color: #667eea;
  border-right-color: #667eea;
}

/* 确保侧边栏现在可以动态调整宽度 */
.sidebar {
  /* width现在通过内联样式动态设置 */
  flex-shrink: 0; /* 防止收缩 */
  min-width: 240px; /* 设置最小宽度 */
  max-width: 480px; /* 设置最大宽度 */
}

/* 候选人网格布局 - 单列显示，支持无限滚动 */
.candidates-grid {
  display: flex;
  flex-direction: column;
  gap: 32px; /* 增加间距，因为每个卡片现在更高 */
  margin-bottom: 24px;
}

.candidates-grid.infinite-scroll {
  flex: 1; /* 占据剩余空间 */
  overflow-y: auto;
  padding-right: 12px;
  scroll-behavior: smooth;
  min-height: 0; /* 允许flex shrink */
  /* 确保每个候选人都能完整显示 */
  scroll-padding-top: 20px;
}

.candidates-grid.infinite-scroll::-webkit-scrollbar {
  width: 6px;
}

.candidates-grid.infinite-scroll::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 3px;
}

.candidates-grid.infinite-scroll::-webkit-scrollbar-thumb {
  background: #c1c8cd;
  border-radius: 3px;
  transition: background 0.3s ease;
}

.candidates-grid.infinite-scroll::-webkit-scrollbar-thumb:hover {
  background: #a8b1b8;
}

.candidate-column {
  /* 每个候选人卡片占据一列 */
  width: 100%;
  transition: all 0.3s ease;
}

/* 无限滚动指示器样式 */
.load-more-trigger {
  text-align: center;
  padding: 20px;
  color: #8e9297;
  font-size: 14px;
  border: 2px dashed #e8ecf3;
  border-radius: 12px;
  margin: 16px 0;
  background: #fafbfc;
  transition: all 0.3s ease;
}

.load-more-trigger:hover {
  border-color: #667eea;
  color: #667eea;
  background: #f8f9ff;
}

.load-more-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.load-more-text::before,
.load-more-text::after {
  content: "↓";
  font-size: 16px;
  animation: bounce 2s infinite;
}

.load-more-text::after {
  animation-delay: 0.5s;
}

.loading-more-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 16px 0;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 12px;
}

.loading-text {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.no-more-indicator {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
  font-size: 14px;
  margin: 16px 0;
}

.no-more-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.no-more-text::before,
.no-more-text::after {
  content: "—";
  color: #d1d5db;
  font-weight: bold;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 分页容器 - 保留备用 */
.pagination-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e8ecf3;
  margin-top: 20px;
  display: none; /* 隐藏传统分页 */
}

.pagination-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  background: white;
  border: 1px solid #e9ecef;
  color: #495057;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 100px;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.pagination-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.1);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.page-numbers {
  display: flex;
  gap: 4px;
  margin: 0 16px;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #e9ecef;
  background: white;
  color: #495057;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.page-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.page-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.page-btn.active:hover {
  background: #5a6fd8;
  border-color: #5a6fd8;
}

/* 加载更多按钮容器 */
.load-more-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.load-more-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.load-more-btn:disabled:hover {
  transform: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.loading-icon,
.load-icon {
  font-size: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* 底部操作按钮 */
.bottom-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.action-btn {
  background: white;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn.view-detail-btn {
  background: #6c757d;
  color: white;
  border: none;
}

.action-btn.view-detail-btn:hover {
  background: #5a6268;
}

.action-btn.contact-btn {
  background: #28a745;
  color: white;
  border: none;
}

.action-btn.contact-btn:hover {
  background: #218838;
}

.action-btn.ai-analysis-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.action-btn.ai-analysis-btn:hover {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .candidates-grid {
    gap: 12px;
  }
  
  .candidates-grid.infinite-scroll {
    padding-right: 4px; /* 移动端减少padding */
  }
  
  .pagination-container {
    padding: 20px;
    margin-top: 16px;
  }
  
  .pagination-info {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 18px;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 16px;
  }
  
  .page-numbers {
    margin: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .pagination-btn {
    width: 100%;
    max-width: 220px;
    padding: 12px 20px;
  }
  
  .page-btn {
    width: 44px;
    height: 44px;
  }
  
  .bottom-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .load-more-btn {
    width: 90%;
    justify-content: center;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .candidates-grid {
    gap: 14px;
  }
  
  .candidates-grid.infinite-scroll {
    padding-right: 6px; /* 中等屏幕适中的padding */
  }
  
  .pagination-container {
    padding: 22px;
  }
  
  .pagination-btn {
    min-width: 90px;
    padding: 9px 16px;
  }
  
  .page-btn {
    width: 38px;
    height: 38px;
  }
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .candidates-grid {
    gap: 18px;
  }
  
  .pagination-container {
    padding: 28px;
  }
}
</style>