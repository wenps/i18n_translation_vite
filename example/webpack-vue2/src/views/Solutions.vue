<!--
 * @Date: 2025-01-22 11:03:24
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-01-22 11:03:29
 * @FilePath: /element-tag-marker/example/vue2/src/views/Solutions.vue
-->
<template>
    <div   class="solutions">
        <h1>解决方案</h1>
        <div   class="solutions-content">
            <div   class="solution-card" v-for="(solution, index) in solutions" :key="index">
                <h3>{{ solution.name }}</h3>
                <p>{{ solution.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Solutions',
    data() {
        return {
            solutions: [
                {
                    name: '解决方案一',
                    description: '解决方案一的详细描述'
                },
                {
                    name: '解决方案二',
                    description: '解决方案二的详细描述'
                }
            ]
        }
    }
}
</script>

<style scoped>
.solutions {
    padding: 20px;
}

.solutions-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.solution-card {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 
 <!-- element-tag-marker: rb56l72l -->