export interface Destination {
  id: number
  name: string
  country: string
  city: string
  description: string
  imageUrl: string
  status: number
  latitude?: number
  longitude?: number
  bestSeason?: string
  climate?: string
}

export interface TravelGuide {
  id: number
  title: string
  content: string
  author: string
  publishDate: Date
  destination: Destination
} 