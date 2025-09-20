<template>
  <div class="candidate-card" :class="{ 'expanded': isExpanded }">
    <!-- 折叠状态的简化视图 -->
    <div class="candidate-header" @click="toggleExpand">
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
          <div class="candidate-summary">
            <span>{{ candidate.educationHistory[0]?.degree }} | {{ candidate.skills.slice(0, 3).join(' · ') }}</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <div class="match-indicator">
          <div class="match-score">{{ candidate.matchScore }}%</div>
          <div class="match-label">匹配度</div>
        </div>
        
        <div class="expand-controls">
          <button class="quick-action-btn contact-btn" @click.stop="quickContact">
            <span class="btn-icon">💬</span>
          </button>
          <button class="expand-btn" :class="{ 'expanded': isExpanded }">
            <span class="expand-icon">{{ isExpanded ? '▲' : '▼' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 展开状态的详细内容 -->
    <div class="candidate-details" v-show="isExpanded">
      <div class="details-content">
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

        <!-- 推荐理由 -->
        <div class="recommend-section">
          <h5>推荐理由</h5>
          <ul class="recommend-reasons">
            <li v-for="(reason, index) in candidate.recommendReasons" :key="index">
              {{ reason }}
            </li>
          </ul>
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
              <div class="edu-header">
                <span class="degree">{{ edu.degree }}</span>
                <span class="duration">{{ edu.duration }}</span>
              </div>
              <div class="edu-details">
                <span class="school">{{ edu.school }}</span>
                <span class="separator">·</span>
                <span class="major">{{ edu.major }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 工作经历 -->
        <div class="work-section">
          <h5>过往经历</h5>
          <div
            v-for="(work, index) in candidate.workHistory"
            :key="index"
            class="work-item"
          >
            <div class="work-header">
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

    <!-- 展开状态下的操作按钮 -->
    <div v-if="isExpanded" class="expanded-actions">
      <button
        class="action-btn ai-btn"
        @click="generateAIAnalysis"
        :disabled="aiLoading"
      >
        <span class="btn-icon">🤖</span>
        <span class="btn-text">
          {{ aiLoading ? "分析中..." : showAIAnalysis ? "重新分析" : "AI分析" }}
        </span>
      </button>
      <button class="action-btn details-btn" @click="showDetails = !showDetails">
        <span class="btn-icon">👁️</span>
        <span class="btn-text">{{ showDetails ? "收起详情" : "详细信息" }}</span>
      </button>
      <button class="action-btn contact-btn" @click="quickContact">
        <span class="btn-icon">💬</span>
        <span class="btn-text">联系候选人</span>
      </button>
    </div>

    <!-- 简化的详细信息 -->
    <div v-if="showDetails && isExpanded" class="simple-details">
      <div class="detail-row">
        <span class="detail-label">当前公司：</span>
        <span class="detail-value">{{ candidate.currentCompany }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">求职状态：</span>
        <span class="detail-value">{{ candidate.status }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">期望薪资：</span>
        <span class="detail-value">{{ candidate.expectedSalary }}</span>
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
    }
  },
  setup(props) {
    const isExpanded = ref(false)
    const showDetails = ref(false)
    const showAIAnalysis = ref(false)
    const aiLoading = ref(false)
    const aiAnalysis = ref(null)
    const activeTab = ref(0)

    const tabs = [
      "综合评估",
      "能力雷达",
      "性格分析",
      "技能矩阵",
      "发展潜力",
      "风险评估",
    ]

    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value
    }

    const quickContact = () => {
      alert(`联系候选人：${props.candidate.name}`)
    }

    const generateAIAnalysis = () => {
      aiLoading.value = true
      setTimeout(() => {
        aiAnalysis.value = {
          summary: `${props.candidate.name}与岗位的匹配度达到${props.candidate.matchScore}%，综合能力评估显示该候选人具备优秀的技术实力和项目经验。`,
          strengths: [
            "技术能力强，掌握的技术栈与岗位需求高度吻合",
            "有大型项目经验，能够快速上手",
            "教育背景优秀，学习能力强",
          ],
          concerns: [
            "期望薪资可能略高于预算",
            "需要了解其离职原因",
            "建议深入考察团队协作能力",
          ],
          radarData: props.candidate.radarData,
          personality: {
            title: "性格特征分析",
            traits: [
              {
                name: "创新思维",
                score: 85,
                description: "善于提出新想法和解决方案",
              },
              {
                name: "团队协作",
                score: 78,
                description: "能够有效与团队成员合作",
              },
              {
                name: "抗压能力",
                score: 82,
                description: "能在高压环境下保持稳定表现",
              },
              { name: "沟通能力", score: 80, description: "表达清晰，善于倾听" },
              {
                name: "领导潜力",
                score: 75,
                description: "具备一定的团队领导潜质",
              },
            ],
          },
          skillsAnalysis: {
            title: "技能深度分析",
            core: ["Java", "Spring Boot", "微服务架构"],
            emerging: ["容器化技术", "云原生", "DevOps"],
            gaps: ["前端技术", "机器学习基础"],
            recommendations: [
              "建议加强前端技术的了解，有助于全栈发展",
              "可以深入学习Kubernetes等容器编排技术",
            ],
          },
          careerPath: {
            title: "职业发展预测",
            current: "高级工程师",
            shortTerm: "技术专家/架构师（1-2年）",
            midTerm: "技术总监/首席架构师（3-5年）",
            potential: "具备成为技术领导者的潜力",
          },
          marketAnalysis: {
            title: "市场竞争力分析",
            salary: {
              current: "35K",
              market: "30-40K",
              percentile: 75,
              trend: "上升",
            },
            demand: "高",
            rarity: "稀缺人才",
          },
          riskAssessment: {
            title: "风险评估",
            risks: [
              { type: "离职风险", level: "低", score: 25 },
              { type: "适应风险", level: "低", score: 20 },
              { type: "期望不匹配", level: "中", score: 45 },
              { type: "文化冲突", level: "低", score: 15 },
            ],
          },
          interviewSuggestions: {
            title: "面试建议",
            questions: [
              "请详细介绍您在分布式系统设计方面的经验",
              "如何处理高并发场景下的性能优化？",
              "团队协作中遇到分歧时，您通常如何处理？",
              "对于新技术的学习，您有什么方法和经验？",
            ],
            focus: ["技术深度", "问题解决能力", "团队协作", "学习能力"],
          },
          teamFit: {
            title: "团队契合度",
            score: 88,
            analysis:
              "该候选人的技术背景与团队需求高度匹配，工作风格偏向稳健务实，适合当前团队文化",
          },
        }
        aiLoading.value = false
        showAIAnalysis.value = true
      }, 1500)
    }

    return {
      isExpanded,
      showDetails,
      showAIAnalysis,
      aiLoading,
      aiAnalysis,
      activeTab,
      tabs,
      toggleExpand,
      quickContact,
      generateAIAnalysis
    }
  }
}
</script>

<style scoped>
/* 候选人卡片 - 下拉式设计 */
.candidate-card {
  background: white;
  border-radius: 16px;
  border: 1px solid #e8ecf3;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.candidate-card:hover {
  border-color: #667eea;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.12);
  transform: translateY(-3px);
}

.candidate-card.expanded {
  border-color: #667eea;
  box-shadow: 0 8px 28px rgba(102, 126, 234, 0.18);
  transform: translateY(-2px);
}

/* 候选人头部 - 可点击展开 */
.candidate-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.candidate-header:hover {
  background-color: #f8f9fa;
}

/* 头部右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* 匹配度指示器 - 右侧绿色高亮 */
.match-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
  min-width: 85px;
}

