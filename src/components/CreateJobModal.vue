<template>
  <div class="modal-overlay" v-if="visible" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>发布新职位</h2>
        <button class="close-btn" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- 简化的步骤指示器 -->
        <div class="steps-indicator">
          <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <span>职位信息</span>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <span>创建职位</span>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 2 }"></div>
          <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <div class="step-number">3</div>
            <span>智能匹配</span>
          </div>
        </div>

        <!-- 步骤1: 职位信息 -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="simple-form-intro">
            <h3>🚀 智能职位发布</h3>
            <p>填写职位基本信息，系统将自动为您推荐合适的候选人</p>
          </div>

          <form @submit.prevent="handleSubmitJobInfo">
            <div class="form-group">
              <label for="positionName">职位名称 *</label>
              <input 
                id="positionName"
                v-model="jobForm.positionName"
                type="text"
                placeholder="例如：Java高级开发工程师"
                required
              />
            </div>

            <div class="form-group">
              <label for="positionDescription">职位描述 *</label>
              <textarea 
                id="positionDescription"
                v-model="jobForm.positionDescription"
                rows="6"
                placeholder="请描述职位的主要工作内容，例如：
• 负责核心业务系统的开发和维护
• 参与系统架构设计和技术选型
• 优化系统性能，提升用户体验
• 与产品、设计团队协作完成项目开发"
                required
              ></textarea>
              <div class="textarea-hint">
                <span class="hint-text">💡 请详细描述职位的主要工作内容和职责</span>
                <span class="char-count">{{ jobForm.positionDescription.length }}/1000</span>
              </div>
            </div>

            <div class="form-group">
              <label for="positionDemand">任职要求 *</label>
              <textarea 
                id="positionDemand"
                v-model="jobForm.positionDemand"
                rows="6"
                placeholder="请描述任职要求，例如：
• 5年以上Java开发经验
• 熟悉Spring全家桶，有分布式系统开发经验
• 熟练掌握MySQL、Redis等数据库技术
• 本科及以上学历，计算机相关专业优先"
                required
              ></textarea>
              <div class="textarea-hint">
                <span class="hint-text">💡 请详细描述技能要求、经验要求、学历要求等</span>
                <span class="char-count">{{ jobForm.positionDemand.length }}/1000</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
                <span class="btn-icon">🚀</span>
                发布职位
              </button>
            </div>
          </form>
        </div>

        <!-- 步骤2: 创建职位 -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="ai-analysis-container">
            <div class="analysis-loading">
              <div class="loading-icon">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" stroke="#e6e6e6" stroke-width="4" fill="none"/>
                  <circle cx="20" cy="20" r="18" stroke="#007bff" stroke-width="4" fill="none" 
                          stroke-dasharray="113" stroke-dashoffset="0" class="rotating-circle"/>
                </svg>
              </div>
              <h3>正在创建职位...</h3>
              <p>正在提交职位信息，请稍候</p>
              <div class="progress-steps">
                <div class="progress-step" :class="{ completed: analysisProgress >= 1 }">
                  <span>验证职位信息</span>
                </div>
                <div class="progress-step" :class="{ completed: analysisProgress >= 2 }">
                  <span>创建职位记录</span>
                </div>
                <div class="progress-step" :class="{ completed: analysisProgress >= 3 }">
                  <span>准备智能匹配</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤3: 智能匹配 -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="matching-container">
            <div class="matching-header">
              <h3>🎯 智能候选人匹配</h3>
              <p>正在为您的职位匹配最合适的候选人...</p>
            </div>

            <div class="matching-progress">
              <div class="progress-item">
                <span class="progress-label">分析职位要求</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: Math.min(matchingProgress.analyzed, 100) + '%' }"></div>
                </div>
                <span class="progress-text">{{ Math.min(matchingProgress.analyzed, 100) }}%</span>
              </div>
              
              <div class="progress-item">
                <span class="progress-label">匹配候选人</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: Math.min(matchingProgress.matched, 100) + '%' }"></div>
                </div>
                <span class="progress-text">{{ Math.min(matchingProgress.matched, 100) }}%</span>
              </div>
              
              <div class="progress-item">
                <span class="progress-label">计算匹配度</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: Math.min(matchingProgress.scored, 100) + '%' }"></div>
                </div>
                <span class="progress-text">{{ Math.min(matchingProgress.scored, 100) }}%</span>
              </div>
            </div>

            <!-- 匹配结果 -->
            <div v-if="matchResult" class="match-results">
              <div class="results-header">
                <h4>🎉 匹配完成！</h4>
                <p>为您找到了 <strong>{{ matchResult.totalCandidates }}</strong> 位候选人</p>
              </div>
              
              <div class="results-summary">
                <div class="summary-item">
                  <div class="summary-number high-match">{{ matchResult.highMatch }}</div>
                  <div class="summary-label">高匹配度</div>
                </div>
                <div class="summary-item">
                  <div class="summary-number medium-match">{{ matchResult.mediumMatch }}</div>
                  <div class="summary-label">中匹配度</div>
                </div>
                <div class="summary-item">
                  <div class="summary-number low-match">{{ matchResult.lowMatch }}</div>
                  <div class="summary-label">低匹配度</div>
                </div>
              </div>

              <div class="action-buttons">
                <button class="btn btn-secondary" @click="closeModal">
                  稍后查看
                </button>
                <button class="btn btn-primary" @click="viewCandidates">
                  立即查看候选人
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import apiManager from '../api/mockManager.js'

