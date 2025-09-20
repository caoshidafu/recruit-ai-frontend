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
            <span>职位描述</span>
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

        <!-- 步骤1: 职位描述 -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="simple-form-intro">
            <h3>🚀 智能职位发布</h3>
            <p>只需描述您的职位需求，AI将自动为您解析职位信息并推荐合适的候选人</p>
          </div>
          
          <form @submit.prevent="handleSubmitDescription">
            <div class="form-group">
              <label for="description">职位描述 *</label>
              <textarea 
                id="description"
                v-model="jobForm.description"
                rows="12"
                placeholder="请详细描述您的职位需求，例如：

我们正在招聘一名前端工程师，主要负责：
• 使用Vue.js开发用户界面
• 与后端团队协作完成项目开发
• 优化前端性能和用户体验

任职要求：
• 3-5年前端开发经验
• 熟练掌握Vue.js、JavaScript、HTML、CSS
• 有大型项目开发经验优先
• 本科学历，计算机相关专业

工作地点：北京市朝阳区
薪资范围：15-25K"
                required
              ></textarea>
              <div class="textarea-hint">
                <span class="hint-text">💡 描述越详细，AI解析越准确。建议包含：工作内容、技能要求、经验要求、学历要求、工作地点、薪资等信息</span>
                <span class="char-count">{{ jobForm.description.length }}/2000</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">取消</button>
              <button type="submit" class="btn btn-primary" :disabled="!jobForm.description.trim()">
                <span class="btn-icon">🧠</span>
                开始AI智能解析
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
              <p>正在匹配 {{ matchingProgress.total }} 位候选人</p>
              <p class="auto-publish-note">匹配完成后将自动发布职位</p>
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

    const handleSubmitDescription = async () => {
      if (!jobForm.description.trim()) {
        alert('请输入职位描述')
        return
      }
      
      currentStep.value = 2
      await performAiAnalysis()
    }

    const nextStep = async () => {
      if (currentStep.value === 1) {
        currentStep.value = 2
        await performAiAnalysis()
      } else if (currentStep.value === 2) {
        currentStep.value = 3
        // 执行匹配，匹配完成后会自动创建职位并关闭弹窗
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

        // 1. 先解析职位描述
        const parseResponse = await apiManager.parseJobDescription(jobForm.description)
        
        clearInterval(progressInterval)
        analysisProgress.value = 3

        if (parseResponse.success) {
          aiAnalysis.value = parseResponse.data
          
          // 自动填充从AI解析出的基本信息到jobForm
          if (parseResponse.data.extractedInfo) {
            const extracted = parseResponse.data.extractedInfo
            
            // 如果表单字段为空，则使用AI解析的结果
            if (!jobForm.title && extracted.title) {
              jobForm.title = extracted.title
            }
            if (!jobForm.department && extracted.department) {
              jobForm.department = extracted.department
            }
            if (!jobForm.level && extracted.level) {
              jobForm.level = extracted.level
            }
            if (!jobForm.location && extracted.location) {
              jobForm.location = extracted.location
            }
            if (!jobForm.salary && extracted.salary) {
              jobForm.salary = extracted.salary
            }
          }

          // 2. 创建职位
          await createJobAndMatch()
        } else {
          console.error('AI分析失败:', parseResponse.message)
          alert('AI分析失败，请检查网络连接或重试')
        }
      } catch (error) {
        console.error('AI分析错误:', error)
        alert('AI分析出现错误，请重试')
      } finally {
        isAnalyzing.value = false
      }
    }

    const performMatching = async (jobId = null) => {
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

        const response = await apiManager.aiMatchCandidates(jobId || Date.now(), 'detailed')
        
        clearInterval(progressInterval)
        matchingProgress.analyzed = matchingProgress.total
        matchingProgress.matched = 12

        if (response.success) {
          matchResult.value = response.data
          
          // 匹配完成后，立即创建职位并关闭弹窗
          await createJobAfterMatching()
        } else {
          console.error('智能匹配失败:', response.message)
          alert('智能匹配失败，请重试')
        }
      } catch (error) {
        console.error('智能匹配错误:', error)
        alert('智能匹配出现错误，请重试')
      } finally {
        isMatching.value = false
      }
    }

    const createJobAfterMatching = async () => {
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
          // 职位创建成功，直接关闭弹窗并通知父组件
          emit('created', response.data)
          closeModal()
        } else {
          console.error('创建职位失败:', response.message)
          alert('创建职位失败，请重试')
        }
      } catch (error) {
        console.error('创建职位错误:', error)
        alert('创建职位出现错误，请重试')
      }
    }

    const createJobAndMatch = async () => {
      try {
        // 先创建职位
        const jobData = {
          title: jobForm.title,
          department: jobForm.department,
          level: jobForm.level,
          location: jobForm.location,
          salary: jobForm.salary,
          description: jobForm.description,
          aiAnalysis: aiAnalysis.value,
          status: 'active',
          publishedAt: new Date().toISOString()
        }

        const createResponse = await apiManager.createJob(jobData)

        if (createResponse.success) {
          // 自动跳转到智能匹配步骤
          currentStep.value = 3
          
          // 开始智能匹配
          await performMatching(createResponse.data.id)
          
          // 匹配完成后，自动关闭弹窗并通知父组件
          setTimeout(() => {
            emit('created', createResponse.data)
            closeModal()
          }, 1000) // 给用户1秒时间看到完成状态
        } else {
          console.error('创建职位失败:', createResponse.message)
          alert('创建职位失败，请重试')
        }
      } catch (error) {
        console.error('创建职位错误:', error)
        alert('创建职位出现错误，请重试')
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
      handleSubmitDescription,
      nextStep,
      prevStep,
      createJob,
      createJobAndMatch,
      performMatching,
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

/* 简化表单介绍 */
.simple-form-intro {
  text-align: center;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.simple-form-intro h3 {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
}

.simple-form-intro p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
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

.hint-text {
  flex: 1;
  margin-right: 16px;
  line-height: 1.4;
}

.char-count {
  color: #9ca3af;
  white-space: nowrap;
}

/* 按钮图标样式 */
.btn-icon {
  margin-right: 8px;
  font-size: 16px;
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

.matching-loading .auto-publish-note {
  color: #10b981;
  font-weight: 500;
  margin: 12px 0 0 0;
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
