import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const useMutualFundsStore = defineStore('mutualFunds', () => {
  const mutualFunds = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchMutualFunds = async () => {
    try {
      loading.value = true;
      const querySnapshot = await getDocs(collection(db, 'mutualFunds'));
      mutualFunds.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addMutualFund = async (fundData) => {
    try {
      const docRef = await addDoc(collection(db, 'mutualFunds'), fundData);
      mutualFunds.value.push({ id: docRef.id, ...fundData });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateMutualFund = async (id, fundData) => {
    try {
      await updateDoc(doc(db, 'mutualFunds', id), fundData);
      const index = mutualFunds.value.findIndex(fund => fund.id === id);
      if (index !== -1) {
        mutualFunds.value[index] = { id, ...fundData };
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteMutualFund = async (id) => {
    try {
      await deleteDoc(doc(db, 'mutualFunds', id));
      mutualFunds.value = mutualFunds.value.filter(fund => fund.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    mutualFunds,
    loading,
    error,
    fetchMutualFunds,
    addMutualFund,
    updateMutualFund,
    deleteMutualFund
  };
});