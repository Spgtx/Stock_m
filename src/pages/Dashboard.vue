<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import AssetSection from '../components/AssetSection/AssetSection.vue';
import StockDetail from '../components/StockDetail/StockDetail.vue';
import Watchlist from '../components/Watchlist/Watchlist.vue';

const portfolioStats = [
  { label: 'Total Assets', value: '$102,391.99', change: '+2.5%' },
  { label: 'Today\'s Change', value: '+$1,239.50', change: '+1.2%' },
  { label: 'Total Profit', value: '$12,391.99', change: '+12.5%' },
  { label: 'Available Cash', value: '$5,391.99', change: null }
];
</script>

<template>
  <div class="dashboard">
    <TopBar />
    
    <div class="main-content">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <button class="btn btn-primary">Add Investment</button>
      </div>
      
      <div class="portfolio-stats">
        <div v-for="(stat, index) in portfolioStats" :key="index" class="stat-card">
          <h3>{{ stat.label }}</h3>
          <p class="value">{{ stat.value }}</p>
          <p v-if="stat.change" class="change positive-change">{{ stat.change }}</p>
        </div>
      </div>
      
      <AssetSection />
      
      <div class="dashboard-content">
        <div class="stock-detail-container">
          <StockDetail />
        </div>
        <div class="watchlist-container">
          <Watchlist />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.portfolio-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.stat-card h3 {
  font-size: 0.9rem;
  color: #858796;
  margin-bottom: 0.5rem;
}

.stat-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-card .change {
  font-size: 0.9rem;
  font-weight: 600;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media screen and (max-width: 992px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>