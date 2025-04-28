<script setup lang="ts">
import { ref } from 'vue';
import TopBar from '../components/TopBar/TopBar.vue';

const newsCategories = ['All', 'Market News', 'Company News', 'Economy', 'Technology'];
const selectedCategory = ref('All');

const news = [
  {
    id: 1,
    category: 'Market News',
    title: 'Stock Market Reaches All-Time High',
    summary: 'Major indices surge as tech stocks lead the rally',
    source: 'Financial Times',
    time: '2 hours ago',
    image: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg'
  },
  {
    id: 2,
    category: 'Company News',
    title: 'Apple Announces New Product Line',
    summary: 'Tech giant reveals revolutionary AI-powered devices',
    source: 'Reuters',
    time: '4 hours ago',
    image: 'https://images.pexels.com/photos/7567441/pexels-photo-7567441.jpeg'
  },
  {
    id: 3,
    category: 'Economy',
    title: 'Federal Reserve Maintains Interest Rates',
    summary: 'Central bank keeps rates steady amid economic stability',
    source: 'Bloomberg',
    time: '6 hours ago',
    image: 'https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg'
  }
];
</script>

<template>
  <div class="news">
    <TopBar />
    
    <div class="main-content">
      <div class="news-header">
        <h1>Market News</h1>
        <div class="category-filter">
          <button 
            v-for="category in newsCategories" 
            :key="category"
            :class="['category-btn', { active: category === selectedCategory }]"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>
      
      <div class="news-grid">
        <div v-for="item in news" :key="item.id" class="news-card">
          <div class="news-image">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="news-content">
            <span class="news-category">{{ item.category }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            <div class="news-footer">
              <span class="source">{{ item.source }}</span>
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.news-header {
  margin-bottom: 2rem;
}

.news-header h1 {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-4px);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-content {
  padding: 1.5rem;
}

.news-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(78, 115, 223, 0.1);
  color: var(--primary);
  border-radius: 2rem;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
}

.news-content h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

.news-content p {
  color: #858796;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #858796;
}

@media screen and (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>