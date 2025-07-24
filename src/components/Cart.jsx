import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeItem, clear, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#666' }}>Tu carrito está vacío</h2>
        <p style={{ marginBottom: '30px', color: '#888' }}>
          Agrega algunos productos para comenzar a comprar
        </p>
        <Link 
          to="/"
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Tu Carrito</h2>
      
      <div style={{ marginBottom: '20px' }}>
        {cart.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginBottom: '10px',
            backgroundColor: 'white'
          }}>
            <img 
              src={item.image} 
              alt={item.name}
              style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover', 
                borderRadius: '4px',
                marginRight: '15px'
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{item.name}</h3>
              <p style={{ margin: '0', color: '#666' }}>
                Cantidad: {item.quantity}
              </p>
              <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#007bff' }}>
                ${item.price} x {item.quantity} = ${item.price * item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '2px solid #eee',
        paddingTop: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: 0 }}>Total: ${getTotalPrice()}</h3>
          <button
            onClick={clear}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpiar Carrito
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center'
        }}>
          <Link 
            to="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Seguir Comprando
          </Link>
          <Link 
            to="/checkout"
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 