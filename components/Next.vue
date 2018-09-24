<template>
    <div>
        <div class="nextChapter"><nuxt-link :to="(data.slug ? { name: 'slug', params: { slug: data.slug } } : { name: 'index' })">Next:</nuxt-link></div>
        <div class="next">
            <nuxt-link :to="(data.slug ? { name: 'slug', params: { slug: data.slug } } : { name: 'index' })">
                <div class="text">
                    <h2>{{data.name}}</h2>
                    <h1>{{data.hed}}</h1>
                </div>


                <img class="image" :src="data.image" :srcset="encodeURI(data.image.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w, ' + encodeURI(data.image.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w, ' + encodeURI(data.image.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" />
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Next'
};
</script>

<style scoped>
h1 {
    font-family: adonis-web,serif;
    font-size: 60px;
    line-height: 60px;
    text-shadow: 2px 2px 2px black;
    max-width: 1300px;
    color: white;
}
h2 {
    font-family: almaq-refined,sans-serif;
    text-transform: uppercase;
    text-shadow: 2px 2px 2px black;
    /* color: #323232; */
    max-width: 1300px;
    color: white;
}
h3 {
    color: white;
    text-shadow: 2px 2px 2px black;
}
.nextChapter {
    font-size: 17px;
    padding-left: 20px;
    color: rgb(100,100,100);
    /* text-align: center; */
}
.next .image {
    width: 100%;
    height: auto;
    cursor: pointer;
}
.next {
    position: relative;
    cursor: pointer;
    margin-bottom: 20px;
    float: left;
    padding: 20px;
    height: 250px;
    width: 100%;
    overflow: hidden;
    padding-top: 5px;
}
.next .text {
    position: absolute;
    bottom: 30px;
    left: 30px;
}
.next:hover .text h2, .next:hover .text h1 {
    text-decoration: underline;
    text-decoration-color:#FFB957;
}
@media (max-width: 650px) {
    h1 {
        font-size: 30px;
        line-height: 30px;
    }
    .next {
        height: 200px;
        padding: 0;
    }
    .nextChapter {
        padding-left: 10px;
    }
}
</style>