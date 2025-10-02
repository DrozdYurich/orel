<template>
  <div class="routes-grid">
    <!-- Левая колонка: список маршрутов -->
    <div class="routes-column">
      <div class="routes-scroll-container" data-aos="fade-right" >
        <OneRouting
          v-for="route in routes"
          :key="route.id"
          :route="route"
        />
      </div>
    </div>

    <!-- Центральная колонка -->
    <div class="center-column" data-aos="fade-down">
      <h1>Ajnj</h1>
    </div>

    <!-- Правая колонка: фильтры -->
    <div class="filters-column" data-aos="fade-left">
      <FiltrRout />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import OneRouting from './R/OneRouting.vue'
import { useRoutingStore } from '@/stores/storeRouting'
import FiltrRout from './F/FiltrRout.vue'

const routingStore = useRoutingStore()
const routes = computed(() => routingStore.getRout)

onMounted(() => {
  routingStore.fetchRout()
})
</script>

<style scoped>
.routes-grid {
  margin-top: 100px;
  display: grid;
  grid-template-columns: 20% 55% 25%;
  gap: 1rem;
  padding: 20px;
  width: 100%;
  min-height: 400px;
  align-items: start;
}

/* Контейнер для скролла — только в левой колонке */
.routes-scroll-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 200px); /* оставляет место под шапку и отступы */
  overflow-y: auto;
  padding-right: 8px; /* компенсация полосы прокрутки (опционально) */
}

/* Стили для колонок (для ясности) */
.routes-column,
.center-column,
.filters-column {
  display: flex;
  flex-direction: column;
}

/* Скроллбар (опционально — для красоты в Chrome) */
.routes-scroll-container::-webkit-scrollbar {
  width: 6px;
}
.routes-scroll-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}
.routes-scroll-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.routes-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Адаптивность */
@media (max-width: 768px) {
  .routes-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px;
    margin-top: 60px;
  }

  .routes-scroll-container {
    max-height: none; /* на мобильных — скролл всей страницы */
    overflow-y: visible;
  }
}
</style>