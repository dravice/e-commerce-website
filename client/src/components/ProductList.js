import React from 'react';
import '../App.css';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      <h2>Products</h2>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available</p>
        </div>
      ) : (
        <div className="products">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image-placeholder">
                {product.image && <img src={product.image} alt={product.title} />}
              </div>
              <div className="product-details">
                <h3>{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
