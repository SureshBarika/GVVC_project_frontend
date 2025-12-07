import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 8 };
      if (search) params.search = search;
      if (category) params.category = category;
      const res = await api.get('/api/products', { params });
      setProducts(res.data.products);
      setMeta(res.data.meta || {});
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  function onSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function onFilterCategory(e) {
    setCategory(e.target.value);
    setPage(1);
  }

  function applySearch() {
    fetchProducts();
  }

  return (
    <div className="product-list-page">
      <div className="controls">
        <div className="search">
          <input
            value={search}
            onChange={onSearch}
            placeholder="Search products..."
            aria-label="Search products"
          />
          <button onClick={applySearch}>Search</button>
        </div>

        <div className="filters">
          <select value={category} onChange={onFilterCategory} aria-label="Filter by category">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationery">Stationery</option>
            <option value="Home">Home</option>
            <option value="Bags">Bags</option>
            <option value="Books">Books</option>
          </select>
        </div>
      </div>

      {loading && <div className="status">Loading...</div>}
      {error && <div className="status error">{error}</div>}
      {!loading && products.length === 0 && <div className="status">No products found.</div>}

      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
        <span>Page {meta.page || 1} / {meta.pages || 1}</span>
        <button disabled={meta.page >= meta.pages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductList;
