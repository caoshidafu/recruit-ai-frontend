<template>
  <div class="pie-chart">
    <svg
      :width="chartSize"
      :height="chartSize"
      :viewBox="`0 0 ${chartSize} ${chartSize}`"
    >
      <!-- 定义渐变 -->
      <defs>
        <linearGradient
          v-for="(color, index) in colors"
          :key="`gradient-${index}`"
          :id="`pieGradient${index}`"
          x1="0%" y1="0%" x2="100%" y2="100%"
        >
          <stop offset="0%" :stop-color="color.light" stop-opacity="0.8"/>
          <stop offset="100%" :stop-color="color.dark" stop-opacity="1"/>
        </linearGradient>
        
        <filter id="pieShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.2"/>
        </filter>
      </defs>

      <!-- 饼图切片 -->
      <g class="pie-slices">
        <path
          v-for="(slice, index) in slices"
          :key="`slice-${index}`"
          :d="slice.path"
          :fill="`url(#pieGradient${index})`"
          :class="`pie-slice slice-${index}`"
          filter="url(#pieShadow)"
          @click="handleSliceClick(slice, index)"
          @mouseover="handleMouseOver(slice, index, $event)"
          @mouseout="handleMouseOut"
        />
      </g>

      <!-- 中心文字 -->
      <g class="center-text">
        <text
          :x="centerX"
          :y="centerY - 8"
          text-anchor="middle"
          font-size="16"
          font-weight="600"
          fill="#1e293b"
        >
          总计
        </text>
        <text
          :x="centerX"
          :y="centerY + 12"
          text-anchor="middle"
          font-size="24"
          font-weight="700"
          fill="#3b82f6"
        >
          {{ totalValue }}
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
          <span class="tooltip-label">数量:</span>
          <span class="tooltip-value">{{ tooltip.data.value }}</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">占比:</span>
          <span class="tooltip-value">{{ tooltip.data.percentage }}%</span>
        </div>
      </div>
    </div>

    <!-- 图例 -->
    <div class="legend">
      <div
        v-for="(item, index) in legendData"
        :key="`legend-${index}`"
        class="legend-item"
        @click="handleLegendClick(item, index)"
      >
        <div
          class="legend-color"
          :style="{ background: colors[index]?.dark || '#6b7280' }"
        ></div>
        <span class="legend-label">{{ item.label }}</span>
        <span class="legend-value">({{ item.value }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PieChart',
  props: {
    data: {
      type: Object,
      required: true
    },
    height: {
      type: Number,
      default: 300
    }
  },
  emits: ['slice-click', 'legend-click'],
  setup(props, { emit }) {
    // 响应式数据
    const tooltip = ref({
      visible: false,
      x: 0,
      y: 0,
      data: {}
    })

    // 图表配置
    const chartSize = computed(() => props.height)
    const centerX = computed(() => chartSize.value / 2)
    const centerY = computed(() => chartSize.value / 2)
    const radius = computed(() => Math.min(chartSize.value / 2 - 40, 100)) // 留出边距和图例空间
    const innerRadius = computed(() => radius.value * 0.5) // 环形图内径

    // 颜色配置
    const colors = [
      { light: '#dbeafe', dark: '#3b82f6' }, // 蓝色
      { light: '#dcfce7', dark: '#10b981' }, // 绿色
      { light: '#fed7d7', dark: '#ef4444' }, // 红色
      { light: '#fef3c7', dark: '#f59e0b' }, // 橙色
      { light: '#e0e7ff', dark: '#8b5cf6' }, // 紫色
      { light: '#fce7f3', dark: '#ec4899' }, // 粉色
    ]

    // 计算属性
    const chartData = computed(() => {
      if (!props.data.items || !Array.isArray(props.data.items)) {
        return []
      }
      return props.data.items
    })

    const totalValue = computed(() => {
      return chartData.value.reduce((sum, item) => sum + item.value, 0)
    })

    const legendData = computed(() => {
      return chartData.value.map(item => ({
        label: item.label,
        value: item.value,
        percentage: totalValue.value > 0 ? ((item.value / totalValue.value) * 100).toFixed(1) : 0
      }))
    })

    const slices = computed(() => {
      let currentAngle = -Math.PI / 2 // 从顶部开始

      return chartData.value.map((item, index) => {
        const percentage = totalValue.value > 0 ? item.value / totalValue.value : 0
        const angle = percentage * 2 * Math.PI
        
        const startAngle = currentAngle
        const endAngle = currentAngle + angle
        
        // 计算外圆弧点
        const x1 = centerX.value + radius.value * Math.cos(startAngle)
        const y1 = centerY.value + radius.value * Math.sin(startAngle)
        const x2 = centerX.value + radius.value * Math.cos(endAngle)
        const y2 = centerY.value + radius.value * Math.sin(endAngle)
        
        // 计算内圆弧点
        const ix1 = centerX.value + innerRadius.value * Math.cos(startAngle)
        const iy1 = centerY.value + innerRadius.value * Math.sin(startAngle)
        const ix2 = centerX.value + innerRadius.value * Math.cos(endAngle)
        const iy2 = centerY.value + innerRadius.value * Math.sin(endAngle)
        
        const largeArcFlag = angle > Math.PI ? 1 : 0
        
        // 创建环形路径
        const path = [
          `M ${ix1} ${iy1}`, // 移动到内圆起点
          `L ${x1} ${y1}`, // 连接到外圆起点
          `A ${radius.value} ${radius.value} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // 外圆弧
          `L ${ix2} ${iy2}`, // 连接到内圆终点
          `A ${innerRadius.value} ${innerRadius.value} 0 ${largeArcFlag} 0 ${ix1} ${iy1}`, // 内圆弧
          'Z' // 闭合路径
        ].join(' ')
        
        currentAngle = endAngle
        
        return {
          path,
          data: item,
          percentage: (percentage * 100).toFixed(1),
          index
        }
      })
    })

    // 方法
    const handleSliceClick = (slice) => {
      console.log('点击饼图切片:', slice.data)
      emit('slice-click', slice.data)
    }

    const handleLegendClick = (item) => {
      console.log('点击图例:', item)
      emit('legend-click', item)
    }

    const handleMouseOver = (slice, index, event) => {
      const rect = event.target.getBoundingClientRect()
      tooltip.value = {
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        data: {
          label: slice.data.label,
          value: slice.data.value,
          percentage: slice.percentage
        }
      }
    }

    const handleMouseOut = () => {
      tooltip.value.visible = false
    }

    return {
      // 数据
      tooltip,
      chartSize,
      centerX,
      centerY,
      colors,
      chartData,
      totalValue,
      legendData,
      slices,
      
      // 方法
      handleSliceClick,
      handleLegendClick,
      handleMouseOver,
      handleMouseOut
    }
  }
}
</script>

<style scoped>
.pie-chart {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pie-slice {
  cursor: pointer;
  transition: all 0.2s ease;
  transform-origin: center;
}

.pie-slice:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.center-text {
  pointer-events: none;
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
  min-width: 120px;
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

.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
  max-width: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
}

.legend-item:hover {
  background: #f8fafc;
  transform: translateX(2px);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-label {
  flex: 1;
  color: #374151;
  font-weight: 500;
}

.legend-value {
  color: #6b7280;
  font-size: 12px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .legend {
    max-width: 180px;
    gap: 6px;
  }
  
  .legend-item {
    font-size: 12px;
    padding: 4px 6px;
  }
  
  .legend-color {
    width: 10px;
    height: 10px;
  }
  
  .tooltip {
    font-size: 11px;
    min-width: 100px;
  }
}

/* 加载动画 */
.pie-slice {
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* 动画延迟 */
.slice-0 { animation-delay: 0.1s; }
.slice-1 { animation-delay: 0.2s; }
.slice-2 { animation-delay: 0.3s; }
.slice-3 { animation-delay: 0.4s; }
.slice-4 { animation-delay: 0.5s; }
.slice-5 { animation-delay: 0.6s; }
</style>


