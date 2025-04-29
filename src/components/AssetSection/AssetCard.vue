<script setup lang="ts">
defineProps<{
  logo: string;
  name: string;
  totalShares: string;
  price: string;
  change: number;
}>();
</script>

<template>
  <div class="asset-card">
    <div class="asset-logo">
      <img :src="logo" :alt="name">
    </div>
    <div class="asset-details">
      <h4>{{ name }}</h4>
      <p>Total Shares: {{ totalShares }}</p>
    </div>
    <div class="asset-price">
      <h4>{{ price }}</h4>
      <p class="change" :class="change >= 0 ? 'positive-change' : 'negative-change'">
        {{ change >= 0 ? '+' : '' }}{{ change }}%
      </p>
    </div>
  </div>
</template>

<style scoped>
.asset-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.asset-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 2rem 0 rgba(58, 59, 69, 0.2);
}

.asset-logo {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.asset-logo img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.asset-details {
  flex: 1;
}

.asset-details h4 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.asset-details p {
  font-size: 0.8rem;
  color: #858796;
  margin: 0;
}

.asset-price {
  text-align: right;
}

.asset-price h4 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.asset-price .change {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
}
</style>