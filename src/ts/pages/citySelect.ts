import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface City {
  id: number
  name: string
  region: string
  isHot?: boolean
}

export function useCitySelect() {
  const router = useRouter()
  const searchText = ref('')

  const cities = ref<City[]>([
    { id: 1, name: '东京', region: '日本', isHot: true },
    { id: 2, name: '大阪', region: '日本', isHot: true },
    { id: 3, name: '京都', region: '日本', isHot: true },
    { id: 4, name: '首尔', region: '韩国', isHot: true },
    { id: 5, name: '曼谷', region: '泰国', isHot: true },
    { id: 6, name: '新加坡', region: '新加坡', isHot: true },
    // 更多城市...
  ])

  const hotCities = computed(() => 
    cities.value.filter(city => city.isHot)
  )

  const filteredCities = computed(() => {
    if (!searchText.value) return []
    return cities.value.filter(city => 
      city.name.includes(searchText.value) ||
      city.region.includes(searchText.value)
    )
  })

  const handleSearch = () => {
    // 可以添加防抖逻辑
  }

  const selectCity = (city: City) => {
    router.push(`/city/${city.id}`)
  }

  return {
    searchText,
    cities,
    hotCities,
    filteredCities,
    handleSearch,
    selectCity
  }
} 