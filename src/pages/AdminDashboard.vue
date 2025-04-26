<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TopBar from '../components/TopBar/TopBar.vue';
import { useStocksStore } from '../stores/stocks';

const activeTab = ref('stocks');
const stocksStore = useStocksStore();
const newStock = ref({
  symbol: '',
  name: '',
  price: '',
  change: '',
  volume: '',
  marketCap: ''
});

const tabs = [
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Cryptocurrency' },
  { id: 'mutual-funds', label: 'Mutual Funds' },
  { id: 'users', label: 'Users' }
];

onMounted(async () => {
  await stocksStore.fetchStocks();
});

const handleAddStock = async () => {
  try {
    await stocksStore.addStock({
      ...newStock.value,
      price: parseFloat(newStock.value.price),
      change: parseFloat(newStock.value.change)
    });
    newStock.value = {
      symbol: '',
      name: '',
      price: '',
      change: '',
      volume: '',
      marketCap: ''
    };
  } catch (error) {
    console.error('Error adding stock:', error);
  }
};

const handleDeleteStock = async (id: string) => {
  if (confirm('Are you sure you want to delete this stock?')) {
    await stocksStore.deleteStock(id);
  }
};
</script>

<template>
  <div class="admin-dashboard">
    <TopBar />
    
    <div class="main-content">
      <div class="admin-header">
        <h1>Admin Dashboard</h1>
      </div>
      
      <div class="admin-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- Stocks Management -->
      <div v-if="activeTab === 'stocks'" class="tab-content">
        <div class="card">
          <div class="card-header">
            <h2>Add New Stock</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleAddStock" class="add-form">
              <div class="form-row">
                <div class="form-group">
                  <label>Symbol</label>
                  <input 
                    type="text" 
                    v-model="newStock.symbol"
                    required
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    v-model="newStock.name"
                    required
                    class="form-control"
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Price</label>
                  <input 
                    type="number" 
                    v-model="newStock.price"
                    required
                    step="0.01"
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label>Change (%)</label>
                  <input 
                    type="number" 
                    v-model="newStock.change"
                    required
                    step="0.01"
                    class="form-control"
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Volume</label>
                  <input 
                    type="text" 
                    v-model="newStock.volume"
                    required
                    class="form-control"
                  >
                </div>
                <div class="form-group">
                  <label>Market Cap</label>
                  <input 
                    type="text" 
                    v-model="newStock.marketCap"
                    required
                    class="form-control"
                  >
                </div>
              </div>
              
              <button type="submit" class="btn btn-primary">Add Stock</button>
            </form>
          </div>
        </div>
        
        <div class="card mt-4">
          <div class="card-header">
            <h2>Manage Stocks</h2>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Volume</th>
                    <th>Market Cap</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stock in stocksStore.stocks" :key="stock.id">
                    <td>{{ stock.symbol }}</td>
                    <td>{{ stock.name }}</td>
                    <td>${{ stock.price }}</td>
                    <td :class="stock.change >= 0 ? 'positive' : 'negative'">
                      {{ stock.change }}%
                    </td>
                    <td>{{ stock.volume }}</td>
                    <td>{{ stock.marketCap }}</td>
                    <td>
                      <button 
                        class="btn btn-danger btn-sm"
                        @click="handleDeleteStock(stock.id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Other tabs content will be added here -->
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.admin-header {
  margin-bottom: 2rem;
}

.admin-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e3e6f0;
  padding-bottom: 1rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-weight: 600;
  color: #858796;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #d1d3e2;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e3e6f0;
}

.admin-table th {
  background-color: #f8f9fc;
  font-weight: 600;
}

.positive {
  color: var(--success);
}

.negative {
  color: var(--danger);
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-danger {
  background-color: var(--danger);
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.mt-4 {
  margin-top: 1.5rem;
}

.table-responsive {
  overflow-x: auto;
}

@media screen and (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .admin-tabs {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .tab-btn {
    white-space: nowrap;
  }
}
</style>