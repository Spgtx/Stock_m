<script setup lang="ts">
import { ref } from 'vue';

interface ChildItem {
  label: string;
  route: string;
}

interface Props {
  icon: string;
  label: string;
  route: string;
  children?: ChildItem[];
}

const props = defineProps<Props>();
const isExpanded = ref(false);

const toggleExpand = () => {
  if (props.children && props.children.length > 0) {
    isExpanded.value = !isExpanded.value;
  }
};

const getIconClass = (iconName: string) => {
  switch (iconName) {
    case 'home': return '🏠';
    case 'dashboard': return '📊';
    case 'wallet': return '💰';
    case 'news': return '📰';
    case 'stock': return '📈';
    case 'community': return '👥';
    case 'settings': return '⚙️';
    case 'contact': return '📞';
    default: return '📂';
  }
};
</script>

<template>
  <li class="sidebar-item" :class="{ 'has-children': children && children.length > 0 }">
    <router-link :to="route" class="sidebar-link" @click="toggleExpand">
      <span class="icon">{{ getIconClass(icon) }}</span>
      <span class="label">{{ label }}</span>
      <span v-if="children && children.length > 0" class="arrow" :class="{ 'expanded': isExpanded }">▶</span>
    </router-link>
    <ul v-if="children && children.length > 0" class="children" :class="{ 'expanded': isExpanded }">
      <li v-for="child in children" :key="child.label" class="child-item">
        <router-link :to="child.route" class="child-link">{{ child.label }}</router-link>
      </li>
    </ul>
  </li>
</template>

<style scoped>
.sidebar-item {
  list-style: none;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
  position: relative;
}

.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.icon {
  margin-right: 0.75rem;
  font-size: 1rem;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s;
  font-size: 0.7rem;
}

.arrow.expanded {
  transform: rotate(90deg);
}

.children {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: rgba(0, 0, 0, 0.2);
}

.children.expanded {
  max-height: 500px;
}

.child-item {
  list-style: none;
}

.child-link {
  display: block;
  padding: 0.5rem 1rem 0.5rem 3rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: all 0.3s;
}

.child-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}
</style>