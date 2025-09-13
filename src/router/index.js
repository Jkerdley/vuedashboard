import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../auth'

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks',
    component: () => import('../views/TasksView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/tasks/:id',
    component: () => import('../views/TaskDetailsView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/settings',
    component: () => import('../views/SettingsView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/settings/profile',
      },
      {
        path: 'profile',
        component: () => import('../views/ProfileView.vue'),
      },
      {
        path: 'security',
        component: () => import('../views/SecurityView.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link--intermediate',
  linkExactActiveClass: 'router-link--active',
})

// Навигационный guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
