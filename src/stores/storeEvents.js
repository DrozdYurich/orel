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
  loading.value = true;

  try {
    // Выполняем запрос и ждём минимум 1500 мс
    const [response] = await Promise.all([
      apiClient.get('/events'),
      new Promise(resolve => setTimeout(resolve, 1500)) // ← 1.5 секунды
    ]);

    console.log(response.data);
    events.value = response.data.items; // или просто response.data, если сервер возвращает массив напрямую
  } catch (err) {
    console.error('Ошибка при загрузке событий:', err);
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
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
    loading,
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