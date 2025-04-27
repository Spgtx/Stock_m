<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const features = [
  {
    icon: '📈',
    title: 'Real-time Market Data',
    description: 'Get instant access to market prices, trends, and analysis'
  },
  {
    icon: '💼',
    title: 'Portfolio Management',
    description: 'Track and manage your investments in one place'
  },
  {
    icon: '📱',
    title: 'Mobile Trading',
    description: 'Trade on the go with our mobile-friendly platform'
  },
  {
    icon: '🔒',
    title: 'Secure Platform',
    description: 'Your investments are protected with bank-level security'
  }
];

const marketHighlights = [
  { name: 'S&P 500', value: '4,789.35', change: '+1.2%' },
  { name: 'Nasdaq', value: '15,123.45', change: '+0.8%' },
  { name: 'Dow Jones', value: '35,456.78', change: '+1.5%' }
];
</script>

<template>
  <div class="home">
    <TopBar />
    
    <div class="main-content">
      <div class="hero-section">
        <h1>Welcome to GoStock</h1>
        <p class="subtitle">Your Smart Investment Platform</p>
        
        <div class="market-highlights">
          <div v-for="market in marketHighlights" :key="market.name" class="market-item">
            <span class="market-name">{{ market.name }}</span>
            <span class="market-value">{{ market.value }}</span>
            <span class="market-change positive-change">{{ market.change }}</span>
          </div>
        </div>
        
        <div class="cta-buttons" v-if="!authStore.user">
          <router-link to="/register" class="btn btn-primary">Get Started</router-link>
          <router-link to="/login" class="btn">Login</router-link>
        </div>
      </div>
      
      <div class="features-section">
        <h2>Why Choose GoStock?</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <span class="feature-icon">{{ feature.icon }}</span>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
  color: white;
  margin: -1.5rem;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.market-highlights {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.market-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.market-name {
  font-size: 0.9rem;
  opacity: 0.8;
}

.market-value {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.25rem 0;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.features-section {
  padding: 4rem 0;
}

.features-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.feature-card p {
  color: #858796;
  font-size: 0.9rem;
  line-height: 1.6;
}

@media screen and (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .market-highlights {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .market-item {
    width: 100%;
    max-width: 300px;
  }
}
</style>