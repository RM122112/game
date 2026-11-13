import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.scss'
import { configurePrimeVue } from './components/organisms/Mode'

const app = createApp(App)
configurePrimeVue(app)
app.mount('#app')
