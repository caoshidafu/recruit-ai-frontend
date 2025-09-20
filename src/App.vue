<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">智能简历推荐系统 - 岗位推荐</h1>
      <div class="header-right">
        <button class="icon-button">
          <span class="icon">🔔</span>
          <span class="badge">3</span>
        </button>
        <button class="icon-button">
          <span class="icon">⚙️</span>
        </button>
        <div class="user-info">
          <img src="https://i.pravatar.cc/32" alt="User" />
          <span>HR Manager</span>
        </div>
      </div>
    </header>

    <div class="app-body">
      <aside class="sidebar">
        <div class="sidebar-section">
          <h2>在招岗位</h2>
          <div class="job-list">
            <JobCard
              v-for="job in mockData.jobs"
              :key="job.id"
              :job="job"
              :isActive="selectedJob?.id === job.id"
              @click="setSelectedJob(job)"
            />
          </div>

          <button class="create-job-btn">
            <span>➕</span> 发布新岗位
          </button>
        </div>
      </aside>

      <main class="main-content">
        <div class="content-header">
          <div class="job-summary">
            <h2>{{ selectedJob?.title }}</h2>
            <div class="job-tags">
              <span class="tag">{{ selectedJob?.department }}</span>
              <span class="tag">{{ selectedJob?.location }}</span>
              <span class="tag">{{ selectedJob?.salary }}</span>
            </div>
          </div>
          <div class="view-controls">
            <button
              :class="`view-btn ${viewMode === 'split' ? 'active' : ''}`"
              @click="viewMode = 'split'"
            >
              分栏视图
            </button>
            <button
              :class="`view-btn ${viewMode === 'candidates' ? 'active' : ''}`"
              @click="viewMode = 'candidates'"
            >
              候选人视图
            </button>
          </div>
        </div>

        <div :class="`content-body ${viewMode}`">
          <div v-if="viewMode === 'split'" class="left-panel">
            <JobDetail
              :job="selectedJob"
              :showDetail="showJobDetail"
              @toggle="showJobDetail = !showJobDetail"
            />
          </div>

          <div class="candidates-panel">
            <div class="panel-header">
              <h3>推荐候选人 ({{ currentCandidates.length }})</h3>
              <select
                class="recommend-select"
                v-model="recommendType"
              >
                <option
                  v-for="option in recommendOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="candidates-list">
              <CandidateCard
                v-for="candidate in currentCandidates"
                :key="candidate.id"
                :candidate="candidate"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import JobCard from './components/JobCard.vue'
import CandidateCard from './components/CandidateCard.vue'
import JobDetail from './components/JobDetail.vue'
import { mockData } from './data/mockData.js'

export default {
  name: 'App',
  components: {
    JobCard,
    CandidateCard,
    JobDetail
  },
  setup() {
    const selectedJob = ref(mockData.jobs[0])
    const recommendType = ref('smart')
    const showJobDetail = ref(true)
    const viewMode = ref('split')

    const currentCandidates = computed(() => {
      return mockData.candidates[recommendType.value] || []
    })

    const recommendOptions = [
      { value: 'smart', label: '智能推荐' },
      { value: 'experience', label: '经验推荐' },
      { value: 'education', label: '学历推荐' },
    ]

    const setSelectedJob = (job) => {
      selectedJob.value = job
    }

    return {
      selectedJob,
      recommendType,
      showJobDetail,
      viewMode,
      currentCandidates,
      recommendOptions,
      mockData,
      setSelectedJob
    }
  }
}
</script>

<style>
/* 全局样式将在单独的CSS文件中定义 */
</style>