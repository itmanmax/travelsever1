import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Area {
  id: number
  name: string
  description: string
}

interface Guide {
  id: number
  title: string
  summary: string
  author: string
  publishDate: string
  imageUrl: string
}

interface Attraction {
  id: number
  name: string
  description: string
  imageUrl: string
  rating: number
  price: number
}

interface Restaurant {
  id: number
  name: string
  cuisine: string
  imageUrl: string
  rating: number
}

interface Hotel {
  id: number
  name: string
  type: string
  imageUrl: string
  price: number
}

export function useAreaGuide() {
  const route = useRoute()
  const area = ref<Area | null>(null)
  const guides = ref<Guide[]>([])
  const attractions = ref<Attraction[]>([])
  const restaurants = ref<Restaurant[]>([])
  const hotels = ref<Hotel[]>([])

  onMounted(async () => {
    const areaId = Number(route.params.id)
    // TODO: 从API获取数据
    area.value = {
      id: areaId,
      name: '新宿区',
      description: '东京最著名的商业、购物和娱乐区之一，这里有众多的百货商店、餐厅和娱乐场所。'
    }

    guides.value = [
      {
        id: 1,
        title: '新宿购物攻略',
        summary: '详细介绍新宿各大商场和特色店铺...',
        author: '购物达人',
        publishDate: '2024-03-15',
        imageUrl: '/images/guides/shinjuku-shopping.jpg'
      },
      {
        id: 2,
        title: '新宿美食地图',
        summary: '带你探索新宿地区的特色美食...',
        author: '美食家',
        publishDate: '2024-03-14',
        imageUrl: '/images/guides/shinjuku-food.jpg'
      }
    ]

    attractions.value = [
      {
        id: 1,
        name: '东京都厅',
        description: '东京都政府所在地，免费观景台可以俯瞰东京全景',
        imageUrl: '/images/attractions/tokyo-metropolitan.jpg',
        rating: 4.5,
        price: 0
      },
      {
        id: 2,
        name: '新宿御苑',
        description: '占地58.3公顷的大型公园，是观赏樱花的著名景点',
        imageUrl: '/images/attractions/shinjuku-gyoen.jpg',
        rating: 4.8,
        price: 500
      }
    ]

    restaurants.value = [
      {
        id: 1,
        name: '寿司大',
        cuisine: '日本料理',
        imageUrl: '/images/restaurants/sushi.jpg',
        rating: 4.7
      },
      {
        id: 2,
        name: '一兰拉面',
        cuisine: '日本拉面',
        imageUrl: '/images/restaurants/ramen.jpg',
        rating: 4.5
      }
    ]

    hotels.value = [
      {
        id: 1,
        name: '京王广场酒店',
        type: '豪华酒店',
        imageUrl: '/images/hotels/keio-plaza.jpg',
        price: 1500
      },
      {
        id: 2,
        name: '新宿格兰贝尔酒店',
        type: '商务酒店',
        imageUrl: '/images/hotels/granbell.jpg',
        price: 800
      }
    ]
  })

  return {
    area,
    guides,
    attractions,
    restaurants,
    hotels
  }
} 