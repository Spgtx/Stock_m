<script setup lang="ts">
import { ref } from 'vue';
import AssetCard from './AssetCard.vue';

const assets = ref([
  {
    id: 1,
    logo: 'https://logo.clearbit.com/apple.com',
    name: 'Apple',
    totalShares: '$330.40',
    price: '$140.40',
    change: -1.13
  },
  {
    id: 2,
    logo: 'https://logo.clearbit.com/meta.com',
    name: 'Meta',
    totalShares: '$140.48',
    price: '$140.48',
    change: -0.80
  },
  {
    id: 3,
    logo: 'https://logo.clearbit.com/microsoft.com',
    name: 'Microsoft',
    totalShares: '$140.38',
    price: '$140.38',
    change: +0.25
  },
  {
    id: 4,
    logo: 'https://logo.clearbit.com/google.com',
    name: 'Google',
    totalShares: '$99.32',
    price: '$99.32',
    change: -0.94
  }
]);
</script>

<template>
  <div class="asset-section">
    <h2 class="section-title">My Portfolio</h2>
    <div class="asset-grid">
      <AssetCard 
        v-for="asset in assets" 
        :key="asset.id"
        :logo="asset.logo"
        :name="asset.name"
        :totalShares="asset.totalShares"
        :price="asset.price"
        :change="asset.change"
      />
    </div>
  </div>
</template>

<style scoped>
.asset-section {
  margin-bottom: 2rem;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .asset-grid {
    grid-template-columns: 1fr;
  }
}
</style>