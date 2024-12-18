<script setup lang="ts">
import { useServiceRequest } from '@/ts/pages/serviceRequest'
import '@/css/pages/serviceRequest.css'

const { 
  service, 
  requestForm, 
  submitRequest,
  isSubmitting 
} = useServiceRequest()
</script>

<template>
  <div class="service-request-page">
    <h1>申请{{ service?.name }}</h1>
    
    <form class="request-form" @submit.prevent="submitRequest">
      <div class="form-group">
        <label>预计日期</label>
        <input 
          type="date" 
          v-model="requestForm.date"
          required
        >
      </div>

      <div class="form-group">
        <label>联系电话</label>
        <input 
          type="tel" 
          v-model="requestForm.phone"
          required
        >
      </div>

      <div class="form-group">
        <label>具体需求</label>
        <textarea 
          v-model="requestForm.requirements"
          rows="4"
          required
        ></textarea>
      </div>

      <button 
        type="submit"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? '提交中...' : '提交申请' }}
      </button>
    </form>
  </div>
</template> 