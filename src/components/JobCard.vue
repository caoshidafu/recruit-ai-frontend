<template>
  <div 
    :class="`job-card ${isActive ? 'active' : ''}`" 
    @click="$emit('click')"
  >
    <!-- 选中状态指示器 -->
    <div v-if="isActive" class="selection-indicator">
      <div class="selection-icon">✓</div>
    </div>
    <div class="job-card-header">
      <h3 class="job-title">
        {{ job.title }}
        <span
          class="urgency-tag"
          :style="{ backgroundColor: urgencyColors[job.urgency] }"
        >
          {{ urgencyLabels[job.urgency] }}
        </span>
      </h3>
      <div class="job-meta">
        <span class="meta-item">
          <span class="label">部门：</span>
          {{ job.department }}
        </span>
        <span class="meta-item">
          <span class="label">地点：</span>
          {{ job.location }}
        </span>
        <span class="meta-item">
          <span class="label">经验：</span>
          {{ job.experience }}
        </span>
      </div>
    </div>

    <div class="job-stats">
      <div class="stat">
        <span class="stat-value">{{ job.candidateCount }}</span>
        <span class="stat-label">候选人</span>
      </div>
      <div class="stat">
        <span class="stat-value new">{{ job.newCandidates }}</span>
        <span class="stat-label">推荐</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ job.interviewingCount }}</span>
        <span class="stat-label">面试中</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ job.headcount }}</span>
        <span class="stat-label">需求人数</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup() {
    const urgencyColors = {
      high: "#FF6B6B",
      normal: "#52C41A",
    }

    const urgencyLabels = {
      high: "急招",
      normal: "正常",
    }

    return {
      urgencyColors,
      urgencyLabels
    }
  }
}
</script>

<style scoped>
.job-card {
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.job-card:hover {
  border-color: var(--primary-light);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.job-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8ebff 100%);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
  position: relative;
}

.job-card.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px 0 0 2px;
}

.job-card.active .job-title {
  color: #667eea;
  font-weight: 700;
}

.job-card.active .stat-value {
  color: #667eea;
  font-weight: 700;
}

/* 选中状态指示器 */
.selection-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.selection-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: scaleIn 0.3s ease-out;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 选中状态下的悬停效果 */
.job-card.active:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
}

.job-card-header {
  margin-bottom: 16px;
}

.job-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.urgency-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--gray-600);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta-item .label {
  color: var(--gray-500);
}

.job-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-800);
}

.stat-value.new {
  color: var(--success);
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--gray-500);
}
</style>
