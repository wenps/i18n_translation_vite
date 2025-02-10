<template>
  <div class="about">
    <section class="about-hero">
      <h1>关于我们</h1>
      <p>用科技创新引领未来</p>
    </section>

    <section class="company-intro container">
      <h2>公司简介</h2>
      <div class="intro-content">
        <div class="intro-text">
          <p>FutureTech是一家专注于前沿科技的创新型企业，致力于为客户提供领先的技术解决方案。我们在人工智能、云计算、区块链等领域拥有深厚的技术积累和丰富的实践经验。</p>
          <p>自成立以来，我们始终坚持"创新驱动发展"的理念，通过持续的技术创新和优质的服务，帮助客户实现数字化转型。</p>
        </div>
        <div class="stats">
          <div class="stat-item">
            <h3>200+</h3>
            <p>企业客户</p>
          </div>
          <div class="stat-item">
            <h3>50+</h3>
            <p>技术专利</p>
          </div>
          <div class="stat-item">
            <h3>5年+</h3>
            <p>行业经验</p>
          </div>
        </div>
      </div>
    </section>

    <section class="team container">
      <h2>核心团队</h2>
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.id" class="team-card">
          <img :src="member.avatar" :alt="member.name">
          <h3>{{ member.name }}</h3>
          <p class="position">{{ member.position }}</p>
          <p class="description">{{ member.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const teamMembers = ref([
  {
    id: 1,
    name: '张三',
    position: '首席执行官',
    description: '拥有15年技术管理经验，曾任多家知名科技公司高管',
  },
  {
    id: 2,
    name: '李四',
    position: '技术总监',
    description: '人工智能专家，发表多篇学术论文，拥有多项技术专利',
  },
  {
    id: 3,
    name: '王五',
    position: '产品总监',
    description: '10年产品经验，专注于企业级软件产品设计与开发',
  }
])
</script>

<style scoped>
.about-hero {
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

.company-intro {
  padding: 4rem 0;
}

.intro-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-item h3 {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.team {
  padding: 4rem 0;
  background: #f8f9fa;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.team-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.team-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.team-card h3, .team-card p {
  padding: 0.5rem 1rem;
  margin: 0;
}

.position {
  color: var(--primary-color);
  font-weight: bold;
}

.description {
  font-size: 0.9rem;
  color: #666;
  padding-bottom: 1rem;
}
</style> 
 <!-- element-tag-marker: bwd5g129 -->