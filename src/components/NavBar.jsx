import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import CartWidget from './CartWidget';
import { getCategories } from '../data/products';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#007bff' : '#333',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'all 0.3s',
    fontWeight: isActive ? 'bold' : 'normal',
    backgroundColor: isActive ? '#e3f2fd' : 'transparent'
  });

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 20px', 
      background: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ margin: 0, color: '#007bff' }}>Adashi</h2>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <NavLink 
          to="/" 
          style={navLinkStyle}
        >
          Inicio
        </NavLink>
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <span style={{ 
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
            backgroundColor: isDropdownOpen ? '#e9ecef' : 'transparent',
            color: location.pathname.includes('/category/') ? '#007bff' : '#333',
            fontWeight: location.pathname.includes('/category/') ? 'bold' : 'normal'
          }}>
            Categorías
          </span>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: isDropdownOpen ? 'flex' : 'none',
            flexDirection: 'column',
            minWidth: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000
          }}>
            {loading ? (
              <div style={{ padding: '10px 15px', color: '#666' }}>
                Cargando categorías...
              </div>
            ) : (
              categories.map((category, index) => (
                <NavLink 
                  key={category.slug || index}
                  to={`/category/${category.slug}`}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#007bff' : '#333',
                    padding: '10px 15px',
                    borderBottom: index < categories.length - 1 ? '1px solid #eee' : 'none',
                    transition: 'background-color 0.2s',
                    fontWeight: isActive ? 'bold' : 'normal',
                    backgroundColor: isActive ? '#e3f2fd' : 'transparent'
                  })}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => {
                    const isActive = location.pathname === `/category/${category.slug || category}`;
                    e.target.style.backgroundColor = isActive ? '#e3f2fd' : 'transparent';
                  }}
                >
                  {category.name || category}
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>
      <CartWidget />
    </nav>
  );
};

export default NavBar;