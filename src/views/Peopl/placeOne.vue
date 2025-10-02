<template>
  <div  class="place-card-wrapper">
    <div   class="place-card">
      <div data-aos = "fade-right" class="card-image">
        <img :src="place.image" :alt="place.name" loading="lazy" />
        <div class="card-overlay">
          <div class="place-badge">
            {{ place.type }}
          </div>
          <button class="favorite-btn" @click.stop="toggleFavorite(place)">
            <i
              class="pi"
              :class="place.isFavorite ? 'pi-heart-fill' : 'pi-heart'"
            ></i>
          </button>
        </div>
      </div>

      <div data-aos = "fade-left"  class="card-content">
        <h3 class="place-name">{{ place.name }}</h3>
        <p class="place-location">
          <i class="pi pi-map-marker"></i>
          {{ place.region }}
        </p>
        <p class="place-description">{{ place.description }}</p>

        <div class="place-stats">
          <div class="stat">
            <i class="pi pi-star"></i>
            <span>{{ place.rating }}</span>
          </div>
          <div class="stat">
            <i class="pi pi-clock"></i>
            <span>{{ place.bestSeason }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
})

const toggleFavorite = (place) => {
  // Реализуйте логику в родителе через emit, если нужно
  console.log('toggle favorite', place)
}
</script>

<style scoped>
.place-card-wrapper {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  isolation: isolate;
}

/* Выразительный градиентный бордер */
.place-card-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2.5px; /* Увеличена толщина для выразительности */
  background: var(--primary-gradient);
  border-radius: var(--radius-lg);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
  z-index: 1;
}

/* Внутренняя подсветка для глубины */
.place-card-wrapper::after {
  content: '';
  position: absolute;
  inset: 2.5px;
  border-radius: calc(var(--radius-lg) - 2.5px);
  box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.15);
  pointer-events: none;
  z-index: 1;
}

.place-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  
  position: relative;
  z-index: 2;
}

.place-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.place-card:hover .card-image img {
  transform: scale(1.04);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(
    to top,
    var(--bg-overlay) 0%,
    transparent 50%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.place-card:hover .card-overlay {
  opacity: 1;
}

.place-badge {
  background: var(--primary-gradient);
  color: var(--text-on-gradient);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  pointer-events: none;
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.92);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
  pointer-events: auto;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.12);
  box-shadow: var(--shadow-md);
}

.favorite-btn .pi {
  font-size: 1.25rem;
  color: #cbd5e1;
  transition: color var(--transition-fast);
}

.favorite-btn:hover .pi,
.place-card:hover .favorite-btn .pi-heart-fill {
  color: #f5576c;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.place-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.place-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin: 0 0 1rem 0;
}

.place-location .pi {
  color: var(--text-muted);
  font-size: 1rem;
}

.place-description {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
  flex-grow: 1;
}

.place-stats {
  display: flex;
  gap: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.stat .pi {
  color: #f5576c;
  font-size: 1.125rem;
}

.stat span {
  font-size: 0.9375rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .place-card-wrapper::before {
    padding: 2px;
  }

  .place-card-wrapper::after {
    inset: 2px;
    border-radius: calc(var(--radius-lg) - 2px);
  }
}

</style>