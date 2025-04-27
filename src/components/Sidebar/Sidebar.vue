<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import SidebarItem from './SidebarItem.vue';

const collapsed = ref(false);
const authStore = useAuthStore();

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const menuItems = computed(() => {
  const items = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'news', label: 'News', route: '/news' },
    { icon: 'contact', label: 'Contact us', route: '/contact' }
  ];

  if (authStore.user) {
    items.push(
      { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
      { icon: 'wallet', label: 'Wallet', route: '/wallet' },
      { 
        icon: 'stock', 
        label: 'Stock & Fund', 
        route: '/stocks',
        children: [
          { label: 'Stock', route: '/stocks' },
          { label: 'Cryptocurrency', route: '/crypto' },
          { label: 'Mutual Fund', route: '/mutual-funds' },
          { label: 'Gold', route: '/gold' }
        ]
      },
      { icon: 'community', label: 'Our Community', route: '/community' }
    );

    if (authStore.isAdmin) {
      items.push({ icon: 'settings', label: 'Admin', route: '/admin' });
    }
  }

  return items;
});
</script>

<template>
  <aside class="sidebar" :class="{ 'collapsed': collapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">G</span>
        <span class="logo-text">GoStock</span>
      </div>
      <button class="toggle-btn" @click="toggleSidebar">
        <span>≡</span>
      </button>
    </div>
    <div v-if="authStore.user" class="profile-section">
      <div class="total-investment">
        <p>Total Investment</p>
        <h3>$5380.90</h3>
        <span class="change positive-change">+15.52%</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <SidebarItem 
          v-for="item in menuItems" 
          :key="item.label" 
          :icon="item.icon" 
          :label="item.label" 
          :route="item.route"
          :children="item.children"
        />
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-dark);
  color: rgba(255, 255, 255, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: transform var(--transition-speed), width var(--transition-speed);
  z-index: 1000;
}

.sidebar.collapsed {
  width: 0;
  transform: translateX(-100%);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: white;
  color: var(--sidebar-dark);
  border-radius: 50%;
  margin-right: 0.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.profile-section {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.total-investment {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: var(--border-radius);
}

.total-investment p {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.total-investment h3 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
  color: white;
}

.sidebar-nav {
  padding: 1rem 0;
}

@media screen and (max-width: 768px) {
  .sidebar {
    width: 100%;
    transform: translateX(0);
  }
  
  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style>