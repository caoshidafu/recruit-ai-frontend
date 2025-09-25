<template>
  <div class="dashboard-container">
    <!-- 概览数据卡片 -->
    <div class="overview-section">
      <h2 class="section-title">📊 招聘概览</h2>
      <div class="metrics-grid">
        <MetricCard
          v-for="metric in overviewMetrics"
          :key="metric.id"
          :title="metric.title"
          :value="metric.value"
          :subtitle="metric.subtitle"
          :trend="metric.trend"
          :color="metric.color"
          :icon="metric.icon"
          @click="handleMetricClick(metric)"
        />
      </div>
    </div>

    <!-- AI智能提醒 -->
    <div class="ai-alerts-section">
      <h2 class="section-title">🤖 AI智能提醒</h2>
      <div class="alerts-container">
        <div 
          v-for="alert in aiAlerts"
          :key="alert.id"
          :class="`alert-card alert-${alert.priority}`"
          @click="handleAlertClick(alert)"
        >
          <div class="alert-icon">{{ alert.icon }}</div>
          <div class="alert-content">
            <h4 class="alert-title">{{ alert.title }}</h4>
            <p class="alert-message">{{ alert.message }}</p>
            <div class="alert-action">{{ alert.action }}</div>
          </div>
          <div class="alert-badge">{{ alert.count }}</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <div class="charts-row">
        <!-- 岗位健康度分析 -->
        <div class="chart-container">
          <h3 class="chart-title">🎯 岗位健康度分析</h3>
          <BarChart
            :data="jobHealthData"
            :height="280"
            @bar-click="handleJobClick"
          />
        </div>

        <!-- 招聘进度分布 -->
        <div class="chart-container">
          <h3 class="chart-title">📈 招聘进度分布</h3>
          <PieChart
            :data="recruitProgressData"
            :height="280"
            @slice-click="handleProgressClick"
          />
        </div>
      </div>

      <div class="charts-row">
        <!-- 候选人流量趋势 -->
        <div class="chart-container full-width">
          <h3 class="chart-title">📊 候选人流量趋势（最近7天）</h3>
          <LineChart
            :data="candidateFlowData"
            :height="300"
          />
        </div>
      </div>
    </div>

    <!-- 优先处理队列 -->
    <div class="priority-queue-section">
      <h2 class="section-title">⚡ 优先处理队列</h2>
      <div class="queue-container">
        <div 
          v-for="item in priorityQueue"
          :key="item.id"
          class="queue-item"
          @click="handleQueueItemClick(item)"
        >
          <div class="queue-rank">{{ item.rank }}</div>
          <div class="queue-content">
            <div class="queue-header">
              <h4 class="queue-title">{{ item.jobTitle }}</h4>
              <span :class="`queue-urgency urgency-${item.urgency}`">
                {{ item.urgencyText }}
              </span>
            </div>
            <div class="queue-details">
              <span class="queue-candidates">{{ item.candidateCount }}位候选人</span>
              <span class="queue-match">匹配度 {{ item.avgMatchScore }}%</span>
              <span class="queue-time">{{ item.waitingTime }}</span>
            </div>
            <div class="queue-progress">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ width: `${item.progress}%` }"
                ></div>
              </div>
              <span class="progress-text">{{ item.progress }}% 完成</span>
            </div>
          </div>
          <div class="queue-action">
            <button class="action-btn primary">立即处理</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import MetricCard from './MetricCard.vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import LineChart from './LineChart.vue'
import dashboardAPIManager from '../api/DashboardAPIManager.js'

