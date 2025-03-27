// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Assets Manager
        </Link>

        <div style={{
          display: mobileMenuOpen ? 'flex' : 'none',
          flexDirection: window.innerWidth < 769 ? 'column' : 'row',
          gap: '1.5rem'
        }}>
          <Link to="/" style={linkStyle} onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/add-asset" style={linkStyle} onClick={() => setMobileMenuOpen(false)}>
            Add Asset
          </Link>
          <Link to="/reports" style={linkStyle} onClick={() => setMobileMenuOpen(false)}>
            Reports
          </Link>
        </div>

        <button 
          style={{
            display: window.innerWidth < 769 ? 'block' : 'none',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s ease'
};

export default Navbar;