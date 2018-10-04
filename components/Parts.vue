<template>
    <div class="parts">
        <div class="part" v-for="part in data.parts" :style="'background-image:url(/abandoned-in-america/' + encodeURI(part.image.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1')) + ');background-size:cover'">
            <nuxt-link :to="part.slug">
                <div class="text">
                    <!-- <h2>{{part.name}}</h2> -->
                    <h1>{{part.hed}}</h1>
                </div>

            </nuxt-link>
        </div>
    </div>

</template>

<script>
export default {
    props: ['data'],
    name: 'Parts'
};
</script>

<style>
.parts {
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
}
.part .image {
    width: auto;
    height: 100%;
}
.part a .image {
    cursor: pointer;
}
.part {
    height: 230px;
    width: 30%;
    position: relative;
    margin-bottom: 20px;
    float: left;
    margin: 1%;
    overflow: hidden;
    border: 1px solid black;
}
.part .text {
    position: absolute;
    bottom: 0;
    left: 10px;
    padding: 20px;
}
.part .text h1 {
    font-size: 30px;
    line-height: 110%;
    color: black;
    padding: 4px;
    background-color: white;
}
.part .text h2 {
    font-size: 20px;
    line-height: 120%;
}
.part:hover a .text h2, .part:hover a .text h1 {
    text-decoration: underline;
    text-decoration-color:#E74C3C;
}

@media (max-width: 900px) {
    .part {
        width: 98%;
        float: none;
    }
    .part .image {
        width: 100%;
        height: auto;
    }
}
</style>

