<!--
 * @Date: 2025-01-22 11:03:34
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-22 11:03:37
 * @FilePath: /element-tag-marker/example/vue2/src/views/Contact.vue
-->
<template>
    <div   class="contact">
        <h1>联系我们</h1>
        <div   class="contact-content">
            <div   class="contact-info">
                <h3>联系方式</h3>
                <p>电话：123-456-7890</p>
                <p>邮箱：contact@example.com</p>
                <p>地址：某某市某某区某某街道123号</p>
            </div>
            <div   class="contact-form">
                <h3>留言表单</h3>
                <a-form :model="form">
                    <a-form-item label="姓名">
                        <a-input v-model="form.name" />
                    </a-form-item>
                    <a-form-item label="邮箱">
                        <a-input v-model="form.email" />
                    </a-form-item>
                    <a-form-item label="留言">
                        <a-textarea v-model="form.message" :rows="4" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="submitForm">提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    methods: {
        submitForm() {
            console.log('提交表单:', this.form)
            // 这里添加表单提交逻辑
        }
    }
}
</script>

<style scoped>
.contact {
    padding: 20px;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 20px;
}

.contact-info, .contact-form {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
    }
}
</style> 
 <!-- element-tag-marker: iw6m4f2b -->