// 全局域名配置文件
// 简单的后端接口baseURL配置

/**
 * 后端接口基础URL配置
 * 直接使用真实域名进行API请求
 */
const BASE_URL = 'https://is-ehr-recruit2.test.gifshow.com/recruit';

// 导出配置
export default BASE_URL;

/**
 * 使用说明：
 * 当前配置为真实域名：https://is-ehr-recruit2.test.gifshow.com/recruit
 * 
 * 接口地址示例：
 * - 职位列表：https://is-ehr-recruit2.test.gifshow.com/recruit/api/v1/open/hackthon/position/list
 * - 推荐候选人：https://is-ehr-recruit2.test.gifshow.com/recruit/api/v1/open/hackthon/recommend/candidate/list
 * - 创建职位：https://is-ehr-recruit2.test.gifshow.com/recruit/api/v1/open/hackthon/recommend/position/create
 */
