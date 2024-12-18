<script setup lang="ts">
import SearchBar from '../components/common/SearchBar.vue'
import { useDestinations } from '@/ts/pages/destinations'
import '@/css/pages/destinations.css'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { destinations, handleSearch, loading, error, currentPage, totalPages, handlePageChange } = useDestinations()
const router = useRouter()
</script>

<template>
  <div class="destinations-page">
    <div class="search-section">
      <h1>探索目的地</h1>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索目的地..."
        >
        <button 
          class="search-btn"
          @click="handleSearch"
        >
          搜索
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <template v-else>
      <div class="destinations-grid">
        <div 
          v-for="dest in destinations" 
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

      <div v-if="destinations.length === 0" class="no-results">
        没有找到相关景点
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
    </template>
  </div>
</template>

<style scoped>
.destinations {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.search-section {
  text-align: center;
  margin-bottom: 48px;
}

.search-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 24px;
}

.search-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  font-size: 1rem;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4CAF50;
}

.search-btn {
  padding: 12px 32px;
  font-size: 1rem;
  color: white;
  background: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background: #45a049;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
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

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    padding: 0 20px;
  }

  .search-input,
  .search-btn {
    width: 100%;
  }
}
</style> 