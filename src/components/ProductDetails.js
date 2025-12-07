import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import EnquiryForm from './EnquiryForm';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEnquire, setOpenEnquire] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true); setError(null);
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        setError('Product not found');
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="product-details">
      <div className="detail-grid">
        <div className="left">
          <img src={product.image_url || '/images/placeholder.png'} alt={product.name} />
        </div>
        <div className="right">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="long-desc">{product.long_desc}</p>
          <div className="purchase">
            <div className="price">₹{product.price}</div>
            <button className="enquire-btn" onClick={() => setOpenEnquire(true)}>Enquire</button>
          </div>
        </div>
      </div>

      {openEnquire && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="close" onClick={() => setOpenEnquire(false)}>×</button>
            <h3>Enquire about {product.name}</h3>
            <EnquiryForm productId={product.id} onDone={() => setOpenEnquire(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
