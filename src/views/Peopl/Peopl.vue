<script setup>
import { onMounted } from 'vue';
import HeadPlace from './HeadPlace.vue';
import PlaceOne from './placeOne.vue';
import { usePlaceStore } from '@/stores/storePlace';
 const {getPlace}= usePlaceStore()
 const pl = usePlaceStore()
 onMounted(()=>{
  pl.fetchEvents()
 })
</script>

<template>
  <div class="div">
    <HeadPlace/>
    <div class="place"> 
        <PlaceOne   v-for="value in getPlace" :key="value.id" :place="value" />
    </div>
  </div>
    
</template>

<style scoped>
.div{
  margin-top: 100px;
}
.place {
  display: grid;
  margin-top: 14rem;
  grid-template-columns: repeat(3, 1fr); /* Две колонки */
  gap: 1rem;
}


</style>
