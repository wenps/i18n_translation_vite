<template>
  <div class="home">
    <section class="hero">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <button class="cta-button" @click="handleCTA">开始探索</button>
    </section>

    <section class="features">
      <h2>核心技术</h2>
      <div class="feature-grid">
        <div v-for="feature in features" :key="feature.id" class="feature-card">
          <div class="icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('未来科技，现在开始')
const subtitle = ref('用科技改变世界，创造美好未来')

const features = ref([
  {
    id: 1,
    icon: '🤖',
    title: '人工智能',
    description: '领先的AI技术应用与解决方案'
  },
  {
    id: 2,
    icon: '☁️',
    title: '云计算',
    description: '高性能云服务平台'
  },
  {
    id: 3,
    icon: '🔗',
    title: '区块链',
    description: '安全可靠的区块链技术'
  }
])

const handleCTA = () => {
  console.log('CTA clicked')
}
</script>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/logo.png');
  background-size: cover;
  color: white;
  padding: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.feature-card {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
</style> 
 <!-- element-tag-marker: 4vvhe52g -->