<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const displayName = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    await authStore.register(email.value, password.value, displayName.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h2>Create Account</h2>
        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              v-model="displayName" 
              required 
              class="form-control"
              placeholder="Enter your full name"
            >
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="email" 
              required 
              class="form-control"
              placeholder="Enter your email"
            >
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input 
              type="password" 
              v-model="password" 
              required 
              class="form-control"
              placeholder="Create a password"
            >
          </div>

          <div class="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              v-model="confirmPassword" 
              required 
              class="form-control"
              placeholder="Confirm your password"
            >
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" class="btn btn-primary w-100">
            Register
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fc;
}

.auth-container {
  width: 100%;
  max-width: 420px;
  padding: 1rem;
}

.auth-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dark);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--dark);
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #d1d3e2;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.form-control:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

.error-message {
  color: var(--danger);
  font-size: 0.9rem;
  text-align: center;
}

.w-100 {
  width: 100%;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

.auth-footer a {
  color: var(--primary);
  font-weight: 600;
}
</style>