.match-score {
  font-size: 28px;
  font-weight: 800;
  color: white;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.match-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 2px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e9ecef;
}

.candidate-info {
  flex: 1;
  min-width: 0;
}

.candidate-name {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.candidate-meta {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 4px;
}

.candidate-summary {
  font-size: 13px;
  color: #868e96;
  line-height: 1.4;
}

.separator {
  margin: 0 6px;
  color: #dee2e6;
}

/* 展开控制按钮 */
.expand-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quick-action-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: #f8f9fa;
  color: #495057;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.quick-action-btn:hover {
  background: #e9ecef;
  transform: scale(1.05);
}

.expand-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: #667eea;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.expand-btn:hover {
  background: #5a6fd8;
  transform: scale(1.05);
}

.expand-btn.expanded {
  background: #495057;
}

.expand-icon {
  font-size: 14px;
  transition: transform 0.3s;
}

.expand-btn.expanded .expand-icon {
  transform: rotate(180deg);
}

/* 详细内容展开区域 */
.candidate-details {
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
  animation: slideDown 0.3s ease;
  max-height: 60vh;
  overflow-y: auto;
  position: relative;
}

.details-content {
  padding: 20px;
  max-height: none;
}

/* 自定义滚动条样式 */
.candidate-details::-webkit-scrollbar {
  width: 6px;
}

