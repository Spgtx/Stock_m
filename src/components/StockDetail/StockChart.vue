<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
  stockId: string;
  timeFrame?: string;
}>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let stockChart: Chart | null = null;

const getRandomData = (timeFrame: string) => {
  const basePrice = 160;
  let points = 30;
  let volatility = 0.5;
  
  // Adjust data points and volatility based on time frame
  switch(timeFrame) {
    case 'hour':
      points = 60; // 60 minutes
      volatility = 0.2;
      break;
    case 'day':
      points = 24; // 24 hours
      volatility = 0.5;
      break;
    case 'week':
      points = 7; // 7 days
      volatility = 1;
      break;
    case 'month':
      points = 30; // 30 days
      volatility = 2;
      break;
    case 'quarter':
      points = 90; // 90 days
      volatility = 3;
      break;
    case 'year':
      points = 365; // 365 days
      volatility = 5;
      break;
    case 'all':
      points = 1825; // 5 years
      volatility = 8;
      break;
    default:
      points = 24;
      volatility = 0.5;
  }
  
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility;
    price += change;
    data.push(price);
  }
  
  return data;
};

const getLabels = (timeFrame: string) => {
  const now = new Date();
  const labels = [];
  
  switch(timeFrame) {
    case 'hour':
      for (let i = 59; i >= 0; i--) {
        labels.push(`${i}m`);
      }
      break;
    case 'day':
      for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
      }
      break;
    case 'week':
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      break;
    case 'month':
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.getDate().toString());
      }
      break;
    case 'quarter':
      for (let i = 89; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        if (i % 7 === 0) {
          labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        } else {
          labels.push('');
        }
      }
      break;
    case 'year':
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
      }
      break;
    case 'all':
      for (let i = 4; i >= 0; i--) {
        const date = new Date(now);
        date.setFullYear(date.getFullYear() - i);
        labels.push(date.getFullYear().toString());
      }
      break;
    default:
      for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
      }
  }
  
  return labels;
};

const getChartData = (timeFrame: string) => {
  const data = getRandomData(timeFrame);
  
  const canvas = chartRef.value;
  if (!canvas) return { data: [] };
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return { data: [] };
  
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, 'rgba(78, 115, 223, 0.4)');
  gradient.addColorStop(1, 'rgba(78, 115, 223, 0)');
  
  return {
    labels: getLabels(timeFrame),
    datasets: [
      {
        label: 'Stock Price',
        data: data,
        borderColor: '#4e73df',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHitRadius: 10,
        pointBorderWidth: 2,
        backgroundColor: gradient,
        fill: true
      }
    ]
  };
};

const initChart = () => {
  const canvas = chartRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  if (stockChart) {
    stockChart.destroy();
  }
  
  stockChart = new Chart(ctx, {
    type: 'line',
    data: getChartData(props.timeFrame || 'day'),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#5a5c69',
          bodyColor: '#5a5c69',
          borderColor: '#e3e6f0',
          borderWidth: 1,
          bodyFont: {
            size: 14
          },
          padding: 10,
          cornerRadius: 4,
          callbacks: {
            label: function(context) {
              return `$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: true,
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          grid: {
            borderDash: [2],
            drawBorder: false,
            zeroLineColor: '#e3e6f0',
            color: '#e3e6f0'
          },
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
};

watch(() => props.timeFrame, () => {
  initChart();
});

onMounted(() => {
  initChart();
});
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  margin-top: 1rem;
}
</style>