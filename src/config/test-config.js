// 配置测试文件 - 用于验证全局配置是否正确加载
import { API_CONFIG, APP_CONFIG, DEV_CONFIG } from './index.js';

/**
 * 测试配置加载
 */
function testConfiguration() {
  console.log('=== 全局配置测试 ===');
  
  // 测试API配置
  console.log('API配置:');
  console.log('- 基础域名:', API_CONFIG.BASE_DOMAIN);
  console.log('- API前缀:', API_CONFIG.API_PREFIX);
  console.log('- 完整URL:', API_CONFIG.BASE_URL);
  console.log('- 请求超时:', API_CONFIG.TIMEOUT);
  console.log('- 默认请求头:', API_CONFIG.DEFAULT_HEADERS);
  
  // 测试应用配置
  console.log('\n应用配置:');
  console.log('- 应用名称:', APP_CONFIG.APP_NAME);
  console.log('- 应用版本:', APP_CONFIG.VERSION);
  console.log('- 使用Mock:', APP_CONFIG.USE_MOCK);
  console.log('- 默认用户ID:', APP_CONFIG.DEFAULT_USER_ID);
  
  // 测试开发配置
  console.log('\n开发配置:');
  console.log('- 调试模式:', DEV_CONFIG.DEBUG);
  console.log('- 日志级别:', DEV_CONFIG.LOG_LEVEL);
  
  // 测试环境变量
  console.log('\n环境变量:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- VUE_APP_API_BASE_URL:', process.env.VUE_APP_API_BASE_URL);
  console.log('- VUE_APP_USE_MOCK:', process.env.VUE_APP_USE_MOCK);
  
  console.log('=== 配置测试完成 ===');
}

// 导出测试函数
export { testConfiguration };

// 如果直接运行此文件，则执行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testConfiguration();
}
