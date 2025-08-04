import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import Navigation from './components/layout/Navigation';
import PrivateRoute from './components/routing/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <header className="header">
            <h1>E-Commerce Store</h1>
            <Navigation />
          </header>
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/" element={
              <div className="main-content">
                <div className="product-section">
                  <ProductList products={products} addToCart={addToCart} />
                </div>
                
                <div className="cart-section">
                  <Cart cartItems={cart} />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
