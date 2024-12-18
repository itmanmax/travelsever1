import { ref, onMounted } from 'vue'
import { publicApi } from '@/api/public'
import type { Destination } from '@/ts/types'

export function useFeaturedDestinations() {
  const destinations = ref<Destination[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchDestinations = async (retryCount = 0) => {
    try {
      loading.value = true
      const response = await publicApi.getFeaturedDestinations()
      if (response.data.code === 200) {
        destinations.value = response.data.data.content
      } else {
        error.value = response.data.message || '获取景点数据失败'
      }
    } catch (err) {
      console.error('获取景点失败:', err)
      if (retryCount < 3) {
        setTimeout(() => {
          fetchDestinations(retryCount + 1)
        }, 1000 * (retryCount + 1))
      } else {
        error.value = '获取景点数据失败，请稍后重试'
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchDestinations()
  })

  return {
    destinations,
    loading,
    error
  }
} 