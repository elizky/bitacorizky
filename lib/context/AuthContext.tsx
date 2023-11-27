'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';
import { AuthContextType } from '../utils/interfaces';
import Loader from '@/components/ui/Loader';

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signup: async (email: string, password: string, displayName: string) => ({
    result: null,
    error: null,
  }),
  login: async (email: string, password: string) => {},
  logout: async () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const signup = (email: string, password: string, displayName: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return updateProfile(result.user, { displayName })
          .then(() => {
            return { result, error: null };
          })
          .catch((error) => {
            return { result, error };
          });
      })
      .catch((error) => {
        return { result: null, error };
      });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className='h-96 flex justify-center items-center '>
          <Loader />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
