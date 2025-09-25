<template>
  <div class="bar-chart">
    <svg
      :width="chartWidth"
      :height="height"
      :viewBox="`0 0 ${chartWidth} ${height}`"
    >
      <!-- 定义渐变 -->
      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#1e40af" stop-opacity="0.6"/>
        </linearGradient>
        <linearGradient id="warningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#d97706" stop-opacity="0.6"/>
        </linearGradient>
        <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#dc2626" stop-opacity="0.6"/>
        </linearGradient>
      </defs>

      <!-- Y轴网格线和标签 -->
      <g class="y-axis">
        <line
          v-for="(tick, index) in yAxisTicks"
          :key="`y-${index}`"
          :x1="chartPadding.left"
          :y1="getYPosition(tick)"
          :x2="chartWidth - chartPadding.right"
          :y2="getYPosition(tick)"
          stroke="#e5e7eb"
          stroke-width="1"
          stroke-dasharray="2,2"
        />
        <text
          v-for="(tick, index) in yAxisTicks"
          :key="`y-label-${index}`"
          :x="chartPadding.left - 10"
          :y="getYPosition(tick) + 4"
          text-anchor="end"
          font-size="12"
          fill="#6b7280"
        >
          {{ tick }}
        </text>
      </g>

      <!-- 柱状图 -->
      <g class="bars">
        <rect
          v-for="(item, index) in chartData"
          :key="`bar-${index}`"
          :x="getXPosition(index)"
          :y="getYPosition(item.value)"
          :width="barWidth"
          :height="getBarHeight(item.value)"
          :fill="getBarColor(item.status)"
          :class="`bar bar-${item.status}`"
          @click="handleBarClick(item, index)"
          @mouseover="handleMouseOver(item, index, $event)"
          @mouseout="handleMouseOut"
        />
      </g>

      <!-- X轴标签 -->
      <g class="x-axis">
        <text
          v-for="(item, index) in chartData"
          :key="`x-label-${index}`"
          :x="getXPosition(index) + barWidth / 2"
          :y="height - chartPadding.bottom + 20"
          text-anchor="middle"
          font-size="12"
          fill="#374151"
          font-weight="500"
        >
          {{ truncateLabel(item.label) }}
        </text>
      </g>

      <!-- 数值标签 -->
      <g class="value-labels">
        <text
          v-for="(item, index) in chartData"
          :key="`value-${index}`"
          :x="getXPosition(index) + barWidth / 2"
          :y="getYPosition(item.value) - 8"
          text-anchor="middle"
          font-size="11"
          font-weight="600"
          fill="#374151"
        >
          {{ item.value }}
        </text>
      </g>
    </svg>

    <!-- 提示框 -->
    <div
      v-if="tooltip.visible"
      class="tooltip"
      :style="{
        left: tooltip.x + 'px',
        top: tooltip.y + 'px'
      }"
    >
      <div class="tooltip-title">{{ tooltip.data.label }}</div>
      <div class="tooltip-content">
        <div class="tooltip-row">
          <span class="tooltip-label">健康度:</span>
          <span class="tooltip-value">{{ tooltip.data.value }}%</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">状态:</span>
          <span :class="`tooltip-status status-${tooltip.data.status}`">
            {{ getStatusText(tooltip.data.status) }}
          </span>
        </div>
        <div v-if="tooltip.data.candidates" class="tooltip-row">
          <span class="tooltip-label">候选人:</span>
          <span class="tooltip-value">{{ tooltip.data.candidates }}人</span>
        </div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background: #10b981;"></div>
        <span>健康 (80%+)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #f59e0b;"></div>
        <span>预警 (50-79%)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color" style="background: #ef4444;"></div>
        <span>危险 (&lt;50%)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Object,
      required: true
    },
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 0 // 0表示自适应
    }
  },
  emits: ['bar-click'],
  setup(props, { emit }) {
    // 响应式数据
    const tooltip = ref({
      visible: false,
      x: 0,
      y: 0,
      data: {}
    })

    // 图表配置
    const chartPadding = {
      top: 20,
      right: 30,
      bottom: 60,
      left: 60
    }

    // 计算属性
    const chartWidth = computed(() => {
      return props.width || 500 // 默认宽度
    })

    const chartData = computed(() => {
      if (!props.data.jobs || !Array.isArray(props.data.jobs)) {
        return []
      }
      
      return props.data.jobs.map(job => ({
        label: job.title,
        value: job.healthScore,
        status: getHealthStatus(job.healthScore),
        jobId: job.jobId,
        candidates: job.candidates,
        ...job
      }))
    })

    const maxValue = computed(() => {
      const values = chartData.value.map(item => item.value)
      return Math.max(...values, 100) // 至少100%
    })

    const yAxisTicks = computed(() => {
      const max = maxValue.value
      const step = Math.ceil(max / 5 / 10) * 10 // 取整到10的倍数
      const ticks = []
      for (let i = 0; i <= max; i += step) {
        ticks.push(i)
      }
      return ticks
    })

    const barWidth = computed(() => {
      const availableWidth = chartWidth.value - chartPadding.left - chartPadding.right
      const barCount = chartData.value.length
      return Math.max(40, (availableWidth - (barCount - 1) * 20) / barCount) // 最小40px宽度，间距20px
    })

    // 方法
    const getHealthStatus = (score) => {
      if (score >= 80) return 'healthy'
      if (score >= 50) return 'warning'
      return 'danger'
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'healthy': return '健康'
        case 'warning': return '预警'
        case 'danger': return '危险'
        default: return '未知'
      }
    }

    const getBarColor = (status) => {
      switch (status) {
        case 'healthy': return '#10b981'
        case 'warning': return '#f59e0b'
        case 'danger': return '#ef4444'
        default: return '#6b7280'
      }
    }

    const getXPosition = (index) => {
      return chartPadding.left + index * (barWidth.value + 20)
    }

    const getYPosition = (value) => {
      const chartHeight = props.height - chartPadding.top - chartPadding.bottom
      const ratio = value / maxValue.value
      return chartPadding.top + chartHeight * (1 - ratio)
    }

    const getBarHeight = (value) => {
      const chartHeight = props.height - chartPadding.top - chartPadding.bottom
      return (value / maxValue.value) * chartHeight
    }

    const truncateLabel = (label) => {
      return label.length > 8 ? label.substring(0, 6) + '...' : label
    }

    const handleBarClick = (item) => {
      console.log('点击柱状图:', item)
      emit('bar-click', item)
    }

    const handleMouseOver = (item, index, event) => {
      const rect = event.target.getBoundingClientRect()
      tooltip.value = {
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        data: item
      }
    }

    const handleMouseOut = () => {
      tooltip.value.visible = false
    }

    return {
      // 数据
      tooltip,
      chartPadding,
      chartWidth,
      chartData,
      maxValue,
      yAxisTicks,
      barWidth,
      
      // 方法
      getHealthStatus,
      getStatusText,
      getBarColor,
      getXPosition,
      getYPosition,
      getBarHeight,
      truncateLabel,
      handleBarClick,
      handleMouseOver,
      handleMouseOut
    }
  }
}
</script>

<style scoped>
.bar-chart {
  position: relative;
  width: 100%;
}

.bar {
  cursor: pointer;
  transition: all 0.2s ease;
}

.bar:hover {
  opacity: 0.8;
  filter: brightness(1.1);
}

.bar.bar-healthy {
  fill: #10b981;
}

.bar.bar-warning {
  fill: #f59e0b;
}

.bar.bar-danger {
  fill: #ef4444;
}

.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  min-width: 150px;
  transform: translateX(-50%) translateY(-100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 4px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.tooltip-row:last-child {
  margin-bottom: 0;
}

.tooltip-label {
  opacity: 0.8;
}

.tooltip-value {
  font-weight: 500;
}

.tooltip-status {
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.status-healthy {
  background: #10b981;
}

.status-warning {
  background: #f59e0b;
}

.status-danger {
  background: #ef4444;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .legend {
    gap: 16px;
    margin-top: 12px;
  }
  
  .legend-item {
    font-size: 11px;
  }
  
  .tooltip {
    font-size: 11px;
    min-width: 120px;
  }
}
</style>


