<template>
    <div class="event-card-horizontal" >
      <!-- Левая часть с датой -->
      <div class="event-date-section">
        <div class="event-date-badge">
          <span class="date-day">{{ formatDay(event.date) }}</span>
          <span class="date-month">{{ formatMonth(event.date) }}</span>
          <span class="date-weekday">{{ formatWeekday(event.date) }}</span>
        </div>
        <div class="event-time">
          <span class="time-icon pi pi-clock"></span>
          {{ formatTime(event.date) }}
        </div>
      </div>
  
      <!-- Центральная часть с контентом -->
      <div class="event-content">
        <div class="event-header">
          <h3 class="event-title">{{ event.title }}</h3>
          <div class="event-meta">
            <span class="event-category" :style="{ backgroundColor: getCategoryColor(event.category) }">
              {{ event.category }}
            </span>
            <div class="event-rating">
              <div class="rating-stars">
                <span 
                  v-for="star in 5" 
                  :key="star" 
                  class="star"
                  :class="{ active: star <= event.rating }"
                >
                  ★
                </span>
              </div>
              <span class="rating-value">{{ event.rating }}</span>
            </div>
          </div>
        </div>
  
        <p class="event-description">{{ event.description }}</p>
  
        <div class="event-details">
          <div class="detail-item">
            <span class="detail-icon pi pi-map-marker"></span>
            <span class="detail-text">{{ event.location }}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-icon pi pi-building"></span>
            <span class="detail-text">{{ event.organizer }}</span>
          </div>
        </div>
  
        <div class="event-tags" v-if="event.tags && event.tags.length">
          <span 
            v-for="tag in event.tags" 
            :key="tag"
            class="event-tag"
          >
            {{ tag }}
          </span>
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

        category: 'Культура',
        organizer: 'Организатор мероприятия',
        tags: ['Для всей семьи', 'На улице', 'Активный отдых'],
        registered: false,
      
      })
    }
  })
  
  const emit = defineEmits(['register'])
  
  const categoryColors = {
    'Культура': '#8b5cf6',
    'Спорт': '#10b981',
    'Образование': '#3b82f6',
    'Развлечения': '#f59e0b',
    'Искусство': '#ec4899',
    'Гастрономия': '#ef4444',
    'Экскурсия': '#06b6d4'
  }
  
  const formatDay = (date) => {
    return new Date(date).getDate()
  }
  
  const formatMonth = (date) => {
    const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
    return months[new Date(date).getMonth()]
  }
  
  const formatWeekday = (date) => {
    const weekdays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    return weekdays[new Date(date).getDay()]
  }
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  const getCategoryColor = (category) => {
    return categoryColors[category] || '#6b7280'
  }
  </script>
  
  <style scoped>
  .event-card-horizontal {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(100, 116, 139, 0.1);
    border: 1px solid #e2e8f0;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    min-height: 180px;
    margin: 0 auto;
  }
  
  .event-card-horizontal:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(100, 116, 139, 0.15);
  }
  
  .event-card-horizontal.featured {
    border: 2px solid #3b82f6;
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
  }
  
  /* Левая часть - дата */
  .event-date-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-right: 1px solid #f1f5f9;
    min-width: 120px;
    flex-shrink: 0;
  }
  
  .event-date-badge {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    min-width: 80px;
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
    margin-bottom: 12px;
  }
  
  .date-day {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1;
  }
  
  .date-month {
    display: block;
    font-size: 0.85rem;
    opacity: 0.9;
    font-weight: 600;
    margin-top: 4px;
  }
  
  .date-weekday {
    display: block;
    font-size: 0.75rem;
    opacity: 0.8;
    margin-top: 2px;
  }
  
  .event-time {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #475569;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .time-icon {
    color: #3b82f6;
    font-size: 1rem;
  }
  
  /* Центральная часть - контент */
  .event-content {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .event-header {
    margin-bottom: 12px;
  }
  
  .event-title {
    margin: 0 0 8px 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.3;
  }
  
  .event-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .event-category {
    color: white;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  .event-rating {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .rating-stars {
    display: flex;
    gap: 1px;
  }
  
  .star {
    color: #cbd5e1;
    font-size: 0.9rem;
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
    margin-bottom: 12px;
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }
  
  .event-details {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  
  .detail-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #475569;
    font-size: 0.8rem;
  }
  
  .detail-icon {
    color: #3b82f6;
    font-size: 0.9rem;
    width: 14px;
    text-align: center;
  }
  
  .detail-text {
    font-size: 0.8rem;
  }
  
  .event-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .event-tag {
    background: #f8fafc;
    color: #475569;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.7rem;
    border: 1px solid #e2e8f0;
  }
  
  /* Правая часть - действия */
  .event-action-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #f8fafc;
    border-left: 1px solid #f1f5f9;
    min-width: 140px;
    flex-shrink: 0;
    gap: 12px;
  }
  
  .price-section {
    text-align: center;
  }
  
  .event-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #3b82f6;
    line-height: 1;
  }
  
  .event-price.free {
    color: #10b981;
  }
  
  .price-note {
    font-size: 0.7rem;
    color: #64748b;
    margin-top: 2px;
  }
  
  .register-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
    font-size: 0.9rem;
    white-space: nowrap;
  }
  
  .register-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }
  
  .register-btn.registered {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
  }
  
  .register-btn.registered:hover {
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }
  
  .register-btn.btn-featured {
    background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
  }
  
  .btn-icon {
    font-size: 0.9rem;
  }
  
  .event-status {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #10b981;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .status-icon {
    font-size: 0.9rem;
  }
  
  /* Бейдж избранного */
  .featured-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
    color: white;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 0.7rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
  }
  
  .featured-icon {
    font-size: 0.7rem;
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .event-card-horizontal {
      flex-direction: column;
      min-height: auto;
    }
  
    .event-date-section {
      flex-direction: row;
      justify-content: space-between;
      padding: 16px;
      border-right: none;
      border-bottom: 1px solid #f1f5f9;
      min-width: auto;
    }
  
    .event-date-badge {
      margin-bottom: 0;
      min-width: 70px;
    }
  
    .event-time {
      font-size: 0.85rem;
    }
  
    .event-content {
      padding: 16px;
    }
  
    .event-action-section {
      flex-direction: row;
      justify-content: space-between;
      padding: 16px;
      border-left: none;
      border-top: 1px solid #f1f5f9;
      min-width: auto;
    }
  
    .price-section {
      text-align: left;
    }
  
    .event-details {
      gap: 12px;
    }
  
    .detail-item {
      flex: 1;
      min-width: 120px;
    }
  }
  
  @media (max-width: 480px) {
    .event-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  
    .event-action-section {
      flex-direction: column;
      gap: 8px;
    }
  
    .register-btn {
      width: 100%;
      justify-content: center;
    }
  
    .event-details {
      flex-direction: column;
      gap: 8px;
    }
  
    .detail-item {
      min-width: auto;
    }
  }
  </style>