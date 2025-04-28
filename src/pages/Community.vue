<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';

const posts = [
  {
    id: 1,
    user: {
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/40?img=1',
      badge: 'Expert Trader'
    },
    title: 'Market Analysis: Tech Stocks in 2024',
    content: 'Here\'s my technical analysis of the current tech sector trends...',
    likes: 245,
    comments: 56,
    shares: 23,
    time: '2 hours ago'
  },
  {
    id: 2,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/40?img=2',
      badge: 'Market Analyst'
    },
    title: 'Investment Strategy for Beginners',
    content: 'Starting your investment journey? Here are some key tips...',
    likes: 189,
    comments: 42,
    shares: 15,
    time: '4 hours ago'
  }
];

const popularTopics = [
  'Market Analysis',
  'Investment Strategies',
  'Stock Picks',
  'Technical Analysis',
  'Cryptocurrency'
];

const topContributors = [
  {
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/32?img=4',
    contributions: 156
  },
  {
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/32?img=5',
    contributions: 143
  },
  {
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/32?img=6',
    contributions: 128
  }
];
</script>

<template>
  <div class="community">
    <TopBar />
    
    <div class="main-content">
      <div class="community-header">
        <h1>Community</h1>
        <button class="btn btn-primary">Create Post</button>
      </div>
      
      <div class="community-layout">
        <div class="posts-section">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-header">
              <div class="user-info">
                <img :src="post.user.avatar" :alt="post.user.name" class="user-avatar">
                <div>
                  <h4>{{ post.user.name }}</h4>
                  <span class="badge">{{ post.user.badge }}</span>
                </div>
              </div>
              <span class="post-time">{{ post.time }}</span>
            </div>
            
            <div class="post-content">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
            </div>
            
            <div class="post-actions">
              <button class="action-btn">
                <span>👍 {{ post.likes }}</span>
              </button>
              <button class="action-btn">
                <span>💬 {{ post.comments }}</span>
              </button>
              <button class="action-btn">
                <span>↗️ {{ post.shares }}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="sidebar-section">
          <div class="card">
            <div class="card-header">
              <h3>Popular Topics</h3>
            </div>
            <div class="card-body">
              <div class="topics-list">
                <a v-for="topic in popularTopics" 
                   :key="topic" 
                   href="#" 
                   class="topic-tag"
                >
                  {{ topic }}
                </a>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h3>Top Contributors</h3>
            </div>
            <div class="card-body">
              <div class="contributors-list">
                <div v-for="contributor in topContributors" 
                     :key="contributor.name" 
                     class="contributor-item"
                >
                  <div class="contributor-info">
                    <img :src="contributor.avatar" :alt="contributor.name">
                    <span>{{ contributor.name }}</span>
                  </div>
                  <span class="contribution-count">{{ contributor.contributions }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.community {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.community-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.community-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.community-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
}

.post-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--box-shadow);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: rgba(78, 115, 223, 0.1);
  color: var(--primary);
  border-radius: 2rem;
  font-size: 0.8rem;
}

.post-time {
  font-size: 0.8rem;
  color: #858796;
}

.post-content {
  margin-bottom: 1.5rem;
}

.post-content h3 {
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
}

.post-content p {
  color: #858796;
  font-size: 0.9rem;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: none;
  border: none;
  color: #858796;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f8f9fc;
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f8f9fc;
  border-radius: 2rem;
  font-size: 0.8rem;
  color: var(--dark);
  text-decoration: none;
  transition: background-color 0.2s;
}

.topic-tag:hover {
  background-color: #e3e6f0;
}

.contributors-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contributor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contributor-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contributor-info img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.contribution-count {
  font-weight: 600;
  color: var(--primary);
}

@media screen and (max-width: 992px) {
  .community-layout {
    grid-template-columns: 1fr;
  }
  
  .community-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>