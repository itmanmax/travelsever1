<script setup lang="ts">
import { navigationConfig } from '@/config/navigation'
import Footer from './Footer.vue'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import UserMenu from '@/components/common/UserMenu.vue'

const userStore = useUserStore() as unknown as UserStoreType
</script>

<template>
  <div class="main-layout">
    <header class="header">
      <div class="logo">
        <RouterLink to="/" class="logo-text">
          旅游指南
        </RouterLink>
      </div>
      
      <nav class="nav-menu">
        <RouterLink 
          v-for="item in navigationConfig" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="user-menu">
        <template v-if="userStore.isLoggedIn">
          <UserMenu />
        </template>
        <template v-else>
          <RouterLink to="/login" class="login-btn">登录</RouterLink>
          <RouterLink to="/register" class="register-btn">注册</RouterLink>
        </template>
      </div>
    </header>

    <main class="main-content">
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 100;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  text-decoration: none;
  padding: 8px 0;
}

.logo-text:hover {
  color: #45a049;
}

.nav-menu {
  display: flex;
  align-items: center;
  margin-left: 48px;
  gap: 24px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 0;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #4CAF50;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #4CAF50;
}

.user-menu {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-btn,
.register-btn {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
}

.login-btn {
  color: #4CAF50;
}

.register-btn {
  background: #4CAF50;
  color: white;
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
</style> 