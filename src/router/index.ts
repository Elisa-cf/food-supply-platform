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
      path: '/suppliers',
      name: 'suppliers',
      component: () => import('../views/SuppliersList.vue'),

      meta: {
        requiresAuth: true,
      },
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
      name: 'quotes-list',
      component: () => import('../views/QuotesList.vue'),

      meta: {
        requiresAuth: true,
      },
    },
  ],
});

//check which routes/pages requires authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('authToken'); // This checks if the authToken exists.The !! is a double negation, and it's used to convert a value into a boolean

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin'); // If the user is not authenticated, redirect to sign in
  } else {
    next(); // Otherwise, proceed
  }
});

export default router;
