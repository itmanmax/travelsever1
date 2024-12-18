import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface ForumPost {
  id: number
  title: string
  content: string
  author: string
  createTime: string
  replies: number
}

export function useForum() {
  const router = useRouter()
  const posts = ref<ForumPost[]>([
    {
      id: 1,
      title: '东京自由行攻略分享',
      content: '最近去了东京自由行，分享一下经验...',
      author: '旅行达人',
      createTime: '2024-03-15',
      replies: 23
    },
    {
      id: 2,
      title: '求推荐靠谱的导游',
      content: '计划去京都旅游，需要一个靠谱的导游...',
      author: '新手游客',
      createTime: '2024-03-14',
      replies: 15
    }
  ])

  const navigateToPost = (postId: number) => {
    router.push(`/forum/post/${postId}`)
  }

  return {
    posts,
    navigateToPost
  }
} 