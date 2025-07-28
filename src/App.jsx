// ✅ FULL UPDATED App.jsx for Vite

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInAnonymously
} from 'firebase/auth';

// ✅ Firebase config (leave as-is unless you're using .env)
const firebaseConfig = {
  apiKey: "AIzaSyClfejW0YHd8bF3jV_L-TjNgkyXxomEuPU",
  authDomain: "phyo-deli-backend.firebaseapp.com",
  projectId: "phyo-deli-backend",
  storageBucket: "phyo-deli-backend.appspot.com",
  messagingSenderId: "68881654411",
  appId: "1:68881654411:web:65b1c3981b9d980c1f2a8e"
};

// ✅ Fallback mock stores for offline or auth error
const mockStores = [
  {
    id: 'store1',
    name: 'Golden Eats',
    category: 'Burgers & Wraps',
    image: 'https://source.unsplash.com/400x300/?burger'
  },
  {
    id: 'store2',
    name: 'Green Garden',
    category: 'Salads & Healthy',
    image: 'https://source.unsplash.com/400x300/?salad'
  }
];

const App = () => {
  const [stores, setStores] = useState(mockStores);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    signInAnonymously(auth)
      .then(() => {
        const storesRef = collection(db, 'stores');
        onSnapshot(storesRef, (snapshot) => {
          const storeList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStores(storeList.length > 0 ? storeList : mockStores);
        });
      })
      .catch((error) => {
        console.error('Firebase auth error:', error);
        setStores(mockStores); // fallback data
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Phyo Deli 🛵</h1>
      <p>Choose your favorite store:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {stores.map(store => (
          <div
            key={store.id}
            style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}
          >
            <img
              src={store.image}
              alt={store.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{store.name}</h3>
            <p>{store.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
