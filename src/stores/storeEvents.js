import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEventsStore = defineStore('events', () => {
  // Состояние
  const events = ref([
    {
      id: 1,
      title: 'Фестиваль уличного искусства',
      description: 'Крупнейший фестиваль уличного искусства в Центральной России с участием известных художников.',
      date: '2024-12-15T19:00:00',
      rating: 4.8,
      location: 'Орел, Парк культуры и отдыха',
      category: 'Искусство',
      organizer: 'Департамент культуры',
      tags: ['Уличное искусство', 'Бесплатно', 'Для всей семьи'],
      registered: false,
      featured: true
    },
    {
      id: 2,
      title: 'Мастер-класс по гончарному делу',
      description: 'Научитесь создавать керамические изделия своими руками под руководством опытного мастера.',
      date: '2024-12-18T14:00:00',
      rating: 4.6,
      location: 'Орел, Арт-пространство "Гончар"',
      category: 'Образование',
      organizer: 'Арт-пространство "Гончар"',
      tags: ['Мастер-класс', 'Творчество', 'Ручная работа'],
      registered: true,
      featured: false
    }
  ])
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
  const registerForEvent = (eventId) => {
    const event = events.value.find(e => e.id === eventId)
    if (event) {
      event.registered = true
    }
  }

  return {
    events,
    filters,
    filteredEvents,
    hasActiveFilters,
    updateFilters,
    clearFilters,
    registerForEvent,
    getEvent
  }
})