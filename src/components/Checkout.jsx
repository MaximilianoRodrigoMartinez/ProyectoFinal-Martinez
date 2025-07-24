import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';

const Checkout = () => {
  const { cart, getTotalPrice, clear } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 5) {
      newErrors.name = 'El nombre debe tener al menos 5 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'La dirección debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Mostrar loading con SweetAlert
        Swal.fire({
          title: 'Procesando orden...',
          text: 'Por favor espera mientras procesamos tu compra',
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newOrderId = `ORD-${Date.now()}`;
        
        // Mostrar éxito con SweetAlert
        const result = await Swal.fire({
          icon: 'success',
          title: '¡Compra exitosa!',
          text: 'Tu orden ha sido procesada correctamente',
          html: `
            <div style="text-align: center;">
              <p style="margin-bottom: 15px; color: #155724;">Tu orden ha sido procesada correctamente</p>
              <div style="background-color: #f8f9fa; border: 2px solid #007bff; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
                <p style="color: #007bff; font-weight: bold; margin: 0 0 10px 0;">Número de orden:</p>
                <p style="color: #007bff; font-weight: bold; font-size: 20px; margin: 0; font-family: monospace; background-color: white; padding: 10px; border-radius: 4px; border: 1px solid #dee2e6; cursor: pointer;" onclick="navigator.clipboard.writeText('${newOrderId}'); this.style.backgroundColor='#e8f5e8'; this.textContent='¡Copiado!'">
                  ${newOrderId}
                </p>
              </div>
              <p style="color: #666; font-size: 14px;">Recibirás un email con los detalles de tu compra</p>
            </div>
          `,
          confirmButtonText: 'Volver al Inicio',
          confirmButtonColor: '#007bff',
          allowOutsideClick: false
        });
        
        if (result.isConfirmed) {
          clear();
          window.location.href = '/';
        }
        
      } catch (error) {
        console.error('Error al procesar la orden:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al procesar tu orden. Por favor intenta nuevamente.',
          confirmButtonColor: '#dc3545'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
        <h2 style={{ marginBottom: '20px', color: '#666' }}>No hay productos en el carrito</h2>
        <p style={{ color: '#888' }}>
          Agrega productos al carrito para continuar con la compra
        </p>
      </div>
    );
  }



  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Finalizar Compra</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Resumen de la compra</h3>
        {cart.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid #eee'
          }}>
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '15px 0',
          borderTop: '2px solid #ddd',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          <span>Total:</span>
          <span>${getTotalPrice()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.name ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p style={{ color: '#dc3545', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.email ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p style={{ color: '#dc3545', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Teléfono *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.phone ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p style={{ color: '#dc3545', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.phone}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Dirección de envío *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            style={{
              width: '100%',
              padding: '10px',
              border: errors.address ? '1px solid #dc3545' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
            disabled={isSubmitting}
          />
          {errors.address && (
            <p style={{ color: '#dc3545', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.address}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isSubmitting ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '18px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Procesando orden...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  );
};

export default Checkout; 