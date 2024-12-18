export interface LoginParams {
  username: string
  password: string
}

export interface LoginData {
  token: string
  type: string
  id: number
  username: string
  email: string
  roles: string[]
}

export interface LoginResponse {
  token: string
  type: string
  id: number
  username: string
  email: string
  roles: string[]
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  phone?: string
  
  roles: string[]
}

export interface UserState {
  token: string
  isLoggedIn: boolean
  username: string
  email: string
  id: number
  roles: string[]
}

export interface RegisterParams {
  username: string
  password: string
  email: string
  phone: string
  nickname: string
  avatar?: string
}

export interface RegisterResponse {
  code: number
  message: string
  data: null
} 