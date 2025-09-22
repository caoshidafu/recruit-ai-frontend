<template>
  <div class="modern-radar-chart">
    <svg
      :width="chartSize"
      :height="chartSize"
      :viewBox="`0 0 ${chartSize} ${chartSize}`"
    >
      <!-- 定义渐变 -->
      <defs>
        <linearGradient
          id="radarFillGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.2" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 背景网格 -->
      <g class="radar-grid">
        <polygon
          v-for="level in 5"
          :key="level"
          :points="getPolygonPoints(new Array(labels.length).fill(level * 20), chartRadius)"
          fill="none"
          stroke="#e5e7eb"
          stroke-width="1"
          :stroke-dasharray="level % 2 === 0 ? '0' : '5,5'"
          :opacity="level === 5 ? '1' : '0.5'"
        />
      </g>

      <!-- 轴线 -->
      <g class="radar-axes">
        <line
          v-for="(_, index) in labels"
          :key="index"
          :x1="chartCenter"
          :y1="chartCenter"
          :x2="chartCenter + chartRadius * Math.cos(index * angleStep - Math.PI / 2)"
          :y2="chartCenter + chartRadius * Math.sin(index * angleStep - Math.PI / 2)"
          stroke="#e5e7eb"
          stroke-width="1"
        />
      </g>

      <!-- 数据区域 -->
      <polygon
        :class="`radar-area ${isAnimated ? 'animated' : ''}`"
        :points="getPolygonPoints(values, chartRadius)"
        fill="url(#radarFillGradient)"
        stroke="#2563eb"
        stroke-width="2"
        filter="url(#glow)"
      />

      <!-- 数据点 -->
      <g class="radar-dots">
        <g
          v-for="(value, index) in values"
          :key="index"
          class="radar-dot-group"
        >
          <circle
            :cx="chartCenter + (value / maxValue) * chartRadius * Math.cos(index * angleStep - Math.PI / 2)"
            :cy="chartCenter + (value / maxValue) * chartRadius * Math.sin(index * angleStep - Math.PI / 2)"
            r="6"
            fill="#2563eb"
            stroke="white"
            stroke-width="3"
            :class="`radar-dot ${isAnimated ? 'animated' : ''}`"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
          <circle
            :cx="chartCenter + (value / maxValue) * chartRadius * Math.cos(index * angleStep - Math.PI / 2)"
            :cy="chartCenter + (value / maxValue) * chartRadius * Math.sin(index * angleStep - Math.PI / 2)"
            r="20"
            fill="transparent"
            class="radar-dot-hover"
          >
            <title>{{ `${labels[index]}: ${value}%` }}</title>
          </circle>
        </g>
      </g>

      <!-- 标签 -->
      <g class="radar-labels">
        <text
          v-for="(label, index) in labels"
          :key="index"
          :x="getLabelPosition(index).x"
          :y="getLabelPosition(index).y"
          text-anchor="middle"
          dominant-baseline="middle"
          class="radar-label"
          fill="#374151"
          font-size="12"
          font-weight="500"
        >
          {{ label }}
        </text>
      </g>
    </svg>

    <!-- 数值显示 -->
    <div class="radar-values">
      <div
        v-for="([key, value]) in data ? Object.entries(data) : []"
        :key="key"
        class="radar-value-item"
      >
        <div class="value-bar">
          <div class="value-label">{{ key }}</div>
          <div class="value-progress">
            <div class="value-fill" :style="{ width: `${value}%` }" />
          </div>
          <div class="value-number">{{ value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'RadarChart',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isAnimated = ref(false)
    
    const labels = computed(() => props.data ? Object.keys(props.data) : [])
    const values = computed(() => props.data ? Object.values(props.data) : [])
    const maxValue = 100
    const chartSize = 240
    const chartCenter = chartSize / 2
    const chartRadius = 90
    const angleStep = computed(() => (Math.PI * 2) / labels.value.length)

    // 计算多边形点
    const getPolygonPoints = (values, radius) => {
      return values
        .map((value, index) => {
          const angle = index * angleStep.value - Math.PI / 2
          const r = (value / maxValue) * radius
          const x = chartCenter + r * Math.cos(angle)
          const y = chartCenter + r * Math.sin(angle)
          return `${x},${y}`
        })
        .join(' ')
    }

    // 计算标签位置
    const getLabelPosition = (index) => {
      const angle = index * angleStep.value - Math.PI / 2
      const labelRadius = chartRadius + 25
      const x = chartCenter + labelRadius * Math.cos(angle)
      const y = chartCenter + labelRadius * Math.sin(angle)
      return { x, y }
    }

    onMounted(() => {
      setTimeout(() => {
        isAnimated.value = true
      }, 100)
    })

    return {
      isAnimated,
      labels,
      values,
      maxValue,
      chartSize,
      chartCenter,
      chartRadius,
      angleStep,
      getPolygonPoints,
      getLabelPosition
    }
  }
}
</script>

<style scoped>
.modern-radar-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin: 0 auto;
  max-width: 400px;
}

/* 雷达图动画 */
.radar-area {
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.radar-area.animated {
  opacity: 1;
  transform: scale(1);
}

.radar-dot {
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  animation: dotAppear 0.5s ease-out forwards;
}

@keyframes dotAppear {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.radar-dot-hover {
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 数值条形图 */
.radar-values {
  width: 100%;
  display: grid;
  gap: 8px;
}

.radar-value-item {
  width: 100%;
}

.value-bar {
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  align-items: center;
  gap: 12px;
}

.value-label {
  font-size: 12px;
  color: var(--gray-600);
  font-weight: 500;
  text-align: right;
}

.value-progress {
  height: 6px;
  background: var(--gray-200);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.value-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 3px;
  transition: width 1s ease-out;
  position: relative;
  overflow: hidden;
}

.value-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.value-number {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}
</style>
