<template>
    <section>
        <div v-if="doc">
            <projectNav :data="doc" />

<!--
            <logo />
-->

            <ledeArt :data="doc" />

            <!--

            <div class="indexHead">

                <img :src="doc.image" class="stickyImage" />

                <div style="z-index:500;position:relative">

                    <h1>
                        <span class="hedArticle" style="position:relative;left:70px;top:40px">The</span><br>
                        <span style="background-color:#FFB957;box-shadow: 5px 0 0 #FFB957, -5px 0 0 #FFB957;">United States</span><br>
                        <span class="hedArticle" style="font-size:50px;position:relative;top:-45px;left:5px">of&nbsp;</span><span style="background-color:#FFB957;box-shadow: 5px 0 0 #FFB957, -5px 0 0 #FFB957;">Petroleum</span></span>
                    </h1>

                    <h2>{{doc.subhed}}</h2>

                </div>


            </div>
            -->

            <!--

            <social :data="doc" />

            <byline :data="doc" />
            
            -->

            <a name="intro" />

            <!--
            <div class="centralColumn">
                <h2>{{doc.subhed}}</h2>
            </div>
            -->

            <byline :data="doc" />


            <sections :data="doc" />

            <parts :data="doc" />

        </div>
    </section>
</template>

<script>
import Hed from '~/components/Hed.vue';
import Logo from '~/components/Logo.vue';
import Sections from '~/components/Sections.vue';
import Byline from '~/components/Byline.vue';
import Social from '~/components/Social.vue';
import Nav from '~/components/Nav.vue';
import Parts from '~/components/Parts.vue';
import LedeArt from '~/components/LedeArt.vue';

export default {
    name: 'index',
    components: {
        Hed,
        Logo,
        Sections,
        Byline,
        Social,
        projectNav: Nav,
        ledeArt: LedeArt,
        Parts
    },
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get('/api/docs/index.json');

        return {
            doc: data
        };
    },
    head () {
        return {
            title: 'Congress snuck dozens of tax breaks into the budget deal | Center for Public Integrity',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Budget bill packed with special breaks for Washington insiders.'
                },
                {
                    name: 'twitter:image',
                    content: 'https://apps.publicintegrity.org/tax-breaks-the-favored-few/img/tax-extenders.gif'
                },
                {
                    property: 'og:image',
                    content: 'https://apps.publicintegrity.org/tax-breaks-the-favored-few/img/tax-extenders.gif'
                },
                {
                    property: 'article:modified_time',
                    content: this.doc.published
                },
                {
                    property: 'article:published_time',
                    content: this.doc.published
                },
                {
                    property: 'og:title',
                    content: 'Congress snuck dozens of tax breaks into the budget deal. Here\'s where they went.'
                },
                {
                    name: 'title',
                    content: 'Congress snuck dozens of tax breaks into the budget deal. Here\'s where they went.'
                },
                {
                    property: 'og:description',
                    content: 'Budget bill packed with special breaks for Washington insiders.'
                },
                {
                    property: 'og:url',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/`
                }]
        };
    },
    /*
    mounted () {
        if (typeof window !== 'undefined') {
            const ScrollMagic = require('scrollmagic');

            let controller = new ScrollMagic.Controller();

            new ScrollMagic.Scene({
                duration: 200,
                offset: 0
            })
            .setPin('.stickyImage')
            .addTo(controller);

            new ScrollMagic.Scene({
                duration: 1000,
                offset: 100
            })
            .setClassToggle('.stickyImage', 'unblur')
            .addTo(controller);
        }
    } */
};
</script>

<style>
.vue-back-to-top .default {
    background-color: #E74C3C !important;
}
.iconButtons {
    padding: 6%;
    background-color: #E74C3C;
}
.iconButtonsContainer:after {
    content: "";
    display: table;
    clear: both;
}
.iconButtonContainer {
    position: relative;
    float: left;
    line-height: 21px;
}
.iconButton {
    display: inline-block;
    width: 150px;
    height: 140px;
    background-color: #E74C3C;
    text-align: center;
}
.iconButton .iconContainer {
    height: 70px;
}
.iconLink {
    position: absolute;
    top: 0px;
    left: 0;
    width: 150px;
    height: 150px;
    z-index: 200;
}
.iconButton a {
    color: white;
    font-size: 16px;
    line-height: 21px;
    position: relative;
    top: 10px;
    padding-left: 2px;
    padding-right: 2px;
}
.iconButtonContainer:hover a {
    text-decoration: underline;
}
.iconButtons h4 {
    padding-left: 30px;
}


.introLink a {
    color: white;
}
.introLink {
    color: white;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 20px;
    font-size: 30px;
    line-height: 40px;
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
.indexHead {
    background-color: black;
    height: 130vh;
    padding-left: 70px;
    margin-bottom: 20px;
    /* padding-top: 30px; */
    position:relative;
    overflow:hidden;
    /* background-image: url("http://api.thumbr.it/whitenoise-361x370.png?background=f95112ff&noise=626262&density=92&opacity=8"); */
}
.iconButtons h1 {
    /* font-family: "cortado",sans-serif; */
    font-family: "adonis-web",serif;
    /* padding-left: 40px;
    padding-top: 40px; */
    font-size: 90px;
    line-height: 95px;
    color: white;
    /* color: #303030; */
    /*color: #252221; */
    color: white;
    /* text-shadow: 2px 2px 2px black; */
    padding-left: 30px;
    padding-top: 8px;
}
h3 {
    color: white;
    text-shadow: 2px 2px 2px black;
}
.hedArticle {
    position: relative;
    top: 10px;
    font-size:35px;
    line-height:40px;
    font-style: italic;
}
/*
h2 {
    font-family: "almaq-refined",sans-serif;
    text-transform: uppercase;
    font-size: 32px;
    line-height: 37px;
    color: white;
    max-width: 750px;
    color: #252221;
    color: white;
    padding-top: 10px;
    text-shadow: 2px 2px 2px black;
}*/
h2 {
    color: black;
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 34px;
}
.stickyImage {
    /* 
    -webkit-transition: filter 1s;
    transition: filter 1s;
    filter:blur(1px); */
    width:100%;
    left:0;
    top:0;
    height:auto;
    position:absolute;
    z-index:200;
}

@media (max-width: 900px) {
    .iconButtons h1 {
        font-size: 50px;
        line-height: 60px;
    }

    .stickyImage {
        width: 300%;
    }
    .part {
        width: 98%;
        float: none;
    }
    .part .image {
        width: 100%;
        height: auto;
    }
}

@media (max-width: 513px) {
    .iconButton {
        width: 140px;
        height: 145px;
    }
}

@media (max-width: 320px) {
    .iconButtons h4 {
        padding-left: 0;
        padding-top: 10px;
    }
    .iconButtons h1 {
        font-size: 40px;
        line-height: 50px;
        padding-left: 0;
    }
    .iconButton {
        width: 120px;
        height: 140px;
    }
    .iconButton .iconContainer {
        height: 50px;
    }
}
</style>
