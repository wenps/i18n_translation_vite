/*
 * @Date: 2025-01-23 14:05:26
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 14:05:26
 * @FilePath: /element-tag-marker/example/webpack-react/src/pages/ProductList.tsx
 */
import React from 'react';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: '企业级智能分析平台',
      description: '面向大型企业的智能数据分析解决方案',
      image: '../assets/logo.png'
    },
    {
      id: 2,
      name: '中小企业云服务',
      description: '适合中小企业的云计算服务包',
      image: '../assets/logo.png'
    }
  ];

  return (
    <div className="product-list-page">
      <h1>产品列表</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => console.log(`查看详情: ${product.id}`)}>
              查看详情
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 
 // element-tag-marker: xg2xyy2o