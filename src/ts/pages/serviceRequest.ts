import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Service } from './services'

interface RequestForm {
  date: string
  phone: string
  requirements: string
}

export function useServiceRequest() {
  const route = useRoute()
  const router = useRouter()
  const service = ref<Service | null>(null)
  const isSubmitting = ref(false)
  
  const requestForm = ref<RequestForm>({
    date: '',
    phone: '',
    requirements: ''
  })

  onMounted(async () => {
    const serviceId = Number(route.query.id)
    // TODO: 从API获取服务信息
    service.value = {
      id: serviceId,
      name: '专业导游',
      description: '提供专业的当地导游服务',
      icon: '/icons/guide.svg'
    }
  })

  const submitRequest = async () => {
    try {
      isSubmitting.value = true
      // TODO: 提交申请到API
      console.log('提交申请:', requestForm.value)
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟API调用
      router.push('/services')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    service,
    requestForm,
    isSubmitting,
    submitRequest
  }
} 