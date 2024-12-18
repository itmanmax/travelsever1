export interface UserProfile {
  id: number
  username: string
  password?: string
  email: string
  nickname: string
  avatar: string
  phone: string
  role: string
  status: number
  createdTime: string
  updatedTime: string
}

// 用于更新个人资料的接口
export interface UserProfileUpdate {
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
}

export interface UserState {
  token: string
  isLoggedIn: boolean
  profile: UserProfile | null
} 