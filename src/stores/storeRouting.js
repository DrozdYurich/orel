import { apiClient } from '@/main'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoutingStore = defineStore('routing', () => {
  const loading = ref(false)
  const routing = ref([
    
  ])
  const fetchRout = async () => {
      loading.value = true
    
      try {
        const response = await apiClient.get('/walking-routes') // ← путь к эндпоинту
        console.log(response.data)
        routing.value = response.data.items // предполагается, что сервер возвращает массив
      } catch (err) {
        console.error('Ошибка при загрузке событий:', err)
        
      } finally {
        loading.value = false
      }
    }
  const getRout = computed(() => {
    return routing.value
  })
   const getloading = computed(() => {
    return loading.value
  })
  return {
    getRout,
    getloading,
    getloading,
    fetchRout
  }
})