<template>
  <nav class="header" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Логотип -->
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <span class="pi pi-map-marker"></span>
        </div>
        <span class="logo-text">OrelExplore</span>
      </router-link>

      <!-- Основное меню по центру -->
      <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <li v-for="item in navItems" :key="item.route" class="nav-item">
          <router-link 
            :to="{ name: item.route }" 
            class="nav-link" 
            @click="handleMenuClick"
            :class="{ 'router-link-active': $route.name === item.route }"
          >
            <span :class="['nav-icon', item.icon]"></span>
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-underline"></span>
          </router-link>
        </li>
      </ul>

      <!-- Правая секция -->
      <div class="right-section">
        <!-- Поиск -->
        <div class="search-container" :class="{ active: isSearchActive }">
          <button class="search-toggle" @click="toggleSearch">
            <span class="search-icon pi pi-search"></span>
          </button>
          <div class="search-input-wrapper">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Поиск мероприятий..." 
              class="search-input"
              @focus="isSearchActive = true"
              @blur="onSearchBlur"
            >
            <span class="search-close pi pi-times" @click="closeSearch"></span>
          </div>
        </div>

        <!-- Уведомления -->
        <div class="notifications">
          <button class="notification-btn" @click="toggleNotifications">
            <span class="notification-icon pi pi-bell"></span>
            <span class="notification-badge" v-if="unreadNotifications > 0">
              {{ unreadNotifications }}
            </span>
          </button>
        </div>

        <!-- Профиль -->
        <div class="profile-menu">
          <button class="profile-btn" @click="toggleProfileMenu">
            <div class="avatar">
              <span class="avatar-text">{{ userInitials }}</span>
            </div>
            <span class="profile-name">{{ userName }}</span>
            <span class="dropdown-icon pi pi-chevron-down"></span>
          </button>
          
          <div class="profile-dropdown" :class="{ active: isProfileMenuOpen }">
            <router-link to="/profile" class="dropdown-item">
              <span class="dropdown-icon pi pi-user"></span>
              Мой профиль
            </router-link>
            <router-link to="/settings" class="dropdown-item">
              <span class="dropdown-icon pi pi-cog"></span>
              Настройки
            </router-link>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout-btn" @click="handleLogout">
              <span class="dropdown-icon pi pi-sign-out"></span>
              Выйти
            </button>
          </div>
        </div>
      </div>

      <!-- Мобильное меню -->
      <button class="mobile-toggle" @click="toggleMobileMenu" :class="{ active: isMobileMenuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Затемнение фона для мобильного меню -->
    <div class="mobile-overlay" :class="{ active: isMobileMenuOpen }" @click="closeMobileMenu"></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state
const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)
const isSearchActive = ref(false)
const isScrolled = ref(false)
const searchQuery = ref('')
const unreadNotifications = ref(3)

// User data
const userName = 'Алексей'
const userInitials = computed(() => 
  userName.split(' ').map(n => n[0]).join('').toUpperCase()
)

// Navigation items
const navItems = [
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

]

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isProfileMenuOpen.value = false
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleMenuClick = () => {
  isMobileMenuOpen.value = false
}

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
  isMobileMenuOpen.value = false
}

const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value
  if (!isSearchActive.value) {
    searchQuery.value = ''
  }
}

const closeSearch = () => {
  isSearchActive.value = false
  searchQuery.value = ''
}

const onSearchBlur = () => {
  if (!searchQuery.value) {
    setTimeout(() => {
      isSearchActive.value = false
    }, 200)
  }
}

const toggleNotifications = () => {
  // Logic for notifications
  console.log('Toggle notifications')
  unreadNotifications.value = 0
}

const handleLogout = () => {
  console.log('Logout')
  router.push('/login')
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>


/* Base Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: var(--bg-primary);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-lg);
  border-bottom-color: transparent;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  position: relative;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.5rem;
  transition: all var(--transition-fast);
  z-index: var(--z-dropdown);
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-gradient);
  font-size: 1.2rem;
  box-shadow: var(--shadow-md);
}

.logo-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 4px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--primary-gradient);
  opacity: 0;
  transition: all var(--transition-normal);
  z-index: -1;
}

.nav-link:hover {
  color: var(--text-primary);
  transform: translateY(-1px);
}

.nav-link:hover::before {
  left: 0;
  opacity: 0.05;
}

.nav-link.router-link-active {
  color: var(--text-primary);
  font-weight: 600;
}

.nav-link.router-link-active::before {
  left: 0;
  opacity: 0.1;
}

.nav-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  border-radius: 2px;
  transition: all var(--transition-normal);
  transform: translateX(-50%);
}

.nav-link.router-link-active .nav-underline {
  width: 24px;
}

.nav-icon {
  font-size: 1.1rem;
  transition: transform var(--transition-fast);
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Search */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.search-toggle:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.search-input-wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scale(0.95);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 300px;
}

.search-container.active .search-input-wrapper {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) scale(1);
}

.search-input {
  border: none;
  background: transparent;
  padding: 8px 12px;
  font-size: 0.9rem;
  color: var(--text-primary);
  flex: 1;
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-close {
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.search-close:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Notifications */
.notifications {
  position: relative;
}

.notification-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.notification-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--secondary-gradient);
  color: var(--text-on-gradient);
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

/* Profile Menu */
.profile-menu {
  position: relative;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-primary);
}

.profile-btn:hover {
  background: var(--bg-secondary);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-gradient);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: var(--shadow-sm);
}

.profile-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.dropdown-icon {
  font-size: 0.8rem;
  transition: transform var(--transition-fast);
}

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-light);
  padding: 8px;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-normal);
  z-index: var(--z-dropdown);
}

.profile-dropdown.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dropdown-divider {
  height: 1px;
  background: var(--border-light);
  margin: 8px 0;
}

.logout-btn {
  color: #ef4444;
}

.logout-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: var(--z-dropdown);
}

.bar {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 1px;
  transition: all var(--transition-normal);
}

.mobile-toggle.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  z-index: calc(var(--z-dropdown) - 1);
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Mobile Styles */
@media (max-width: 1024px) {
  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-primary);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    z-index: var(--z-dropdown);
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-item {
    width: 100%;
    max-width: 300px;
  }

  .nav-link {
    padding: 20px 24px;
    border-radius: 0;
    border-bottom: 1px solid var(--border-light);
    justify-content: center;
    font-size: 1.1rem;
  }

  .nav-underline {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .profile-name {
    display: none;
  }

  .nav-container {
    padding: 0 1.5rem;
    height: 70px;
  }
}

@media (max-width: 640px) {
  .search-input-wrapper {
    position: fixed;
    top: 80px;
    left: 1rem;
    right: 1rem;
    transform: translateY(-10px) scale(0.95);
    min-width: auto;
  }

  .search-container.active .search-input-wrapper {
    transform: translateY(0) scale(1);
  }

  .logo-text {
    display: none;
  }

  .nav-container {
    padding: 0 1rem;
  }
}

/* Animation for header on load */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header {
  animation: slideDown 0.5s ease;
}
</style>