.candidate-details::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 3px;
}

.candidate-details::-webkit-scrollbar-thumb {
  background: #c1c7cd;
  border-radius: 3px;
}

.candidate-details::-webkit-scrollbar-thumb:hover {
  background: #a8b1ba;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 60vh;
  }
}

/* 详细内容各区块 */
.skills-section,
.highlight-section,
.recommend-section,
.education-section,
.work-section {
  margin-bottom: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.skills-section:last-child,
.highlight-section:last-child,
.recommend-section:last-child,
.education-section:last-child,
.work-section:last-child {
  margin-bottom: 0;
}

.skills-section h5,
.highlight-section h5,
.recommend-section h5,
.education-section h5,
.work-section h5 {
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #f1f3f4;
  padding-bottom: 6px;
}

/* 技能标签 */
.candidate-skills,
.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag,
.highlight-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.4;
}

.highlight-tag {
  background: #fff3e0;
  color: #f57c00;
}

/* 推荐理由 */
.recommend-reasons {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommend-reasons li {
  padding: 6px 0;
  font-size: 12px;
  color: #495057;
  position: relative;
  padding-left: 16px;
  line-height: 1.4;
}

.recommend-reasons li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: 600;
  font-size: 11px;
}

/* 教育经历 */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.education-item {
  background: #f8f9fa;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.degree {
  font-weight: 600;
  color: #495057;
  font-size: 13px;
}

.duration {
  font-size: 11px;
  color: #6c757d;
}

.edu-details {
  font-size: 12px;
  color: #6c757d;
}

/* 工作经历 */
.work-item {
  background: #f8f9fa;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  margin-bottom: 8px;
}

.work-item:last-child {
  margin-bottom: 0;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.company {
  font-weight: 600;
  color: #495057;
  font-size: 13px;
}

.position {
  font-size: 12px;
  color: #667eea;
  margin-bottom: 4px;
}

.description {
  font-size: 11px;
  color: #6c757d;
  line-height: 1.4;
}

/* 展开状态下的操作按钮 */
.expanded-actions {
  padding: 16px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.action-btn {
  background: white;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.action-btn.ai-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.action-btn.ai-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn.contact-btn {
  background: #28a745;
  color: white;
  border: none;
}

.action-btn.contact-btn:hover {
  background: #218838;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 14px;
}

.btn-text {
  font-size: 12px;
}

/* 简化的详细信息 */
.simple-details {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #e9ecef;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 13px;
}

.detail-label {
  color: #6c757d;
  font-weight: 500;
}

.detail-value {
  color: #495057;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .candidate-header {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .candidate-basic-info {
    width: 100%;
  }

  .header-right {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .match-indicator {
    min-width: 70px;
    padding: 10px 14px;
  }

  .match-score {
    font-size: 24px;
  }

  .expand-controls {
    gap: 6px;
  }

  .candidate-details {
    max-height: 40vh;
  }

  .details-content {
    padding: 16px;
  }

  .expanded-actions {
    padding: 12px 16px;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }

  /* 移动端匹配度优化 */
  .match-indicator {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    border-radius: 10px;
    padding: 8px 12px;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.15);
  }
}

/* 中等屏幕优化 */
@media (max-width: 1200px) and (min-width: 769px) {
  .candidate-details {
    max-height: 50vh;
  }
}

/* 小屏幕进一步优化 */
@media (max-width: 480px) {
  .candidate-details {
    max-height: 35vh;
  }

  .details-content {
    padding: 12px;
  }
  
  .skills-section,
  .highlight-section,
  .recommend-section,
  .education-section,
  .work-section {
    margin-bottom: 12px;
    padding: 12px;
  }
  
  .candidate-header {
    padding: 12px;
  }
}

/* 加载状态 */
.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.action-btn:disabled:hover {
  transform: none !important;
}
</style>
