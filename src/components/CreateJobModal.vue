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
        <!-- 步骤指示器 -->
        <div class="steps-indicator">
          <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
            <div class="step-number">1</div>
            <span>基本信息</span>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 1 }"></div>
          <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
            <div class="step-number">2</div>
            <span>AI解析</span>
          </div>
          <div class="step-line" :class="{ completed: currentStep > 2 }"></div>
          <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
            <div class="step-number">3</div>
            <span>智能匹配</span>
          </div>
        </div>

        <!-- 步骤1: 基本信息 -->
        <div v-if="currentStep === 1" class="step-content">
          <form @submit.prevent="nextStep">
            <div class="form-group">
              <label for="jobTitle">职位名称 *</label>
              <input 
                id="jobTitle"
                v-model="jobForm.title"
                type="text" 
                placeholder="请输入职位名称"
                required
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="department">部门 *</label>
                <select id="department" v-model="jobForm.department" required>
                  <option value="">请选择部门</option>
                  <option value="技术部">技术部</option>
                  <option value="产品部">产品部</option>
                  <option value="设计部">设计部</option>
                  <option value="运营部">运营部</option>
                  <option value="市场部">市场部</option>
                  <option value="销售部">销售部</option>
                  <option value="人事部">人事部</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="level">级别 *</label>
                <select id="level" v-model="jobForm.level" required>
                  <option value="">请选择级别</option>
                  <option value="初级">初级</option>
                  <option value="中级">中级</option>
                  <option value="高级">高级</option>
                  <option value="专家">专家</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="location">工作地点 *</label>
                <input 
                  id="location"
                  v-model="jobForm.location"
                  type="text" 
                  placeholder="请输入工作地点"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="salary">薪资范围</label>
                <input 
                  id="salary"
                  v-model="jobForm.salary"
                  type="text" 
                  placeholder="如：15-25K"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="description">职位描述 *</label>
              <textarea 
                id="description"
                v-model="jobForm.description"
                rows="6"
                placeholder="请详细描述职位要求、工作内容、任职资格等信息..."
                required
              ></textarea>
              <div class="textarea-hint">
                <span>建议详细描述，AI将基于此内容进行智能解析</span>
                <span class="char-count">{{ jobForm.description.length }}/1000</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="!isBasicFormValid">
                下一步：AI解析
              </button>
            </div>
          </form>
        </div>

        <!-- 步骤2: AI解析 -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="ai-analysis-container">
            <div v-if="isAnalyzing" class="analysis-loading">
              <div class="loading-icon">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" stroke="#e6e6e6" stroke-width="4" fill="none"/>
                  <circle cx="20" cy="20" r="18" stroke="#007bff" stroke-width="4" fill="none" 
                          stroke-dasharray="113" stroke-dashoffset="0" class="rotating-circle"/>
                </svg>
              </div>
              <h3>AI正在分析职位描述...</h3>
              <p>正在解析技能要求、经验需求和岗位职责</p>
              <div class="progress-steps">
                <div class="progress-step" :class="{ completed: analysisProgress >= 1 }">
                  <span>解析技能要求</span>
                </div>
                <div class="progress-step" :class="{ completed: analysisProgress >= 2 }">
                  <span>分析经验需求</span>
                </div>
                <div class="progress-step" :class="{ completed: analysisProgress >= 3 }">
                  <span>生成岗位标签</span>
                </div>
              </div>
            </div>

            <div v-if="!isAnalyzing && aiAnalysis" class="analysis-result">
              <h3>AI解析结果</h3>
              
              <div class="analysis-cards">
                <div class="analysis-card">
                  <h4>核心技能要求</h4>
                  <div class="skills-tags">
                    <span v-for="skill in aiAnalysis.skills" :key="skill" class="skill-tag">
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <div class="analysis-card">
                  <h4>经验要求</h4>
                  <ul class="experience-list">
                    <li v-for="exp in aiAnalysis.experience" :key="exp">{{ exp }}</li>
                  </ul>
                </div>

                <div class="analysis-card">
                  <h4>工作职责</h4>
                  <ul class="responsibilities-list">
                    <li v-for="resp in aiAnalysis.responsibilities" :key="resp">{{ resp }}</li>
                  </ul>
                </div>

                <div class="analysis-card">
                  <h4>匹配标签</h4>
                  <div class="tags-grid">
                    <span v-for="tag in aiAnalysis.tags" :key="tag" class="match-tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="confidence-score">
                <h4>解析置信度</h4>
                <div class="confidence-bar">
                  <div class="confidence-fill" :style="{ width: aiAnalysis.confidence * 100 + '%' }"></div>
                </div>
                <span class="confidence-text">{{ Math.round(aiAnalysis.confidence * 100) }}%</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="prevStep">上一步</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="nextStep"
              :disabled="isAnalyzing || !aiAnalysis"
            >
              下一步：智能匹配
            </button>
          </div>
        </div>

        <!-- 步骤3: 智能匹配 -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="matching-container">
            <div v-if="isMatching" class="matching-loading">
              <div class="loading-icon">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" stroke="#e6e6e6" stroke-width="4" fill="none"/>
                  <circle cx="20" cy="20" r="18" stroke="#10b981" stroke-width="4" fill="none" 
                          stroke-dasharray="113" stroke-dashoffset="0" class="rotating-circle"/>
                </svg>
              </div>
              <h3>AI正在智能匹配候选人...</h3>
              <p>正在分析 {{ matchingProgress.total }} 位候选人</p>
              <div class="matching-stats">
                <div class="stat-item">
                  <span class="stat-number">{{ matchingProgress.analyzed }}</span>
                  <span class="stat-label">已分析</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">{{ matchingProgress.matched }}</span>
                  <span class="stat-label">匹配成功</span>
                </div>
              </div>
            </div>

            <div v-if="!isMatching && matchResult" class="matching-result">
              <div class="result-summary">
                <h3>匹配结果概览</h3>
                <div class="summary-stats">
                  <div class="summary-item">
                    <div class="summary-number">{{ matchResult.matchSummary.totalAnalyzed }}</div>
                    <div class="summary-label">总候选人数</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-number">{{ matchResult.matchSummary.highMatch }}</div>
                    <div class="summary-label">高匹配度</div>
                  </div>
                  <div class="summary-item">
                    <div class="summary-number">{{ Math.round(matchResult.matchSummary.averageMatchScore) }}%</div>
                    <div class="summary-label">平均匹配度</div>
                  </div>
                </div>
              </div>

              <div class="candidates-list">
                <h4>推荐候选人</h4>
                <div v-for="candidate in matchResult.candidates" :key="candidate.id" class="candidate-card">
                  <div class="candidate-header">
                    <div class="candidate-info">
                      <img 
                        :src="`https://images.unsplash.com/photo-153972346789${candidate.id}-abc123?w=60&h=60&fit=crop&crop=face`" 
                        :alt="'候选人' + candidate.id" 
                        class="candidate-avatar"
                      >
                      <div class="candidate-details">
                        <h5>候选人 #{{ candidate.id }}</h5>
                        <div class="match-score">
                          <span class="score-label">匹配度:</span>
                          <span class="score-value" :class="getScoreClass(candidate.matchScore)">
                            {{ candidate.matchScore }}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="confidence-indicator">
                      <span class="confidence-label">置信度</span>
                      <div class="confidence-circle" :style="getConfidenceStyle(candidate.confidenceScore)">
                        {{ Math.round(candidate.confidenceScore * 100) }}%
                      </div>
                    </div>
                  </div>

                  <div class="match-details">
                    <div class="match-reasons">
                      <h6>匹配原因</h6>
                      <ul>
                        <li v-for="reason in candidate.matchReasons" :key="reason">
                          {{ reason }}
                        </li>
                      </ul>
                    </div>

                    <div v-if="candidate.riskFactors.length > 0" class="risk-factors">
                      <h6>风险因素</h6>
                      <ul>
                        <li v-for="risk in candidate.riskFactors" :key="risk" class="risk-item">
                          {{ risk }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="recommendations">
                <h4>AI建议</h4>
                <div class="recommendation-cards">
                  <div v-for="rec in matchResult.recommendations" :key="rec.candidateId" 
                       class="recommendation-card" :class="rec.type">
                    <div class="rec-icon">
                      <svg v-if="rec.type === 'priority'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <svg v-else-if="rec.type === 'potential'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                    <div class="rec-content">
                      <div class="rec-candidate">候选人 #{{ rec.candidateId }}</div>
                      <div class="rec-reason">{{ rec.reason }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="prevStep">上一步</button>
            <button 
              type="button" 
              class="btn btn-success" 
              @click="createJob"
              :disabled="isMatching || isCreating"
            >
              {{ isCreating ? '发布中...' : '确认发布职位' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { apiManager } from '../api/mockManager.js'

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
    const matchingProgress = reactive({
      total: 156,
      analyzed: 0,
      matched: 0
    })
    
    const jobForm = reactive({
      title: '',
      department: '',
      level: '',
      location: '',
      salary: '',
      description: ''
    })

    const aiAnalysis = ref(null)
    const matchResult = ref(null)

    const isBasicFormValid = computed(() => {
      return jobForm.title && 
             jobForm.department && 
             jobForm.level && 
             jobForm.location && 
             jobForm.description && 
             jobForm.description.length >= 50
    })

    const closeModal = () => {
      resetForm()
      emit('close')
    }

    const handleOverlayClick = () => {
      closeModal()
    }

    const resetForm = () => {
      currentStep.value = 1
      isAnalyzing.value = false
      isMatching.value = false
      isCreating.value = false
      analysisProgress.value = 0
      matchingProgress.analyzed = 0
      matchingProgress.matched = 0
      
      Object.assign(jobForm, {
        title: '',
        department: '',
        level: '',
        location: '',
        salary: '',
        description: ''
      })
      
      aiAnalysis.value = null
      matchResult.value = null
    }

    const nextStep = async () => {
      if (currentStep.value === 1) {
        currentStep.value = 2
        await performAiAnalysis()
      } else if (currentStep.value === 2) {
        currentStep.value = 3
        await performMatching()
      }
    }

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }

    const performAiAnalysis = async () => {
      isAnalyzing.value = true
      analysisProgress.value = 0

      try {
        // 模拟分析进度
        const progressInterval = setInterval(() => {
          if (analysisProgress.value < 3) {
            analysisProgress.value++
          }
        }, 800)

        const response = await apiManager.parseJobDescription(jobForm.description)
        
        clearInterval(progressInterval)
        analysisProgress.value = 3

        if (response.success) {
          aiAnalysis.value = response.data
        } else {
          console.error('AI分析失败:', response.message)
        }
      } catch (error) {
        console.error('AI分析错误:', error)
      } finally {
        isAnalyzing.value = false
      }
    }

    const performMatching = async () => {
      isMatching.value = true
      matchingProgress.analyzed = 0
      matchingProgress.matched = 0

      try {
        // 模拟匹配进度
        const progressInterval = setInterval(() => {
          if (matchingProgress.analyzed < matchingProgress.total) {
            matchingProgress.analyzed += Math.floor(Math.random() * 10) + 5
            matchingProgress.matched = Math.floor(matchingProgress.analyzed * 0.15)
          }
        }, 200)

        const response = await apiManager.aiMatchCandidates(Date.now(), 'detailed')
        
        clearInterval(progressInterval)
        matchingProgress.analyzed = matchingProgress.total
        matchingProgress.matched = 12

        if (response.success) {
          matchResult.value = response.data
        } else {
          console.error('智能匹配失败:', response.message)
        }
      } catch (error) {
        console.error('智能匹配错误:', error)
      } finally {
        isMatching.value = false
      }
    }

    const createJob = async () => {
      isCreating.value = true

      try {
        const jobData = {
          title: jobForm.title,
          department: jobForm.department,
          level: jobForm.level,
          location: jobForm.location,
          salary: jobForm.salary,
          description: jobForm.description,
          aiAnalysis: aiAnalysis.value,
          matchResult: matchResult.value,
          status: 'active',
          publishedAt: new Date().toISOString()
        }

        const response = await apiManager.createJob(jobData)

        if (response.success) {
          emit('created', response.data)
          closeModal()
        } else {
          console.error('创建职位失败:', response.message)
        }
      } catch (error) {
        console.error('创建职位错误:', error)
      } finally {
        isCreating.value = false
      }
    }

    const getScoreClass = (score) => {
      if (score >= 90) return 'score-excellent'
      if (score >= 80) return 'score-good'
      if (score >= 70) return 'score-fair'
      return 'score-poor'
    }

    const getConfidenceStyle = (confidence) => {
      const percentage = confidence * 100
      let color = '#ef4444' // red
      if (percentage >= 80) color = '#10b981' // green
      else if (percentage >= 60) color = '#f59e0b' // yellow
      
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
      isBasicFormValid,
      isAnalyzing,
      isMatching,
      isCreating,
      analysisProgress,
      matchingProgress,
      aiAnalysis,
      matchResult,
      closeModal,
      handleOverlayClick,
      nextStep,
      prevStep,
      createJob,
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
  animation: fadeIn 0.3s ease;
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 32px;
}

/* 步骤指示器 */
.steps-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 0 20px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: #e5e7eb;
  color: #6b7280;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #3b82f6;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step span {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.step.active span {
  color: #3b82f6;
}

.step.completed span {
  color: #10b981;
}

.step-line {
  height: 2px;
  background: #e5e7eb;
  margin: 0 16px;
  flex: 1;
  margin-top: -20px;
  transition: all 0.3s ease;
}

.step-line.completed {
  background: #10b981;
}

/* 表单样式 */
.step-content {
  min-height: 400px;
}

.form-group {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.textarea-hint {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6b7280;
}

.char-count {
  color: #9ca3af;
}

/* AI分析样式 */
.ai-analysis-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analysis-loading {
  text-align: center;
}

.loading-icon {
  margin-bottom: 24px;
}

.rotating-circle {
  animation: rotate 2s linear infinite;
  stroke-linecap: round;
}

.analysis-loading h3 {
  margin: 0 0 8px 0;
  color: #111827;
  font-size: 20px;
}

.analysis-loading p {
  margin: 0 0 32px 0;
  color: #6b7280;
}

.progress-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.progress-step {
  padding: 8px 16px;
  background: #f3f4f6;
  border-radius: 6px;
  color: #6b7280;
  font-size: 14px;
  transition: all 0.3s ease;
}

.progress-step.completed {
  background: #d1fae5;
  color: #065f46;
}

.analysis-result {
  width: 100%;
}

.analysis-result h3 {
  margin: 0 0 24px 0;
  color: #111827;
  font-size: 20px;
}

.analysis-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.analysis-card {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.analysis-card h4 {
  margin: 0 0 16px 0;
  color: #374151;
  font-size: 16px;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.experience-list,
.responsibilities-list {
  margin: 0;
  padding-left: 16px;
}

.experience-list li,
.responsibilities-list li {
  margin-bottom: 8px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
}

.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.match-tag {
  background: #f3e8ff;
  color: #7c3aed;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.confidence-score {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.confidence-score h4 {
  margin: 0 0 12px 0;
  color: #374151;
}

.confidence-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.confidence-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #34d399);
  transition: width 1s ease;
}

.confidence-text {
  font-weight: 600;
  color: #10b981;
}

/* 智能匹配样式 */
.matching-container {
  min-height: 400px;
}

.matching-loading {
  text-align: center;
  padding: 60px 20px;
}

.matching-loading h3 {
  margin: 0 0 8px 0;
  color: #111827;
  font-size: 20px;
}

.matching-loading p {
  margin: 0 0 32px 0;
  color: #6b7280;
}

.matching-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
}

.matching-result {
  width: 100%;
}

.result-summary {
  margin-bottom: 32px;
}

.result-summary h3 {
  margin: 0 0 16px 0;
  color: #111827;
  font-size: 20px;
}

.summary-stats {
  display: flex;
  gap: 32px;
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.summary-item {
  text-align: center;
  flex: 1;
}

.summary-number {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
}

.summary-label {
  font-size: 14px;
  color: #6b7280;
}

.candidates-list h4 {
  margin: 0 0 20px 0;
  color: #111827;
  font-size: 18px;
}

.candidate-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.candidate-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.candidate-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.candidate-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.candidate-details h5 {
  margin: 0 0 4px 0;
  color: #111827;
  font-size: 16px;
}

.match-score {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-label {
  font-size: 14px;
  color: #6b7280;
}

.score-value {
  font-weight: 600;
  font-size: 16px;
  padding: 2px 8px;
  border-radius: 4px;
}

.score-excellent {
  background: #dcfce7;
  color: #166534;
}

.score-good {
  background: #dbeafe;
  color: #1e40af;
}

.score-fair {
  background: #fef3c7;
  color: #92400e;
}

.score-poor {
  background: #fecaca;
  color: #dc2626;
}

.confidence-indicator {
  text-align: center;
}

.confidence-label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.confidence-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  position: relative;
  margin: 0 auto;
}

.match-details {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.match-reasons h6,
.risk-factors h6 {
  margin: 0 0 8px 0;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
}

.match-reasons ul,
.risk-factors ul {
  margin: 0;
  padding-left: 16px;
}

.match-reasons li {
  margin-bottom: 4px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.4;
}

.risk-item {
  margin-bottom: 4px;
  color: #dc2626;
  font-size: 13px;
  line-height: 1.4;
}

.recommendations {
  margin-top: 32px;
}

.recommendations h4 {
  margin: 0 0 16px 0;
  color: #111827;
  font-size: 18px;
}

.recommendation-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recommendation-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.recommendation-card.priority {
  background: #fef3c7;
  border-color: #f59e0b;
}

.recommendation-card.potential {
  background: #dbeafe;
  border-color: #3b82f6;
}

.recommendation-card.training {
  background: #e0e7ff;
  border-color: #6366f1;
}

.rec-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}

.rec-content {
  flex: 1;
}

.rec-candidate {
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.rec-reason {
  font-size: 14px;
  color: #4b5563;
}

/* 按钮样式 */
.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 20px;
    max-height: calc(100vh - 40px);
  }

  .modal-header,
  .modal-body {
    padding: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .analysis-cards {
    grid-template-columns: 1fr;
  }

  .match-details {
    grid-template-columns: 1fr;
  }

  .summary-stats {
    flex-direction: column;
    gap: 16px;
  }

  .steps-indicator {
    padding: 0 10px;
  }

  .step span {
    font-size: 12px;
  }

  .step-line {
    margin: 0 8px;
  }
}
</style>
