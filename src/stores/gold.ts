import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export const useGoldStore = defineStore('gold', () => {
  const goldProducts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchGoldProducts = async () => {
    try {
      loading.value = true;
      const querySnapshot = await getDocs(collection(db, 'goldProducts'));
      goldProducts.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const addGoldProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, 'goldProducts'), productData);
      goldProducts.value.push({ id: docRef.id, ...productData });
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateGoldProduct = async (id, productData) => {
    try {
      await updateDoc(doc(db, 'goldProducts', id), productData);
      const index = goldProducts.value.findIndex(product => product.id === id);
      if (index !== -1) {
        goldProducts.value[index] = { id, ...productData };
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteGoldProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'goldProducts', id));
      goldProducts.value = goldProducts.value.filter(product => product.id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    goldProducts,
    loading,
    error,
    fetchGoldProducts,
    addGoldProduct,
    updateGoldProduct,
    deleteGoldProduct
  };
});