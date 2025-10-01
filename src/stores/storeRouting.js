import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoutingStore = defineStore('routing', () => {
  // Состояние
  const routing = ref([
    {
        id: 1,
        title: 'Исторический центр Орла',
        description: 'Прогулка по самым значимым историческим местам города.',
        image: 'https://images.unsplash.com/photo-1544919988-9cdc4d6c0d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        rating: 4.8,
        duration: '2-3 часа',
        distance: '5.2 км',
        difficulty: 'Легкий',
        category: 'История',
        categoryIcon: 'pi-landmark',
        features: ['Бесплатно', 'Для семьи', 'Фото-точки'],
        views: 1247,
        featured: true,
        saved: false
      },
      {
        id: 2,
        title: 'Набережная реки Ока',
        description: 'Живописная прогулка вдоль реки с прекрасными видами.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        rating: 4.6,
        duration: '1-2 часа',
        distance: '3.8 км',
        difficulty: 'Легкий',
        category: 'Природа',
        categoryIcon: 'pi-tree',
        features: ['Для пар', 'Закаты', 'Отдых'],
        views: 892,
        featured: false,
        saved: true
      }
  ])
  const getRout = computed(() => {
    return routing.value
  })

  return {
    getRout
  }
})