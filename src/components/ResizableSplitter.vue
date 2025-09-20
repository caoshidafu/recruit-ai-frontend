<template>
  <div class="resizable-splitter" @mousedown="startDrag" @touchstart="startDrag">
    <div class="splitter-handle">
      <div class="splitter-dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'

export default {
  name: 'ResizableSplitter',
  emits: ['resize'],
  setup(props, { emit }) {
    const isDragging = ref(false)
    const startX = ref(0)
    
    const startDrag = (event) => {
      isDragging.value = true
      startX.value = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX
      
      // 添加全局事件监听器
      document.addEventListener('mousemove', onDrag, { passive: false })
      document.addEventListener('mouseup', stopDrag)
      document.addEventListener('touchmove', onDrag, { passive: false })
      document.addEventListener('touchend', stopDrag)
      
      // 防止文本选择和其他默认行为
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
      
      event.preventDefault()
    }
    
    const onDrag = (event) => {
      if (!isDragging.value) return
      
      const currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX
      const deltaX = currentX - startX.value
      
      // 发送拖拽事件给父组件
      emit('resize', deltaX)
      
      event.preventDefault()
    }
    
    const stopDrag = () => {
      if (!isDragging.value) return
      
      isDragging.value = false
      
      // 移除全局事件监听器
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('touchmove', onDrag)
      document.removeEventListener('touchend', stopDrag)
      
      // 恢复默认样式
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
    
    // 组件卸载时清理事件监听器
    onUnmounted(() => {
      stopDrag()
    })
    
    return {
      isDragging,
      startDrag
    }
  }
}
</script>

<style scoped>
.resizable-splitter {
  width: 8px;
  background: transparent;
  cursor: col-resize;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  user-select: none;
}

.resizable-splitter:hover {
  background: rgba(102, 126, 234, 0.1);
}

.resizable-splitter:active,
.resizable-splitter.dragging {
  background: rgba(102, 126, 234, 0.2);
}

.splitter-handle {
  width: 4px;
  height: 60px;
  background: #e8ecf3;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.resizable-splitter:hover .splitter-handle {
  background: #667eea;
  width: 6px;
  height: 80px;
}

.resizable-splitter:active .splitter-handle,
.resizable-splitter.dragging .splitter-handle {
  background: #5a6fd8;
  width: 6px;
  height: 100px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.splitter-dots {
  display: flex;
  flex-direction: column;
  gap: 3px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.resizable-splitter:hover .splitter-dots {
  opacity: 0.7;
}

.resizable-splitter:active .splitter-dots,
.resizable-splitter.dragging .splitter-dots {
  opacity: 1;
}

.dot {
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
}

/* 拖拽时的全局样式 */
body.resizing {
  cursor: col-resize !important;
  user-select: none !important;
}

body.resizing * {
  cursor: col-resize !important;
  user-select: none !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .resizable-splitter {
    width: 12px; /* 移动端增加触摸区域 */
  }
  
  .splitter-handle {
    width: 6px;
    height: 40px;
  }
  
  .resizable-splitter:hover .splitter-handle,
  .resizable-splitter:active .splitter-handle {
    width: 8px;
    height: 60px;
  }
}

/* 防止在拖拽过程中出现文本选择 */
.resizable-splitter::selection {
  background: transparent;
}

.resizable-splitter::-moz-selection {
  background: transparent;
}
</style>
