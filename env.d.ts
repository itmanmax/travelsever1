/// <reference types="vite/client" />

declare module 'vue' {
  import { DefineComponent } from '@vue/runtime-core'
  export * from '@vue/runtime-core'
  export const defineComponent: typeof DefineComponent
  export function ref<T>(value: T): { value: T }
  export function onMounted(cb: () => void): void
  export function createApp(rootComponent: any): any
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  import type { RouteLocationNormalized } from 'vue-router/dist/vue-router'
  
  export interface Router {
    push(to: RouteLocationPath): Promise<void>
    replace(to: RouteLocationPath): Promise<void>
    go(delta: number): void
    back(): void
    forward(): void
  }

  export interface RouteLocationRaw {
    path?: string
    name?: string
    params?: Record<string, any>
    query?: Record<string, any>
  }

  export type RouteLocationPath = string | RouteLocationRaw
  
  export function createRouter(options: RouterOptions): Router
  export function createWebHistory(base?: string): RouterHistory
  export function useRouter(): Router
  export function useRoute(): RouteLocationNormalized

  export interface RouterOptions {
    history: RouterHistory
    routes: RouteRecordRaw[]
  }

  export interface RouterHistory {
    base: string
    location: string
    push(to: string): Promise<void>
    replace(to: string): Promise<void>
    go(delta: number): void
    back(): void
    forward(): void
  }

  export interface RouteRecordRaw {
    path: string
    name?: string
    component: any
    components?: Record<string, any>
    redirect?: string | RouteLocationRaw
    children?: RouteRecordRaw[]
    meta?: Record<string, any>
  }
} 