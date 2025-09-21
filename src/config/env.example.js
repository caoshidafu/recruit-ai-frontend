// 环境变量配置示例文件
// 复制此文件并重命名为对应的环境配置文件

/**
 * 如何使用环境变量配置域名：
 * 
 * 1. 在项目根目录创建环境变量文件：
 *    - .env.development (开发环境)
 *    - .env.production (生产环境)
 *    - .env.local (本地环境，会被git忽略)
 * 
 * 2. 在文件中添加以下配置：
 */

// 开发环境配置示例 (.env.development)
const DEVELOPMENT_CONFIG = `
# AI招聘系统 - 开发环境配置
VUE_APP_API_BASE_URL=http://localhost:8080/recruit/ai
VUE_APP_USE_MOCK=true
NODE_ENV=development
`;

// 生产环境配置示例 (.env.production)
const PRODUCTION_CONFIG = `
# AI招聘系统 - 生产环境配置
VUE_APP_API_BASE_URL=https://your-domain.com/recruit/ai
VUE_APP_USE_MOCK=false
NODE_ENV=production
`;

// 本地环境配置示例 (.env.local)
const LOCAL_CONFIG = `
# AI招聘系统 - 本地环境配置
VUE_APP_API_BASE_URL=http://192.168.1.100:8080/recruit/ai
VUE_APP_USE_MOCK=false
`;

/**
 * 配置说明：
 * 
 * VUE_APP_API_BASE_URL: API基础URL
 * - 格式: http://域名:端口/前缀路径
 * - 示例: http://localhost:8080/recruit/ai
 * 
 * VUE_APP_USE_MOCK: 是否使用Mock数据
 * - true: 使用Mock数据（开发环境推荐）
 * - false: 使用真实API（生产环境推荐）
 * 
 * NODE_ENV: 环境标识
 * - development: 开发环境
 * - production: 生产环境
 */

export {
  DEVELOPMENT_CONFIG,
  PRODUCTION_CONFIG,
  LOCAL_CONFIG
};
