'use strict';

const { Controller } = require('ee-core');
const axios = require('axios');
const { URL } = require('url');
const Log = require('ee-core/log');

// const BASE_URL = "http://10.1.235.68:9090";
const BASE_URL = "http://192.168.100.141:9090";

/**
 * Api
 * @class
 */
class ApiController extends Controller {
    // 将 cookies 定义为静态属性
    static cookies = new Map();

    constructor() {
        super();
        
        Log.info('[ApiController] Initializing with BASE_URL:', BASE_URL);
        
        // 创建 axios 实例
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // 添加请求拦截器
        this.axiosInstance.interceptors.request.use(config => {
            Log.info('[ApiController] Request interceptor - Method:', config.method, 'URL:', config.url);
            Log.info('[ApiController] Request headers:', config.headers);
            
            // 添加存储的 cookies
            const cookiesString = this.getCookiesString();
            if (cookiesString) {
                config.headers.Cookie = cookiesString;
                Log.info('[ApiController] Added cookies to request:', cookiesString);
            } else {
                Log.info('[ApiController] No cookies to add');
            }
            
            if (config.data) {
                Log.info('[ApiController] Request data:', JSON.stringify(config.data, null, 2));
            }
            if (config.params) {
                Log.info('[ApiController] Request params:', JSON.stringify(config.params, null, 2));
            }
            
            return config;
        }, error => {
            Log.error('[ApiController] Request interceptor error:', error);
            return Promise.reject(error);
        });

        // 添加响应拦截器
        this.axiosInstance.interceptors.response.use(response => {
            Log.info('[ApiController] Response interceptor - Status:', response.status, 'URL:', response.config.url);
            Log.info('[ApiController] Response headers:', response.headers);
            
            // 处理并存储新的 cookies
            this.parseAndStoreCookies(response.headers['set-cookie'], new URL(BASE_URL).hostname);
            
            if (response.data) {
                Log.info('[ApiController] Response data:', JSON.stringify(response.data, null, 2));
            }
            
            return response;
        }, error => {
            Log.error('[ApiController] Response interceptor error:', error);
            if (error.response) {
                Log.error('[ApiController] Error response status:', error.response.status);
                Log.error('[ApiController] Error response data:', error.response.data);
                Log.error('[ApiController] Error response headers:', error.response.headers);
            }
            return Promise.reject(error);
        });
    }

    /**
     * 解析并存储 Set-Cookie 响应头
     * @param {string} setCookieHeader - Set-Cookie 响应头
     * @param {string} domain - 域名
     */
    parseAndStoreCookies(setCookieHeader, domain) {
        if (!setCookieHeader) {
            Log.info('[ApiController] No Set-Cookie header found');
            return;
        }
        
        Log.info('[ApiController] Processing Set-Cookie header:', setCookieHeader);
        
        const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        cookies.forEach(cookie => {
            const [cookieStr] = cookie.split(';');
            const [name, value] = cookieStr.split('=');
            if (name && value) {
                const cookieName = name.trim();
                const cookieValue = value.trim();
                ApiController.cookies.set(cookieName, cookieValue);
                Log.info('[ApiController] Stored cookie:', cookieName, '=', cookieValue);
            } else {
                Log.warn('[ApiController] Invalid cookie format:', cookie);
            }
        });
        
        Log.info('[ApiController] Current cookies count:', ApiController.cookies.size);
    }

    /**
     * 获取存储的 cookies 字符串
     * @returns {string} cookies 字符串
     */
    getCookiesString() {
        const cookiesString = Array.from(ApiController.cookies.entries())
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
        
        Log.info('[ApiController] Current cookies string:', cookiesString || 'empty');
        return cookiesString;
    }

    /**
     * 发送 HTTP 请求
     * @param {string} method - HTTP 方法
     * @param {string} path - 请求路径
     * @param {object} data - 请求数据
     * @returns {Promise<any>}
     */
    async request(method, path, data = {}) {
        Log.info('[ApiController] Making request:', method, path);
        Log.info('[ApiController] Request data:', JSON.stringify(data, null, 2));
        
        try {
            const config = {
                method,
                url: path
            };

            if (method === 'GET') {
                config.params = data;
            } else {
                config.data = data;
            }

            const response = await this.axiosInstance(config);
            Log.info('[ApiController] Request successful:', method, path);
            return response.data;
        } catch (error) {
            Log.error('[ApiController] Request failed:', method, path);
            Log.error('[ApiController] Error details:', error.message);
            if (error.response) {
                Log.error('[ApiController] Error response status:', error.response.status);
                Log.error('[ApiController] Error response data:', error.response.data);
            }
            throw error;
        }
    }

    /**
     * 登录方法
     * @param {object} data - 登录数据
     * @returns {Promise<any>}
     */
    async login(data) {
        Log.info('[ApiController] Attempting login with data:', JSON.stringify(data, null, 2));
        
        try {
            const res = await this.request('POST', '/api/1.0/users/signIn', data);
            Log.info('[ApiController] Login successful:', res);
            return res;
        } catch (error) {
            Log.error('[ApiController] Login failed:', error.message);
            throw error;
        }
    }

    /**
     * 查询健康报警列表
     */
    async getAlarmList(data) {
        Log.info('[ApiController] Fetching alarm list with data:', JSON.stringify(data, null, 2));
        
        try {
            // 打印请求前的cookies
            Log.info('[ApiController] Cookies before alarm list request:', this.getCookiesString());
            
            const result = await this.request('GET', '/api/1.0/healthIndicatorAlarm/page?pageNum=1&pageSize=100', data);
            Log.info('[ApiController] Alarm list fetched successfully, result count:', result?.data?.length || 0);
            return result;
        } catch(error) {
            Log.error('[ApiController] getAlarmList error:', error.message);
            throw error;
        }
    }

    /**
     * 清除所有 cookies
     */
    clearCookies() {
        const previousCount = ApiController.cookies.size;
        ApiController.cookies.clear();
        Log.info('[ApiController] Cleared all cookies, previous count:', previousCount);
    }
}

ApiController.toString = () => '[class ApiController]';
module.exports = ApiController;