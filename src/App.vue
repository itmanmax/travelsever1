<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import MainLayout from './components/layout/MainLayout.vue'

const userStore = useUserStore() as unknown as UserStoreType

// 在应用启动时初始化用户状态
onMounted(async () => {
  await userStore.initializeFromStorage()
})
</script>

<template>
  <MainLayout>
    <Suspense>
      <template #default>
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
  </MainLayout>
</template>

<style>
#app {
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}
</style>
