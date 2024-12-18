import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, NavigationGuardNext } from 'vue-router'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import Destinations from '../pages/Destinations.vue'
import Services from '../pages/Services.vue'
import ServiceSettings from '../pages/ServiceSettings.vue'
import ServiceRequest from '../pages/ServiceRequest.vue'
import Forum from '../pages/Forum.vue'
import ForumPost from '../pages/ForumPost.vue'
import Home from '@/pages/Home.vue'
import Profile from '@/pages/Profile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: () => import('@/pages/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Login.vue'),
    props: { isRegister: true },
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: Destinations
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/services/settings',
    name: 'ServiceSettings',
    component: ServiceSettings
  },
  {
    path: '/services/request',
    name: 'ServiceRequest',
    component: ServiceRequest
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/forum/post/:id',
    name: 'ForumPost',
    component: ForumPost
  },
  {
    path: '/guides',
    name: 'Guides',
    component: () => import('@/pages/Guides.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/guides/:id',
    name: 'GuideDetail',
    component: () => import('@/pages/GuideDetail.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../pages/Community.vue')
  },
  {
    path: '/destinations/:id',
    name: 'DestinationDetail',
    component: () => import('@/pages/DestinationDetail.vue')
  },
  {
    path: '/tour-group',
    name: 'TourGroup',
    component: () => import('@/pages/TourGroup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/tour-group/:id',
    name: 'ServiceDetail',
    component: () => import('@/pages/ServiceDetail.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, _from, next: NavigationGuardNext) => {
  const store = useUserStore() as unknown as UserStoreType
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 确保 store 已经初始化
  if (!store.initialized) {
    await store.initializeFromStorage()
  }

  if (requiresAuth && !store.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router 