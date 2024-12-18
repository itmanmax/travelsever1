import type { UserProfile } from '@/ts/types/user'

export interface UserStoreType {
  // 响应式状态
  token: string
  isLoggedIn: boolean
  profile: UserProfile | null
  initialized: boolean
  
  // Store 方法
  login: (loginData: { token: string }) => Promise<void>
  logout: () => Promise<void>
  setProfile: (userProfile: UserProfile) => void
  initializeFromStorage: () => Promise<void>
} 