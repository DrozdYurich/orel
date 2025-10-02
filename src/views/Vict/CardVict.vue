<template>
  <div class="quiz-card">
    <!-- Верхняя часть с градиентом -->
    <div class="quiz-header" :style="{ background: quiz.gradient }">
      <div class="header-overlay"></div>
      <div class="quiz-badge" :class="quiz.difficulty">
        {{ quiz.difficulty }}
      </div>
      <div class="quiz-image">
        <div class="icon-wrapper">
          <i :class="quiz.icon"></i>
        </div>
      </div>
      <div class="header-shape"></div>
    </div>

    <!-- Основной контент -->
    <div class="quiz-content">
      <!-- Заголовок и описание -->
      <div class="quiz-info">
        <div class="title-wrapper">
          <h3 class="quiz-title">{{ quiz.title }}</h3>
          <div class="title-accent"></div>
        </div>
        <p class="quiz-description">{{ quiz.description }}</p>
      </div>

      <!-- Статистика викторины -->
      <div class="quiz-stats">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <!-- Теги категорий -->
      <div class="quiz-tags">
        <span 
          v-for="tag in quiz.tags" 
          :key="tag"
          class="tag"
        >
          <span class="tag-dot"></span>
          {{ tag }}
        </span>
      </div>

      <!-- Рейтинг -->
      <div class="quiz-rating">
        <div class="stars-wrapper">
          <div 
            v-for="star in 5" 
            :key="star"
            class="star-container"
            :class="{ 'filled': star <= quiz.rating }"
          >
            <i class="pi pi-star"></i>
          </div>
        </div>
        <div class="rating-badge">
          {{ quiz.rating }}/5
        </div>
      </div>
    </div>

    <!-- Декоративные элементы -->
    <div class="decoration-corner top-left"></div>
    <div class="decoration-corner top-right"></div>
    <div class="decoration-corner bottom-left"></div>
    <div class="decoration-corner bottom-right"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  }
})

const stats = computed(() => [
  { icon: 'pi pi-question', value: props.quiz.questionsCount, label: 'вопросов' },
  { icon: 'pi pi-clock', value: props.quiz.duration, label: 'мин' },
  { icon: 'pi pi-users', value: props.quiz.participants, label: 'участников' }
])
</script>

<style scoped>
.quiz-card {
  position: relative;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: all var(--transition-normal);
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid var(--border-light);
  backdrop-filter: blur(10px);
}

.quiz-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--border-medium);
}

/* Хедер */
.quiz-header {
  position: relative;
  height: 140px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
}

.header-shape {
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.quiz-badge {
  position: relative;
  z-index: 2;
  padding: 8px 16px;
  border-radius: var(--radius-lg);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-on-gradient);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-sm);
}

.quiz-badge.easy {
  background: linear-gradient(135deg, rgba(67, 233, 123, 0.9) 0%, rgba(56, 249, 215, 0.9) 100%);
}

.quiz-badge.medium {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.9) 0%, rgba(0, 242, 254, 0.9) 100%);
}

.quiz-badge.hard {
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.9) 0%, rgba(245, 87, 108, 0.9) 100%);
}

.quiz-image {
  position: relative;
  z-index: 2;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
}

.quiz-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.35);
}

.quiz-image i {
  font-size: 32px;
  color: var(--text-on-gradient);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Контент */
.quiz-content {
  padding: 28px;
  position: relative;
  z-index: 2;
}

.title-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.quiz-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.3;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-accent {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

.quiz-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 0.95rem;
}

/* Статистика */
.quiz-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-icon {
  width: 44px;
  height: 44px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-light);
}

.stat-icon i {
  font-size: 18px;
  color: var(--text-muted);
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

/* Теги */
.quiz-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-on-gradient);
  background: var(--accent-gradient);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tag-dot {
  width: 6px;
  height: 6px;
  background: var(--text-on-gradient);
  border-radius: 50%;
  opacity: 0.8;
}

/* Рейтинг */
.quiz-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
}

.stars-wrapper {
  display: flex;
  gap: 6px;
}

.star-container {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  transition: all var(--transition-fast);
}

.star-container.filled {
  background: var(--success-gradient);
  border-color: transparent;
}

.star-container i {
  font-size: 14px;
  color: var(--text-muted);
  transition: all var(--transition-fast);
}

.star-container.filled i {
  color: #ffffff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.rating-badge {
  padding: 6px 12px;
  background: var(--primary-gradient);
  color: var(--text-on-gradient);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

/* Декоративные углы */
.decoration-corner {
  position: absolute;
  width: 60px;
  height: 60px;
  opacity: 0.1;
  pointer-events: none;
}

.decoration-corner::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-primary);
}

.top-left {
  top: 0;
  left: 0;
}

.top-left::before {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 0;
  right: 0;
}

.top-right::before {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-left::before {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.bottom-right::before {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

/* Адаптивность */
@media (max-width: 480px) {
  .quiz-stats {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .quiz-content {
    padding: 20px;
  }
  
  .quiz-header {
    height: 120px;
    padding: 20px;
  }
}
</style>