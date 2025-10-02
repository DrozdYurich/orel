import { apiClient } from '@/main'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useVictStore = defineStore('victorin', () => {
  const loading = ref(false)
  const quiz = ref([]
  )
  const fetchEvents = async () => {
      loading.value = true
    
      try {
        const response = await apiClient.get('/quizzes') // ← путь к эндпоинту
        
        quiz.value = response.data.items // предполагается, что сервер возвращает массив
        console.log(quiz.value,'quz')
      } catch (err) {
        console.error('Ошибка при загрузке событий:', err)
        
      } finally {
        loading.value = false
      }
    }
  const getVict = computed(() => {
    return quiz.value
  })
    const getloading = computed(() => {
    return loading.value
  })

  return {
    getloading,
    fetchEvents,
    getVict
  }
})