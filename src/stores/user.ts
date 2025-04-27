import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('user', () => {
  const portfolio = ref(null);
  const watchlist = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const authStore = useAuthStore();

  const fetchUserData = async () => {
    if (!authStore.user) return;

    try {
      loading.value = true;
      const userDoc = await getDoc(doc(db, 'users', authStore.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        portfolio.value = userData.portfolio;
        watchlist.value = userData.watchlist || [];
      } else {
        // Initialize user data if it doesn't exist
        await setDoc(doc(db, 'users', authStore.user.uid), {
          portfolio: {
            totalValue: 0,
            assets: []
          },
          watchlist: []
        });
        portfolio.value = { totalValue: 0, assets: [] };
        watchlist.value = [];
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const updatePortfolio = async (newPortfolio) => {
    if (!authStore.user) return;

    try {
      await updateDoc(doc(db, 'users', authStore.user.uid), {
        portfolio: newPortfolio
      });
      portfolio.value = newPortfolio;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateWatchlist = async (newWatchlist) => {
    if (!authStore.user) return;

    try {
      await updateDoc(doc(db, 'users', authStore.user.uid), {
        watchlist: newWatchlist
      });
      watchlist.value = newWatchlist;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    portfolio,
    watchlist,
    loading,
    error,
    fetchUserData,
    updatePortfolio,
    updateWatchlist
  };
});