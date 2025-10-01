<template>
    <div class="route-card" :class="{ featured: route.featured }">
      <!-- Бейдж избранного -->
      <div class="featured-badge" v-if="route.featured">
        <span class="pi pi-star-fill"></span>
        <span>Рекомендуем</span>
      </div>
  
      <!-- Основное изображение -->
      <div class="card-image">
        <img :src="route.image" :alt="route.title" class="image" />
        <div class="image-overlay"></div>
        
        <!-- Категория -->
        <div class="category-tag">
          <span class="pi" :class="route.categoryIcon"></span>
          {{ route.category }}
        </div>
  
        <!-- Длительность -->
        <div class="duration-badge">
          <span class="pi pi-clock"></span>
          {{ route.duration }}
        </div>
      </div>
  
      <!-- Контент карточки -->
      <div class="card-content">
        <!-- Заголовок и рейтинг -->
        <div class="card-header">
          <h3 class="route-title">{{ route.title }}</h3>
          <div class="rating">
            <span class="pi pi-star-fill"></span>
            <span class="rating-value">{{ route.rating }}</span>
          </div>
        </div>
  
        <!-- Описание -->
        <p class="route-description">{{ route.description }}</p>
  
        <!-- Особенности -->
        <div class="features">
          <div class="feature" v-for="feature in route.features" :key="feature">
            <span class="pi pi-check"></span>
            {{ feature }}
          </div>
        </div>
  
        <!-- Детали маршрута -->
        <div class="route-details">
          <div class="detail">
            <span class="pi pi-map-marker"></span>
            <span>{{ route.distance }}</span>
          </div>
          <div class="detail">
            <span class="pi pi-user"></span>
            <span>{{ route.difficulty }}</span>
          </div>
          <div class="detail">
            <span class="pi pi-eye"></span>
            <span>{{ route.views }} просмотров</span>
          </div>
        </div>
  
        <!-- Кнопки действий -->
        <div class="card-actions">
          <button class="primary-btn" @click="handleExplore">
            <span class="pi pi-compass"></span>
            Исследовать
          </button>
          <button class="secondary-btn" @click="handleSave">
            <span class="pi" :class="route.saved ? 'pi-bookmark-fill' : 'pi-bookmark'"></span>
          </button>
        </div>
      </div>
    </div>
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
        image: 'https://images.unsplash.com/photo-1544919988-9cdc4d6c0d8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
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
  .route-card {
    position: relative;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
  
  .route-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .route-card.featured {
    border: 2px solid #ff6b6b;
  }
  
  /* Бейдж избранного */
  .featured-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 2;
    backdrop-filter: blur(10px);
  }
  
  /* Изображение */
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .route-card:hover .image {
    transform: scale(1.05);
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.3));
  }
  
  .category-tag {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .duration-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    backdrop-filter: blur(10px);
  }
  
  /* Контент */
  .card-content {
    padding: 24px;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .route-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    line-height: 1.3;
    flex: 1;
    margin-right: 12px;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .route-description {
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Особенности */
  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #f3f4f6;
    color: #374151;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .feature .pi-check {
    color: #10b981;
    font-size: 0.7rem;
  }
  
  /* Детали маршрута */
  .route-details {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    padding: 16px 0;
    border-top: 1px solid #f3f4f6;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .detail {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #6b7280;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .detail .pi {
    color: #8b5cf6;
    font-size: 0.8rem;
  }
  
  /* Кнопки */
  .card-actions {
    display: flex;
    gap: 12px;
  }
  
  .primary-btn {
    flex: 1;
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
  }
  
  .secondary-btn {
    background: transparent;
    border: 2px solid #e5e7eb;
    color: #6b7280;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .secondary-btn:hover {
    border-color: #8b5cf6;
    color: #8b5cf6;
    transform: translateY(-2px);
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .route-card {
    animation: fadeIn 0.6s ease-out;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .card-content {
      padding: 20px;
    }
    
    .route-title {
      font-size: 1.1rem;
    }
    
    .route-details {
      flex-direction: column;
      gap: 8px;
    }
    
    .card-actions {
      flex-direction: column;
    }
    
    .secondary-btn {
      order: -1;
    }
  }
  
  /* Темная тема */
  @media (prefers-color-scheme: dark) {
    .route-card {
      background: #1f2937;
      border-color: #374151;
    }
    
    .route-title {
      color: #f9fafb;
    }
    
    .route-description {
      color: #d1d5db;
    }
    
    .feature {
      background: #374151;
      color: #e5e7eb;
    }
    
    .route-details {
      border-color: #374151;
    }
    
    .detail {
      color: #9ca3af;
    }
    
    .secondary-btn {
      border-color: #4b5563;
      color: #9ca3af;
    }
  }
  </style>