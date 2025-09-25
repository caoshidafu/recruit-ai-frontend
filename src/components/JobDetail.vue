<template>
  <div v-if="job" :class="`job-detail ${showDetail ? 'show' : 'hide'}`">
    <div class="detail-header">
      <h3>岗位详情</h3>
      <button class="toggle-btn" @click="$emit('toggle')">
        {{ showDetail ? "隐藏" : "显示" }}
      </button>
    </div>

    <template v-if="showDetail">
      <div class="detail-section">
        <h4>岗位描述</h4>
        <div class="description-content">
          <p v-if="typeof job.description === 'string'" class="description-item">
            {{ job.description }}
          </p>
          <div v-else-if="Array.isArray(job.description)" class="description-list">
            <p 
              v-for="(desc, index) in job.description" 
              :key="index" 
              class="description-item"
            >
              {{ desc }}
            </p>
          </div>
          <p v-else class="description-item">
            暂无岗位描述
          </p>
        </div>
      </div>

      <div class="detail-section">
        <h4>岗位要求</h4>
        <ul class="requirements-list">
          <li v-for="(req, index) in job.requirements" :key="index">
            ✅ {{ req }}
          </li>
        </ul>
      </div>

      <div class="detail-section">
        <h4>技能要求</h4>
        <div class="skills-required">
          <span
            v-for="skill in job.skills"
            :key="skill"
            class="skill-tag large"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="detail-section">
        <h4>福利待遇</h4>
        <div class="benefits">
          <span
            v-for="benefit in job.benefits"
            :key="benefit"
            class="benefit-tag"
          >
            {{ benefit }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  props: {
    job: {
      type: Object,
      default: null
    },
    showDetail: {
      type: Boolean,
      default: true
    }
  },
  emits: ['toggle']
}
</script>

<style scoped>
.job-detail {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detail-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
}

.toggle-btn {
  padding: 4px 12px;
  background: var(--gray-100);
  border: none;
  border-radius: 6px;
  font-size: 13px;
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: var(--gray-200);
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.detail-section p {
  font-size: 14px;
  color: var(--gray-600);
  line-height: 1.6;
}

.description-content {
  font-size: 14px;
  color: var(--gray-600);
  line-height: 1.6;
}

.description-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description-item {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: var(--gray-600);
  line-height: 1.6;
}

.description-list .description-item {
  padding: 12px 16px;
  background: var(--gray-50);
  border-radius: 8px;
  border-left: 3px solid var(--primary);
  position: relative;
}

.description-list .description-item::before {
  content: counter(desc-counter);
  counter-increment: desc-counter;
  position: absolute;
  left: -12px;
  top: 12px;
  background: var(--primary);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.description-list {
  counter-reset: desc-counter;
}

.requirements-list {
  list-style: none;
  font-size: 14px;
  color: var(--gray-600);
  padding: 0;
}

.requirements-list li {
  padding: 6px 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.skills-required,
.benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 4px 12px;
  background: var(--gray-100);
  color: var(--gray-700);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.skill-tag.large {
  padding: 6px 14px;
  font-size: 13px;
}

.benefit-tag {
  padding: 6px 14px;
  background: #10b98115;
  color: var(--success);
  border: 1px solid #10b98130;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
}
</style>
