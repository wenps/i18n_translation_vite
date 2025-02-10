import React from 'react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <section className="contact" id="contact">
      <h2>联系我们</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>联系方式</h3>
          <p>电话：400-888-8888</p>
          <p>邮箱：contact@techcorp.com</p>
          <p>地址：北京市朝阳区科技园区88号</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="您的姓名" required />
          <input type="email" placeholder="您的邮箱" required />
          <textarea placeholder="请输入您的留言" required></textarea>
          <button type="submit" className="submit-button">发送消息</button>
        </form>
      </div>
    </section>
  );
};

export default Contact; 
 // element-tag-marker: bk9um32p