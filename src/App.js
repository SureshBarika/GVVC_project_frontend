import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">Product Showcase</Link>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="container">&copy; {new Date().getFullYear()} Product Showcase</div>
      </footer>
    </div>
  );
}

export default App;
