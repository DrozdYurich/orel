<template>
        <p class="route-description">{{ route.description }}</p>      
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    route: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        title: 'Исторический центр Орла',
        description: 'Прогулка по самым значимым историческим местам города, включая старинные усадьбы и памятники архитектуры.',
        rating: 4.8,
        duration: '2-3 часа',
        distance: '5.2 км',
        difficulty: 'Легкий',
        category: 'История',
        features: ['Бесплатно', 'Для семьи', 'Фото-точки'],
        featured: true,
        saved: false
      })
    }
  })
  
  const emit = defineEmits(['explore', 'save'])
  
  const handleExplore = () => {
    emit('explore', props.route.id)
  }
  
  const handleSave = () => {
    emit('save', props.route.id)
  }
  </script>
  
  <style scoped>
  
  .route-description {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
    font-weight: 500;
    background: rgba(248, 250, 252, 0.8);
    padding: 16px;
    border-radius: 12px;
    border-left: 4px solid #8b5cf6;
    
  }
  
  
  </style>