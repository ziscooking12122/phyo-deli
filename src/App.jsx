// ✅ FULL UPDATED App.jsx for Vite

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken
} from 'firebase/auth';

// ✅ Vite loads environment variables via import.meta.env
const getAppId = () => {
  return import.meta.env.VITE_APP_ID || 'default-online-shop';
};

// ✅ Firebase config (leave as-is if you're not using env vars yet)
const firebaseConfig = {
  apiKey: "AIzaSyClfejW0YHd8bF3jV_L-TjNgkyXxomEuPU",
  authDomain: "phyo-deli-backend.firebaseapp.com",
  projectId: "phyo-deli-backend",
  storageBucket: "phyo-deli-backend.appspot.com",
  messagingSenderId: "68881654411",
  appId: "1:68881654411:web:65b1c3981b9d980c1f2a8e"
};

// ✅ MOCK STORES so it loads
const mockStores = [
  {
    id: 'store1',
    name: 'Golden Eats',
    category: 'Burgers & Wraps',
    image: 'https://source.unsplash.com/400x300/?burger',
