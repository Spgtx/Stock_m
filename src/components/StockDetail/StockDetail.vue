<script setup lang="ts">
import { ref } from 'vue';
import StockChart from './StockChart.vue';

const currentStock = ref({
  id: 'AAPL',
  name: 'Apple Inc',
  price: '$160.70',
  change: '+2.7%',
  lastUpdated: '4/14/22'
});

const timeFrames = ref([
  { id: 'hour', label: 'Hour' },
  { id: 'day', label: 'Day', active: true },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'quarter', label: 'Quarter' },
  { id: 'year', label: 'Year' },
  { id: 'all', label: 'All' }
]);

const selectedTimeFrame = ref('day');

const setActiveTimeFrame = (id: string) => {
  selectedTimeFrame.value = id;
  timeFrames.value.forEach(tf => {
    tf.active = tf.id === id;
  });
};
</script>

<template>
  <div class="stock-detail-card">
    <div class="stock-detail-header">
      <div class="stock-icon">
        <img src="https://logo.clearbit.com/apple.com" alt="Apple Inc">
      </div>
      <div class="stock-info">
        <h3>{{ currentStock.name }}</h3>
        <div class="stock-price-change">
          <h4 class="stock-price">{{ currentStock.price }}</h4>
          <span class="stock-change positive-change">{{ currentStock.change }}</span>
        </div>
        <p class="last-updated">Last updated at {{ currentStock.lastUpdated }}</p>
      </div>
    </div>
    
    <div class="time-frame-selector">
      <button 
        v-for="tf in timeFrames" 
        :key="tf.id"
        :class="['time-frame-btn', { active: tf.active }]"
        @click="setActiveTimeFrame(tf.id)"
      >
        {{ tf.label }}
      </button>
    </div>
    
    <StockChart :stockId="currentStock.id" :timeFrame="selectedTimeFrame" />
  </div>
</template>

<style scoped>
.stock-detail-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.stock-detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.stock-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
}

.stock-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stock-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.stock-price-change {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}

.stock-price {
  font-size: 1.1rem;
  margin: 0;
  margin-right: 0.5rem;
}

.stock-change {
  font-size: 0.9rem;
  font-weight: 600;
}

.last-updated {
  font-size: 0.8rem;
  color: #858796;
  margin: 0;
}

.time-frame-selector {
  display: flex;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  overflow: hidden;
  background-color: #f8f9fc;
  width: fit-content;
}

.time-frame-btn {
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.time-frame-btn:hover {
  background-color: rgba(78, 115, 223, 0.1);
}

.time-frame-btn.active {
  background-color: var(--primary);
  color: white;
}

@media screen and (max-width: 768px) {
  .time-frame-selector {
    overflow-x: auto;
    width: 100%;
  }
  
  .time-frame-btn {
    padding: 0.5rem 0.75rem;
    white-space: nowrap;
  }
}
</style>