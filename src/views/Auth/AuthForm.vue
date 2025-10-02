<!-- components/AuthForm.vue -->
<template>
  <div class="auth-container">
    <div class="auth-switcher">
      <button
        :class="{ active: currentForm === 'login' }"
        @click="currentForm = 'login'"
      >
        Вход
      </button>
      <button
        :class="{ active: currentForm === 'register' }"
        @click="currentForm = 'register'"
      >
        Регистрация
      </button>
    </div>
    <div class="auth-form-wrapper">
      <transition name="fade" mode="out-in">
        <Login v-if="currentForm === 'login'" key="login" />
        <Registr v-else key="register" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from './Login.vue'
import Registr from './Registr.vue'

const currentForm = ref('login')
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  justify-content: flex-start; /* Теперь контент начинается сверху */
  min-height: 100vh;
  padding: 1.5rem;
  background: var(--bg-secondary);
  box-sizing: border-box;
}

.auth-switcher {
  display: flex;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
  margin-bottom: 2.5rem;
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 400px; /* Опционально: ограничить ширину */
}

.auth-switcher button {
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.auth-switcher button.active {
  background: var(--primary-gradient);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* Обёртка для форм — фиксирует позицию */
.auth-form-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px; /* Согласовать с шириной свитчера */
  min-height: 300px; /* Минимальная высота, чтобы избежать прыжков */
}

/* Формы будут занимать всё пространство внутри обёртки */
.auth-form-wrapper :deep(.login-form),
.auth-form-wrapper :deep(.register-form) {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
  position: absolute; /* Ключевое: формы позиционируются абсолютно */
  top: 0;
  left: 0;
  right: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>