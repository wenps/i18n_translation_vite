/*
 * @Date: 2025-01-23 13:44:27
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 14:05:26
 * @FilePath: /element-tag-marker/example/webpack-react/src/App.tsx
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 
 // element-tag-marker: x6f1c72a