<script setup lang="ts">
import { useServices } from '@/ts/pages/services'
import '@/css/pages/services.css'

const { services, navigateToSettings, navigateToRequest } = useServices()
</script>

<template>
  <div class="services-page">
    <h1>旅游服务</h1>
    
    <div class="services-grid">
      <div 
        v-for="service in services" 
        :key="service.id" 
        class="service-card"
      >
        <div class="service-icon">
          <img :src="service.icon" :alt="service.name">
        </div>
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        <div class="service-actions">
          <button @click="navigateToSettings(service.id)">设置服务</button>
          <button @click="navigateToRequest(service.id)">申请服务</button>
        </div>
      </div>
    </div>
  </div>
</template> 