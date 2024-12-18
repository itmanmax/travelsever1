import { ref, onMounted } from 'vue'
import { publicApi } from '@/api/public'
import type { Destination } from '@/ts/types'
import type { PageResponse } from '@/ts/types/common'

export function useDestinations() {
  const destinations = ref<Destination[]>([])
  const loading = ref(false)
  const error = ref('')
  const currentPage = ref(0)
  const totalPages = ref(0)
  const pageSize = 8
  const keyword = ref('')

  const fetchDestinations = async (page = 0) => {
    try {
      loading.value = true
      let response
      
      if (keyword.value) {
        response = await publicApi.searchDestinations(keyword.value, {
          page,
          size: pageSize
        })
      } else {
        response = await publicApi.getDestinations({
          page,
          size: pageSize
        })
      }
      
      if (response.data.code === 200) {
        const pageData = response.data.data
        destinations.value = pageData.content
        totalPages.value = pageData.totalPages
        currentPage.value = page
      } else {
        error.value = response.data.message || '获取景点数据失败'
      }
    } catch (err) {
      console.error('获取景点失败:', err)
      error.value = '获取景点数据失败'
    } finally {
      loading.value = false
    }
  }

  const handleSearch = async (searchText: string) => {
    keyword.value = searchText
    currentPage.value = 0 // 重置页码
    await fetchDestinations(0)
  }

  const handlePageChange = (page: number) => {
    fetchDestinations(page)
  }

  onMounted(() => {
    fetchDestinations()
  })

  return {
    destinations,
    loading,
    error,
    currentPage,
    totalPages,
    handleSearch,
    handlePageChange
  }
} 