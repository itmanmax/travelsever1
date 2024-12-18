import axios from 'axios'

// API基础配置
export const API_BASE_URL = '/api'

// API请求超时时间
export const TIMEOUT = 5000

// API响应码
export enum ResponseCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

// API错误信息
export const ERROR_MESSAGES = {
  [ResponseCode.UNAUTHORIZED]: '请先登录',
  [ResponseCode.FORBIDDEN]: '没有权限',
  [ResponseCode.NOT_FOUND]: '资源不存在',
  [ResponseCode.SERVER_ERROR]: '服务器错误'
}

// 创建axios实例
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Response error:', error.response.status)
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response:', error.request)
    } else {
      // 发送请求时出了点问题
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default instance 