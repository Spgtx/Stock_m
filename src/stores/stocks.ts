import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const useStocksStore = defineStore('stocks', () => {
  const stocks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchStocks = async () => {
    try {
      loading.value = true;
      const querySnapshot = await getDocs(collection(db, 'stocks'));
      stocks.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addStock = async (stockData) => {
    try {
      const docRef = await addDoc(collection(db, 'stocks'), stockData);
      stocks.value.push({ id: docRef.id, ...stockData });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateStock = async (id, stockData) => {
    try {
      await updateDoc(doc(db, 'stocks', id), stockData);
      const index = stocks.value.findIndex(stock => stock.id === id);
      if (index !== -1) {
        stocks.value[index] = { id, ...stockData };
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteStock = async (id) => {
    try {
      await deleteDoc(doc(db, 'stocks', id));
      stocks.value = stocks.value.filter(stock => stock.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    stocks,
    loading,
    error,
    fetchStocks,
    addStock,
    updateStock,
    deleteStock
  };
});