import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/api/auth'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import type { ApiResponse, RegisterParams } from '@/ts/types/auth'
import userApi from '@/api/user'

export function useLogin(_isRegister = false) {
  const router = useRouter()
  const userStore = useUserStore() as unknown as UserStoreType
  
  const formData = ref({
    username: '',
    password: '',
    email: '',
    phone: '',
    nickname: '',
    avatar: ''
  })
  
  const loading = ref(false)
  const error = ref('')

  const handleLogin = async () => {
    if (loading.value) return

    try {
      loading.value = true
      error.value = ''
      
      const response = await auth.login({
        username: formData.value.username,
        password: formData.value.password
      })

      console.log('Login response:', response)
      const result = response.data

      if (result.code === 200) {
        console.log('Login successful, setting token:', result.data.token)
        await userStore.login({
          token: result.data.token
        })

        try {
          const profileResponse = await userApi.getProfile()
          console.log('Profile response:', profileResponse)
          
          if (profileResponse.data) {
            console.log('Setting profile:', profileResponse.data)
            userStore.setProfile(profileResponse.data)
            router.push('/')
          }
        } catch (profileError) {
          console.error('获取用户资料失败:', profileError)
          error.value = '获取用户资料失败'
          await userStore.logout()
        }
      } else {
        error.value = result.message || '登录失败'
      }
    } catch (err) {
      error.value = '登录失败，请稍后重试'
      console.error('登录错误:', err)
    } finally {
      loading.value = false
    }
  }

  const handleRegister = async () => {
    try {
      loading.value = true
      error.value = ''
      
      const registerData: RegisterParams = {
        username: formData.value.username,
        password: formData.value.password,
        email: formData.value.email,
        phone: formData.value.phone,
        nickname: formData.value.nickname
      }

      if (formData.value.avatar) {
        registerData.avatar = formData.value.avatar
      }

      const response = await auth.register(registerData)
      const result = response.data as ApiResponse<null>
      
      if (result.code === 200) {
        await handleLogin()
      } else {
        error.value = result.message
      }
    } catch (err) {
      error.value = '注册失败，请稍后重试'
      console.error('注册错误:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    formData,
    loading,
    error,
    handleLogin,
    handleRegister
  }
} 