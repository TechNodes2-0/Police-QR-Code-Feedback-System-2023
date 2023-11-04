// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCbxIXw-pXevk9nmq2MEonu86uemZCjvCk',
  authDomain: 'policefeedbacksystem-5e031.firebaseapp.com',
  projectId: 'policefeedbacksystem-5e031',
  storageBucket: 'policefeedbacksystem-5e031.appspot.com',
  messagingSenderId: '641111786552',
  appId: '1:641111786552:web:80f40c0c4098317280d2cd',
  measurementId: 'G-1MPYYGTN5S',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
     
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signOut: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
