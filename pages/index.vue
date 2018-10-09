<template>
    <section>
        <div v-if="doc">
            <projectNav :data="doc" />

            <ledeArt :data="doc" />

            <social :data="doc" />

            <byline :data="doc" />

            <sections :data="doc" />

            <parts :data="doc" />

            <subscribe />

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
import Subscribe from '~/components/Subscribe.vue';

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
        Parts,
        Subscribe
    },
    async asyncData ({ app, params }) {
        let data = await app.$axios.$get('/docs/index.json');

        return {
            doc: data
        };
    },
    head () {
        return {
            title: this.doc.hed + ' | Center for Public Integrity',
            meta: [
                {
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    property: 'og:type',
                    content: 'article'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.doc.description
                },
                {
                    name: 'twitter:image',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
                },
                {
                    property: 'og:image',
                    content: `https://apps.publicintegrity.org/${this.doc.slug}/${encodeURI(this.doc.featured.location.replace('img', 'resized').replace(/\.(jpg|png)$/, '-1440.$1'))}`
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
                    content: this.doc.hed 
                },
                {
                    name: 'title',
                    content: this.doc.hed
                },
                {
                    property: 'og:description',
                    content: this.doc.description
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
</style>
