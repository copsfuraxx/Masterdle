import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue'
import LogIn from './components/LogIn.vue'

import './assets/global.css'

const app = createApp(App)

const Home = { template: '<h1>Home</h1>'}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/log-in",
            component: LogIn,
        },
    ],
});

app.use(router);

app.mount('#app')