<script setup lang="ts">
import { useAreaGuide } from '@/ts/pages/areaGuide'
import '@/css/pages/areaGuide.css'

const { 
  area,
  guides,
  attractions,
  restaurants,
  hotels
} = useAreaGuide()
</script>

<template>
  <div class="area-guide-page" v-if="area">
    <div class="area-header">
      <h1>{{ area.name }}旅游攻略</h1>
      <p class="area-desc">{{ area.description }}</p>
    </div>

    <div class="guide-section">
      <h2>最新攻略</h2>
      <div class="guides-grid">
        <div 
          v-for="guide in guides" 
          :key="guide.id"
          class="guide-card"
        >
          <img :src="guide.imageUrl" :alt="guide.title">
          <div class="guide-info">
            <h3>{{ guide.title }}</h3>
            <p>{{ guide.summary }}</p>
            <div class="guide-meta">
              <span>{{ guide.author }}</span>
              <span>{{ new Date(guide.publishDate).toLocaleDateString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="attractions-section">
      <h2>热门景点</h2>
      <div class="attractions-grid">
        <div 
          v-for="attraction in attractions" 
          :key="attraction.id"
          class="attraction-card"
        >
          <img :src="attraction.imageUrl" :alt="attraction.name">
          <h3>{{ attraction.name }}</h3>
          <p>{{ attraction.description }}</p>
          <div class="attraction-meta">
            <span class="rating">{{ attraction.rating }}分</span>
            <span class="price">￥{{ attraction.price }}起</span>
          </div>
        </div>
      </div>
    </div>

    <div class="recommendations">
      <div class="restaurants-section">
        <h2>美食推荐</h2>
        <div class="list">
          <div 
            v-for="restaurant in restaurants" 
            :key="restaurant.id"
            class="item-card"
          >
            <img :src="restaurant.imageUrl" :alt="restaurant.name">
            <div class="item-info">
              <h3>{{ restaurant.name }}</h3>
              <p>{{ restaurant.cuisine }}</p>
              <span class="rating">{{ restaurant.rating }}分</span>
            </div>
          </div>
        </div>
      </div>

      <div class="hotels-section">
        <h2>住宿推荐</h2>
        <div class="list">
          <div 
            v-for="hotel in hotels" 
            :key="hotel.id"
            class="item-card"
          >
            <img :src="hotel.imageUrl" :alt="hotel.name">
            <div class="item-info">
              <h3>{{ hotel.name }}</h3>
              <p>{{ hotel.type }}</p>
              <span class="price">￥{{ hotel.price }}起</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 