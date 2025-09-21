// 全局配置管理文件
// 用于统一管理项目中的所有配置项

/**
 * API配置
 */
export const API_CONFIG = {
  // 基础域名配置
  BASE_DOMAIN: 'localhost:8080',
  // API前缀路径
  API_PREFIX: '/recruit/ai',
  // 完整的API基础URL
  get BASE_URL() {
    // 优先使用环境变量，如果没有则使用默认配置
    return process.env.VUE_APP_API_BASE_URL || `http://${this.BASE_DOMAIN}${this.API_PREFIX}`;
  },
  // 请求超时时间（毫秒）
  TIMEOUT: 10000,
  // 默认请求头
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

/**
 * 应用配置
 */
export const APP_CONFIG = {
  // 应用名称
  APP_NAME: 'AI招聘系统',
  // 应用版本
  VERSION: '1.0.0',
  // 是否开启Mock数据
  USE_MOCK: process.env.VUE_APP_USE_MOCK !== 'false' && (process.env.NODE_ENV === 'development' || process.env.VUE_APP_USE_MOCK === 'true'),
  // 用户ID (项目规范要求使用1填充)
  DEFAULT_USER_ID: 1
};

/**
 * 开发配置
 */
export const DEV_CONFIG = {
  // 是否显示调试信息
  DEBUG: process.env.NODE_ENV === 'development',
  // 控制台日志级别
  LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'error'
};

/**
 * 导出所有配置
 */
export default {
  API_CONFIG,
  APP_CONFIG,
  DEV_CONFIG
};
