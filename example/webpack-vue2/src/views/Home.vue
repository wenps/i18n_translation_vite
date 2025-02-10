<template>
    <div   class="content">
        <div   class="hero-section">
            <h1>欢迎来到我们的企业门户</h1>
            <p class="hero-text">为您提供专业的企业级解决方案</p>
            <div   class="hero-buttons">
                <a-button type="primary" size="large" @click="learnMore">了解更多</a-button>
                <a-button size="large" @click="contactUs">联系我们</a-button>
            </div>
        </div>

        <div   class="features-section">
            <h2>我们的优势</h2>
            <div   class="features-grid">
                <div   class="feature-card">
                    <a-icon type="solution" class="feature-icon"/>
                    <h3>专业服务</h3>
                    <p>提供全方位的企业服务解决方案，满足您的各种业务需求。我们的专业团队拥有丰富的行业经验，能够为您量身定制最适合的解决方案。</p>
                    <ul class="feature-list">
                        <li>企业管理咨询</li>
                        <li>流程优化方案</li>
                        <li>风险管理服务</li>
                    </ul>
                </div>
                <div   class="feature-card">
                    <a-icon type="bulb" class="feature-icon"/>
                    <h3>技术创新</h3>
                    <p>持续创新技术，为企业提供领先的技术支持。我们投入大量资源进行研发，确保为客户提供最前沿的技术解决方案。</p>
                    <ul class="feature-list">
                        <li>人工智能应用</li>
                        <li>云计算服务</li>
                        <li>区块链技术</li>
                    </ul>
                </div>
                <div   class="feature-card">
                    <a-icon type="team" class="feature-icon"/>
                    <h3>优质团队</h3>
                    <p>拥有经验丰富的专业团队，为您提供最佳服务体验。我们的团队成员均来自业内顶尖企业，具备深厚的专业背景。</p>
                    <ul class="feature-list">
                        <li>资深技术专家</li>
                        <li>行业领域顾问</li>
                        <li>专业客服团队</li>
                    </ul>
                </div>
            </div>
        </div>

        <div   class="statistics-section">
            <h2>公司数据</h2>
            <div   class="statistics-grid">
                <div   class="statistic-item">
                    <h3>1000+</h3>
                    <p>服务客户</p>
                </div>
                <div   class="statistic-item">
                    <h3>50+</h3>
                    <p>合作伙伴</p>
                </div>
                <div   class="statistic-item">
                    <h3>200+</h3>
                    <p>专业团队</p>
                </div>
                <div   class="statistic-item">
                    <h3>15年</h3>
                    <p>行业经验</p>
                </div>
            </div>
        </div>

        <div   class="about-section">
            <h2>关于我们</h2>
            <div   class="about-content">
                <div   class="about-text">
                    <p>我们是一家致力于为企业提供全方位解决方案的科技公司。通过持续创新和专业服务，我们帮助客户实现业务增长和数字化转型。</p>
                    <p>自成立以来，我们始终坚持"以客户为中心"的服务理念，不断提升服务质量和技术水平，为客户创造更大的价值。</p>
                    <div   class="company-values">
                        <div   class="value-item">
                            <h4>愿景</h4>
                            <p>成为全球领先的企业服务解决方案提供商</p>
                        </div>
                        <div   class="value-item">
                            <h4>使命</h4>
                            <p>用科技创新推动企业发展</p>
                        </div>
                        <div   class="value-item">
                            <h4>价值观</h4>
                            <p>诚信、创新、专业、共赢</p>
                        </div>
                    </div>
                </div>
                <div   class="about-image">
                    <img src="https://www.antdv.com/assets/logo.1ef800a8.svg" alt="公司简介"/>
                </div>
            </div>
        </div>

        <div   class="contact-section">
            <h2>联系我们</h2>
            <div   class="contact-container">
                <div   class="contact-info">
                    <h3>联系方式</h3>
                    <div   class="info-item">
                        <a-icon type="phone" />
                        <p><strong>服务热线：</strong> 400-888-8888</p>
                    </div>
                    <div   class="info-item">
                        <a-icon type="mail" />
                        <p><strong>商务邮箱：</strong> contact@company.com</p>
                    </div>
                    <div   class="info-item">
                        <a-icon type="environment" />
                        <p><strong>公司地址：</strong> 北京市朝阳区科技园区88号</p>
                    </div>
                    <div   class="info-item">
                        <a-icon type="clock-circle" />
                        <p><strong>工作时间：</strong> 周一至周五 9:00-18:00</p>
                    </div>
                </div>
                <div   class="contact-form">
                    <h3>在线咨询</h3>
                    <a-form :form="form" @submit="handleSubmit">
                        <a-form-item label="姓名">
                            <a-input v-model="formData.name" placeholder="请输入您的姓名"/>
                        </a-form-item>
                        <a-form-item label="电话">
                            <a-input v-model="formData.phone" placeholder="请输入您的联系电话"/>
                        </a-form-item>
                        <a-form-item label="邮箱">
                            <a-input v-model="formData.email" placeholder="请输入您的邮箱"/>
                        </a-form-item>
                        <a-form-item label="咨询内容">
                            <a-textarea v-model="formData.message" :rows="4" placeholder="请输入您想咨询的内容"/>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">提交</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const formData = ref({
    name: '',
    phone: '',
    email: '',
    message: ''
});

const learnMore = () => {
    // 实现了解更多功能
};

const contactUs = () => {
    // 实现联系我们功能
};

const handleSubmit = () => {
    // 实现表单提交功能
    console.log('提交的表单数据：', formData.value);
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 2rem;
}

.hero-section {
    text-align: center;
    padding: 6rem 0;
    background-color: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
}

.hero-buttons {
    margin-top: 2rem;
}

.hero-buttons .ant-btn {
    margin: 0 1rem;
}

.hero-text {
    font-size: 1.4rem;
    color: #666;
    margin-top: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.features-section {
    margin-bottom: 4rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.feature-card {
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 2.5rem;
    color: #1890ff;
    margin-bottom: 1rem;
}

.feature-list {
    margin-top: 1rem;
    padding-left: 1.5rem;
}

.feature-list li {
    margin-bottom: 0.5rem;
    color: #666;
}

.statistics-section {
    background-color: #1890ff;
    color: white;
    padding: 4rem 2rem;
    border-radius: 8px;
    margin-bottom: 4rem;
}

.statistics-section h2 {
    color: white;
    text-align: center;
}

.statistics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    text-align: center;
}

.statistic-item h3 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
}

.about-section, .contact-section {
    margin-bottom: 4rem;
}

.about-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
}

.company-values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
}

.value-item {
    text-align: center;
    padding: 1.5rem;
    background-color: #f5f7fa;
    border-radius: 8px;
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
}

.contact-info {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.info-item .anticon {
    margin-right: 1rem;
    color: #1890ff;
}

.contact-form {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

h1, h2, h3, h4 {
    color: #2c3e50;
}

h2 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
}

p {
    line-height: 1.6;
    color: #666;
}

@media (max-width: 768px) {
    .about-content,
    .contact-container {
        grid-template-columns: 1fr;
    }
    
    .statistics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

 <!-- element-tag-marker: bna06m2g -->