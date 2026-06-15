import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', redirect: '/inspirations' },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { guest: true },
  },
  {
    path: '/inspirations',
    name: 'InspirationList',
    component: () => import('@/views/InspirationListView.vue'),
  },
  {
    path: '/inspirations/new',
    name: 'InspirationCreate',
    component: () => import('@/views/InspirationFormView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/inspirations/:id',
    name: 'InspirationDetail',
    component: () => import('@/views/InspirationDetailView.vue'),
  },
  {
    path: '/inspirations/:id/edit',
    name: 'InspirationEdit',
    component: () => import('@/views/InspirationFormView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else if (to.meta.guest && auth.isLoggedIn) {
    next('/inspirations')
  } else {
    next()
  }
})

export default router
