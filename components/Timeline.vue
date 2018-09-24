<template>
    <div class="timeline">
        <!--
        <div v-for="item in data.items" class="item">
            <strong>{{item.year}}</strong><br>
            {{item.text}}
        </div>
        -->
        <iframe :src="'https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=' + data.key + '&font=Default&lang=en&initial_zoom=2&height=500'" width='100%' height='500' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Timeline'
};
</script>

<style scoped>
/*
.item {
    padding-bottom: 20px;
}
.timeline {
    border: 1px solid rgb(200,200,200);
    padding: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 140%;
}*/
</style>