<template>
  <div class="candidate-card">
    <div class="match-indicator">
      <div class="match-score">{{ candidate.matchScore }}%</div>
      <span class="match-label">匹配度</span>
    </div>

    <div class="candidate-header">
      <img
        :src="candidate.avatar"
        :alt="candidate.name"
        class="candidate-avatar"
      />
      <div class="candidate-info">
        <h4 class="candidate-name">{{ candidate.name }}</h4>
        <div class="candidate-meta">
          <span>{{ candidate.experience }}年经验</span>
          <span class="separator">|</span>
          <span>{{ candidate.title }}</span>
          <span class="separator">|</span>
          <span>{{ candidate.location }}</span>
        </div>
      </div>
    </div>

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

    <div class="recommend-section">
      <h5>推荐理由</h5>
      <ul class="recommend-reasons">
        <li v-for="(reason, index) in candidate.recommendReasons" :key="index">
          {{ reason }}
        </li>
      </ul>
    </div>

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

    <div v-if="showDetails" class="candidate-details">
      <h5>详细信息</h5>
      <div class="detail-content">
        <div class="detail-item">
          <span class="detail-label">当前公司：</span>
          <span class="detail-value">{{ candidate.currentCompany }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">求职状态：</span>
          <span class="detail-value">{{ candidate.status }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">期望薪资：</span>
          <span class="detail-value">{{ candidate.expectedSalary }}</span>
        </div>
      </div>
    </div>

    <div v-if="showAIAnalysis && aiAnalysis" class="ai-analysis-section">
      <h5>🤖 AI 智能分析报告</h5>

      <!-- 分析导航标签 -->
      <div class="ai-tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          :class="`ai-tab ${activeTab === index ? 'active' : ''}`"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <div class="ai-content">
        <!-- 综合评估 -->
        <div v-if="activeTab === 0" class="ai-section">
          <p class="ai-summary">{{ aiAnalysis.summary }}</p>

          <div class="ai-metrics">
            <div class="metric-card">
              <div class="metric-icon">📊</div>
              <div class="metric-value">{{ candidate.matchScore }}%</div>
              <div class="metric-label">综合匹配度</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon">⭐</div>
              <div class="metric-value">4.5/5</div>
              <div class="metric-label">推荐指数</div>
            </div>
            <div class="metric-card">
              <div class="metric-icon">🎯</div>
              <div class="metric-value">高</div>
              <div class="metric-label">成功概率</div>
            </div>
          </div>

          <div class="ai-detail">
            <h6>✅ 优势分析</h6>
            <ul>
              <li v-for="(item, index) in aiAnalysis.strengths" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="ai-detail">
            <h6>⚠️ 注意事项</h6>
            <ul>
              <li v-for="(item, index) in aiAnalysis.concerns" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 能力雷达 -->
        <div v-if="activeTab === 1" class="ai-section">
          <div class="ai-radar-section">
            <h6>多维能力评估雷达图</h6>
            <RadarChart :data="aiAnalysis.radarData" />
          </div>

          <div class="radar-insights">
            <h6>能力洞察</h6>
            <div class="insight-cards">
              <div class="insight-card strong">
                <div class="insight-label">最强项</div>
                <div class="insight-value">技能匹配 (95%)</div>
              </div>
              <div class="insight-card weak">
                <div class="insight-label">待提升</div>
                <div class="insight-value">稳定性 (80%)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 性格分析 -->
        <div v-if="activeTab === 2 && aiAnalysis.personality" class="ai-section">
          <h6>{{ aiAnalysis.personality.title }}</h6>
          <div class="personality-traits">
            <div
              v-for="(trait, index) in aiAnalysis.personality.traits"
              :key="index"
              class="trait-item"
            >
              <div class="trait-header">
                <span class="trait-name">{{ trait.name }}</span>
                <span class="trait-score">{{ trait.score }}分</span>
              </div>
              <div class="trait-bar">
                <div
                  class="trait-fill"
                  :style="{ width: `${trait.score}%` }"
                />
              </div>
              <div class="trait-desc">{{ trait.description }}</div>
            </div>
          </div>

          <div class="personality-summary">
            <h6>性格总结</h6>
            <p>
              候选人展现出积极主动、善于创新的性格特质，适合需要独立思考和解决问题的岗位。
            </p>
          </div>
        </div>

        <!-- 技能矩阵 -->
        <div v-if="activeTab === 3 && aiAnalysis.skillsAnalysis" class="ai-section">
          <h6>{{ aiAnalysis.skillsAnalysis.title }}</h6>

          <div class="skills-matrix">
            <div class="skill-category">
              <h6>🎯 核心技能</h6>
              <div class="skill-tags">
                <span
                  v-for="skill in aiAnalysis.skillsAnalysis.core"
                  :key="skill"
                  class="skill-tag core"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="skill-category">
              <h6>🚀 新兴技能</h6>
              <div class="skill-tags">
                <span
                  v-for="skill in aiAnalysis.skillsAnalysis.emerging"
                  :key="skill"
                  class="skill-tag emerging"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="skill-category">
              <h6>📚 待补充技能</h6>
              <div class="skill-tags">
                <span
                  v-for="skill in aiAnalysis.skillsAnalysis.gaps"
                  :key="skill"
                  class="skill-tag gap"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <div class="skill-recommendations">
            <h6>提升建议</h6>
            <ul>
              <li
                v-for="(rec, index) in aiAnalysis.skillsAnalysis.recommendations"
                :key="index"
              >
                {{ rec }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 发展潜力 -->
        <div v-if="activeTab === 4 && aiAnalysis.careerPath" class="ai-section">
          <h6>{{ aiAnalysis.careerPath.title }}</h6>

          <div class="career-timeline">
            <div class="timeline-item current">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-title">当前</div>
                <div class="timeline-role">
                  {{ aiAnalysis.careerPath.current }}
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-title">短期发展</div>
                <div class="timeline-role">
                  {{ aiAnalysis.careerPath.shortTerm }}
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-title">中期目标</div>
                <div class="timeline-role">
                  {{ aiAnalysis.careerPath.midTerm }}
                </div>
              </div>
            </div>
          </div>

          <div class="potential-assessment">
            <p>{{ aiAnalysis.careerPath.potential }}</p>
          </div>

          <!-- 市场分析 -->
          <div class="market-analysis">
            <h6>{{ aiAnalysis.marketAnalysis.title }}</h6>
            <div class="market-info">
              <div class="info-item">
                <span class="info-label">市场薪资区间：</span>
                <span class="info-value">
                  {{ aiAnalysis.marketAnalysis.salary.market }}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">薪资水平：</span>
                <span class="info-value">
                  前{{ 100 - aiAnalysis.marketAnalysis.salary.percentile }}%
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">人才稀缺度：</span>
                <span class="info-value">
                  {{ aiAnalysis.marketAnalysis.rarity }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 风险评估 -->
        <div v-if="activeTab === 5 && aiAnalysis.riskAssessment" class="ai-section">
          <h6>{{ aiAnalysis.riskAssessment.title }}</h6>

          <div class="risk-matrix">
            <div
              v-for="(risk, index) in aiAnalysis.riskAssessment.risks"
              :key="index"
              class="risk-item"
            >
              <div class="risk-header">
                <span class="risk-type">{{ risk.type }}</span>
                <span :class="`risk-level ${risk.level}`">
                  {{ risk.level }}
                </span>
              </div>
              <div class="risk-bar">
                <div
                  :class="`risk-fill ${risk.level}`"
                  :style="{ width: `${risk.score}%` }"
                />
              </div>
            </div>
          </div>

          <!-- 面试建议 -->
          <div class="interview-suggestions">
            <h6>{{ aiAnalysis.interviewSuggestions.title }}</h6>
            <div class="suggested-questions">
              <div
                v-for="(q, index) in aiAnalysis.interviewSuggestions.questions"
                :key="index"
                class="question-item"
              >
                <span class="question-number">{{ index + 1 }}</span>
                <span class="question-text">{{ q }}</span>
              </div>
            </div>

            <div class="focus-areas">
              <h6>重点考察方向</h6>
              <div class="focus-tags">
                <span
                  v-for="area in aiAnalysis.interviewSuggestions.focus"
                  :key="area"
                  class="focus-tag"
                >
                  {{ area }}
                </span>
              </div>
            </div>
          </div>

          <!-- 团队契合度 -->
          <div class="team-fit">
            <h6>{{ aiAnalysis.teamFit.title }}</h6>
            <div class="fit-score">
              <div class="score-circle">
                <span class="score-value">
                  {{ aiAnalysis.teamFit.score }}%
                </span>
              </div>
              <p class="fit-analysis">
                {{ aiAnalysis.teamFit.analysis }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- AI分析操作栏 -->
      <div class="ai-actions">
        <button class="ai-action-btn download">
          <span>📥</span> 下载报告
        </button>
        <button class="ai-action-btn share">
          <span>🔗</span> 分享报告
        </button>
        <button class="ai-action-btn compare">
          <span>📊</span> 对比分析
        </button>
      </div>
    </div>

    <div class="candidate-actions">
      <button
        class="action-btn details-btn"
        @click="showDetails = !showDetails"
      >
        <span class="btn-icon">👁️</span>
        <span class="btn-text">
          {{ showDetails ? "收起详情" : "查看详情" }}
        </span>
      </button>
      <button class="action-btn contact-btn">
        <span class="btn-icon">💬</span>
        <span class="btn-text">联系候选人</span>
      </button>
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import RadarChart from './RadarChart.vue'

export default {
  name: 'CandidateCard',
  components: {
    RadarChart
  },
  props: {
    candidate: {
      type: Object,
      required: true
    }
  },
  setup(props) {
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
      showDetails,
      showAIAnalysis,
      aiLoading,
      aiAnalysis,
      activeTab,
      tabs,
      generateAIAnalysis
    }
  }
}
</script>

<style scoped>
/* 基础样式在这里会太长，我会在后面的样式文件中统一添加 */
</style>
