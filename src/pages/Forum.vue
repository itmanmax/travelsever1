<script setup lang="ts">
import { useForum } from '@/ts/pages/forum'
import '@/css/pages/forum.css'

const { posts, navigateToPost } = useForum()
</script>

<template>
  <div class="forum-page">
    <div class="forum-header">
      <h1>旅游论坛</h1>
      <button class="new-post-btn">发布新帖</button>
    </div>
    
    <div class="posts-list">
      <div 
        v-for="post in posts" 
        :key="post.id"
        class="post-item"
        @click="navigateToPost(post.id)"
      >
        <h3>{{ post.title }}</h3>
        <p class="post-preview">{{ post.content }}</p>
        <div class="post-meta">
          <span>{{ post.author }}</span>
          <span>{{ new Date(post.createTime).toLocaleDateString() }}</span>
          <span>{{ post.replies }}回复</span>
        </div>
      </div>
    </div>
  </div>
</template> 