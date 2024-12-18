import request from './request'
import type { LoginParams, LoginData, RegisterParams, ApiResponse } from '@/ts/types/auth'
import type { UserProfile } from '@/ts/types/user'

export const auth = {
  // 用户登录
  login(data: LoginParams) {
    return request.post<ApiResponse<LoginData>>('/auth/login', data)
  },

  // 用户注册
  register(data: RegisterParams) {
    return request.post<ApiResponse<null>>('/auth/register', data)
  },

  // 修改密码
  changePassword(data: { oldPassword: string; newPassword: string }) {
    return request.post<ApiResponse<void>>('/auth/password/change', data)
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<ApiResponse<UserProfile>>('/user/info')
  },

  // 更新用户信息
  updateUserInfo(data: Partial<UserProfile>) {
    return request.put<ApiResponse<void>>('/user/info', data)
  }
} 