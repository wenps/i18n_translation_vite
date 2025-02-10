import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">TechCorp</div>
      <div className="nav-links">
        <Link to="/">首页</Link>
        <Link to="/products">产品</Link>
        <Link to="/about">关于</Link>
      </div>
    </nav>
  );
};

export default Navbar; 
 // element-tag-marker: m8xiwv2o