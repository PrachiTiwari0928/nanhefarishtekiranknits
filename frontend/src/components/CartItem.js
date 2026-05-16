import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="card">
      <img src={item.image} alt={item.name} style={{ width: '100px' }} />
      <h4>{item.name}</h4>
      <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;