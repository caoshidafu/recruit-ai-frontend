<template>
  <div v-if="visible" class="ai-analysis-modal-overlay" @click="handleOverlayClick">
    <div class="ai-analysis-modal" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header">
        <div class="header-left">
          <div class="candidate-avatar">
            <img :src="candidate.avatar" :alt="candidate.name" />
          </div>
          <div class="candidate-info">
            <h3 class="candidate-name">{{ candidate.name }}</h3>
            <p class="candidate-title">{{ candidate.title }}</p>
          </div>
        </div>
        <button class="close-button" @click="handleClose">
          <span>✕</span>
        </button>
      </div>

      <!-- 模态框内容 -->
      <div class="modal-body">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p class="loading-text">AI正在分析候选人数据...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <div class="error-icon">⚠️</div>
          <p class="error-text">{{ error }}</p>
          <button class="retry-button" @click="loadAnalysisData">重试</button>
        </div>

        <div v-else class="analysis-content">
          <!-- AI分析总结 -->
          <div class="analysis-summary">
            <h4 class="section-title">
              <span class="title-icon">🤖</span>
              AI智能分析
            </h4>
            <div class="summary-content">
              <div class="overall-score">
                <div class="score-circle">
                  <span class="score-value">{{ analysisData.overallScore }}</span>
                  <span class="score-label">综合评分</span>
                </div>
                <div class="score-description">
                  <p class="score-level">{{ getScoreLevel(analysisData.overallScore) }}</p>
                  <p class="score-subtitle">{{ analysisData.recommendation }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 能力雷达图 -->
          <div class="radar-section">
            <h4 class="section-title">
              <span class="title-icon">📊</span>
              能力维度分析
            </h4>
            <div class="radar-container">
              <RadarChart :data="candidate.radarData" />
            </div>
          </div>

          <!-- 详细分析 -->
          <div class="detailed-analysis">
            <h4 class="section-title">
              <span class="title-icon">🔍</span>
              详细分析报告
            </h4>
            
            <!-- 优势亮点 -->
            <div class="analysis-section">
              <h5 class="subsection-title">
                <span class="highlight-dot positive"></span>
                核心优势
              </h5>
              <ul class="analysis-list positive">
                <li v-for="(strength, index) in analysisData.strengths" :key="index">
                  {{ strength }}
                </li>
              </ul>
            </div>

            <!-- 改进建议 -->
            <div class="analysis-section">
              <h5 class="subsection-title">
                <span class="highlight-dot attention"></span>
                改进建议
              </h5>
              <ul class="analysis-list attention">
                <li v-for="(improvement, index) in analysisData.improvements" :key="index">
                  {{ improvement }}
                </li>
              </ul>
            </div>

            <!-- 岗位匹配度 -->
            <div class="analysis-section">
              <h5 class="subsection-title">
                <span class="highlight-dot neutral"></span>
                岗位匹配分析
              </h5>
              <div class="match-analysis">
                <div class="match-item" v-for="(match, key) in analysisData.jobMatching" :key="key">
                  <span class="match-label">{{ getMatchLabel(key) }}</span>
                  <div class="match-bar">
                    <div class="match-fill" :style="{ width: match + '%' }"></div>
                    <span class="match-value">{{ match }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI推荐行动 -->
          <div class="action-recommendations">
            <h4 class="section-title">
              <span class="title-icon">💡</span>
              推荐行动
            </h4>
            <div class="action-cards">
              <div 
                v-for="(action, index) in analysisData.recommendedActions" 
                :key="index"
                :class="`action-card ${action.priority}`"
              >
                <div class="action-icon">{{ action.icon }}</div>
                <div class="action-content">
                  <h6 class="action-title">{{ action.title }}</h6>
                  <p class="action-description">{{ action.description }}</p>
                </div>
                <div class="action-priority">{{ getPriorityText(action.priority) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button class="secondary-button" @click="handleClose">
          关闭
        </button>
        <button class="primary-button" @click="handleContactCandidate">
          <span class="button-icon">💬</span>
          联系候选人
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import RadarChart from './RadarChart.vue'
import apiManager from '../api/mockManager.js'

export default {
  name: 'CandidateAIAnalysisModal',
  components: {
    RadarChart
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    candidate: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'contact'],
  setup(props, { emit }) {
    const loading = ref(false)
    const error = ref('')
    const analysisData = ref({
      overallScore: 85,
      recommendation: '该候选人整体素质优秀，建议优先考虑',
      strengths: [],
      improvements: [],
      jobMatching: {},
      recommendedActions: []
    })

    // 计算属性
    const getScoreLevel = computed(() => (score) => {
      if (score >= 90) return '优秀'
      if (score >= 80) return '良好'
      if (score >= 70) return '一般'
      return '待提升'
    })

    // 获取匹配度标签
    const getMatchLabel = (key) => {
      const labels = {
        skillMatch: '技能匹配',
        experienceMatch: '经验匹配',
        educationMatch: '学历匹配',
        cultureMatch: '文化匹配'
      }
      return labels[key] || key
    }

    // 获取优先级文本
    const getPriorityText = (priority) => {
      const texts = {
        high: '高优先级',
        medium: '中优先级',
        low: '低优先级'
      }
      return texts[priority] || priority
    }

    // 加载AI分析数据
    const loadAnalysisData = async () => {
      if (!props.candidate?.id) return

      try {
        loading.value = true
        error.value = ''

        // 调用AI分析API
        const response = await apiManager.getCandidateAIAnalysis(props.candidate.id)
        
        if (response.success) {
          analysisData.value = response.data
        } else {
          error.value = response.message || 'AI分析失败，请重试'
        }
      } catch (err) {
        console.error('加载AI分析数据失败:', err)
        error.value = '加载AI分析数据失败，请重试'
      } finally {
        loading.value = false
      }
    }

    // 事件处理
    const handleClose = () => {
      emit('close')
    }

    const handleOverlayClick = () => {
      handleClose()
    }

    const handleContactCandidate = () => {
      emit('contact', props.candidate)
      handleClose()
    }

    // 监听visible变化，自动加载数据
    watch(() => props.visible, (newVisible) => {
      if (newVisible) {
        loadAnalysisData()
      }
    })

    return {
      loading,
      error,
      analysisData,
      getScoreLevel,
      getMatchLabel,
      getPriorityText,
      loadAnalysisData,
      handleClose,
      handleOverlayClick,
      handleContactCandidate
    }
  }
}
</script>

<style scoped>
/* CSS变量 */
:root {
  --primary: #2563eb;
  --primary-light: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}

/* 模态框覆盖层 */
.ai-analysis-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 主模态框 */
.ai-analysis-modal {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 模态框头部 */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid var(--gray-200);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.candidate-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.candidate-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.candidate-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.candidate-title {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* 模态框主体 */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: var(--gray-600);
  font-size: 16px;
  margin: 0;
}

/* 错误状态 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-text {
  color: var(--gray-600);
  font-size: 16px;
  margin: 0 0 20px 0;
}

.retry-button {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
}

/* 分析内容 */
.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* 节标题 */
.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--gray-100);
}

.title-icon {
  font-size: 20px;
}

/* AI分析总结 */
.analysis-summary {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 24px;
}

.overall-score {
  display: flex;
  align-items: center;
  gap: 24px;
}

.score-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.score-value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.score-label {
  font-size: 12px;
  opacity: 0.9;
  margin-top: 4px;
}

.score-description {
  flex: 1;
}

.score-level {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 8px 0;
}

.score-subtitle {
  font-size: 14px;
  color: var(--gray-600);
  margin: 0;
  line-height: 1.5;
}

/* 雷达图区域 */
.radar-section {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 24px;
}

.radar-container {
  display: flex;
  justify-content: center;
}

/* 详细分析 */
.detailed-analysis {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.analysis-section {
  border-left: 4px solid transparent;
  padding-left: 20px;
  margin-left: 12px;
}

.subsection-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-800);
  margin: 0 0 16px 0;
}

.highlight-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.highlight-dot.positive {
  background: var(--success);
}

.highlight-dot.attention {
  background: var(--warning);
}

.highlight-dot.neutral {
  background: var(--primary);
}

.analysis-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.analysis-list li {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  padding-left: 40px;
}

.analysis-list li:before {
  content: "";
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.analysis-list.positive li {
  background: rgba(16, 185, 129, 0.1);
  color: var(--gray-800);
  border-left: 3px solid var(--success);
}

.analysis-list.positive li:before {
  background: var(--success);
}

.analysis-list.attention li {
  background: rgba(245, 158, 11, 0.1);
  color: var(--gray-800);
  border-left: 3px solid var(--warning);
}

.analysis-list.attention li:before {
  background: var(--warning);
}

/* 岗位匹配分析 */
.match-analysis {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.match-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.match-label {
  min-width: 100px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700);
}

.match-bar {
  flex: 1;
  height: 20px;
  background: var(--gray-100);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.match-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #3b82f6 100%);
  border-radius: 10px;
  transition: width 0.8s ease-out;
  position: relative;
}

.match-value {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
}

/* 推荐行动 */
.action-recommendations {
  background: var(--gray-50);
  border-radius: 12px;
  padding: 24px;
}

.action-cards {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-card.high {
  border-left-color: var(--danger);
}

.action-card.medium {
  border-left-color: var(--warning);
}

.action-card.low {
  border-left-color: var(--success);
}

.action-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 8px 0;
}

.action-description {
  font-size: 14px;
  color: var(--gray-600);
  margin: 0;
  line-height: 1.5;
}

.action-priority {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  flex-shrink: 0;
}

.action-card.high .action-priority {
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger);
}

.action-card.medium .action-priority {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning);
}

.action-card.low .action-priority {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

/* 模态框底部 */
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-top: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.secondary-button {
  background: white;
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-button:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.primary-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.button-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-analysis-modal-overlay {
    padding: 10px;
  }
  
  .ai-analysis-modal {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 20px;
    flex-direction: column;
    gap: 12px;
  }
  
  .secondary-button,
  .primary-button {
    width: 100%;
  }
  
  .overall-score {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
  
  .match-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  .match-label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 16px;
  }
  
  .header-left {
    gap: 12px;
  }
  
  .candidate-avatar {
    width: 40px;
    height: 40px;
  }
  
  .candidate-name {
    font-size: 18px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .analysis-content {
    gap: 24px;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-value {
    font-size: 28px;
  }
}
</style>
