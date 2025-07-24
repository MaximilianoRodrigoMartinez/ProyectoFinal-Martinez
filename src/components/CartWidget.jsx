import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity, cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const dropdownRef = useRef(null);

  const totalQuantity = getTotalQuantity();

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover')) {
        setIsDropdownOpen(false);
      }
    }, 100);
    setTimeoutId(id);
  };
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '4px',
          backgroundColor: isDropdownOpen ? '#e9ecef' : 'transparent',
          transition: 'background-color 0.3s'
        }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        🛒 
        {totalQuantity > 0 && (
          <span style={{
            backgroundColor: '#dc3545',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
            marginLeft: '5px',
            minWidth: '18px',
            textAlign: 'center'
          }}>
            {totalQuantity}
          </span>
        )}
      </div>
      
      {isDropdownOpen && cart.length > 0 && (
        <div 
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minWidth: '250px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            padding: '10px',
            marginTop: '5px'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Carrito</h4>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #eee'
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</p>
                <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                  Cantidad: {item.quantity} | ${item.price}
                </p>
              </div>
            </div>
          ))}
          <div style={{ 
            marginTop: '10px', 
            textAlign: 'center',
            padding: '5px'
          }}>
            <Link 
              to="/cart"
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'background-color 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={handleMouseEnter}
            >
              Ver Carrito
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget;