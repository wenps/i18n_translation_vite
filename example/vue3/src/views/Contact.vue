<template>
  <div class="contact">
    <section class="contact-hero">
      <h1>联系我们</h1>
      <p>随时为您提供帮助</p>
    </section>

    <div class="contact-content container">
      <div class="contact-info">
        <h2>联系方式</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="icon">📍</div>
            <h3>地址</h3>
            <p>北京市朝阳区科技园区88号</p>
          </div>
          <div class="info-item">
            <div class="icon">📞</div>
            <h3>电话</h3>
            <p>400-888-8888</p>
          </div>
          <div class="info-item">
            <div class="icon">✉️</div>
            <h3>邮箱</h3>
            <p>contact@futuretech.com</p>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <h2>发送消息</h2>
        <div class="form-group">
          <label for="name">姓名</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required
          >
        </div>
        <div class="form-group">
          <label for="email">邮箱</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            required
          >
        </div>
        <div class="form-group">
          <label for="message">消息</label>
          <textarea 
            id="message" 
            v-model="formData.message" 
            rows="5" 
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-btn">发送消息</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  // 这里添加表单提交逻辑
}
</script>

<style scoped>
.contact-hero {
  height: 40vh;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/logo.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 4rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.info-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.contact-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #0056b3;
}
</style> 
 <!-- element-tag-marker: 1ox0aq2b -->