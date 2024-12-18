declare module '@/stores/user' {
  import { Store } from 'pinia'
  
  interface UserState {
    isLoggedIn: boolean
    username: string
    token: string
  }

  interface UserStore extends Store<'user', UserState> {
    login: (loginData: { username: string; password: string }) => Promise<void>
    logout: () => Promise<void>
    checkAuth: () => void
  }

  const useUserStore: () => UserStore
  export default useUserStore
} 