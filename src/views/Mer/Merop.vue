<script setup>

import MyFiltr from '../Filter/MyFiltr.vue';
import Carta from '../Karta/Carta.vue'
</script>

<template>
  <h1>Мерпориятия</h1>
  <div class="main-container">
    <div class="content-grid">
      <div class="events-section">
        <Carta/>
      </div>
      <div class="filters-section">
        <MyFiltr/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100%;
  padding: 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 70% 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: start;
}

.events-section {
  min-width: 0;
}

.filters-section {
  min-width: 0;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0.5rem;
  }
  
  .content-grid {
    gap: 1rem;
  }
}</style>
