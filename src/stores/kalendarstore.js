import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useKalendarStore = defineStore('kalendar', () => {
  // Состояние
  const showKalendar = ref(false)
  const data = ref([{
    id: 1,
    date: '2025-11-10',
    title: 'Фестиваль цветов',
    description: 'Ежегодный фестиваль в ботаническом саду',
    location: 'Ботанический сад'
  },
  {
    id: 2,
    date: '2025-11-20',
    title: 'Выставка картин',
    description: 'Открытие новой выставки современного искусства',
    location: 'Галерея "Арт-Холл"'
  },
  {
    id: 3,
    date: '2025-11-15',
    title: 'День города',
    description: 'Праздничные мероприятия по всему городу',
    location: 'Центральная площадь'
  }])
  function setShow(value) {
  if (value === true || value === false) {
    // Явно задано булево → устанавливаем
    showKalendar.value = value
  } else {
    // Ничего не передано → переключаем
    showKalendar.value = !showKalendar.value
  }
}
  const getdata = computed(() => {
    return data.value
  })
const getKal = computed(() => {
    return showKalendar.value
  })
  return {
    getdata,setShow,getKal
  }
})