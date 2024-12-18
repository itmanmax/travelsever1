export interface Destination {
  id: number
  name: string
  description: string
  imageUrl: string
  rating: number
  location: string
}

export interface TravelGuide {
  id: number
  title: string
  content: string
  author: string
  publishDate: Date
  destination: Destination
} 