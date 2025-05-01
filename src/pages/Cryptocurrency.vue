<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { ref } from 'vue';

const cryptocurrencies = ref([
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 52341.25,
    change: 2.5,
    volume: '$45.2B',
    marketCap: '$1.02T'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2856.78,
    change: -1.2,
    volume: '$25.1B',
    marketCap: '$342.5B'
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 312.45,
    change: 0.8,
    volume: '$2.1B',
    marketCap: '$48.2B'
  }
]);

const timeFrames = ref([
  { label: '24h', active: true },
  { label: '7d', active: false },
  { label: '30d', active: false },
  { label: '90d', active: false },
  { label: '1y', active: false }
]);

const setTimeFrame = (selectedFrame: string) => {
  timeFrames.value.forEach(frame => {
    frame.active = frame.label === selectedFrame;
  });
};
</script>

<template>
  <div class="crypto-page">
    <TopBar />
    
    <div class="main-content">
      <div class="crypto-header">
        <h1>Cryptocurrency Market</h1>
        <div class="time-filter">
          <button 
            v-for="frame in timeFrames" 
            :key="frame.label"
            :class="['time-btn', { active: frame.active }]"
            @click="setTimeFrame(frame.label)"
          >
            {{ frame.label }}
          </button>
        </div>
      </div>
      
      <div class="market-overview">
        <div class="overview-card">
          <h3>Market Cap</h3>
          <p class="value">$2.15T</p>
          <p class="change positive">+1.2%</p>
        </div>
        <div class="overview-card">
          <h3>24h Volume</h3>
          <p class="value">$125.4B</p>
          <p class="change negative">-2.5%</p>
        </div>
        <div class="overview-card">
          <h3>BTC Dominance</h3>
          <p class="value">42.3%</p>
          <p class="change positive">+0.5%</p>
        </div>
      </div>
      
      <div class="crypto-list">
        <div class="list-header">
          <div>Asset</div>
          <div>Price</div>
          <div>Change</div>
          <div>Volume</div>
          <div>Market Cap</div>
          <div>Actions</div>
        </div>
        
        <div v-for="crypto in cryptocurrencies" :key="crypto.symbol" class="crypto-item">
          <div class="asset-info">
            <span class="symbol">{{ crypto.symbol }}</span>
            <span class="name">{{ crypto.name }}</span>
          </div>
          <div class="price">${{ crypto.price.toLocaleString() }}</div>
          <div :class="['change', crypto.change >= 0 ? 'positive' : 'negative']">
            {{ crypto.change >= 0 ? '+' : '' }}{{ crypto.change }}%
          </div>
          <div class="volume">{{ crypto.volume }}</div>
          <div class="market-cap">{{ crypto.marketCap }}</div>
          <div class="actions">
            <button class="btn btn-primary">Trade</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crypto-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.crypto-header {
  margin-bottom: 2rem;
}

.crypto-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.time-filter {
  display: flex;
  gap: 0.5rem;
}

.time-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e3e6f0;
  border-radius: 2rem;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
}

.time-btn.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.market-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.overview-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.overview-card h3 {
  font-size: 0.9rem;
  color: #858796;
  margin-bottom: 0.5rem;
}

.overview-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.crypto-list {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  background-color: #f8f9fc;
  font-weight: 600;
  border-bottom: 1px solid #e3e6f0;
}

.crypto-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #e3e6f0;
  align-items: center;
}

.asset-info {
  display: flex;
  flex-direction: column;
}

.symbol {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.name {
  font-size: 0.9rem;
  color: #858796;
}

.change.positive {
  color: var(--success);
}

.change.negative {
  color: var(--danger);
}

.actions {
  text-align: right;
}

@media screen and (max-width: 992px) {
  .crypto-item {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  
  .volume, .market-cap {
    display: none;
  }
  
  .list-header {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
  
  .list-header div:nth-child(4),
  .list-header div:nth-child(5) {
    display: none;
  }
}
</style>