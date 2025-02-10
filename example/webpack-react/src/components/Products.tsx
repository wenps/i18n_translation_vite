/*
 * @Date: 2025-01-23 13:51:22
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 14:00:26
 * @FilePath: /element-tag-marker/example/webpack-react/src/components/Products.tsx
 */
import React from 'react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: '智能分析平台',
      description: '基于AI的数据分析和决策支持系统',
       image: '../assets/logo.png'
    },
    {
      id: 2,
      name: '云计算服务',
      description: '高性能、可扩展的云计算解决方案',
      image: '../assets/logo.png'
    },
    {
      id: 3,
      name: '物联网平台',
      description: '全方位的IoT设备管理和数据分析平台',
       image: '../assets/logo.png'
    }
  ];

  return (
    <section className="products" id="products">
      <h2>产品服务</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products; 
 // element-tag-marker: 6n0lkb2q