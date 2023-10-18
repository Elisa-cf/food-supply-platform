import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Registration.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/supplier/:id',
      name: 'supplier-detail',
      component: () => import('../components/SupplierDetail.vue'),

      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/quotes',
      name: 'quotes',
      component: () => import('../components/Quotes.vue'),

      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
