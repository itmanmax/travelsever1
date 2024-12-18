/// <reference types="vite/client" />
/// <reference types="pinia" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'pinia' {
  export { defineStore, createPinia } from '@pinia/types'
}
