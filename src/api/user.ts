import request from './request'
import type { UserProfile } from '@/ts/types/user'

export interface ProfileUpdateParams {
  nickname?: string
  email?: string
  avatar?: string
  phone?: string
}

export default {
  // 获取个人资料
  getProfile() {
    return request.get<UserProfile>('/user/profile')
  },

  // 更新个人资料
  updateProfile(data: ProfileUpdateParams) {
    return request.put('/user/profile', data)
  }
} 