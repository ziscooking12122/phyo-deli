// ✅ FULL FINAL App.jsx for Vite + Firebase (Vercel compatible)

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

// ✅ Firebase config (secure enough for frontend use)
const firebaseConfig = {
  apiKey: "AIzaSyClfejW0YHd8bF3jV_L-TjNgkyXxomEuPU",
  authDomain: "phyo-deli-backend.firebaseapp.com",
  projectId: "phyo-deli-backend",
  storageBucket: "phyo-deli-backend.appspot.com",
  messagingSenderId: "68881654411",
  appId: "1:68881654411:web:65b1c3981b9d980c1f2a8e"
};

// ✅ Fallback mock data (in case no stores in Firestore or offline)
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

    // ✅ Sign in anonymously to access Firestore
    signInAnonymously(auth)
      .then(() => {
        const storesRef = collection(db, 'stores');

        // ✅ Real-time updates
        const unsubscribe = onSnapshot(storesRef, (snapshot) => {
          const storeList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Use Firestore data if available
          setStores(storeList.length > 0 ? storeList : mockStores);
        });

        // ✅ Cleanup listener on unmount
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error('Firebase auth error:', error);
        setStores(mockStores); // fallback
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Phyo Deli 🛵</h1>
      <p>Choose your favorite store:</p>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'flex-start'
      }}>
        {stores.map(store => (
          <div
            key={store.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: '250px',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={store.image}
              alt={store.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
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
