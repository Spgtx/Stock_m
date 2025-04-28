<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { ref } from 'vue';

const activeTab = ref('profile');
const user = ref({
  name: 'Aurangya Maines',
  email: 'aurangya@example.com',
  phone: '+1 (555) 123-4567',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  preferences: {
    theme: 'light',
    currency: 'USD',
    language: 'English'
  }
});

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'preferences', label: 'Preferences' }
];
</script>

<template>
  <div class="settings">
    <TopBar />
    
    <div class="main-content">
      <div class="settings-header">
        <h1>Settings</h1>
      </div>
      
      <div class="settings-container">
        <div class="settings-sidebar">
          <div class="tabs-list">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              :class="['tab-btn', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
        
        <div class="settings-content">
          <!-- Profile Settings -->
          <div v-if="activeTab === 'profile'" class="settings-section">
            <h2>Profile Settings</h2>
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="user.name" class="form-control">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="user.email" class="form-control">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" v-model="user.phone" class="form-control">
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
          
          <!-- Security Settings -->
          <div v-if="activeTab === 'security'" class="settings-section">
            <h2>Security Settings</h2>
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label>New Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" class="form-control">
            </div>
            <button class="btn btn-primary">Update Password</button>
          </div>
          
          <!-- Notification Settings -->
          <div v-if="activeTab === 'notifications'" class="settings-section">
            <h2>Notification Settings</h2>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="user.notifications.email">
                Email Notifications
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="user.notifications.push">
                Push Notifications
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="user.notifications.sms">
                SMS Notifications
              </label>
            </div>
            <button class="btn btn-primary">Save Preferences</button>
          </div>
          
          <!-- Preferences Settings -->
          <div v-if="activeTab === 'preferences'" class="settings-section">
            <h2>Preferences</h2>
            <div class="form-group">
              <label>Theme</label>
              <select v-model="user.preferences.theme" class="form-control">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div class="form-group">
              <label>Currency</label>
              <select v-model="user.preferences.currency" class="form-control">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div class="form-group">
              <label>Language</label>
              <select v-model="user.preferences.language" class="form-control">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            <button class="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.settings-header {
  margin-bottom: 2rem;
}

.settings-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.settings-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.settings-sidebar {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--box-shadow);
}

.tabs-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tab-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background-color: var(--primary);
  color: white;
}

.settings-content {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
}

.settings-section h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d3e2;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

@media screen and (max-width: 768px) {
  .settings-container {
    grid-template-columns: 1fr;
  }
  
  .tabs-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .tab-btn {
    white-space: nowrap;
  }
}
</style>