<template>
    <div>
        <div class="ledeArt">
            <img v-if="data.image.location !== ''" :src="'/abandoned-in-america/' + data.image.location" :srcset="encodeURI('/abandoned-in-america/' + data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w, /abandoned-in-america/' + encodeURI(data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w, /abandoned-in-america/' + encodeURI(data.image.location.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" />
<!--
            <div class="scrim"></div>
-->
            <div class="cutline" v-if="data.image.cutline">{{data.image.cutline}}</div><div class="credit">{{data.image.credit}}</div>

            <hed :data="data" />


        </div>
<!--
        <div class="cutline hideOnMobile" v-if="data.image.cutline">{{data.image.cutline}}</div><div class="credit hideOnMobile">{{data.image.credit}}</div>
-->
    </div>
</template>

<script>
import Hed from '~/components/Hed.vue';

export default {
    components: {
        Hed
    },
    props: ['data'],
    name: 'LedeArt'
};
</script>

<style scoped>
.ledeArt {
    /* max-height: 900px; */
    /* min-height: 900px; */
    overflow: hidden;
}

.cutline, .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(100,100,100);
    padding-top: 5px;
    padding-left: 20px;
}

.credit {
    font-size: 14px;
    line-height: 16px;
    color: rgb(120,120,120);
}

.cutline .credit {
    padding-left: 0;
}
.ledeArt {
    position: relative;
}
/*
.hed {
    position: absolute;
    bottom: 20px;
    left: 20px;
}*/
img {
    width: 100%;
    height: auto;
    /* opacity: 0.7; */
}
.scrim {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;

    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0+2,0.85+100 */
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 2%, rgba(0,0,0,0.85) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 2%,rgba(0,0,0,0.85) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 2%,rgba(0,0,0,0.85) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#d9000000',GradientType=0 ); /* IE6-9 */

}
.hideOnDesktop {
    display: none;
}
@media (max-width: 650px) {
    /*
    .hed {
        position: relative;
        bottom: 0;
        left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }*/
    .scrim {
        display: none;
    }
    .credit, .cutline {
        padding-left: 10px;
    }
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: block;
    }
}
</style>