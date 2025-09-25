<template>
  <div v-if="visible" class="notification-overlay">
    <div class="notification-container" :class="{ 'show': showNotification }">
      <!-- 倒计时阶段 -->
      <div v-if="!showNotification" class="countdown-container">
        <div class="countdown-circle">
          <div class="countdown-progress" :style="{ transform: `rotate(${progressAngle}deg)` }"></div>
          <div class="countdown-number">{{ countdown }}</div>
        </div>
        <div class="countdown-text">新候选人推送即将显示</div>
      </div>
      
      <!-- 通知内容 -->
      <div v-else class="notification-content">
        <div class="notification-header">
          <div class="notification-icon">
            <div class="pulse-dot"></div>
            👥
          </div>
          <button class="close-btn" @click="closeNotification">
            <span>✕</span>
          </button>
        </div>
        
        <div class="notification-body">
          <div class="notification-title">
            您发布的<span class="job-highlight">{{ jobTitle }}</span>岗位有<span class="count-highlight">{{ newCandidateCount }}</span>个新候选人
          </div>
          
          <div class="notification-actions">
            <button class="action-btn primary" @click="viewCandidates">
              <span class="btn-icon">👀</span>
              查看候选人
            </button>
            <button class="action-btn secondary" @click="closeNotification">
              <span class="btn-icon">⏰</span>
              稍后查看
            </button>
          </div>
        </div>
        
        <!-- 装饰性元素 -->
        <div class="decoration-elements">
          <div class="floating-dot dot-1"></div>
          <div class="floating-dot dot-2"></div>
          <div class="floating-dot dot-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  name: 'NewCandidateNotification',
  props: {
    jobTitle: {
      type: String,
      default: 'Java开发工程师-【大模型应用】'
    },
    newCandidateCount: {
      type: Number,
      default: 2
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  emits: ['view-candidates', 'close'],
  setup(props, { emit }) {
    const visible = ref(false)
    const showNotification = ref(false)
    const countdown = ref(5)
    let countdownTimer = null
    let showTimer = null

    // 计算倒计时进度角度
    const progressAngle = computed(() => {
      return ((5 - countdown.value) / 5) * 360
    })

    // 开始倒计时
    const startCountdown = () => {
      visible.value = true
      showNotification.value = false
      countdown.value = 5
      
      countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(countdownTimer)
          // 延迟显示通知内容，添加过渡效果
          showTimer = setTimeout(() => {
            showNotification.value = true
          }, 200)
        }
      }, 1000)
    }

    // 查看候选人
    const viewCandidates = () => {
      emit('view-candidates')
      closeNotification()
    }

    // 关闭通知
    const closeNotification = () => {
      showNotification.value = false
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, 300)
    }

    // 清理定时器
    const cleanup = () => {
      if (countdownTimer) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
      if (showTimer) {
        clearTimeout(showTimer)
        showTimer = null
      }
    }

    onMounted(() => {
      if (props.autoStart) {
        startCountdown()
      }
    })

    onUnmounted(() => {
      cleanup()
    })

    return {
      visible,
      showNotification,
      countdown,
      progressAngle,
      startCountdown,
      viewCandidates,
      closeNotification
    }
  }
}
</script>

<style scoped>
.notification-overlay {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
  pointer-events: none;
}

.notification-container {
  position: relative;
  margin: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(102, 126, 234, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  transform: translateX(100%);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.notification-container.show {
  transform: translateX(0);
}

/* 倒计时样式 */
.countdown-container {
  padding: 30px;
  text-align: center;
  color: white;
  min-width: 280px;
}

.countdown-circle {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.countdown-progress {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #fff 0deg,
    #fff var(--progress, 0deg),
    transparent var(--progress, 0deg)
  );
  transition: transform 1s linear;
  mask: radial-gradient(circle at center, transparent 35px, black 36px);
  -webkit-mask: radial-gradient(circle at center, transparent 35px, black 36px);
}

.countdown-number {
  font-size: 28px;
  font-weight: bold;
  color: white;
  z-index: 1;
}

.countdown-text {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
}

/* 通知内容样式 */
.notification-content {
  position: relative;
  min-width: 350px;
  max-width: 400px;
  color: white;
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
}

.notification-icon {
  position: relative;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.pulse-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #ff4757;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.notification-body {
  padding: 0 20px 20px;
}

.notification-title {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  font-weight: 500;
}

.job-highlight {
  color: #ffd700;
  font-weight: bold;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.count-highlight {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 18px;
}

.notification-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-btn.primary {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
}

.action-btn.primary:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 16px;
}

/* 装饰性元素 */
.decoration-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 3s infinite ease-in-out;
}

.dot-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.dot-2 {
  top: 60%;
  right: 15%;
  animation-delay: 1s;
}

.dot-3 {
  bottom: 25%;
  left: 20%;
  animation-delay: 2s;
}

/* 动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) translateX(5px);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .notification-container {
    margin: 10px;
    min-width: auto;
    max-width: calc(100vw - 20px);
  }
  
  .notification-content {
    min-width: auto;
    max-width: none;
  }
  
  .countdown-container {
    padding: 20px;
    min-width: auto;
  }
  
  .notification-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>
