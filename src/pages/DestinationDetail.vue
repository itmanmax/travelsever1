<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { publicApi } from '@/api/public'
import type { Destination } from '@/ts/types'
import MainLayout from '@/components/layout/MainLayout.vue'

const route = useRoute()
const destination = ref<Destination | null>(null)
const loading = ref(false)
const error = ref('')

const fetchDestinationDetail = async () => {
  const id = Number(route.params.id)
  if (!id) return

  try {
    loading.value = true
    const response = await publicApi.getDestinationDetail(id)
    if (response.data.code === 200) {
      destination.value = response.data.data
    } else {
      error.value = response.data.message || '获取景点详情失败'
    }
  } catch (err) {
    console.error('获取景点详情失败:', err)
    error.value = '获取景点详情失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDestinationDetail()
})
</script>

<template>
  <MainLayout>
    <div class="destination-detail">
      <div v-if="loading" class="loading">
        加载中...
      </div>
      
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <template v-else-if="destination">
        <div class="destination-header">
          <img :src="destination.imageUrl" :alt="destination.name" class="cover-image">
          <div class="header-content">
            <div class="status-badge" v-if="destination.status === 1">开放中</div>
            <h1>{{ destination.name }}</h1>
            <div class="location">
              <i class="icon-location"></i>
              {{ destination.city }}, {{ destination.country }}
            </div>
          </div>
        </div>

        <div class="destination-content">
          <div class="info-section">
            <h2>基本信息</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>景点名称</label>
                <span>{{ destination.name }}</span>
              </div>
              <div class="info-item">
                <label>所在城市</label>
                <span>{{ destination.city }}</span>
              </div>
              <div class="info-item">
                <label>所属国家</label>
                <span>{{ destination.country }}</span>
              </div>
              <div class="info-item">
                <label>开放状态</label>
                <span :class="['status-text', destination.status === 1 ? 'active' : 'inactive']">
                  {{ destination.status === 1 ? '正常开放' : '暂停开放' }}
                </span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2>景点介绍</h2>
            <div class="description-content">
              <p>{{ destination.description }}</p>
            </div>
          </div>

          <div class="info-section">
            <h2>旅行建议</h2>
            <div class="travel-tips">
              <div class="tip-item" v-if="destination.bestSeason">
                <div class="tip-icon">🌞</div>
                <div class="tip-content">
                  <h4>最佳游览季节</h4>
                  <p>{{ destination.bestSeason }}</p>
                </div>
              </div>
              <div class="tip-item" v-if="destination.climate">
                <div class="tip-icon">🌡️</div>
                <div class="tip-content">
                  <h4>气候特点</h4>
                  <p>{{ destination.climate }}</p>
                </div>
              </div>
              <div class="no-tips" v-if="!destination.bestSeason && !destination.climate">
                暂无旅行建议信息
              </div>
            </div>
          </div>

          <div class="info-section">
            <h2>地理位置</h2>
            <div class="location-info">
              <div class="coordinates" v-if="destination.latitude && destination.longitude">
                <div class="coordinate-item">
                  <label>纬度</label>
                  <span>{{ destination.latitude }}°</span>
                </div>
                <div class="coordinate-item">
                  <label>经度</label>
                  <span>{{ destination.longitude }}°</span>
                </div>
              </div>
              <div class="no-location" v-else>
                暂无具体地理坐标信息
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </MainLayout>
</template>

<style scoped>
.destination-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  color: #ff4d4f;
}

.destination-header {
  position: relative;
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.cover-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.header-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.location {
  font-size: 1.2rem;
  opacity: 0.9;
}

.status {
  display: inline-block;
  margin-top: 10px;
  padding: 4px 12px;
  background: #52c41a;
  border-radius: 4px;
  font-size: 0.9rem;
}

.destination-content {
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-bottom: 40px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-section h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.info-grid {
  display: grid;
  gap: 20px;
}

.info-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

.info-item label {
  color: #666;
  font-size: 0.95rem;
}

.location-info {
  display: grid;
  gap: 10px;
  color: #666;
}

@media (max-width: 768px) {
  .cover-image {
    height: 250px;
  }

  .header-content h1 {
    font-size: 2rem;
  }

  .destination-content {
    padding: 20px;
  }

  .info-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}

.status-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #52c41a;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.status-text {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-text.active {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.status-text.inactive {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.description-content {
  line-height: 1.8;
  color: #666;
  font-size: 1.1rem;
}

.travel-tips {
  display: grid;
  gap: 24px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  transition: transform 0.3s;
}

.tip-item:hover {
  transform: translateY(-2px);
}

.tip-icon {
  font-size: 2rem;
}

.tip-content h4 {
  margin-bottom: 8px;
  color: #333;
}

.tip-content p {
  color: #666;
}

.no-tips, .no-location {
  text-align: center;
  padding: 40px;
  background: #fafafa;
  border-radius: 8px;
  color: #999;
  font-size: 0.9rem;
}

.coordinates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.coordinate-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.coordinate-item label {
  color: #666;
  font-size: 0.9rem;
}

.coordinate-item span {
  font-size: 1.2rem;
  color: #333;
}
</style> 