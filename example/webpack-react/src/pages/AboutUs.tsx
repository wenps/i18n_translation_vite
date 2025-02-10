/*
 * @Date: 2025-01-23 14:05:26
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-23 14:05:26
 * @FilePath: /element-tag-marker/example/webpack-react/src/pages/AboutUs.tsx
 */
import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-page">
      <h1>关于我们</h1>
      <div className="about-content">
        <section className="company-intro">
          <h2>公司简介</h2>
          <p>我们是一家专注于技术创新的科技公司，致力于为客户提供最优质的解决方案。</p>
        </section>
        
        <section className="company-culture">
          <h2>企业文化</h2>
          <ul>
            <li>创新驱动发展</li>
            <li>客户至上</li>
            <li>团队协作</li>
            <li>持续学习</li>
          </ul>
        </section>

        <section className="company-history">
          <h2>发展历程</h2>
          <div className="timeline">
            <div className="timeline-item">
              <h3>2020</h3>
              <p>公司成立</p>
            </div>
            <div className="timeline-item">
              <h3>2021</h3>
              <p>获得A轮融资</p>
            </div>
            <div className="timeline-item">
              <h3>2022</h3>
              <p>产品线扩展</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs; 
 // element-tag-marker: dgnyy02k