import axios from 'axios';

// 从环境变量或配置文件中读取 baseUrl 和 tenantId
const baseUrl = "http://192.168.100.141/api/1.0";
const tenantId = process.env.REACT_APP_TENANT_ID || '1';

// 创建独立的 axios 实例
const apiClient = axios.create({
  baseURL: baseUrl,
});

// 动态设置 Authorization 头
apiClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
}, error => Promise.reject(error));

class ApiUtils {
  static async get(url, params = {}) {
    try {
      // 确保 URL 正确性
      const newUrl = new URL(url, baseUrl).href;

      const response = await apiClient.get(newUrl, { params });
      return response.data;
    } catch (error) {
      // 生产环境中限制错误信息输出
      if (process.env.NODE_ENV === 'production') {
        console.error('API GET request failed');
      } else {
        console.error('API GET request failed:', error);
      }
      throw error;
    }
  }

  static async post(url, data = {}) {
    try {
      // 确保 URL 正确性
      const newUrl = new URL(url, baseUrl).href;
      console.log('POST request URL:', newUrl); // 调试信息

      const response = await apiClient.post(newUrl, data);
      return response.data;
    } catch (error) {
      // 生产环境中限制错误信息输出
      if (process.env.NODE_ENV === 'production') {
        console.error('API POST request failed');
      } else {
        console.error('API POST request failed:', error);
      }
      throw error;
    }
  }
}

export default ApiUtils;
