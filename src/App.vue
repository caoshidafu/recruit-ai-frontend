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
      <aside class="sidebar">
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

          <button class="create-job-btn">
            <span>➕</span> 发布新岗位
          </button>
        </div>
      </aside>

      <main class="main-content">
        <div class="content-header">
          <div class="job-summary">
            <h2>{{ selectedJob?.title }}</h2>
            <div class="job-tags">
              <span class="tag">{{ selectedJob?.department }}</span>
              <span class="tag">{{ selectedJob?.location }}</span>
              <span class="tag">{{ selectedJob?.salary }}</span>
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
          <div v-if="viewMode === 'split'" class="left-panel">
            <JobDetail
              :job="selectedJob"
              :showDetail="showJobDetail"
              @toggle="showJobDetail = !showJobDetail"
            />
          </div>

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
            <div class="candidates-grid">
              <CandidateCard
                v-for="candidate in currentPageCandidates"
                :key="candidate.id"
                :candidate="candidate"
                class="candidate-column"
              />
            </div>
            
            <!-- 分页控制 -->
            <div v-if="totalPages > 1" class="pagination-container">
              <div class="pagination-info">
                <span>推荐候选人 ({{ currentCandidates.length }})</span>
                <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
              </div>
              
              <div class="pagination-controls">
                <button 
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="pagination-btn prev-btn"
                >
                  <span class="btn-icon">⬅️</span>
                  上一页
                </button>
                
                <div class="page-numbers">
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="['page-btn', { active: page === currentPage }]"
                  >
                    {{ page }}
                  </button>
                </div>
                
                <button 
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="pagination-btn next-btn"
                >
                  下一页
                  <span class="btn-icon">➡️</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import JobCard from './components/JobCard.vue'
import CandidateCard from './components/CandidateCard.vue'
import JobDetail from './components/JobDetail.vue'
import apiManager from './api/mockManager.js'

export default {
  name: 'App',
  components: {
    JobCard,
    CandidateCard,
    JobDetail
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
    
    // 分页相关状态
    const pageSize = ref(2) // 每页显示2个候选人
    const currentPage = ref(1)

    // 计算属性
    const currentCandidates = computed(() => {
      return candidates.value[recommendType.value] || []
    })

    // 分页相关计算属性
    const totalPages = computed(() => {
      return Math.ceil(currentCandidates.value.length / pageSize.value)
    })

    const currentPageCandidates = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize.value
      const endIndex = startIndex + pageSize.value
      return currentCandidates.value.slice(startIndex, endIndex)
    })

    const visiblePages = computed(() => {
      const pages = []
      const maxVisible = 5
      const total = totalPages.value
      const current = currentPage.value
      
      if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        let start = Math.max(1, current - 2)
        let end = Math.min(total, current + 2)
        
        if (current <= 3) {
          end = maxVisible
        } else if (current >= total - 2) {
          start = total - maxVisible + 1
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
      }
      
      return pages
    })

    const recommendOptions = [
      { value: 'smart', label: '智能推荐' },
      { value: 'experience', label: '经验推荐' },
      { value: 'education', label: '学历推荐' },
    ]

    // 方法
    const setSelectedJob = async (job) => {
      selectedJob.value = job
      await loadCandidates()
      // 重置分页
      resetPagination()
    }

    // 分页方法
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
        currentPage.value = page
      }
    }

    // 重置分页
    const resetPagination = () => {
      currentPage.value = 1
    }

    // 加载职位列表
    const loadJobs = async () => {
      try {
        loading.value = true
        const response = await apiManager.getJobList()
        if (response.success) {
          jobs.value = response.data
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

    // 加载候选人数据
    const loadCandidates = async () => {
      try {
        loading.value = true
        
        // 并行加载三种类型的候选人数据
        const [smartResponse, experienceResponse, educationResponse] = await Promise.all([
          apiManager.getSmartCandidates(),
          apiManager.getExperienceCandidates(),
          apiManager.getEducationCandidates()
        ])

        if (smartResponse.success) {
          candidates.value.smart = smartResponse.data
        }
        if (experienceResponse.success) {
          candidates.value.experience = experienceResponse.data
        }
        if (educationResponse.success) {
          candidates.value.education = educationResponse.data
        }
      } catch (error) {
        console.error('加载候选人数据失败:', error)
      } finally {
        loading.value = false
      }
    }

    // 监听推荐类型变化，重置分页
    watch(recommendType, () => {
      resetPagination()
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
      pageSize,
      currentPage,
      // 计算属性
      currentCandidates,
      currentPageCandidates,
      totalPages,
      visiblePages,
      recommendOptions,
      // 方法
      setSelectedJob,
      loadJobs,
      loadCandidates,
      goToPage,
      resetPagination
    }
  }
}
</script>

<style>
/* 候选人网格布局 - 列式显示 */
.candidates-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  gap: 20px;
  margin-bottom: 24px;
  align-items: start; /* 确保卡片从顶部对齐 */
}

.candidate-column {
  /* 每个候选人卡片占据一列 */
  width: 100%;
  transition: all 0.3s ease;
}

/* 分页容器 */
.pagination-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e8ecf3;
  margin-top: 20px;
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
    grid-template-columns: 1fr; /* 移动端单列布局 */
    gap: 16px;
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
    grid-template-columns: 1fr 1fr; /* 平板保持两列 */
    gap: 18px;
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
    gap: 24px;
  }
  
  .pagination-container {
    padding: 28px;
  }
}
</style>