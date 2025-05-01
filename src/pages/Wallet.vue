<script setup lang="ts">
import TopBar from '../components/TopBar/TopBar.vue';

const transactions = [
  { id: 1, type: 'Buy', stock: 'AAPL', amount: '$1,500.00', shares: 10, date: '2024-02-20' },
  { id: 2, type: 'Sell', stock: 'GOOGL', amount: '$2,800.00', shares: 15, date: '2024-02-19' },
  { id: 3, type: 'Buy', stock: 'MSFT', amount: '$900.00', shares: 5, date: '2024-02-18' },
  { id: 4, type: 'Deposit', stock: null, amount: '$5,000.00', shares: null, date: '2024-02-17' }
];

const walletStats = [
  { label: 'Available Balance', value: '$5,391.99' },
  { label: 'Pending Orders', value: '2' },
  { label: 'Total Withdrawn', value: '$12,500.00' },
  { label: 'Total Deposited', value: '$25,000.00' }
];
</script>

<template>
  <div class="wallet">
    <TopBar />
    
    <div class="main-content">
      <div class="wallet-header">
        <h1>Wallet</h1>
        <div class="wallet-actions">
          <button class="btn btn-primary">Deposit</button>
          <button class="btn btn-primary">Withdraw</button>
        </div>
      </div>
      
      <div class="wallet-stats">
        <div v-for="(stat, index) in walletStats" :key="index" class="stat-card">
          <h3>{{ stat.label }}</h3>
          <p class="value">{{ stat.value }}</p>
        </div>
      </div>
      
      <div class="transactions-section">
        <div class="card">
          <div class="card-header">
            <h2>Recent Transactions</h2>
            <button class="btn btn-primary">View All</button>
          </div>
          <div class="card-body">
            <table class="transactions-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Stock</th>
                  <th>Amount</th>
                  <th>Shares</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in transactions" :key="tx.id">
                  <td>
                    <span :class="['badge', tx.type.toLowerCase()]">{{ tx.type }}</span>
                  </td>
                  <td>{{ tx.stock || '-' }}</td>
                  <td>{{ tx.amount }}</td>
                  <td>{{ tx.shares || '-' }}</td>
                  <td>{{ tx.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wallet {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.wallet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.wallet-header h1 {
  font-size: 1.8rem;
  margin: 0;
}

.wallet-actions {
  display: flex;
  gap: 1rem;
}

.wallet-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.stat-card h3 {
  font-size: 0.9rem;
  color: #858796;
  margin-bottom: 0.5rem;
}

.stat-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th,
.transactions-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e3e6f0;
}

.transactions-table th {
  font-weight: 600;
  color: #858796;
  font-size: 0.9rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.buy {
  background-color: rgba(28, 200, 138, 0.1);
  color: var(--success);
}

.badge.sell {
  background-color: rgba(231, 74, 59, 0.1);
  color: var(--danger);
}

.badge.deposit {
  background-color: rgba(54, 185, 204, 0.1);
  color: var(--info);
}

@media screen and (max-width: 768px) {
  .wallet-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .transactions-table {
    display: block;
    overflow-x: auto;
  }
}
</style>