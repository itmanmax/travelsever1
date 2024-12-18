import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface Service {
  id: number
  name: string
  description: string
  icon: string
}

const defaultServices: Service[] = [
  {
    id: 1,
    name: '专业导游',
    description: '提供专业的当地导游服务，让您的旅行更加轻松愉快',
    icon: '/icons/guide.svg'
  },
  {
    id: 2,
    name: '接送机',
    description: '机场专车接送服务，舒适便捷',
    icon: '/icons/transfer.svg'
  },
  {
    id: 3,
    name: '行程规划',
    description: '根据您的喜好，为您量身定制完美行程',
    icon: '/icons/planning.svg'
  }
]

export function useServices() {
  const router = useRouter()
  const services = ref<Service[]>(defaultServices)

  const navigateToSettings = (serviceId: number) => {
    router.push(`/services/settings?id=${serviceId}`)
  }

  const navigateToRequest = (serviceId: number) => {
    router.push(`/services/request?id=${serviceId}`)
  }

  return {
    services,
    navigateToSettings,
    navigateToRequest
  }
}

export default defaultServices 