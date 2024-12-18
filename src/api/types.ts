export interface Response<T = any> {
  code: number
  message: string
  data: T
}

export interface PageParams {
  page: number
  size: number
}

export interface PageResponse<T> {
  total: number
  list: T[]
}

export interface Service {
  id: number
  name: string
  description: string
  price: number
  status: string
  createTime: string
}

export interface Post {
  id: number
  title: string
  content: string
  author: string
  createTime: string
  updateTime: string
  status: string
}

export interface Comment {
  id: number
  content: string
  author: string
  createTime: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  phone: string
  avatar: string
  createTime: string
} 