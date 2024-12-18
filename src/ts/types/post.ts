export interface Post {
  id: number
  title: string
  coverImage: string
  content: string
  category: 'GUIDE' | 'EXPERIENCE' | 'FOOD'
  status: number
  createdTime: string
  updatedTime: string | null
}

export interface PostDetail extends Post {
  user: {
    id: number
    username: string
    nickname: string | null
    avatar: string | null
  }
  comments: any[]
} 