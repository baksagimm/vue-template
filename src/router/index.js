import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/record-display',
      name: 'recordDisplay',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecordDisplay_v2.vue')
    },
    {
      path: '/record-display-bad',
      name: 'recordDisplayBad',
      component: () => import('../views/RecordDisplayBad.vue')
    }
  ]
})

export default router
