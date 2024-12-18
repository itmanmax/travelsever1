import { ref } from 'vue'

export function useSearch() {
  const searchQuery = ref('')

  const handleSearch = (emit: any) => {
    emit('search', searchQuery.value)
  }

  return {
    searchQuery,
    handleSearch
  }
} 