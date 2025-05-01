import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const useCryptoStore = defineStore('crypto', () => {
  const cryptocurrencies = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCryptos = async () => {
    try {
      loading.value = true;
      const querySnapshot = await getDocs(collection(db, 'cryptocurrencies'));
      cryptocurrencies.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addCrypto = async (cryptoData) => {
    try {
      const docRef = await addDoc(collection(db, 'cryptocurrencies'), cryptoData);
      cryptocurrencies.value.push({ id: docRef.id, ...cryptoData });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateCrypto = async (id, cryptoData) => {
    try {
      await updateDoc(doc(db, 'cryptocurrencies', id), cryptoData);
      const index = cryptocurrencies.value.findIndex(crypto => crypto.id === id);
      if (index !== -1) {
        cryptocurrencies.value[index] = { id, ...cryptoData };
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteCrypto = async (id) => {
    try {
      await deleteDoc(doc(db, 'cryptocurrencies', id));
      cryptocurrencies.value = cryptocurrencies.value.filter(crypto => crypto.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    cryptocurrencies,
    loading,
    error,
    fetchCryptos,
    addCrypto,
    updateCrypto,
    deleteCrypto
  };
});