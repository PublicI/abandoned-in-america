<template>
    <div class="extenderContainer">

        <div><a :name="data.slug.replace(/ /g,'-').toLowerCase()" :id="data.slug.replace(/ /g,'-').toLowerCase()"></a></div>

        <icon :data="data" />

        <div class="credit">{{data.credit}}/The Noun Project</div>

        <div :class="'extender centralColumn ' + data.type">

            <social :data="data" />

            <h1 v-if="data.hed">{{data.hed}}</h1>


            <div v-html="'<p>' + data.text.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'" v-if="data.text">
            </div>

        </div>

        <byline :data="data" />
    </div>
</template>

<script>
import Byline from '~/components/Byline.vue';
import Social from '~/components/Social.vue';
import Icon from '~/components/Icon.vue';

export default {
    props: ['data'],
    name: 'Extender',
    components: {
        Byline,
        Social,
        Icon
    }
};
</script>

<style>
/*
.extender {
    border: 1px solid red;
}*/
.extender h1 {
    margin-bottom: 10px;
    margin-top: 30px;
}
.extender p {
    font-family: "ff-tisa-web-pro","Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 29px;
    font-size: 19px;
}
.extender h3 {
    color: black;
}
.extenderContainer .cutline, .extenderContainer .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(100,100,100);
    padding-top: 5px;
    padding-left: 20px;
}

.extenderContainer .credit {
    font-size: 14px;
    line-height: 16px;
    color: rgb(120,120,120);
}
/*
.iconContainer {
    background-color: orange;
    padding: 5%;
}
.iconContainer img {
    max-height: 800px;
    width: auto;
    margin-left: auto;
    margin-right: auto;
}
*/

@media (max-width: 650px) {
    .extenderContainer .credit, .extenderContainer .cutline {
        padding-left: 10px;
    }
}
</style>