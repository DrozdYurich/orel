<template>
  <div class="routes-grid">
    <div>
      <OneRouting data-aos = "fade-right"
        v-for="route in routes" 
        :key="route.id" 
        :route="route"
      />
    </div>
    <div data-aos = "fade-down">
      <h1>Ajnj</h1>
    </div>
    <div>
 
      <FiltrRout data-aos = "fade-left"/>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import OneRouting from './R/OneRouting.vue';
import { useRoutingStore } from '@/stores/storeRouting';
import FiltrRout from './F/FiltrRout.vue';

const routingStore = useRoutingStore()
const routes = computed(() => routingStore.getRout)
console.log(routes)
</script>

<style scoped>
.routes-grid {

 margin-top: 100px;
  gap: 24px;
  padding: 20px;
  display: grid;
  grid-template-columns: 10% 60% 30%;
  gap: 1rem;
  width: 100%;
  min-height: 400px;
  align-items: start;
}

@media (max-width: 768px) {
  .routes-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 16px;
  }
}
</style>