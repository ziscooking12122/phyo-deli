// App.jsx
import React from 'react';

const App = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Phyo Deli 🛵</h1>
      <p>Welcome to our test website deployed on Vercel!</p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ border: '1px solid #ddd', padding: '1rem', width: '250px' }}>
          <img
            src="https://source.unsplash.com/400x300/?food"
            alt="Sample"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>Golden Eats</h3>
          <p>Burgers & Wraps</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '1rem', width: '250px' }}>
          <img
            src="https://source.unsplash.com/400x300/?salad"
            alt="Sample"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <h3>Green Garden</h3>
          <p>Healthy & Salads</p>
        </div>
      </div>
    </div>
  );
};

export default App;
