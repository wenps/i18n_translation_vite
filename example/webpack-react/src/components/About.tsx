import React from 'react';

const About = () => {
  return (
    <section className="about" id="about">
      <h2>关于我们</h2>
      <div className="about-content">
        <div className="about-text">
          <p>TechCorp是一家致力于推动技术创新的科技公司。我们专注于人工智能、云计算、物联网等前沿技术的研发与应用。</p>
          <p>自成立以来，我们始终坚持"创新驱动发展"的理念，为客户提供最前沿的技术解决方案。</p>
        </div>
        <div className="about-stats">
          <div className="stat-item">
            <h3>100+</h3>
            <p>技术专利</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>企业客户</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>合作伙伴</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
 // element-tag-marker: khixn22n