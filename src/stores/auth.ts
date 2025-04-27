import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAdmin = ref(false);
  const loading = ref(true);
  const error = ref(null);

  const init = () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult();
        isAdmin.value = token.claims.admin === true;
        user.value = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
      } else {
        user.value = null;
        isAdmin.value = false;
      }
      loading.value = false;
    });
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      error.value = null;
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(firebaseUser, { displayName });
      return firebaseUser;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      error.value = null;
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      return firebaseUser;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      user.value = null;
      isAdmin.value = false;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    user,
    isAdmin,
    loading,
    error,
    init,
    register,
    login,
    signOut
  };
});