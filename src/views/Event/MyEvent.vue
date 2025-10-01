<template>
    <div class="events-container">
      <h1>Мероприятия в Орле</h1>
      <div class="events-grid">
        <EventCard 
          v-for="event in events" 
          :key="event.id" 
          :event="event"
          @register="handleRegister"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import EventCard from './EventCard.vue'
  
  const events = [
    {
      id: 1,
      title: 'Фестиваль уличного искусства',
      description: 'Крупнейший фестиваль устройного искусства в Центральной России с участием известных художников.',
      date: new Date('2024-12-15T19:00:00'),
      rating: 4.8,
      location: 'Орел, Парк культуры и отдыха',
      category: 'Искусство',
      organizer: 'Департамент культуры',
      tags: ['Уличное искусство', 'Бесплатно', 'Для всей семьи'],
      registered: false,
      featured: true
    },
    {
      id: 2,
      title: 'Мастер-класс по гончарному делу',
      description: 'Научитесь создавать керамические изделия своими руками под руководством опытного мастера.',
      date: new Date('2024-12-18T14:00:00'),
      rating: 4.6,
      location: 'Орел, Арт-пространство "Гончар"',
      category: 'Образование',
      organizer: 'Арт-пространство "Гончар"',
      tags: ['Мастер-класс', 'Творчество', 'Ручная работа'],
      registered: true,
      featured: false
    }
  ]
  
  const handleRegister = (eventId) => {
    console.log('Регистрация на мероприятие:', eventId)
  }
  </script>
  
  <style scoped>
  .events-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  h1 {
    color: #1e293b;
    text-align: center;
    margin-bottom: 2rem;
  }
  </style>