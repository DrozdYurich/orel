<template>
    <div class="div">
         <div  class="events-grid" >
        <EventCard  
          v-for="(event,i) in favoriteEventIds" 
          :key="event.id" 
          :event="event"
          :ind="i"
          @register="handleRegister"
        />
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import EventCard from '../Event/EventCard.vue'

const favoriteEventIds = ref()
function loadFavoritesFromLocalStorage() {
  try {
    const data = localStorage.getItem('favoriteEvents')
    favoriteEventIds.value = data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Ошибка при загрузке избранных из localStorage:', error)
    favoriteEventIds.value = []
  }
}

// Загружаем при монтировании компонента
onMounted(() => {
  loadFavoritesFromLocalStorage()
})
</script>

<style scoped>
.div{
    margin-top: 100px;
}
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
</style>