import axios from 'axios'
import { API_BASE_URL, TIMEOUT } from './config'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'

// 创建axios实例
const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true, // 允许跨域携带cookie
  // 添加参数序列化配置
  paramsSerializer: {
    indexes: null // 不使用数组索引格式
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      })
      
      switch (error.response.status) {
        case 401:
          // 未授权，清除用户信息并跳转到登录页
          const userStore = useUserStore() as unknown as UserStoreType
          userStore.logout()
          window.location.href = '/login'
          break
        case 403:
          console.error('没有权限访问该资源')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误:', error.response.data)
          break
        default:
          console.error(`未知错误: ${error.response.status}`, error.response.data)
      }
    } else if (error.request) {
      console.error('没有收到响应:', error.request)
    } else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export default instance 