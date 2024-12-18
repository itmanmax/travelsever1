<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { publicApi } from '@/api/public'
import type { PostDetail } from '@/ts/types/post'

const route = useRoute()
const post = ref<PostDetail | null>(null)
const loading = ref(false)
const error = ref('')

const fetchPostDetail = async () => {
  const id = Number(route.params.id)
  if (!id) {
    error.value = '无效的文章ID'
    return
  }

  try {
    loading.value = true
    const response = await publicApi.getPostDetail(id)
    
    // 直接使用返回的数据，不需要检查 code
    post.value = response.data
  } catch (err) {
    console.error('获取文章详情失败:', err)
    error.value = '获取文章详情失败'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCategoryText = (category: string) => {
  const categoryMap = {
    'GUIDE': '旅游攻略',
    'EXPERIENCE': '旅行体验',
    'FOOD': '美食推荐'
  }
  return categoryMap[category as keyof typeof categoryMap] || category
}

onMounted(() => {
  fetchPostDetail()
})
</script>

<template>
  <div class="guide-detail">
    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <template v-else-if="post">
      <div class="post-header">
        <h1>{{ post.title }}</h1>
        <div class="post-meta">
          <div class="author">
            <img 
              :src="post.user.avatar || '/images/default-avatar.jpg'" 
              :alt="post.user.nickname || post.user.username"
              class="author-avatar"
            >
            <span class="author-name">{{ post.user.nickname || post.user.username }}</span>
          </div>
          <div class="post-info">
            <span class="post-date">{{ formatDate(post.createdTime) }}</span>
            <span class="post-category">{{ getCategoryText(post.category) }}</span>
          </div>
        </div>
      </div>

      <div class="post-cover">
        <img :src="post.coverImage" :alt="post.title">
      </div>

      <article class="post-content">
        {{ post.content }}
      </article>
    </template>
  </div>
</template>

<style scoped>
.guide-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.post-header {
  margin-bottom: 32px;
}

.post-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 24px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.post-info {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 0.9rem;
}

.post-category {
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.post-cover {
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
}

.post-cover img {
  width: 100%;
  height: auto;
  display: block;
}

.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-line; /* 保留文本中的换行 */
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #ff4d4f;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 2rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style> 