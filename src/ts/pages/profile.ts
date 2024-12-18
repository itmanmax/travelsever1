import { ref, onMounted } from 'vue'
import useUserStore from '@/stores/user'
import type { UserStoreType } from '@/stores/types'
import type { UserProfile } from '@/ts/types/user'
import userApi from '@/api/user'

export function useProfile() {
  const userStore = useUserStore() as unknown as UserStoreType
  const isEditing = ref(false)
  const isSaving = ref(false)
  const message = ref('')
  
  const userInfo = ref<UserProfile>({
    id: 0,
    username: '',
    email: '',
    phone: '',
    avatar: '',
    nickname: '',
    role: '',
    status: 1,
    createdTime: '',
    updatedTime: ''
  })

  // 用于编辑的临时数据
  const editData = ref({
    nickname: '',
    email: '',
    phone: '',
    avatar: ''
  })

  onMounted(async () => {
    if (userStore.profile.value) {
      userInfo.value = { ...userStore.profile.value }
      initEditData()
    } else {
      try {
        const response = await userApi.getProfile()
        if (response.data) {
          userInfo.value = response.data
          initEditData()
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
  })

  const initEditData = () => {
    editData.value = {
      nickname: userInfo.value.nickname,
      email: userInfo.value.email,
      phone: userInfo.value.phone,
      avatar: userInfo.value.avatar
    }
  }

  const toggleEdit = () => {
    if (isEditing.value) {
      // 取消编辑，恢复原始数据
      initEditData()
    }
    isEditing.value = !isEditing.value
    message.value = ''
  }

  const handleSave = async () => {
    try {
      isSaving.value = true
      message.value = ''

      // 只提交已修改的字段
      const updateData: Record<string, string> = {}
      Object.entries(editData.value).forEach(([key, value]) => {
        if (value !== userInfo.value[key as keyof UserProfile]) {
          updateData[key] = value
        }
      })

      if (Object.keys(updateData).length === 0) {
        message.value = '没有需要更新的内容'
        return
      }

      const response = await userApi.updateProfile(updateData)
      
      if (response.data.code === 200) {
        // 更新本地数据
        userInfo.value = response.data.data
        // 更新 store 中的用户信息
        userStore.setProfile(response.data.data)
        isEditing.value = false
        message.value = '更新成功'
      } else {
        message.value = response.data.message || '更新失败'
      }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      message.value = '更新失败，请稍后重试'
    } finally {
      isSaving.value = false
    }
  }

  return {
    userInfo,
    editData,
    isEditing,
    isSaving,
    message,
    toggleEdit,
    handleSave
  }
} 