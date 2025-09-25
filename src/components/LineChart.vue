<template>
  <div class="line-chart">
    <svg
      :width="chartWidth"
      :height="height"
      :viewBox="`0 0 ${chartWidth} ${height}`"
    >
      <!-- 定义渐变和滤镜 -->
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.8"/>
        </linearGradient>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05"/>
        </linearGradient>
        <filter id="dropShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2"/>
        </filter>
      </defs>

      <!-- 网格线 -->
      <g class="grid">
        <!-- 水平网格线 -->
        <line
          v-for="(tick, index) in yAxisTicks"
          :key="`h-grid-${index}`"
          :x1="chartPadding.left"
          :y1="getYPosition(tick)"
          :x2="chartWidth - chartPadding.right"
          :y2="getYPosition(tick)"
          stroke="#e5e7eb"
          stroke-width="1"
          stroke-dasharray="2,2"
          opacity="0.6"
        />
        
        <!-- 垂直网格线 -->
        <line
          v-for="(point, index) in chartData"
          :key="`v-grid-${index}`"
          :x1="getXPosition(index)"
          :y1="chartPadding.top"
          :x2="getXPosition(index)"
          :y2="height - chartPadding.bottom"
          stroke="#e5e7eb"
          stroke-width="1"
          stroke-dasharray="2,2"
          opacity="0.3"
        />
      </g>

      <!-- Y轴标签 -->
      <g class="y-axis">
        <text
          v-for="(tick, index) in yAxisTicks"
          :key="`y-label-${index}`"
          :x="chartPadding.left - 10"
          :y="getYPosition(tick) + 4"
          text-anchor="end"
          font-size="11"
          fill="#6b7280"
        >
          {{ tick }}
        </text>
      </g>

      <!-- X轴标签 -->
      <g class="x-axis">
        <text
          v-for="(point, index) in chartData"
          :key="`x-label-${index}`"
          :x="getXPosition(index)"
          :y="height - chartPadding.bottom + 16"
          text-anchor="middle"
          font-size="11"
          fill="#6b7280"
        >
          {{ point.label }}
        </text>
      </g>

      <!-- 面积填充 -->
      <path
        :d="areaPath"
        fill="url(#areaGradient)"
        opacity="0.6"
        class="area-fill"
      />

      <!-- 趋势线 -->
      <path
        :d="linePath"
        fill="none"
        stroke="url(#lineGradient)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#dropShadow)"
        class="trend-line"
      />

      <!-- 数据点 -->
      <g class="data-points">
        <circle
          v-for="(point, index) in chartData"
          :key="`point-${index}`"
          :cx="getXPosition(index)"
          :cy="getYPosition(point.value)"
          r="5"
          fill="white"
          stroke="#3b82f6"
          stroke-width="3"
          class="data-point"
          @mouseover="handlePointHover(point, index, $event)"
          @mouseout="handlePointOut"
          @click="handlePointClick(point, index)"
        />
      </g>

      <!-- 数值标签 -->
      <g class="value-labels">
        <text
          v-for="(point, index) in chartData"
          :key="`value-${index}`"
          :x="getXPosition(index)"
          :y="getYPosition(point.value) - 15"
          text-anchor="middle"
          font-size="10"
          font-weight="600"
          fill="#374151"
          class="value-label"
        >
          {{ point.value }}
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
      <div class="tooltip-title">{{ tooltip.data.date || tooltip.data.label }}</div>
      <div class="tooltip-content">
        <div class="tooltip-row">
          <span class="tooltip-label">候选人数:</span>
          <span class="tooltip-value">{{ tooltip.data.value }}</span>
        </div>
        <div v-if="tooltip.data.trend" class="tooltip-row">
          <span class="tooltip-label">趋势:</span>
          <span :class="`tooltip-trend trend-${tooltip.data.trend.type}`">
            {{ tooltip.data.trend.text }}
          </span>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="chart-stats">
      <div class="stat-item">
        <span class="stat-label">最高值:</span>
        <span class="stat-value">{{ maxValue }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">平均值:</span>
        <span class="stat-value">{{ averageValue }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">总增长:</span>
        <span :class="`stat-value ${totalGrowth >= 0 ? 'positive' : 'negative'}`">
          {{ totalGrowth >= 0 ? '+' : '' }}{{ totalGrowth }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'LineChart',
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
  emits: ['point-click'],
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
      top: 30,
      right: 30,
      bottom: 40,
      left: 60
    }

    // 计算属性
    const chartWidth = computed(() => {
      return props.width || 600 // 默认宽度
    })

    const chartData = computed(() => {
      if (!props.data.points || !Array.isArray(props.data.points)) {
        return []
      }
      return props.data.points
    })

    const maxValue = computed(() => {
      if (chartData.value.length === 0) return 100
      const values = chartData.value.map(point => point.value)
      return Math.max(...values)
    })

    const minValue = computed(() => {
      if (chartData.value.length === 0) return 0
      const values = chartData.value.map(point => point.value)
      return Math.min(...values, 0)
    })

    const averageValue = computed(() => {
      if (chartData.value.length === 0) return 0
      const sum = chartData.value.reduce((acc, point) => acc + point.value, 0)
      return Math.round(sum / chartData.value.length)
    })

    const totalGrowth = computed(() => {
      if (chartData.value.length < 2) return 0
      const first = chartData.value[0].value
      const last = chartData.value[chartData.value.length - 1].value
      return last - first
    })

    const yAxisTicks = computed(() => {
      const max = maxValue.value
      const min = minValue.value
      const range = max - min
      const step = Math.ceil(range / 5 / 10) * 10 // 取整到10的倍数
      const ticks = []
      
      for (let i = min; i <= max; i += step) {
        ticks.push(i)
      }
      
      // 确保包含最大值
      if (ticks[ticks.length - 1] < max) {
        ticks.push(max)
      }
      
      return ticks
    })

    const linePath = computed(() => {
      if (chartData.value.length === 0) return ''
      
      return chartData.value
        .map((point, index) => {
          const x = getXPosition(index)
          const y = getYPosition(point.value)
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
        })
        .join(' ')
    })

    const areaPath = computed(() => {
      if (chartData.value.length === 0) return ''
      
      const pathPoints = chartData.value
        .map((point, index) => {
          const x = getXPosition(index)
          const y = getYPosition(point.value)
          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
        })
        .join(' ')
      
      // 添加底部闭合路径
      const firstX = getXPosition(0)
      const lastX = getXPosition(chartData.value.length - 1)
      const bottomY = getYPosition(minValue.value)
      
      return `${pathPoints} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
    })

    // 方法
    const getXPosition = (index) => {
      const availableWidth = chartWidth.value - chartPadding.left - chartPadding.right
      const step = availableWidth / Math.max(1, chartData.value.length - 1)
      return chartPadding.left + index * step
    }

    const getYPosition = (value) => {
      const availableHeight = props.height - chartPadding.top - chartPadding.bottom
      const range = maxValue.value - minValue.value
      const ratio = range > 0 ? (value - minValue.value) / range : 0
      return chartPadding.top + availableHeight * (1 - ratio)
    }

    const handlePointHover = (point, index, event) => {
      const rect = event.target.getBoundingClientRect()
      tooltip.value = {
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        data: point
      }
    }

    const handlePointOut = () => {
      tooltip.value.visible = false
    }

    const handlePointClick = (point) => {
      console.log('点击数据点:', point)
      emit('point-click', point)
    }

    return {
      // 数据
      tooltip,
      chartPadding,
      chartWidth,
      chartData,
      maxValue,
      minValue,
      averageValue,
      totalGrowth,
      yAxisTicks,
      linePath,
      areaPath,
      
      // 方法
      getXPosition,
      getYPosition,
      handlePointHover,
      handlePointOut,
      handlePointClick
    }
  }
}
</script>

<style scoped>
.line-chart {
  position: relative;
  width: 100%;
}

.trend-line {
  transition: all 0.3s ease;
}

.data-point {
  cursor: pointer;
  transition: all 0.2s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.data-point:hover {
  r: 7;
  stroke-width: 4;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.value-label {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.data-point:hover + .value-label {
  opacity: 1;
  font-weight: 700;
}

.area-fill {
  transition: opacity 0.3s ease;
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

.tooltip-trend {
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
}

.trend-up {
  background: #10b981;
  color: white;
}

.trend-down {
  background: #ef4444;
  color: white;
}

.trend-stable {
  background: #6b7280;
  color: white;
}

.chart-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.stat-value.positive {
  color: #10b981;
}

.stat-value.negative {
  color: #ef4444;
}

/* 动画效果 */
.trend-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 2s ease-in-out forwards;
}

.data-point {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

.data-point:nth-child(1) { animation-delay: 0.2s; }
.data-point:nth-child(2) { animation-delay: 0.4s; }
.data-point:nth-child(3) { animation-delay: 0.6s; }
.data-point:nth-child(4) { animation-delay: 0.8s; }
.data-point:nth-child(5) { animation-delay: 1.0s; }
.data-point:nth-child(6) { animation-delay: 1.2s; }
.data-point:nth-child(7) { animation-delay: 1.4s; }

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .chart-stats {
    gap: 16px;
    margin-top: 12px;
    padding: 8px;
  }
  
  .stat-item {
    gap: 2px;
  }
  
  .stat-label {
    font-size: 10px;
  }
  
  .stat-value {
    font-size: 14px;
  }
  
  .tooltip {
    font-size: 11px;
    min-width: 120px;
  }
}
</style>