export default {
  name: 'CreateJobModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'created'],
  setup(props, { emit }) {
    const currentStep = ref(1)
    const isAnalyzing = ref(false)
    const isMatching = ref(false)
    const isCreating = ref(false)
    const analysisProgress = ref(0)
    const aiAnalysis = ref(null)
    const createdJob = ref(null)

    const jobForm = reactive({
      positionName: '',
      positionDescription: '',
      positionDemand: ''
    })

    const matchingProgress = reactive({
      analyzed: 0,
      matched: 0,
      scored: 0
    })

    const matchResult = ref(null)

    const isFormValid = computed(() => {
      return jobForm.positionName.trim() && 
             jobForm.positionDescription.trim() && 
             jobForm.positionDemand.trim() &&
             jobForm.positionDescription.length >= 20 &&
             jobForm.positionDemand.length >= 20
    })

    const resetForm = () => {
      currentStep.value = 1
      isAnalyzing.value = false
      isMatching.value = false
      isCreating.value = false
      analysisProgress.value = 0
      aiAnalysis.value = null
      createdJob.value = null
      matchResult.value = null
      
      Object.assign(jobForm, {
        positionName: '',
        positionDescription: '',
        positionDemand: ''
      })
      
      Object.assign(matchingProgress, {
        analyzed: 0,
        matched: 0,
        scored: 0
      })
    }

    const closeModal = () => {
      emit('close')
      setTimeout(resetForm, 300)
    }

    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget) {
        closeModal()
      }
    }

    const handleSubmitJobInfo = async () => {
      if (!isFormValid.value) {
        alert('请完整填写职位信息')
        return
      }
      
      currentStep.value = 2
      await createJobDirectly()
    }

    const createJobDirectly = async () => {
      analysisProgress.value = 0

      try {
        // 模拟创建进度
        const progressInterval = setInterval(() => {
          if (analysisProgress.value < 3) {
            analysisProgress.value++
          }
        }, 800)

        // 调用创建职位API
        const jobData = {
          positionName: jobForm.positionName,
          positionDescription: jobForm.positionDescription,
          positionDemand: jobForm.positionDemand
        }

        const createResponse = await apiManager.createPosition(jobData)
        
        clearInterval(progressInterval)
        analysisProgress.value = 3

        if (createResponse.success) {
          createdJob.value = {
            id: createResponse.data.positionId,
            title: jobForm.positionName,
            description: jobForm.positionDescription,
            requirements: jobForm.positionDemand
          }
          
          // 等待2秒让用户查看创建结果，然后自动进行智能匹配
          setTimeout(async () => {
            currentStep.value = 3
            await performMatching(createResponse.data.positionId)
          }, 2000)
        } else {
          console.error('创建职位失败:', createResponse.message)
          alert('创建职位失败，请检查网络连接或重试')
        }
      } catch (error) {
        console.error('创建职位错误:', error)
        alert('创建职位出现错误，请重试')
      }
    }

    const performMatching = async () => {
      isMatching.value = true
      matchingProgress.analyzed = 0
      matchingProgress.matched = 0
      matchingProgress.scored = 0

      try {
        // 模拟匹配进度
        const updateProgress = (step, value) => {
          matchingProgress[step] = value
        }

        // 分析职位要求
        for (let i = 0; i <= 100; i += 10) {
          updateProgress('analyzed', i)
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // 匹配候选人
        for (let i = 0; i <= 100; i += 15) {
          updateProgress('matched', i)
          await new Promise(resolve => setTimeout(resolve, 120))
        }

        // 计算匹配度
        for (let i = 0; i <= 100; i += 20) {
          updateProgress('scored', i)
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        // 模拟匹配结果
        matchResult.value = {
          totalCandidates: Math.floor(Math.random() * 50) + 20,
          highMatch: Math.floor(Math.random() * 15) + 5,
          mediumMatch: Math.floor(Math.random() * 20) + 10,
          lowMatch: Math.floor(Math.random() * 15) + 5
        }

        isMatching.value = false
      } catch (error) {
        console.error('匹配过程出错:', error)
        isMatching.value = false
      }
    }

    const createJob = async () => {
      // 这个方法保留用于兼容性
      return createJobDirectly()
    }

    const viewCandidates = () => {
      emit('created', createdJob.value)
      closeModal()
    }

    const getScoreClass = (score) => {
      if (score >= 80) return 'high-score'
      if (score >= 60) return 'medium-score'
      return 'low-score'
    }

    const getConfidenceStyle = (confidence) => {
      const percentage = confidence / 100
      const color = percentage >= 0.8 ? '#10b981' : percentage >= 0.6 ? '#f59e0b' : '#ef4444'
      return {
        background: `conic-gradient(${color} ${percentage * 3.6}deg, #e5e7eb 0deg)`,
        color: color
      }
    }

    // 监听visible变化，重置表单
    watch(() => props.visible, (newVal) => {
      if (!newVal) {
        resetForm()
      }
    })

    return {
      currentStep,
      jobForm,
      isFormValid,
      isAnalyzing,
      isMatching,
      isCreating,
      analysisProgress,
      matchingProgress,
      aiAnalysis,
      matchResult,
      createdJob,
      closeModal,
      handleOverlayClick,
      handleSubmitJobInfo,
      createJob,
      createJobDirectly,
      performMatching,
      viewCandidates,
      getScoreClass,
      getConfidenceStyle
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 32px;
  max-height: calc(90vh - 100px);
  overflow-y: auto;
}

.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  padding: 0 20px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.step.active,
.step.completed {
  opacity: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s;
}

.step.active .step-number {
  background: #667eea;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step span {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
}

.step.active span,
.step.completed span {
  color: #374151;
}

.step-line {
  flex: 1;
  height: 2px;
  background: #e5e7eb;
  margin: 0 20px;
  transition: background-color 0.3s;
}

.step-line.completed {
  background: #10b981;
}

.step-content {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.simple-form-intro {
  text-align: center;
  margin-bottom: 32px;
}

.simple-form-intro h3 {
  font-size: 28px;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.simple-form-intro p {
  color: #6b7280;
  font-size: 16px;
  margin: 0;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  font-family: inherit;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.textarea-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
}

.hint-text {
  color: #6b7280;
}

.char-count {
  color: #9ca3af;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-icon {
  font-size: 16px;
}

.ai-analysis-container {
  text-align: center;
  padding: 40px 20px;
}

.analysis-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-icon {
  position: relative;
}

.rotating-circle {
  animation: rotate 2s linear infinite;
  transform-origin: center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.analysis-loading h3 {
  margin: 0;
  font-size: 24px;
  color: #374151;
}

.analysis-loading p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
}

.progress-step {
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.3s;
}

.progress-step.completed {
  background: #ecfdf5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.matching-container {
  text-align: center;
  padding: 20px;
}

.matching-header h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
  color: #374151;
}

.matching-header p {
  margin: 0 0 32px 0;
  color: #6b7280;
  font-size: 16px;
}

.matching-progress {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.progress-label {
  min-width: 120px;
  text-align: left;
  font-weight: 500;
  color: #374151;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  min-width: 40px;
  text-align: right;
  font-weight: 600;
  color: #667eea;
}

.match-results {
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
}

.results-header h4 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #374151;
}

.results-header p {
  margin: 0 0 24px 0;
  color: #6b7280;
}

.results-summary {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 24px;
}

.summary-item {
  text-align: center;
}

.summary-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
}

.summary-number.high-match {
  color: #10b981;
}

.summary-number.medium-match {
  color: #f59e0b;
}

.summary-number.low-match {
  color: #6b7280;
}

.summary-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>