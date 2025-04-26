import { watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../pages/Home.vue';
import Dashboard from '../pages/Dashboard.vue';
import Wallet from '../pages/Wallet.vue';
import News from '../pages/News.vue';
import Community from '../pages/Community.vue';
import ContactUs from '../pages/ContactUs.vue';
import Settings from '../pages/Settings.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';
import Stock from '../pages/Stock.vue';
import Cryptocurrency from '../pages/Cryptocurrency.vue';
import MutualFund from '../pages/MutualFund.vue';
import Gold from '../pages/Gold.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/contact',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet,
      meta: { requiresAuth: true }
    },
    {
      path: '/stocks',
      name: 'Stock',
      component: Stock,
      meta: { requiresAuth: true }
    },
    {
      path: '/crypto',
      name: 'Cryptocurrency',
      component: Cryptocurrency,
      meta: { requiresAuth: true }
    },
    {
      path: '/mutual-funds',
      name: 'MutualFund',
      component: MutualFund,
      meta: { requiresAuth: true }
    },
    {
      path: '/gold',
      name: 'Gold',
      component: Gold,
      meta: { requiresAuth: true }
    },
    {
      path: '/community',
      name: 'Community',
      component: Community,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Wait for auth initialization
  if (authStore.loading) {
    await new Promise(resolve => {
      const unwatch = watch(
        () => authStore.loading,
        (loading) => {
          if (!loading) {
            unwatch();
            resolve();
          }
        }
      );
    });
  }

  if (to.meta.requiresAuth && !authStore.user) {
    next('/login');
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;