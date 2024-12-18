import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Comment {
  id: number
  content: string
  author: string
  createTime: string
}

interface Post {
  id: number
  title: string
  content: string
  author: string
  createTime: string
}

export function useForumPost() {
  const route = useRoute()
  const post = ref<Post | null>(null)
  const comments = ref<Comment[]>([])
  const newComment = ref('')
  const isSubmitting = ref(false)

  onMounted(async () => {
    const postId = Number(route.params.id)
    // TODO: 从API获取帖子详情
    post.value = {
      id: postId,
      title: '东京自由行攻略分享',
      content: '最近去了东京自由行，分享一下经验...\n1. 交通建议...\n2. 住宿推荐...\n3. 美食攻略...',
      author: '旅行达人',
      createTime: '2024-03-15'
    }

    // TODO: 从API获取评论列表
    comments.value = [
      {
        id: 1,
        content: '感谢分享，非常实用！',
        author: '路人甲',
        createTime: '2024-03-15'
      },
      {
        id: 2,
        content: '请问住宿的具体位置是？',
        author: '路人乙',
        createTime: '2024-03-16'
      }
    ]
  })

  const submitComment = async () => {
    if (!newComment.value.trim()) return

    try {
      isSubmitting.value = true
      // TODO: 提交评论到API
      const comment: Comment = {
        id: comments.value.length + 1,
        content: newComment.value,
        author: '当前用户',
        createTime: new Date().toISOString()
      }
      comments.value.unshift(comment)
      newComment.value = ''
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    post,
    comments,
    newComment,
    isSubmitting,
    submitComment
  }
} 