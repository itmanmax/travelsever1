<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFeaturedDestinations } from '@/ts/components/featuredDestinations'
import '@/css/components/featuredDestinations.css'

const router = useRouter()
const { destinations, loading, error } = useFeaturedDestinations()
</script>

<template>
  <section class="featured-destinations">
    <h2>热门目的地</h2>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="destinations-grid">
      <div 
        v-for="dest in destinations.slice(0, 4)" 
        :key="dest.id"
        class="destination-card"
        @click="router.push(`/destinations/${dest.id}`)"
      >
        <div class="card-image">
          <img :src="dest.imageUrl" :alt="dest.name">
        </div>
        <div class="card-content">
          <h3>{{ dest.name }}</h3>
          <p>{{ dest.description }}</p>
          <div class="card-footer">
            <span class="location">{{ dest.city }}</span>
            <span v-if="dest.status === 1" class="status">开放中</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.destination-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
}

.destination-card:hover {
  transform: translateY(-5px);
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-content h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #333;
}

.card-content p {
  margin: 0 0 16px;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.status {
  color: #52c41a;
  font-weight: 500;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #ff4d4f;
}
</style> 