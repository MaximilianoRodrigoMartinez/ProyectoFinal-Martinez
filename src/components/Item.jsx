import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '250px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{product.name}</h3>
      <p style={{ color: '#666', margin: '5px 0', fontWeight: 'bold' }}>${product.price}</p>
      <p style={{ fontSize: '12px', color: '#007bff', margin: '5px 0' }}>
        {product.category}
      </p>
      <Link 
        to={`/item/${product.id}`}
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '10px'
        }}
      >
        Ver Detalle
      </Link>
    </div>
  );
};

export default Item; 