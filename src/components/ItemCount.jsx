import React, { useState } from 'react';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(count);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      margin: '20px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button 
          onClick={decrement}
          disabled={count <= 1}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            backgroundColor: count <= 1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: count <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          -
        </button>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{count}</span>
        <button 
          onClick={increment}
          disabled={count >= stock}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            backgroundColor: count >= stock ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: count >= stock ? 'not-allowed' : 'pointer'
          }}
        >
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Agregar al Carrito
      </button>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Stock disponible: {stock}
      </p>
    </div>
  );
};

export default ItemCount; 