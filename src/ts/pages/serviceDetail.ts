import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publicApi } from '@/api/public'
import type { Service } from '@/ts/types/service'

export function useServiceDetail() {
  const route = useRoute()
  const router = useRouter()
  const service = ref<Service | null>(null)
  const loading = ref(false)
  const error = ref('')

  const fetchServiceDetail = async () => {
    const id = Number(route.params.id)
    if (!id) {
      error.value = '无效的服务ID'
      return
    }

    try {
      loading.value = true
      const response = await publicApi.getServiceDetail(id)
      if (response.data.code === 200) {
        service.value = response.data.data
      } else {
        error.value = response.data.message || '获取服务详情失败'
      }
    } catch (err) {
      console.error('获取服务详情失败:', err)
      error.value = '获取服务详情失败'
    } finally {
      loading.value = false
    }
  }

  const handleBooking = () => {
    if (service.value) {
      router.push(`/service-request/${service.value.id}`)
    }
  }

  onMounted(() => {
    fetchServiceDetail()
  })

  return {
    service,
    loading,
    error,
    handleBooking
  }
} 