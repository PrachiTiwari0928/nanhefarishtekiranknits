import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Wool-themed icon

const Header = () => {
  const { cart } = useCart();
  return (
    <header style={{ backgroundColor: 'var(--baby-blue)', padding: '10px', borderRadius: 'var(--border-radius)' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/products">Products</Link> | <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link>
        <Link to="/cart" style={{ float: 'right' }}>
          <FaShoppingCart /> Cart ({cart.length})
        </Link>
      </nav>
    </header>
  );
};

export default Header;