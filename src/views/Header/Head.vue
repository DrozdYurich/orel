<template>
  <nav class="header">
    <div class="nav-container">
      <!-- Основное меню по центру -->
      <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <li v-for="item in items" :key="item.route" class="nav-item">
          <router-link :to="{ name: item.route }" class="nav-link" @click="handleMenuClick">
            <span :class="['nav-icon', item.icon]"></span>
            <span class="nav-label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>

      <!-- Иконки справа -->
      <div class="right-section">
        <router-link to="/profil" class="profile-link" title="Личный кабинет">
          <span class="profile-icon pi pi-user"></span>
          <span class="profile-text">Профиль</span>
        </router-link>

        <button class="settings-btn" title="Настройки">
          <span class="settings-icon pi pi-cog"></span>
        </button>

        <button class="logout-btn" title="Выйти">
          <span class="logout-icon pi pi-sign-out"></span>
        </button>
      </div>

      <div class="mobile-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const items = ref([
  {
    label: 'Мероприятия',
    icon: 'pi pi-calendar',
    route: 'mer',
  },
  {
    label: 'Маршруты',
    icon: 'pi pi-map',
    route: 'rot',
  },
  {
    label: 'Рейтинг',
    icon: 'pi pi-chart-bar',
    route: 'rating',
  },
  {
    label: 'Викторины',
    icon: 'pi pi-question-circle',
    route: 'vict',
  },
  {
    label: 'Представители',
    icon: 'pi pi-users',
    route: 'peopl',
  },
])

const handleMenuClick = () => {
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #cbd5e1;
  box-shadow: 0 2px 20px rgba(100, 116, 139, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  border-color: #3b82f6;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.nav-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

.nav-label {
  font-size: 1.2rem;
}

/* Правая секция с иконками */
.right-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.profile-link:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}

.profile-icon {
  font-size: 1.2rem;
}

.profile-text {
  font-size: 0.9rem;
}

.settings-btn,
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 10px;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.settings-btn:hover,
.logout-btn:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}

.settings-icon,
.logout-icon {
  font-size: 1.2rem;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.bar {
  width: 25px;
  height: 3px;
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Адаптивность */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    flex-direction: column;
    gap: 0;
    border-top: 1px solid #cbd5e1;
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    padding: 1rem 1.5rem;
    border-radius: 0;
    border-bottom: 1px solid #e2e8f0;
    justify-content: center;
  }

  .nav-link:hover {
    transform: none;
    box-shadow: none;
  }

  .right-section {
    display: none;
  }

  .mobile-right-section {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
  }

  .nav-container {
    height: 60px;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.5rem;
  }

  .nav-label {
    font-size: 1rem;
  }
}

/* Анимация для мобильного меню */
.mobile-toggle.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Дополнительные стили для мобильной версии правой секции */
.mobile-right-section {
  display: none;
}

@media (max-width: 768px) {
  .mobile-right-section {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
    padding: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .mobile-profile-link,
  .mobile-settings-btn,
  .mobile-logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #475569;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid #cbd5e1;
    background: white;
  }

  .mobile-profile-link:hover,
  .mobile-settings-btn:hover,
  .mobile-logout-btn:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: white;
    border-color: #3b82f6;
  }
}
</style>
