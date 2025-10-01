import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createYmaps } from 'vue-yandex-maps';
import Menubar from 'primevue/menubar'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(createYmaps({
  apikey: '6515b0e7-ea7d-49ba-9ef0-084b8bda31dd',
  importModules: ['@yandex/ymaps3-controls@0.0.1'],
}));



app.component('Menubar', Menubar)

app.mount('#app')
