<script setup lang="ts">
import { useForumPost } from '@/ts/pages/forumPost'
import '@/css/pages/forumPost.css'

const { 
  post, 
  newComment, 
  comments, 
  submitComment,
  isSubmitting 
} = useForumPost()
</script>

<template>
  <div class="forum-post-page" v-if="post">
    <div class="post-header">
      <h1>{{ post.title }}</h1>
      <div class="post-meta">
        <span>作者: {{ post.author }}</span>
        <span>发布时间: {{ new Date(post.createTime).toLocaleDateString() }}</span>
      </div>
    </div>

    <div class="post-content">
      {{ post.content }}
    </div>

    <div class="comments-section">
      <h2>评论 ({{ comments.length }})</h2>
      
      <div class="comment-form">
        <textarea 
          v-model="newComment"
          placeholder="写下你的评论..."
          rows="4"
        ></textarea>
        <button 
          @click="submitComment"
          :disabled="isSubmitting || !newComment.trim()"
        >
          {{ isSubmitting ? '发送中...' : '发送评论' }}
        </button>
      </div>

      <div class="comments-list">
        <div 
          v-for="comment in comments" 
          :key="comment.id"
          class="comment-item"
        >
          <div class="comment-header">
            <span class="comment-author">{{ comment.author }}</span>
            <span class="comment-time">
              {{ new Date(comment.createTime).toLocaleDateString() }}
            </span>
          </div>
          <div class="comment-content">
            {{ comment.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    加载中...
  </div>
</template> 