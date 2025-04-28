<script setup lang="ts">
defineProps<{
  logo: string;
  name: string;
  price: string;
  change: number;
  category: string;
}>();
</script>

<template>
  <div class="watchlist-item">
    <div class="item-logo">
      <img :src="logo" :alt="name">
    </div>
    <div class="item-details">
      <h4>{{ name }}</h4>
      <p>{{ category }}</p>
    </div>
    <div class="item-price">
      <h4>{{ price }}</h4>
      <p class="change" :class="change >= 0 ? 'positive-change' : 'negative-change'">
        {{ change >= 0 ? '+' : '' }}{{ change }}%
      </p>
    </div>
  </div>
</template>

<style scoped>
.watchlist-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.watchlist-item:last-child {
  border-bottom: none;
}

.item-logo {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.item-logo img {
  width: 100%;
  height: auto;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin-bottom: 0.1rem;
  font-size: 0.9rem;
}

.item-details p {
  font-size: 0.75rem;
  color: #858796;
  margin: 0;
}

.item-price {
  text-align: right;
}

.item-price h4 {
  margin-bottom: 0.1rem;
  font-size: 0.9rem;
}

.item-price .change {
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
}
</style>