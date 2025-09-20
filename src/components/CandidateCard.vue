<template>
  <div class="candidate-card">
    <!-- 可点击的候选人头部信息 -->
    <div class="candidate-header" @click="toggleExpanded">
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
        <!-- 展开/收起按钮 -->
        <div class="expand-button">
          <i :class="['expand-icon', { 'rotated': isExpanded }]">{{ isExpanded ? '▲' : '▼' }}</i>
        </div>
      </div>
    </div>

    <!-- 展开内容区域 - 统一垂直布局 -->
    <div v-if="isExpanded" class="expanded-content">
      <div class="content-container">
        <!-- 教育经历 -->
        <div class="education-section">
          <h5>教育经历</h5>
          <div class="education-list">
            <div
              v-for="(edu, index) in candidate.educationHistory"
              :key="index"
              class="education-item"
            >
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

        <!-- 过往经历 -->
        <div class="work-section">
          <h5>过往经历</h5>
          <div class="work-list">
            <div
              v-for="(work, index) in candidate.workHistory"
              :key="index"
              class="work-item"
            >
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
        <button class="action-btn contact-btn" @click.stop="quickContact">
          <span class="btn-icon">👁</span>
          <span class="btn-text">查看详情</span>
        </button>
        <button class="action-btn ai-btn" @click.stop="generateAIAnalysis">
          <span class="btn-icon">💬</span>
          <span class="btn-text">联系候选人</span>
        </button>
        <button class="action-btn analysis-btn" @click.stop="showAIAnalysis = !showAIAnalysis">
          <span class="btn-icon">🤖</span>
          <span class="btn-text">AI分析</span>
        </button>
      </div>
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
    },
    defaultExpanded: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const showAIAnalysis = ref(false)
    const isExpanded = ref(props.defaultExpanded)

    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }

    const quickContact = () => {
      alert(`联系候选人：${props.candidate.name}`)
    }

    const generateAIAnalysis = () => {
      alert(`生成${props.candidate.name}的AI分析`)
    }

    return {
      showAIAnalysis,
      isExpanded,
      toggleExpanded,
      quickContact,
      generateAIAnalysis
    }
  }
}
</script>

<style scoped>
/* CSS变量定义 */
:root {
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
  --primary: #2563eb;
}
/* 候选人卡片 - 折叠/展开设计 */
.candidate-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  margin-bottom: 16px;
  position: relative;
  transition: all 0.2s ease;
  overflow: visible; /* 允许内容完整显示 */
  display: flex;
  flex-direction: column;
  /* 移除最大高度限制，让每个候选人完整显示 */
}

.candidate-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: var(--gray-300);
}

/* 候选人头部信息 - 可点击区域 */
.candidate-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
}

.candidate-header:hover {
  background: var(--gray-50);
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.candidate-info {
  flex: 1;
  min-width: 0;
}

.candidate-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
  margin: 0 0 4px 0;
}

.candidate-meta {
  font-size: 13px;
  color: var(--gray-600);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  line-height: 1.5;
}

.separator {
  color: var(--gray-400);
}

/* 头部右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 匹配度指示器 - 右侧绿色高亮 */
.match-indicator {
  text-align: center;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 90px;
}

.match-score {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.match-label {
  font-size: 12px;
}

/* 展开按钮 */
.expand-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.expand-icon {
  font-size: 12px;
  color: #667eea;
  transition: transform 0.3s ease;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.expand-button:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: scale(1.1);
}

/* 展开内容区域 */
.expanded-content {
  animation: slideDown 0.3s ease-out;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* 内容容器 - 统一垂直布局 */
.content-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}


@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 详细内容各区块 */
.education-section,
.recommend-section,
.highlight-section,
.skills-section,
.work-section {
  margin-bottom: 0;
  flex-shrink: 0;
}

.education-section h5,
.recommend-section h5,
.highlight-section h5,
.skills-section h5,
.work-section h5 {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 8px;
}

/* 教育经历部分 */
.education-section {
  background: transparent;
  padding: 0;
}

.education-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.education-item {
  font-size: 13px;
}

.education-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.degree {
  font-weight: 600;
  color: var(--gray-900);
}

.duration {
  color: var(--gray-500);
  font-size: 12px;
}

.education-details {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--gray-600);
}

.school {
  font-weight: 500;
}

.major {
  color: var(--gray-500);
}

/* 推荐理由部分 */
.recommend-reasons {
  list-style: none;
  font-size: 13px;
  color: var(--gray-600);
}

.recommend-reasons li {
  padding: 4px 0;
  padding-left: 16px;
  position: relative;
}

.recommend-reasons li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--primary);
}

/* 关键匹配点 */
.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.highlight-tag {
  padding: 6px 12px;
  background: #ff6b6b15;
  color: #dc2626;
  border: 1px solid #ff6b6b30;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
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
  margin-bottom: 12px;
  font-size: 13px;
}

.work-item:last-child {
  margin-bottom: 0;
}

.work-content {
  padding: 0;
}

.work-main {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.company {
  font-weight: 500;
  color: var(--gray-900);
}

.position {
  color: var(--gray-600);
  margin-bottom: 4px;
}

.description {
  color: var(--gray-500);
  font-size: 12px;
}

/* 操作按钮 */
.card-actions {
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-shrink: 0;
}

.action-btn {
  background: white;
  border: 1px solid var(--gray-300);
  color: var(--gray-700);
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
  max-width: 150px;
}

.action-btn:hover {
  background: var(--gray-50);
  border-color: var(--primary);
  color: var(--primary);
}

.action-btn.contact-btn {
  background: var(--primary);
  color: white;
  border: none;
}

.action-btn.contact-btn:hover {
  background: #1d4ed8;
}

.action-btn.ai-btn {
  background: #10b981;
  color: white;
  border: none;
}

.action-btn.ai-btn:hover {
  background: #059669;
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
    max-height: calc(100vh - 80px);
    margin-bottom: 16px;
  }

  .candidate-header {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
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

  /* 移动端内容布局 */
  .content-container {
    padding: 16px;
    gap: 12px;
  }

  .card-actions {
    padding: 12px 16px;
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
    max-height: calc(100vh - 60px);
  }

  .candidate-header {
    padding: 12px;
  }

  .content-container {
    padding: 12px;
    gap: 8px;
  }
  
  .card-actions {
    padding: 10px 12px;
  }
}
</style>
