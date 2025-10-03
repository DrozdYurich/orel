// src/stores/favoritesStore.js
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteEventIds: JSON.parse(localStorage.getItem('favoriteEvents')) || []
  }),

  actions: {
    toggleFavorite(eventId) {
      const index = this.favoriteEventIds.indexOf(eventId)
      if (index === -1) {
        this.favoriteEventIds.push(eventId)
      } else {
        this.favoriteEventIds.splice(index, 1)
      }
      // Сохраняем в localStorage
      localStorage.setItem('favoriteEvents', JSON.stringify(this.favoriteEventIds))
    },

    isFavorite(eventId) {
      return this.favoriteEventIds.includes(eventId)
    }
  }
})