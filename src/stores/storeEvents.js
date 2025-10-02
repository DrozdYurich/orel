import { apiClient } from '@/main'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEventsStore = defineStore('events', () => {
  const loading = ref(false)
  const events = ref([]
  )
  const filters = ref({
    startDate: '',
    endDate: '',
    minRating: 0
  })

  // Геттеры
  const filteredEvents = computed(() => {
    return events.value.filter(event => {
      // Фильтр по дате начала
      if (filters.value.startDate && event.date < filters.value.startDate) {
        return false
      }
      // Фильтр по дате окончания
      if (filters.value.endDate && event.date > filters.value.endDate + 'T23:59:59') {
        return false
      }
      // Фильтр по рейтингу
      if (filters.value.minRating > 0 && event.rating < filters.value.minRating) {
        return false
      }
      return true
    })
  })
const fetchEvents = async () => {
    loading.value = true
  
    try {
      const response = await apiClient.get('/events') // ← путь к эндпоинту
      console.log(response.data)
      events.value = response.data.items // предполагается, что сервер возвращает массив
    } catch (err) {
      console.error('Ошибка при загрузке событий:', err)
      
    } finally {
      loading.value = false
    }
  }
  const hasActiveFilters = computed(() => {
    return filters.value.startDate || filters.value.endDate || filters.value.minRating > 0
  })

  // Действия
  const updateFilters = (newFilters) => {
    Object.assign(filters.value, newFilters)
  }

  const clearFilters = () => {
    filters.value = {
      startDate: '',
      endDate: '',
      minRating: 0
    }
  }
  const getEvent = computed(() => {
    return events.value
  })
    const getloading = computed(() => {
    return loading.value
  })
  const registerForEvent = (eventId) => {
    const event = events.value.find(e => e.id === eventId)
    if (event) {
      event.registered = true
    }
  }

  return {
    events,
    getloading,
    fetchEvents,
    filters,
    filteredEvents,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    registerForEvent,
    getEvent
  }
})