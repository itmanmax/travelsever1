<script setup lang="ts">
import { useTourGroup } from '@/ts/pages/tourGroup'

const { services, loading, error, handleItemClick } = useTourGroup()
</script>

<template>
  <div class="tour-group">
    <div class="page-header">
      <h1>旅游团购</h1>
      <p class="subtitle">精选旅游产品，超值优惠价格</p>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="services-grid">
      <div 
        v-for="service in services" 
        :key="service.id"
        class="service-card"
        @click="handleItemClick(service.id)"
      >
        <div class="service-content">
          <h3>{{ service.name }}</h3>
          <div class="service-type">{{ service.type === 'TOUR' ? '跟团游' : '导游服务' }}</div>
          <p class="description">{{ service.description }}</p>
          <div class="location">
            <i class="icon-location"></i>
            {{ service.city }}
          </div>
          <div class="details">{{ service.details }}</div>
        </div>

        <div class="service-footer">
          <div class="price">
            <span class="currency">¥</span>
            <span class="amount">{{ service.price }}</span>
          </div>
          <button 
            class="book-btn"
            :disabled="service.status !== 1"
          >
            {{ service.status === 1 ? '立即预订' : '已售罄' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tour-group {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.service-content {
  padding: 20px;
  flex-grow: 1;
}

.service-content h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #333;
}

.service-type {
  display: inline-block;
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.description {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.location {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.details {
  font-size: 0.9rem;
  color: #999;
}

.service-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #ff4d4f;
}

.currency {
  font-size: 0.9rem;
}

.amount {
  font-size: 1.5rem;
  font-weight: 500;
}

.book-btn {
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.book-btn:hover:not(:disabled) {
  background: #45a049;
}

.book-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style> 