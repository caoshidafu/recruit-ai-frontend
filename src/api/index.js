// API基础配置文件
import BASE_URL from '../config/baseURL.js';

// 通用请求配置
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
};

/**
 * HTTP请求基础方法
 * @param {string} url 请求地址
 * @param {object} options 请求配置
 * @returns {Promise} 请求结果
 */
async function request(url, options = {}) {
  const config = {
    ...defaultConfig,
    ...options,
  };

  const fullUrl = `${BASE_URL}${url}`;
  console.log('🌐 [HTTP] 发起请求:', {
    url: fullUrl,
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body
  });

  try {
    const response = await fetch(fullUrl, config);
    
    console.log('📡 [HTTP] 响应状态:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📦 [HTTP] 响应数据:', data);
    return data;
  } catch (error) {
    console.error('💥 [HTTP] 请求失败:', {
      url: fullUrl,
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

/**
 * GET请求
 * @param {string} url 请求地址
 * @param {object} params 查询参数
 * @returns {Promise} 请求结果
 */
export function get(url, params = {}) {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  
  return request(fullUrl, {
    method: 'GET',
  });
}

/**
 * POST请求
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @returns {Promise} 请求结果
 */
export function post(url, data = {}) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT请求
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 * @returns {Promise} 请求结果
 */
export function put(url, data = {}) {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE请求
 * @param {string} url 请求地址
 * @returns {Promise} 请求结果
 */
export function del(url) {
  return request(url, {
    method: 'DELETE',
  });
}

// 导出基础URL供其他模块使用
export { BASE_URL };
