<template>
    <div>
        <h1>HELLO</h1>
        <!-- <div class="aside" v-html="data.text"></div> -->
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Aside'
};
</script>

<style>
/*
.aside {
    font-size: 16px;
    width: 250px;
    float: right;
    padding-bottom: 10px;
    margin-right: 80px;
    margin-left: 10px;
    line-height: 132%;
    color: rgb(100,100,100);
}
.aside a, .aside a:visited {
    color: #E74C3C !important;
}
@media (max-width: 650px) {
    .aside {
        width: 100%;
        float: none;
        margin-right: 0;
        margin-left: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
}*/
</style>