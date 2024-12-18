<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { publicApi } from '@/api/public'
import type { Post } from '@/ts/types/post'

const router = useRouter()
const posts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')
const currentPage = ref(0)
const totalPages = ref(0)

const fetchPosts = async (page = 0) => {
  try {
    loading.value = true
    const response = await publicApi.getPosts({
      page,
      size: 9,
      sort: ['createdTime,desc']
    })
    
    posts.value = response.data.content
    totalPages.value = response.data.totalPages
    currentPage.value = page
  } catch (err) {
    console.error('获取文章列表失败:', err)
    error.value = '获取文章列表失败'
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  fetchPosts(page)
}

const goToDetail = (id: number) => {
  router.push(`/guides/${id}`)
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="guides-page">
    <div class="page-header">
      <h1>旅游攻略</h1>
      <p class="subtitle">发现精彩旅程，分享旅行故事</p>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="posts-grid">
      <div 
        v-for="post in posts" 
        :key="post.id"
        class="post-card"
        @click="goToDetail(post.id)"
      >
        <div class="post-image">
          <img :src="post.coverImage" :alt="post.title">
        </div>
        <div class="post-content">
          <div class="post-category">{{ post.category }}</div>
          <h3>{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.content.slice(0, 100) }}...</p>
          <div class="post-meta">
            <span class="post-date">{{ new Date(post.createdTime).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button 
        v-for="page in totalPages" 
        :key="page"
        :class="['page-btn', page - 1 === currentPage ? 'active' : '']"
        @click="handlePageChange(page - 1)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.guides-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 12px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 20px;
}

.post-category {
  display: inline-block;
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.post-content h3 {
  margin: 0 0 12px;
  font-size: 1.3rem;
  color: #333;
}

.post-excerpt {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.post-meta {
  color: #999;
  font-size: 0.9rem;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.page-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 