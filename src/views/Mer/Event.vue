<template>
    <div class="event-card">
      <!-- Верхняя часть с изображением -->
      <div class="event-image">
        <img :src="event.image" :alt="event.title" />
        <div class="event-date">
          <span class="date-day">{{ formatDay(event.date) }}</span>
          <span class="date-month">{{ formatMonth(event.date) }}</span>
        </div>
        <div class="event-category">{{ event.category }}</div>
      </div>
  
      <!-- Основной контент -->
      <div class="event-content">
        <div class="event-header">
          <h3 class="event-title">{{ event.title }}</h3>
          <div class="event-rating">
            <span class="rating-stars">
              <span 
                v-for="star in 5" 
                :key="star" 
                class="star"
                :class="{ active: star <= event.rating }"
              >
                ★
              </span>
            </span>
            <span class="rating-value">({{ event.rating }})</span>
          </div>
        </div>
  
        <p class="event-description">{{ event.description }}</p>
  
        <!-- Детали мероприятия -->
        <div class="event-details">
          <div class="detail-item">
            <span class="detail-icon pi pi-clock"></span>
            <span class="detail-text">{{ formatTime(event.date) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon pi pi-map-marker"></span>
            <span class="detail-text">{{ event.location }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon pi pi-users"></span>
            <span class="detail-text">{{ event.participants }} участников</span>
          </div>
        </div>
  
        <!-- Нижняя часть с ценой и кнопкой -->
        <div class="event-footer">
          <div class="event-price">
            <span class="price-amount">{{ event.price === 0 ? 'Бесплатно' : `₽${event.price}` }}</span>
          </div>
          <button class="register-btn" :class="{ registered: event.registered }">
            {{ event.registered ? 'Зарегистрирован' : 'Записаться' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    event: {
      type: Object,
      required: true,
      default: () => ({
        id: 1,
        title: 'Название мероприятия',
        description: 'Описание мероприятия которое может быть достаточно длинным и занимать несколько строк текста',
        date: new Date(),
        rating: 4.5,
        location: 'Город Орел, ул. Примерная, 123',
        participants: 150,
        price: 0,
        category: 'Культура',
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        registered: false
      })
    }
  })
  
  const formatDay = (date) => {
    return new Date(date).getDate()
  }
  
  const formatMonth = (date) => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    return months[new Date(date).getMonth()]
  }
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  </script>
  
  <style scoped>
  .event-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(100, 116, 139, 0.1);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    transition: all 0.3s ease;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(100, 116, 139, 0.15);
  }
  
  /* Изображение мероприятия */
  .event-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  .event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .event-date {
    position: absolute;
    top: 12px;
    left: 12px;
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    padding: 8px;
    border-radius: 8px;
    text-align: center;
    min-width: 50px;
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  }
  
  .date-day {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1;
  }
  
  .date-month {
    display: block;
    font-size: 0.8rem;
    opacity: 0.9;
  }
  
  .event-category {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #475569;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  
  /* Контент */
  .event-content {
    padding: 20px;
  }
  
  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .event-title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.3;
    flex: 1;
    margin-right: 12px;
  }
  
  .event-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  
  .rating-stars {
    display: flex;
    gap: 2px;
  }
  
  .star {
    color: #cbd5e1;
    font-size: 1rem;
    transition: color 0.2s ease;
  }
  
  .star.active {
    color: #f59e0b;
  }
  
  .rating-value {
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
  }
  
  .event-description {
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 16px;
    font-size: 0.95rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Детали */
  .event-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    font-size: 0.9rem;
  }
  
  .detail-icon {
    color: #3b82f6;
    font-size: 1rem;
    width: 16px;
  }
  
  .detail-text {
    flex: 1;
  }
  
  /* Футер */
  .event-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #f1f5f9;
  }
  
  .event-price .price-amount {
    font-size: 1.4rem;
    font-weight: bold;
    color: #3b82f6;
  }
  
  .register-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  }
  
  .register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }
  
  .register-btn.registered {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
  }
  
  .register-btn.registered:hover {
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }
  
  /* Адаптивность */
  @media (max-width: 480px) {
    .event-content {
      padding: 16px;
    }
    
    .event-header {
      flex-direction: column;
      gap: 8px;
    }
    
    .event-title {
      margin-right: 0;
    }
    
    .event-footer {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    .register-btn {
      text-align: center;
    }
  }
  </style>