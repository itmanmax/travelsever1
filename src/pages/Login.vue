<script setup lang="ts">
import { useLogin } from '@/ts/pages/login'
import '@/css/pages/login.css'

const props = defineProps<{
  isRegister?: boolean
}>()

const {
  formData,
  loading,
  error,
  handleLogin,
  handleRegister
} = useLogin(props.isRegister)
</script>

<template>
  <div class="login-page">
    <div class="form-container">
      <h1>{{ isRegister ? '注册' : '登录' }}</h1>
      <form class="auth-form" @submit.prevent="isRegister ? handleRegister() : handleLogin()">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            required
            :disabled="loading"
            autocomplete="username"
            :placeholder="isRegister ? '请设置用户名' : '请输入用户名'"
          >
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            :disabled="loading"
            :autocomplete="isRegister ? 'new-password' : 'current-password'"
            :placeholder="isRegister ? '请设置密码' : '请输入密码'"
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="submit-btn"
          :disabled="loading"
        >
          {{ loading ? (isRegister ? '注册中...' : '登录中...') : (isRegister ? '注册' : '登录') }}
        </button>
      </form>

      <div class="toggle-mode">
        {{ isRegister ? '已有账号？' : '还没有账号？' }}
        <RouterLink :to="isRegister ? '/login' : '/register'">
          {{ isRegister ? '去登录' : '去注册' }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.form-container {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4f;
  margin-bottom: 16px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.submit-btn:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.toggle-mode {
  margin-top: 16px;
  text-align: center;
  color: #666;
}

.toggle-mode a {
  color: #4CAF50;
  text-decoration: none;
  margin-left: 4px;
}

.toggle-mode a:hover {
  text-decoration: underline;
}
</style> 