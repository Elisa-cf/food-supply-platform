import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import signIn from '../views/SignIn.vue';

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
  ],
});

//check which routes/pages requires authentication
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      // Check if the user is authenticated
      const authenticated = await new signIn();
      if (authenticated) {
        next(); // Proceed to the requested route
      } else {
        next('/signin'); // Redirect to the signin page if not authenticated
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      next('/signin'); // Redirect to the signin page on error
    }
  } else {
    next(); // Proceed to the requested route (when no authentication required)
  }
});

export default router;
