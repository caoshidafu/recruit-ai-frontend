<template>
  <div 
    :class="`metric-card metric-${color}`"
    @click="$emit('click')"
  >
    <div class="metric-icon">{{ icon }}</div>
    <div class="metric-content">
      <div class="metric-header">
        <h3 class="metric-value">{{ formattedValue }}</h3>
        <div v-if="trend" :class="`metric-trend trend-${trend.type}`">
          <span class="trend-icon">{{ getTrendIcon(trend.type) }}</span>
          <span class="trend-value">{{ trend.value }}</span>
        </div>
      </div>
      <h4 class="metric-title">{{ title }}</h4>
      <p class="metric-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetricCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    trend: {
      type: Object,
      default: null
      // { type: 'up' | 'down' | 'neutral', value: string }
    },
    color: {
      type: String,
      default: 'blue',
      validator: value => ['blue', 'green', 'orange', 'purple', 'red'].includes(value)
    },
    icon: {
      type: String,
      default: '📊'
    }
  },
  emits: ['click'],
  computed: {
    formattedValue() {
      if (typeof this.value === 'number') {
        return this.value.toLocaleString()
      }
      return this.value
    }
  },
  methods: {
    getTrendIcon(type) {
      switch (type) {
        case 'up':
          return '↗️'
        case 'down':
          return '↘️'
        case 'neutral':
        default:
          return '➡️'
      }
    }
  }
}
</script>

<style scoped>
.metric-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.metric-card:hover::before {
  opacity: 1;
}

/* 颜色主题 */
.metric-blue {
  border-left-color: #3b82f6;
  background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%);
}

.metric-green {
  border-left-color: #10b981;
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.metric-orange {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #ffffff 100%);
}

.metric-purple {
  border-left-color: #8b5cf6;
  background: linear-gradient(135deg, #faf5ff 0%, #ffffff 100%);
}

.metric-red {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
}

.metric-icon {
  font-size: 40px;
  min-width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
  margin: 0;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.trend-up {
  background: #dcfce7;
  color: #166534;
}

.trend-down {
  background: #fee2e2;
  color: #dc2626;
}

.trend-neutral {
  background: #f1f5f9;
  color: #475569;
}

.trend-icon {
  font-size: 14px;
}

.trend-value {
  font-size: 11px;
}

.metric-title {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin: 0 0 4px 0;
}

.metric-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .metric-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .metric-header {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .metric-value {
    font-size: 28px;
  }
  
  .metric-icon {
    font-size: 36px;
    min-width: 48px;
    height: 48px;
  }
}

/* 加载状态 */
.metric-card.loading {
  pointer-events: none;
}

.metric-card.loading .metric-value,
.metric-card.loading .metric-title,
.metric-card.loading .metric-subtitle {
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  color: transparent;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>


