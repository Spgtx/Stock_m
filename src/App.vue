<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar/Sidebar.vue';
</script>

<template>
  <div class="container">
    <Sidebar />
    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>