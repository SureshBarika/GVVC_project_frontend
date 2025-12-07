import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="media">
        <img src={product.image_url || '/images/placeholder.png'} alt={product.name} />
      </div>
      <div className="body">
        <h3 className="title">{product.name}</h3>
        <p className="short-desc">{product.short_desc}</p>
        <div className="meta">
          <span className="price">₹{product.price}</span>
          <Link to={`/products/${product.id}`} className="btn">View</Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
