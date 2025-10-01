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
  .route-card {
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 24px;
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.08),
      0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    padding: 0;
  }
  
  .route-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(139, 92, 246, 0.15),
      0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
  }
  
  .route-card.featured {
    background: linear-gradient(135deg, #fff9f9 0%, #fff5f5 100%);
    border: 2px solid #ff6b6b;
    box-shadow: 
      0 8px 30px rgba(255, 107, 107, 0.2),
      0 4px 15px rgba(0, 0, 0, 0.05);
  }
  
  /* Бейдж избранного */
  .featured-badge {
    position: absolute;
    top: -12px;
    left: 24px;
    background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 2;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .featured-badge .pi {
    font-size: 0.9rem;
  }
  
  /* Контент */
  .card-content {
    padding: 32px;
    position: relative;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;
  }
  
  .route-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1a202c;
    margin: 0;
    line-height: 1.3;
    flex: 1;
    margin-right: 16px;
    background: linear-gradient(135deg, #1a202c, #2d3748);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 8px 14px;
    border-radius: 16px;
    font-size: 0.9rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    min-width: 70px;
    justify-content: center;
  }
  
  .rating .pi {
    font-size: 0.9rem;
  }
  
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
  
  /* Особенности */
  .features {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
    color: #475569;
    padding: 8px 14px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  
  .feature:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .feature .pi-check {
    color: #10b981;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  /* Детали маршрута */
  .route-details {
    display: flex;
    gap: 20px;
    margin-bottom: 28px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    backdrop-filter: blur(10px);
  }
  
  .detail {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    font-size: 0.9rem;
    font-weight: 600;
    flex: 1;
    justify-content: center;
    padding: 8px;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .detail:hover {
    background: rgba(139, 92, 246, 0.1);
    color: #7c3aed;
    transform: translateY(-2px);
  }
  
  .detail .pi {
    color: #8b5cf6;
    font-size: 1rem;
    font-weight: bold;
  }
  
  /* Кнопки */
  .card-actions {
    display: flex;
    gap: 16px;
  }
  
  .primary-btn {
    flex: 1;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
    border: none;
    padding: 16px 24px;
    border-radius: 16px;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .primary-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }
  
  .primary-btn:hover::before {
    left: 100%;
  }
  
  .primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 12px 30px rgba(139, 92, 246, 0.4),
      0 6px 20px rgba(124, 58, 237, 0.3);
  }
  
  .primary-btn .pi {
    font-size: 1.1rem;
  }
  
  .secondary-btn {
    background: transparent;
    border: 2px solid #e2e8f0;
    color: #64748b;
    padding: 16px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
  }
  
  .secondary-btn:hover {
    border-color: #8b5cf6;
    color: #8b5cf6;
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
  }
  
  .secondary-btn .pi {
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  /* Анимации */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .route-card {
    animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .card-content {
      padding: 24px;
    }
    
    .route-title {
      font-size: 1.3rem;
    }
    
    .route-details {
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    
    .detail {
      justify-content: flex-start;
    }
    
    .card-actions {
      flex-direction: column;
    }
    
    .featured-badge {
      left: 16px;
      padding: 6px 12px;
      font-size: 0.75rem;
    }
  }
  
  /* Темная тема */
  @media (prefers-color-scheme: dark) {
    .route-card {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    .route-card.featured {
      background: linear-gradient(135deg, #2a1e2b 0%, #1a0f1a 100%);
    }
    
    .route-title {
      background: linear-gradient(135deg, #f1f5f9, #cbd5e1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .route-description {
      color: #cbd5e1;
      background: rgba(30, 41, 59, 0.8);
    }
    
    .feature {
      background: linear-gradient(135deg, #334155, #475569);
      color: #e2e8f0;
    }
    
    .feature:hover {
      background: linear-gradient(135deg, #475569, #64748b);
    }
    
    .route-details {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.05);
    }
    
    .detail {
      color: #cbd5e1;
    }
    
    .secondary-btn {
      border-color: #475569;
      color: #94a3b8;
    }
    
    .secondary-btn:hover {
      border-color: #8b5cf6;
      color: #8b5cf6;
    }
  }
  </style>