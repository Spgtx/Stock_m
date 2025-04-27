<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const searchQuery = ref('');
const showNotifications = ref(false);
const showProfileMenu = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const notifications = [
  { id: 1, title: 'Price Alert', message: 'AAPL has increased by 2%', time: '2m ago' },
  { id: 2, title: 'Market News', message: 'Market closed with a gain of 1.2%', time: '1h ago' }
];

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showProfileMenu.value = false;
};

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
  showNotifications.value = false;
};

const handleLogout = async () => {
  await authStore.signOut();
  router.push('/login');
};
</script>

<template>
  <div class="topbar">
    <div class="search-bar">
      <input 
        type="text" 
        placeholder="Type to search for stocks..." 
        v-model="searchQuery"
      >
      <span class="search-icon">🔍</span>
    </div>

    <div class="topbar-right">
      <template v-if="authStore.user">
        <div class="notification-wrapper">
          <button class="notification-btn" @click="toggleNotifications">
            <span class="icon">🔔</span>
            <span class="badge">2</span>
          </button>
          <div class="notification-dropdown" v-if="showNotifications">
            <div class="notification-header">
              <span>Notifications</span>
            </div>
            <div class="notification-body">
              <div 
                v-for="notification in notifications" 
                :key="notification.id" 
                class="notification-item"
              >
                <div class="notification-icon">🔔</div>
                <div class="notification-content">
                  <div class="notification-title">{{ notification.title }}</div>
                  <div class="notification-message">{{ notification.message }}</div>
                  <div class="notification-time">{{ notification.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile" @click="toggleProfileMenu">
          <img :src="`https://i.pravatar.cc/32?img=3`" alt="Profile" class="profile-img">
          <span class="profile-name">{{ authStore.user.displayName }}</span>
          <span class="dropdown-arrow">▼</span>
          
          <div v-if="showProfileMenu" class="profile-dropdown">
            <router-link to="/settings" class="dropdown-item">Settings</router-link>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item">Logout</button>
          </div>
        </div>
      </template>
      
      <template v-else>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
      </template>
    </div>
  </div>
</template>

<style scoped>
.topbar {
  height: var(--topbar-height);
  background-color: #fff;
  border-bottom: 1px solid #e3e6f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
}

.search-bar {
  position: relative;
}

.search-bar input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 2rem;
  border: 1px solid #d1d3e2;
  background-color: #f8f9fc;
  width: 400px;
  font-size: 0.85rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.search-bar input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

.search-icon {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #b7b9cc;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.notification-wrapper {
  position: relative;
}

.notification-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--danger);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 300px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  z-index: 1000;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s;
}

.profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.profile-name {
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 0.25rem;
}

.dropdown-arrow {
  font-size: 0.7rem;
  color: #858796;
}

.profile-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  min-width: 200px;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #3a3b45;
  text-decoration: none;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f8f9fc;
}

.dropdown-divider {
  height: 1px;
  background-color: #e3e6f0;
  margin: 0.5rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media screen and (max-width: 768px) {
  .search-bar input {
    width: 150px;
  }
  
  .profile-name {
    display: none;
  }
}
</style>