import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Service } from './services'

interface ServiceSettings {
  notifications: {
    email: boolean
    sms: boolean
  }
  privacy: 'public' | 'private'
}

export function useServiceSettings() {
  const route = useRoute()
  const service = ref<Service | null>(null)
  const settings = ref<ServiceSettings>({
    notifications: {
      email: true,
      sms: false
    },
    privacy: 'public'
  })

  onMounted(async () => {
    const serviceId = Number(route.query.id)
    // TODO: 从API获取服务信息和设置
    service.value = {
      id: serviceId,
      name: '专业导游',
      description: '提供专业的当地导游服务',
      icon: '/icons/guide.svg'
    }
  })

  const updateSettings = async () => {
    // TODO: 保存设置到API
    console.log('更新设置:', settings.value)
  }

  return {
    service,
    settings,
    updateSettings
  }
} 