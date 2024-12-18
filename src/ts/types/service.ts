export interface Service {
  id: number
  name: string
  description: string
  type: 'TOUR' | 'GUIDE'
  city: string
  price: number
  address: string
  contactInfo: string
  details: string
  status: number
} 