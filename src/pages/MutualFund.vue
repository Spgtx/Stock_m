<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { ref } from 'vue';

const funds = ref([
  {
    name: 'Vanguard 500 Index Fund',
    symbol: 'VFIAX',
    price: 439.21,
    change: 0.85,
    expense: 0.04,
    rating: 5,
    category: 'Large Blend'
  },
  {
    name: 'Fidelity Contrafund',
    symbol: 'FCNTX',
    price: 15.89,
    change: -0.32,
    expense: 0.86,
    rating: 4,
    category: 'Large Growth'
  },
  {
    name: 'American Funds Growth Fund',
    symbol: 'AGTHX',
    price: 65.23,
    change: 1.12,
    expense: 0.62,
    rating: 4,
    category: 'Large Growth'
  }
]);

const categories = [
  'All',
  'Large Blend',
  'Large Growth',
  'Large Value',
  'Mid-Cap',
  'Small-Cap',
  'International'
];

const selectedCategory = ref('All');
</script>

<template>
  <div class="mutual-fund-page">
    <TopBar />
    
    <div class="main-content">
      <div class="fund-header">
        <h1>Mutual Funds</h1>
        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category"
            :class="['category-btn', { active: category === selectedCategory }]"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>
      
      <div class="fund-grid">
        <div v-for="fund in funds" :key="fund.symbol" class="fund-card">
          <div class="fund-header">
            <div>
              <h3>{{ fund.name }}</h3>
              <p class="symbol">{{ fund.symbol }}</p>
            </div>
            <div class="rating">
              <span v-for="i in 5" :key="i" :class="['star', i <= fund.rating ? 'filled' : '']">
                ★
              </span>
            </div>
          </div>
          
          <div class="fund-details">
            <div class="detail-row">
              <span>Price</span>
              <span>${{ fund.price }}</span>
            </div>
            <div class="detail-row">
              <span>Change</span>
              <span :class="fund.change >= 0 ? 'positive' : 'negative'">
                {{ fund.change >= 0 ? '+' : '' }}{{ fund.change }}%
              </span>
            </div>
            <div class="detail-row">
              <span>Expense Ratio</span>
              <span>{{ fund.expense }}%</span>
            </div>
            <div class="detail-row">
              <span>Category</span>
              <span>{{ fund.category }}</span>
            </div>
          </div>
          
          <div class="fund-actions">
            <button class="btn btn-primary">Invest Now</button>
            <button class="btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mutual-fund-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.fund-header {
  margin-bottom: 2rem;
}

.fund-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.category-filter {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e3e6f0;
  border-radius: 2rem;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.category-btn.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.fund-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.fund-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.fund-card .fund-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.fund-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.symbol {
  color: #858796;
  font-size: 0.9rem;
}

.rating {
  color: #e3e6f0;
  font-size: 1.2rem;
}

.star.filled {
  color: #f6c23e;
}

.fund-details {
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e3e6f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--danger);
}

.fund-actions {
  display: flex;
  gap: 1rem;
}

.fund-actions .btn {
  flex: 1;
}

@media screen and (max-width: 768px) {
  .fund-grid {
    grid-template-columns: 1fr;
  }
}
</style>