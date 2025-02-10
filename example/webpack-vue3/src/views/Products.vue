<template>
  <div class="products">
    <h1>产品服务</h1>
    <div class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <button @click="viewDetails(product.id)">了解更多</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: '智能分析平台',
    description: '企业级数据分析和决策支持系统',
    image: '../assets/product1.jpg'
  },
  {
    id: 2,
    name: '云服务平台',
    description: '高性能云计算解决方案',
    image: '../assets/product2.jpg'
  },
  {
    id: 3,
    name: '区块链服务',
    description: '安全可靠的区块链应用平台',
    image: '../assets/product3.jpg'
  }
])

const viewDetails = (id: number) => {
  console.log(`查看产品详情: ${id}`)
}
</script>

<style scoped>
.products {
  padding: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card h3, .product-card p {
  padding: 1rem;
  margin: 0;
}

button {
  width: 100%;
  padding: 1rem;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style> 
 <!-- element-tag-marker: pecmr22k -->