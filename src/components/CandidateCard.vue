<template>
  <div class="candidate-card">
    <!-- 候选人头部信息 -->
    <div class="candidate-header">
      <div class="candidate-basic-info">
        <img
          :src="candidate.avatar"
          :alt="candidate.name"
          class="candidate-avatar"
        />
        <div class="candidate-info">
          <h4 class="candidate-name">{{ candidate.name }}</h4>
          <div class="candidate-meta">
            <span>{{ candidate.experience }}年经验</span>
            <span class="separator">·</span>
            <span>{{ candidate.title }}</span>
            <span class="separator">·</span>
            <span>{{ candidate.location }}</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <div class="match-indicator">
          <div class="match-score">{{ candidate.matchScore }}%</div>
          <div class="match-label">匹配度</div>
        </div>
      </div>
    </div>

    <!-- 教育经历 -->
    <div class="education-section">
      <h5>教育经历</h5>
      <div class="education-list">
        <div
          v-for="(edu, index) in candidate.educationHistory"
          :key="index"
          class="education-item"
        >
          <div class="education-content">
            <div class="education-main">
              <span class="degree">{{ edu.degree }}</span>
              <span class="duration">{{ edu.duration }}</span>
            </div>
            <div class="education-details">
              <span class="school">{{ edu.school }}</span>
              <span class="separator">·</span>
              <span class="major">{{ edu.major }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐理由 -->
    <div class="recommend-section">
      <h5>推荐理由</h5>
      <ul class="recommend-reasons">
        <li v-for="(reason, index) in candidate.recommendReasons" :key="index">
          {{ reason }}
        </li>
      </ul>
    </div>

    <!-- 关键匹配点 -->
    <div class="highlight-section">
      <h5>关键匹配点</h5>
      <div class="highlights">
        <span
          v-for="(highlight, index) in candidate.keyHighlights"
          :key="index"
          class="highlight-tag"
        >
          {{ highlight }}
        </span>
      </div>
    </div>

    <!-- 技能标签 -->
    <div class="skills-section">
      <h5>技能标签</h5>
      <div class="candidate-skills">
        <span
          v-for="skill in candidate.skills"
          :key="skill"
          class="skill-tag"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="work-section">
      <h5>过往经历</h5>
      <div class="work-list">
        <div
          v-for="(work, index) in candidate.workHistory"
          :key="index"
          class="work-item"
        >
          <div class="work-content">
            <div class="work-main">
              <span class="company">{{ work.company }}</span>
              <span class="duration">{{ work.duration }}</span>
            </div>
            <div class="position">{{ work.position }}</div>
            <div v-if="work.description" class="description">
              {{ work.description }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="card-actions">
      <button class="action-btn contact-btn" @click="quickContact">
        <span class="btn-icon">💬</span>
        <span class="btn-text">查看详情</span>
      </button>
      <button class="action-btn ai-btn" @click="generateAIAnalysis">
        <span class="btn-icon">💬</span>
        <span class="btn-text">联系候选人</span>
      </button>
      <button class="action-btn analysis-btn" @click="showAIAnalysis = !showAIAnalysis">
        <span class="btn-icon">🤖</span>
        <span class="btn-text">AI分析</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CandidateCard',
  props: {
    candidate: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const showAIAnalysis = ref(false)

    const quickContact = () => {
      alert(`联系候选人：${props.candidate.name}`)
    }

    const generateAIAnalysis = () => {
      alert(`生成${props.candidate.name}的AI分析`)
    }

    return {
      showAIAnalysis,
      quickContact,
      generateAIAnalysis
    }
  }
}
</script>

<style scoped>
/* 候选人卡片 - 完整展示设计 */
.candidate-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e8ecf3;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  /* 设置最小高度确保每个卡片至少占满一个屏幕高度的合理空间 */
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.candidate-card:hover {
  border-color: #667eea;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.12);
  transform: translateY(-2px);
}

/* 候选人头部信息 */
.candidate-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f3f4;
  background: #fafbfc;
}

