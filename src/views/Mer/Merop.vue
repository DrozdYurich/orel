<script setup>
import MyFiltr from '../Filter/MyFiltr.vue';
import Carta from '../Karta/Carta.vue'
import MyEvent from '../Event/MyEvent.vue';
</script>

<template>
  <h1>Мероприятия</h1>
  <div class="main-container">
    <div class="content-grid">
      <div class="events-section">
        <Carta/>
      </div>
      <div class="filters-section">
        <MyFiltr/>
      </div>
    </div>
    <MyEvent/>
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
  margin: 0 auto;
  align-items: start;
}

.events-section {
  min-width: 0;
  position: sticky;
  top: 5rem;
  /* Убрал фиксированную высоту - теперь высота определяется содержимым */
  height: fit-content;
  max-height: calc(100vh - 6rem); /* Максимальная высота, но не фиксированная */
}

.filters-section {
  min-width: 0;
  position: sticky;
  top: 5rem;
  height: fit-content;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    min-height: auto;
  }
  
  .events-section {
    position: static;
    max-height: none;
  }
  
  .filters-section {
    position: static;
    max-height: none;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 0.5rem;
  }
  
  .content-grid {
    gap: 1rem;
  }
}
</style>