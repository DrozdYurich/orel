import { apiClient } from '@/main'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRoutingStore = defineStore('routing', () => {
  const loading = ref(false)
  const routing = ref([
    
  ])
const fetchRout = async () => {
  loading.value = true;

  try {
    // Выполняем запрос и ждём минимум 1500 мс
    const [response] = await Promise.all([
      apiClient.get('/walking-routes'),
      new Promise(resolve => setTimeout(resolve, 1500)) // ← таймаут 1.5 секунды
    ]);

    console.log(response.data);
    routing.value = response.data.items || response.data; // защита на случай, если данные — массив напрямую
  } catch (err) {
    console.error('Ошибка при загрузке маршрутов:', err);
  } finally {
    loading.value = false;
  }
};
  const getRout = computed(() => {
    return routing.value
  })
   const getloading = computed(() => {
    return loading.value
  })
  return {
    getRout,
    getloading,
    getloading,
    fetchRout
  }
})