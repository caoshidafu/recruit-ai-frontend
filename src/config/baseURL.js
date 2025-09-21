// 全局域名配置文件
// 简单的后端接口baseURL配置

/**
 * 后端接口基础URL配置
 * 修改这里的URL来切换不同的后端服务器
 */
const BASE_URL = 'http://localhost:8080/recruit/ai';

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
