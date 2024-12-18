<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'

const router = useRouter()
const store = useUserStore() as unknown as UserStoreType

// 使用计算属性来获取状态
const isLoggedIn = computed(() => store.isLoggedIn)
const userProfile = computed(() => store.profile)

// 初始化 store
onMounted(async () => {
  if (!store.initialized) {
    await store.initializeFromStorage()
  }
})

const handleLogout = async () => {
  await store.logout()
  router.push('/login')
}

watch([isLoggedIn, userProfile], ([newLoggedIn, newProfile]) => {
  if (newLoggedIn !== undefined && newProfile !== undefined) {
    console.log('导航栏状态更新:', {
      isLoggedIn: newLoggedIn,
      profile: newProfile
    })
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="logo">
        <div class="logo-icon">
          <svg class="travel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">旅游指南</span>
      </RouterLink>

      <div class="nav-content">
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">首页</RouterLink>
          <RouterLink to="/destinations" class="nav-link">目的地</RouterLink>
          <RouterLink to="/guides" class="nav-link">攻略</RouterLink>
          <RouterLink to="/community" class="nav-link">社区</RouterLink>
        </div>
        
        <div class="auth-section">
          <!-- 已登录显示用户信息 -->
          <template v-if="isLoggedIn && userProfile">
            <div class="user-menu">
              <div class="user-avatar">
                <img 
                  :src="userProfile.avatar || '/images/default-avatar.jpg'" 
                  :alt="userProfile.nickname || '用户头像'"
                >
              </div>
              <div class="dropdown-menu">
                <div class="user-info">
                  <strong>{{ userProfile.nickname || '用户' }}</strong>
                  <span>{{ userProfile.email || '' }}</span>
                </div>
                <RouterLink to="/profile" class="dropdown-item">
                  <i class="icon-profile"></i>
                  个人资料
                </RouterLink>
                <a href="#" @click.prevent="handleLogout" class="dropdown-item">
                  <i class="icon-logout"></i>
                  退出登录
                </a>
              </div>
            </div>
          </template>
          <!-- 未登录显示登录注册按钮 -->
          <template v-else>
            <RouterLink to="/login" class="auth-link login">登录</RouterLink>
            <RouterLink to="/register" class="auth-link register">注册</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background-color: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.travel-icon {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-size: 1.2rem;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 100%;
}

.nav-links {
  display: flex;
  gap: 24px;
  height: 100%;
  align-items: center;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  padding: 0 12px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}

.nav-link:hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #4CAF50;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.auth-link {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
}

.auth-link.login {
  color: #4CAF50;
  border: 1px solid #4CAF50;
}

.auth-link.login:hover {
  background-color: #f0f8f0;
}

.auth-link.register {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.auth-link.register:hover {
  background-color: #45a049;
}

.user-menu {
  position: relative;
  padding: 0 12px;
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: none;
  z-index: 1000;
}

.user-menu:hover .dropdown-menu {
  display: block;
}

.user-info {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.user-info strong {
  display: block;
  color: #333;
}

.user-info span {
  font-size: 0.9em;
  color: #666;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.icon-profile,
.icon-logout {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .nav-content {
    display: flex !important;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .auth-section {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .auth-link {
    width: 100%;
    text-align: center;
  }

  .user-menu {
    width: 100%;
    justify-content: center;
    height: auto;
  }

  .dropdown-menu {
    position: static;
    display: none;
    box-shadow: none;
    margin-top: 10px;
  }

  .user-menu:hover .dropdown-menu {
    display: block;
  }
}
</style> 