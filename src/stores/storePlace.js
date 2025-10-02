import { apiClient } from '@/main'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlaceStore = defineStore('place', () => {
  const loading = ref(false)
  const place = ref([ ])
  const getPlace = computed(() => {
    return place.value
  })
  const fetchEvents = async () => {
      loading.value = true
    
      try {
        const response = await apiClient.get('/scenic-spots') // ← путь к эндпоинту
        
        place.value = response.data.items // предполагается, что сервер возвращает массив
        console.log(place.value)
      } catch (err) {
        console.error('Ошибка при загрузке событий:', err)
        
      } finally {
        loading.value = false
      }
    }
  const getloading = computed(() => {
    return loading.value
  })
  return {
    getloading,
    fetchEvents,
    getPlace
  }
})