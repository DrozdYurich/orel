import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

// Импортируйте компоненты PrimeVue
import Menubar from 'primevue/menubar'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

// Зарегистрируйте компонент глобально
app.component('Menubar', Menubar)

app.mount('#app')
