<template>
    <div>
        <div v-for="section in data.sections">
            <extender :data="section" v-if="section.type === 'extender'" />

            <copy :data="section" v-if="section.type === 'text' || section.type === 'lede'" />

            <photo :data="section" v-if="section.type === 'image'" />

            <snippet :data="section" v-if="section.type === 'snippet'" />

            <timeline :data="section" v-if="section.type === 'timeline'" />

            <refer :data="section" v-if="section.type === 'refer'" />

            <quote :data="section" v-if="section.type === 'quote'" />
        </div>
    </div>
</template>

<script>
import Extender from '~/components/Extender.vue';
import Copy from '~/components/Copy.vue';
import Photo from '~/components/Photo.vue';
import Timeline from '~/components/Timeline.vue';
import Refer from '~/components/Refer.vue';
import Quote from '~/components/Quote.vue';
import Snippet from '~/components/Snippet.vue';

export default {
    components: {
        Extender,
        Copy,
        Photo,
        Timeline,
        Refer,
        Quote,
        Snippet
    },
    props: ['data'],
    name: 'Sections'
};
</script>

<style scoped>

</style>