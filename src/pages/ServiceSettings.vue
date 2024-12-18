<script setup lang="ts">
import { useServiceSettings } from '@/ts/pages/serviceSettings'
import '@/css/pages/serviceSettings.css'

const { service, settings, updateSettings } = useServiceSettings()
</script>

<template>
  <div class="service-settings-page">
    <h1>{{ service?.name }}设置</h1>
    
    <div class="settings-form" v-if="service">
      <div class="setting-item">
        <label>通知设置</label>
        <div class="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              v-model="settings.notifications.email"
              @change="updateSettings"
            >
            邮件通知
          </label>
          <label>
            <input 
              type="checkbox" 
              v-model="settings.notifications.sms"
              @change="updateSettings"
            >
            短信通知
          </label>
        </div>
      </div>

      <div class="setting-item">
        <label>隐私设置</label>
        <div class="radio-group">
          <label>
            <input 
              type="radio" 
              v-model="settings.privacy" 
              value="public"
              @change="updateSettings"
            >
            公开
          </label>
          <label>
            <input 
              type="radio" 
              v-model="settings.privacy" 
              value="private"
              @change="updateSettings"
            >
            私密
          </label>
        </div>
      </div>
    </div>
  </div>
</template> 