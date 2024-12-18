<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import { useClickOutside } from '@/composables/useClickOutside'

const userStore = useUserStore() as unknown as UserStoreType
const router = useRouter()
const showDropdown = ref(false)
const menuRef = ref<HTMLElement | null>(null)

useClickOutside(menuRef, () => {
  showDropdown.value = false
})

const handleProfile = () => {
  router.push('/profile')
  showDropdown.value = false
}

const handleLogout = async () => {
  await userStore.logout()
  showDropdown.value = false
  router.push('/login')
}
</script>

<template>
  <div class="user-menu-container" ref="menuRef">
    <div 
      class="user-avatar"
      @click="showDropdown = !showDropdown"
    >
      <img 
        :src="userStore.profile?.avatar || '/images/default-avatar.jpg'" 
        :alt="userStore.profile?.nickname"
      >
    </div>

    <div 
      v-if="showDropdown" 
      class="dropdown-menu"
    >
      <div class="menu-item" @click="handleProfile">
        <i class="icon-user"></i>
        个人资料
      </div>
      <div class="menu-item" @click="handleLogout">
        <i class="icon-logout"></i>
        退出登录
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-menu-container {
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
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
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 8px 0;
  min-width: 120px;
  z-index: 1000;
}

.menu-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item i {
  font-size: 1.1rem;
  color: #666;
}
</style> 