import request from './request'
import type { PageRequest, PageResponse } from '@/ts/types/common'
import type { Destination } from '@/ts/types'
import type { Service } from '@/ts/types/service'
import type { Post, PostDetail } from '@/ts/types/post'

export const publicApi = {
  // 获取服务列表
  getServices() {
    return request.get('/public/services')
  },

  // 获取服务详情
  getServiceDetail(id: number) {
    return request.get<Service>(`/public/services/${id}`)
  },

  // 获取服务评论
  getServiceComments(serviceId: number) {
    return request.get(`/public/services/${serviceId}/comments`)
  },

  // 获取文章列表
  getPosts(params: PageRequest) {
    return request.get<{
      content: Post[]
      totalPages: number
      totalElements: number
      size: number
      number: number
    }>('/public/posts', {
      params: {
        page: params.page,
        size: params.size,
        sort: params.sort?.join(',')
      }
    })
  },

  // 获取文章详情
  getPostDetail(id: number) {
    return request.get<PostDetail>(`/public/posts/${id}`)
  },

  // 获取热门文章
  getHotPosts() {
    return request.get('/public/posts/hot')
  },

  // 获取最新文章
  getLatestPosts() {
    return request.get('/public/posts/latest')
  },

  // 搜索文章
  searchPosts(params: { keyword: string }) {
    return request.get('/public/posts/search', { params })
  },

  // 获取所有景点（分页）
  getDestinations(params: PageRequest) {
    const { page, size, sort } = params
    return request.get<PageResponse<Destination>>('/public/destinations', {
      params: {
        page,
        size,
        sort: sort?.join(',')
      }
    })
  },

  // 获取首页推荐景点（固定返回4个）
  getFeaturedDestinations() {
    return request.get<PageResponse<Destination>>('/public/destinations', {
      params: {
        page: 0,
        size: 4
      }
    })
  },

  // 获取景点详情
  getDestinationDetail(id: number) {
    return request.get(`/public/destinations/${id}`)
  },

  // 按城市���取景点
  getDestinationsByCity(city: string) {
    return request.get(`/public/destinations/city/${city}`)
  },

  // 搜索景点
  searchDestinations(keyword: string, params: PageRequest) {
    return request.get<PageResponse<Destination>>('/public/destinations/search', {
      params: {
        keyword,
        ...params
      }
    })
  },

  // 获取所有服务列表
  getServiceList() {
    return request.get<Service[]>('/public/services/list')
  }
} 