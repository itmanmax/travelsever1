import { ref } from 'vue'
import type { Destination } from './destinations'

interface Guide {
  id: number
  title: string
  author: string
  publishDate: string
  content: string
  destination: Destination
}

export function useGuideDetail() {
  const guide = ref<Guide | null>(null)

  const fetchGuide = async () => {
    // 模拟数据
    guide.value = {
      id: 1,
      title: '东京旅游攻略',
      author: '小明',
      publishDate: '2024-03-15',
      content: '这是一篇详细的东京旅游攻略...',
      destination: {
        id: 1,
        name: '东京',
        description: '日本最大的都市，现代与传统的完美融合',
        location: '日本',
        rating: 4.8,
        imageUrl: '/images/tokyo.jpg'
      }
    }
  }

  fetchGuide()

  return {
    guide
  } as const  // 这里使用 as const 是关键
} 