// API基础配置文件
import { API_CONFIG } from '../config/index.js';

// 全局域名配置 - 默认localhost:8080，前缀recruit/ai
const BASE_URL = API_CONFIG.BASE_URL;

// 通用请求配置
const defaultConfig = {
  headers: API_CONFIG.DEFAULT_HEADERS,
  timeout: API_CONFIG.TIMEOUT
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

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
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
