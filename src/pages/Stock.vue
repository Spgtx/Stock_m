<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import StockDetail from '../components/StockDetail/StockDetail.vue';
import { ref } from 'vue';

const stocks = ref([
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 182.52,
    change: 1.25,
    volume: '62.3M',
    marketCap: '2.85T'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 405.12,
    change: -0.58,
    volume: '28.1M',
    marketCap: '3.01T'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 0.89,
    volume: '25.7M',
    marketCap: '1.80T'
  }
]);

const sectors = [
  'Technology',
  'Healthcare',
  'Finance',
  'Consumer',
  'Energy',
  'Industrial'
];

const selectedSector = ref('Technology');
</script>

<template>
  <div class="stock-page">
    <TopBar />
    
    <div class="main-content">
      <div class="stock-header">
        <h1>Stock Market</h1>
        <div class="sector-filter">
          <button 
            v-for="sector in sectors" 
            :key="sector"
            :class="['sector-btn', { active: sector === selectedSector }]"
            @click="selectedSector = sector"
          >
            {{ sector }}
          </button>
        </div>
      </div>
      
      <div class="stock-grid">
        <div class="stock-list">
          <div class="list-header">
            <div>Symbol</div>
            <div>Name</div>
            <div>Price</div>
            <div>Change</div>
            <div>Volume</div>
            <div>Market Cap</div>
          </div>
          
          <div v-for="stock in stocks" :key="stock.symbol" class="stock-item">
            <div class="symbol">{{ stock.symbol }}</div>
            <div class="name">{{ stock.name }}</div>
            <div class="price">${{ stock.price }}</div>
            <div :class="['change', stock.change >= 0 ? 'positive' : 'negative']">
              {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
            </div>
            <div class="volume">{{ stock.volume }}</div>
            <div class="market-cap">{{ stock.marketCap }}</div>
          </div>
        </div>
        
        <div class="stock-detail">
          <StockDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stock-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.stock-header {
  margin-bottom: 2rem;
}

.stock-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.sector-filter {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.sector-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e3e6f0;
  border-radius: 2rem;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.sector-btn.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.stock-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.stock-list {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem;
  background-color: #f8f9fc;
  font-weight: 600;
  border-bottom: 1px solid #e3e6f0;
}

.stock-item {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 1rem;
  border-bottom: 1px solid #e3e6f0;
  transition: background-color 0.2s;
  cursor: pointer;
}

.stock-item:hover {
  background-color: #f8f9fc;
}

.symbol {
  font-weight: 600;
}

.name {
  color: #858796;
}

.price {
  font-weight: 600;
}

.change.positive {
  color: var(--success);
}

.change.negative {
  color: var(--danger);
}

.volume, .market-cap {
  color: #858796;
}

@media screen and (max-width: 992px) {
  .stock-grid {
    grid-template-columns: 1fr;
  }
  
  .list-header, .stock-item {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .volume, .market-cap {
    display: none;
  }
}
</style>