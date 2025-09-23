// 全局域名配置文件
// 简单的后端接口baseURL配置

/**
 * 后端接口基础URL配置
 * 开发环境使用代理路径，生产环境使用真实服务器地址
 */
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? '/api'  // 开发环境使用代理路径
  : 'https://is-ehr-recruit2.test.gifshow.com/recruit';  // 生产环境使用真实地址

// 导出配置
export default BASE_URL;

/**
 * 使用说明：
 * 1. 开发环境：http://localhost:8080/recruit/ai
 * 2. 测试环境：http://test-server.com/recruit/ai  
 * 3. 生产环境：https://api.your-domain.com/recruit/ai
 * 
 * 只需要修改上面的 BASE_URL 值即可切换环境
 */
