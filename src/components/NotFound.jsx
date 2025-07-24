import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '72px', margin: '0', color: '#dc3545' }}>404</h1>
      <h2 style={{ fontSize: '24px', margin: '20px 0', color: '#333' }}>
        Página no encontrada
      </h2>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link 
        to="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound; 