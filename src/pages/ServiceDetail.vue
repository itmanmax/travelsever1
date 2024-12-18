<script setup lang="ts">
import { useServiceDetail } from '@/ts/pages/serviceDetail'

const { service, loading, error, handleBooking } = useServiceDetail()
</script>

<template>
  <div class="service-detail">
    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <template v-else-if="service">
      <div class="service-header">
        <h1>{{ service.name }}</h1>
        <div class="service-type">
          {{ service.type === 'TOUR' ? '跟团游' : '导游服务' }}
        </div>
      </div>

      <div class="service-info">
        <div class="info-item">
          <div class="label">城市</div>
          <div class="value">{{ service.city }}</div>
        </div>

        <div class="info-item">
          <div class="label">地址</div>
          <div class="value">{{ service.address }}</div>
        </div>

        <div class="info-item">
          <div class="label">联系方式</div>
          <div class="value">{{ service.contactInfo }}</div>
        </div>

        <div class="info-item">
          <div class="label">价格</div>
          <div class="price">
            <span class="currency">¥</span>
            <span class="amount">{{ service.price }}</span>
          </div>
        </div>
      </div>

      <div class="service-description">
        <h2>服务描述</h2>
        <p>{{ service.description }}</p>
      </div>

      <div class="service-details">
        <h2>详细信息</h2>
        <p>{{ service.details }}</p>
      </div>

      <div class="booking-section">
        <button 
          class="book-btn"
          @click="handleBooking"
          :disabled="service.status !== 1"
        >
          {{ service.status === 1 ? '立即预订' : '已售罄' }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.service-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.service-header {
  margin-bottom: 32px;
}

.service-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 12px;
}

.service-type {
  display: inline-block;
  padding: 4px 12px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 0.9rem;
}

.service-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  margin-bottom: 16px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  width: 100px;
  color: #666;
}

.value {
  flex: 1;
  color: #333;
}

.price {
  color: #ff4d4f;
}

.currency {
  font-size: 1rem;
}

.amount {
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 4px;
}

.service-description,
.service-details {
  margin-bottom: 32px;
}

h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 16px;
}

p {
  color: #666;
  line-height: 1.6;
}

.booking-section {
  text-align: center;
  margin-top: 40px;
}

.book-btn {
  padding: 12px 48px;
  font-size: 1.1rem;
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
</style> 