<script setup lang="ts">
import { ref } from 'vue';
import WatchlistItem from './WatchlistItem.vue';

const watchlistItems = ref([
  {
    id: 1,
    logo: 'https://logo.clearbit.com/spotify.com',
    name: 'SPOT',
    category: 'Spotify',
    price: '$130.40',
    change: -1.07
  },
  {
    id: 2,
    logo: 'https://logo.clearbit.com/airbnb.com',
    name: 'ABNB',
    category: 'Airbnb',
    price: '$132.73',
    change: +23.29
  },
  {
    id: 3,
    logo: 'https://logo.clearbit.com/shopify.com',
    name: 'SHOP',
    category: 'Shopify',
    price: '$26.57',
    change: -4.88
  },
  {
    id: 4,
    logo: 'https://logo.clearbit.com/sony.com',
    name: 'SONY',
    category: 'PlayStation',
    price: '$71.86',
    change: +0.78
  },
  {
    id: 5,
    logo: 'https://logo.clearbit.com/dropbox.com',
    name: 'DBX',
    category: 'Dropbox Inc',
    price: '$20.44',
    change: -3.28
  },
  {
    id: 6,
    logo: 'https://logo.clearbit.com/paypal.com',
    name: 'PYPL',
    category: 'Paypal',
    price: '$87.46',
    change: -1.86
  }
]);
</script>

<template>
  <div class="watchlist-card">
    <div class="watchlist-header">
      <h3>My watchlist</h3>
      <button class="add-btn">+</button>
    </div>
    <div class="watchlist-body">
      <WatchlistItem 
        v-for="item in watchlistItems" 
        :key="item.id"
        :logo="item.logo"
        :name="item.name"
        :category="item.category"
        :price="item.price"
        :change="item.change"
      />
    </div>
  </div>
</template>

<style scoped>
.watchlist-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
}

.watchlist-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.watchlist-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.add-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #2e59d9;
}

.watchlist-body {
  padding: 0.5rem 1rem;
  max-height: 400px;
  overflow-y: auto;
}
</style>