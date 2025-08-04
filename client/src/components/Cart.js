import React from 'react';
import '../App.css';

function Cart({ cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const itemCount = cartItems.length;
  
  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="item-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <p className="cart-message">Add some products to your cart!</p>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.title}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;