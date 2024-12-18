import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserProfile } from '@/ts/types/user'
import userApi from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isLoggedIn = ref(false)
  const profile = ref<UserProfile | null>(null)
  const initialized = ref(false)

  const initializeFromStorage = async () => {
    try {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        token.value = storedToken
        const response = await userApi.getProfile()
        if (response.data) {
          profile.value = response.data
          isLoggedIn.value = true
        }
      }
    } catch (error) {
      console.error('Failed to initialize user:', error)
      await logout()
    } finally {
      initialized.value = true
    }
  }

  const login = async (loginData: { token: string }) => {
    token.value = loginData.token
    localStorage.setItem('token', loginData.token)
    isLoggedIn.value = true
    
    try {
      const response = await userApi.getProfile()
      if (response.data) {
        profile.value = response.data
      }
    } catch (error) {
      console.error('Failed to get profile after login:', error)
      await logout()
    }
  }

  const logout = async () => {
    token.value = ''
    isLoggedIn.value = false
    profile.value = null
    localStorage.removeItem('token')
  }

  const setProfile = (userProfile: UserProfile) => {
    profile.value = userProfile
    isLoggedIn.value = true
  }

  return {
    token,
    isLoggedIn,
    profile,
    initialized,
    login,
    logout,
    setProfile,
    initializeFromStorage
  }
})

export default useUserStore 