import { ref, onMounted } from 'vue'
import { publicApi } from '@/api/public'
import type { Service } from '@/ts/types/service'
import { useRouter } from 'vue-router'

export function useTourGroup() {
  const services = ref<Service[]>([])
  const loading = ref(false)
  const error = ref('')
  const router = useRouter()

  const fetchServices = async () => {
    try {
      loading.value = true
      const response = await publicApi.getServiceList()
      if (response.data.code === 200) {
        services.value = response.data.data
      } else {
        error.value = response.data.message || '获取服务列表失败'
      }
    } catch (err) {
      console.error('获取服务列表失败:', err)
      error.value = '获取服务列表失败'
    } finally {
      loading.value = false
    }
  }

  const handleItemClick = (serviceId: number) => {
    router.push(`/tour-group/${serviceId}`)
  }

  onMounted(() => {
    fetchServices()
  })

  return {
    services,
    loading,
    error,
    handleItemClick
  }
} 