export default {
  name: 'DashboardView',
  components: {
    MetricCard,
    BarChart,
    PieChart,
    LineChart
  },
  emits: ['navigate-to-job', 'navigate-to-candidates'],
  setup(props, { emit }) {
    // 响应式数据
    const dashboardData = ref({})
    const loading = ref(false)

    // 概览指标数据
    const overviewMetrics = computed(() => [
      {
        id: 'total-jobs',
        title: '在招岗位',
        value: dashboardData.value.totalJobs || 0,
        subtitle: '个活跃岗位',
        trend: { type: 'up', value: '+3' },
        color: 'blue',
        icon: '💼'
      },
      {
        id: 'total-candidates',
        title: '候选人总数',
        value: dashboardData.value.totalCandidates || 0,
        subtitle: '人才储备',
        trend: { type: 'up', value: '+12' },
        color: 'green',
        icon: '👥'
      },
      {
        id: 'interviews-today',
        title: '今日面试',
        value: dashboardData.value.interviewsToday || 0,
        subtitle: '场安排',
        trend: { type: 'neutral', value: '0' },
        color: 'orange',
        icon: '🗣️'
      },
      {
        id: 'offers-pending',
        title: '待发Offer',
        value: dashboardData.value.offersPending || 0,
        subtitle: '个决策中',
        trend: { type: 'down', value: '-1' },
        color: 'purple',
        icon: '📋'
      }
    ])

    // AI智能提醒数据
    const aiAlerts = computed(() => dashboardData.value.aiAlerts || [])

    // 岗位健康度数据
    const jobHealthData = computed(() => dashboardData.value.jobHealthData || {})

    // 招聘进度分布数据
    const recruitProgressData = computed(() => dashboardData.value.recruitProgressData || {})

    // 候选人流量趋势数据
    const candidateFlowData = computed(() => dashboardData.value.candidateFlowData || {})

    // 优先处理队列数据
    const priorityQueue = computed(() => dashboardData.value.priorityQueue || [])

    // 方法
    const loadDashboardData = async () => {
      try {
        loading.value = true
        console.log('正在加载数据大盘数据...')
        
        const response = await dashboardAPIManager.getDashboardData()
        if (response.success) {
          dashboardData.value = response.data
          console.log('数据大盘数据加载成功:', dashboardData.value)
        } else {
          console.error('数据大盘数据加载失败:', response.message)
        }
      } catch (error) {
        console.error('加载数据大盘数据异常:', error)
      } finally {
        loading.value = false
      }
    }

    // 处理指标卡片点击
    const handleMetricClick = (metric) => {
      console.log('点击指标:', metric.title)
      
      switch (metric.id) {
        case 'total-jobs':
          emit('navigate-to-job', null) // 跳转到职位列表
          break
        case 'total-candidates':
          emit('navigate-to-candidates', null) // 跳转到候选人列表
          break
        case 'interviews-today':
          // 可以扩展为跳转到面试管理页面
          break
        case 'offers-pending':
          // 可以扩展为跳转到offer管理页面
          break
      }
    }

    // 处理AI提醒点击
    const handleAlertClick = (alert) => {
      console.log('点击AI提醒:', alert.title)
      
      if (alert.jobId) {
        emit('navigate-to-job', alert.jobId)
      }
    }

    // 处理岗位健康度图表点击
    const handleJobClick = (jobData) => {
      console.log('点击岗位:', jobData)
      
      if (jobData.jobId) {
        emit('navigate-to-job', jobData.jobId)
      }
    }

    // 处理招聘进度图表点击
    const handleProgressClick = (progressData) => {
      console.log('点击进度:', progressData)
    }

    // 处理优先队列项目点击
    const handleQueueItemClick = (item) => {
      console.log('点击优先队列项目:', item.jobTitle)
      
      if (item.jobId) {
        emit('navigate-to-job', item.jobId)
      }
    }

    // 组件挂载时加载数据
    onMounted(() => {
      loadDashboardData()
    })

    return {
      // 数据
      dashboardData,
      loading,
      overviewMetrics,
      aiAlerts,
      jobHealthData,
      recruitProgressData,
      candidateFlowData,
      priorityQueue,
      
      // 方法
      loadDashboardData,
      handleMetricClick,
      handleAlertClick,
      handleJobClick,
      handleProgressClick,
      handleQueueItemClick
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
  overflow-y: auto;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 概览指标区域 */
.overview-section {
  margin-bottom: 32px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* AI提醒区域 */
.ai-alerts-section {
  margin-bottom: 32px;
}

.alerts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.alert-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid transparent;
}

.alert-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.alert-card.alert-high {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.alert-card.alert-medium {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
}

.alert-card.alert-low {
  border-left-color: #10b981;
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.alert-icon {
  font-size: 32px;
  min-width: 48px;
  text-align: center;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.alert-message {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.alert-action {
  font-size: 12px;
  color: #3b82f6;
  font-weight: 500;
}

.alert-badge {
  background: #ef4444;
  color: white;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.alert-card.alert-medium .alert-badge {
  background: #f59e0b;
}

.alert-card.alert-low .alert-badge {
  background: #10b981;
}

/* 图表区域 */
.charts-section {
  margin-bottom: 32px;
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.chart-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.chart-container.full-width {
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 优先处理队列 */
.priority-queue-section {
  margin-bottom: 32px;
}

.queue-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.queue-item {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid transparent;
}

.queue-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-left-color: #3b82f6;
}

.queue-rank {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.queue-content {
  flex: 1;
}

.queue-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.queue-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.queue-urgency {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.urgency-high {
  background: #fef2f2;
  color: #dc2626;
}

.urgency-medium {
  background: #fffbeb;
  color: #d97706;
}

.urgency-low {
  background: #f0fdf4;
  color: #059669;
}

.queue-details {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #64748b;
}

.queue-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  min-width: 60px;
}

.queue-action {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 16px;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .alerts-container {
    grid-template-columns: 1fr;
  }
  
  .charts-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .queue-item {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .queue-header {
    justify-content: center;
  }
  
  .queue-details {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>


