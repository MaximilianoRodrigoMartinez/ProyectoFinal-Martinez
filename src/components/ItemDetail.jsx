import React, { useState } from 'react';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext';

const ItemDetail = ({ product }) => {
  const { addItem, isInCart } = useCart();
  const [showCount, setShowCount] = useState(!isInCart(product.id));
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (quantity) => {
    addItem(product, quantity);
    setShowCount(false);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%'
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '400px', 
            height: '400px', 
            objectFit: 'cover', 
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>{product.name}</h1>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', margin: '10px 0' }}>
            ${product.price}
          </p>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '15px 0' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '14px', color: '#888' }}>
            Categoría: {product.category}
          </p>
        </div>
        
        {showCount ? (
          <ItemCount 
            stock={product.stock || 10} 
            onAdd={handleAddToCart}
          />
        ) : (
          <div style={{
            padding: '15px 30px',
            backgroundColor: addedToCart ? '#d4edda' : '#e2e3e5',
            color: addedToCart ? '#155724' : '#6c757d',
            borderRadius: '8px',
            border: `1px solid ${addedToCart ? '#c3e6cb' : '#d6d8db'}`,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {addedToCart ? '¡Producto agregado al carrito!' : 'Producto ya en el carrito'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail; 