/* 候选人基本信息 */
.candidate-basic-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.candidate-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.candidate-info {
  flex: 1;
  min-width: 0;
}

.candidate-name {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 6px 0;
}

.candidate-meta {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
}

.separator {
  margin: 0 8px;
  color: #dee2e6;
}

/* 头部右侧区域 */
.header-right {
  display: flex;
  align-items: center;
}

/* 匹配度指示器 - 右侧绿色高亮 */
.match-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.25);
  min-width: 90px;
}

.match-score {
  font-size: 32px;
  font-weight: 900;
  color: white;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.match-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 详细内容各区块 */
.education-section,
.recommend-section,
.highlight-section,
.skills-section,
.work-section {
  padding: 20px;
  margin-bottom: 0;
  border-bottom: 1px solid #f1f3f4;
  flex-shrink: 0;
}

.work-section {
  flex: 1;
  border-bottom: none;
}

.education-section h5,
.recommend-section h5,
.highlight-section h5,
.skills-section h5,
.work-section h5 {
  font-size: 14px;
  font-weight: 700;
  color: #495057;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 教育经历 */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.education-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.education-content {
  padding: 12px 16px;
}

.education-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.degree {
  font-weight: 700;
  color: #2c3e50;
  font-size: 14px;
}

.duration {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.education-details {
  font-size: 13px;
  color: #495057;
}

/* 推荐理由 */
.recommend-reasons {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.recommend-reasons li {
  padding: 0;
  font-size: 13px;
  color: #495057;
  position: relative;
  padding-left: 20px;
  line-height: 1.5;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 8px 8px 8px 24px;
}

.recommend-reasons li::before {
  content: "✓";
  position: absolute;
  left: 8px;
  top: 8px;
  color: #28a745;
  font-weight: 700;
  font-size: 12px;
}

/* 关键匹配点 */
.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.highlight-tag {
  background: #fff3e0;
  color: #f57c00;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(245, 124, 0, 0.2);
}

/* 技能标签 */
.candidate-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

/* 工作经历 */
.work-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.work-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.work-content {
  padding: 12px 16px;
}

.work-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.company {
  font-weight: 700;
  color: #2c3e50;
  font-size: 14px;
}

.position {
  font-size: 13px;
  color: #667eea;
  margin-bottom: 6px;
  font-weight: 600;
}

.description {
  font-size: 12px;
  color: #6c757d;
  line-height: 1.5;
}

/* 操作按钮 */
.card-actions {
  padding: 20px;
  background: #fafbfc;
  border-top: 1px solid #f1f3f4;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-shrink: 0;
}

.action-btn {
  background: white;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
  max-width: 150px;
}

.action-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-btn.contact-btn {
  background: #667eea;
  color: white;
  border: none;
}

.action-btn.contact-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.action-btn.ai-btn {
  background: #28a745;
  color: white;
  border: none;
}

.action-btn.ai-btn:hover {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
}

.action-btn.analysis-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.action-btn.analysis-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  font-size: 13px;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .candidate-card {
    min-height: calc(100vh - 160px);
    margin-bottom: 16px;
  }

  .candidate-header {
    padding: 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .candidate-basic-info {
    width: 100%;
  }

  .header-right {
    justify-content: center;
  }

  .match-indicator {
    min-width: 80px;
    padding: 12px 16px;
  }

  .match-score {
    font-size: 28px;
  }

  .education-section,
  .recommend-section,
  .highlight-section,
  .skills-section,
  .work-section {
    padding: 16px;
  }

  .card-actions {
    padding: 16px;
    flex-direction: column;
    gap: 8px;
  }

  .action-btn {
    max-width: none;
    padding: 12px 16px;
  }
}

/* 小屏幕进一步优化 */
@media (max-width: 480px) {
  .candidate-card {
    min-height: calc(100vh - 120px);
  }

  .candidate-header {
    padding: 16px;
  }
  
  .education-section,
  .recommend-section,
  .highlight-section,
  .skills-section,
  .work-section {
    padding: 12px;
  }
  
  .card-actions {
    padding: 12px;
  }
}
</style>
