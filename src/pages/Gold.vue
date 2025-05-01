<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';
import { ref } from 'vue';

const goldPrice = ref({
  current: 2024.50,
  change: 12.30,
  changePercent: 0.61
});

const goldProducts = ref([
  {
    name: 'Physical Gold',
    description: 'Investment in physical gold bullion',
    price: 2024.50,
    unit: 'per oz',
    options: ['Bars', 'Coins', 'Jewelry']
  },
  {
    name: 'Gold ETF',
    description: 'Exchange-traded fund tracking gold prices',
    price: 185.75,
    unit: 'per share',
    options: ['SPDR Gold Shares', 'iShares Gold Trust']
  },
  {
    name: 'Gold Futures',
    description: 'Gold futures contracts',
    price: 2026.80,
    unit: 'per contract',
    options: ['Monthly', 'Quarterly']
  }
]);

const historicalPrices = ref([
  { date: '2024-02-20', price: 2024.50 },
  { date: '2024-02-19', price: 2012.20 },
  { date: '2024-02-18', price: 2015.80 },
  { date: '2024-02-17', price: 2018.30 },
  { date: '2024-02-16', price: 2010.90 }
]);
</script>

<template>
  <div class="gold-page">
    <TopBar />
    
    <div class="main-content">
      <div class="gold-header">
        <h1>Gold Investment</h1>
        <div class="current-price">
          <div class="price-display">
            <h2>${{ goldPrice.current.toFixed(2) }}</h2>
            <span :class="['change', goldPrice.change >= 0 ? 'positive' : 'negative']">
              {{ goldPrice.change >= 0 ? '+' : '' }}${{ goldPrice.change }}
              ({{ goldPrice.changePercent }}%)
            </span>
          </div>
          <p class="update-time">Last updated: {{ new Date().toLocaleString() }}</p>
        </div>
      </div>
      
      <div class="gold-products">
        <div v-for="product in goldProducts" :key="product.name" class="product-card">
          <h3>{{ product.name }}</h3>
          <p class="description">{{ product.description }}</p>
          <div class="price-info">
            <span class="price">${{ product.price }}</span>
            <span class="unit">{{ product.unit }}</span>
          </div>
          <div class="options">
            <h4>Available Options:</h4>
            <ul>
              <li v-for="option in product.options" :key="option">{{ option }}</li>
            </ul>
          </div>
          <button class="btn btn-primary">Invest Now</button>
        </div>
      </div>
      
      <div class="historical-prices">
        <h2>Historical Prices</h2>
        <div class="price-table">
          <div class="table-header">
            <div>Date</div>
            <div>Price</div>
          </div>
          <div v-for="price in historicalPrices" :key="price.date" class="price-row">
            <div>{{ new Date(price.date).toLocaleDateString() }}</div>
            <div>${{ price.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gold-page {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.gold-header {
  margin-bottom: 2rem;
}

.gold-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.current-price {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
}

.price-display {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.price-display h2 {
  font-size: 2rem;
  margin: 0;
}

.change {
  font-size: 1.1rem;
  font-weight: 600;
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--danger);
}

.update-time {
  color: #858796;
  font-size: 0.9rem;
  margin: 0;
}

.gold-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.product-card h3 {
  margin-bottom: 0.75rem;
}

.description {
  color: #858796;
  margin-bottom: 1rem;
}

.price-info {
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 0.5rem;
}

.unit {
  color: #858796;
}

.options {
  margin-bottom: 1.5rem;
}

.options h4 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.options ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.options li {
  padding: 0.25rem 0;
  color: #858796;
}

.historical-prices {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.historical-prices h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

.price-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  background-color: #f8f9fc;
  font-weight: 600;
  border-bottom: 1px solid #e3e6f0;
}

.price-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #e3e6f0;
}

.price-row:last-child {
  border-bottom: none;
}

@media screen and (max-width: 768px) {
  .gold-products {
    grid-template-columns: 1fr;
  }
}
</style>