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
      path: '/premature-refactoring',
      name: 'PrematureRefactoring',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/premature-refactoring.vue')
    },
    {
      path: '/wrapping-css-bad',
      name: 'WrappingCssBad',
      component: () => import('../views/wrapping-css-bad.vue')
    },
    {
      path: '/wrapping-css-good',
      name: 'WrappingCssGood',
      component: () => import('../views/wrapping-css-good.vue')
    },
    {
      path: '/record-edit-mobile',
      name: 'recordEditMobile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecordEditMobile.vue')
    },
    {
      path: '/record-display',
      name: 'recordDisplay',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RecordDisplay.vue')
    },
    {
      path: '/record-display-bad',
      name: 'recordDisplayBad',
      component: () => import('../views/RecordDisplayBad.vue')
    },
    {
      path: '/using-forms',
      name: 'usingForms',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsingForms.vue')
    },
    {
      path: '/reactive-vue',
      name: 'reactiveVue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ReactiveVue.vue')
    },
    {
      path: '/form-reset',
      name: 'formReset',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FormReset.vue')
    },
    {
      path: '/vue-events',
      name: 'vueEvents',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VueEvents.vue')
    }
  ]
})

export default router
