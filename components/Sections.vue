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

            <yazoo :data="section" v-if="section.type === 'yazoo_locator'" :class="section.align" />

            <robeson :data="section" v-if="section.type === 'robeson_locator'" :class="section.align" />

            <stlouis :data="section" v-if="section.type === 'st_louis_locator'" :class="section.align" />

            <standingrock :data="section" v-if="section.type === 'standing_rock_locator'" :class="section.align" />

            <fresno :data="section" v-if="section.type === 'fresno_locator'" :class="section.align" />

            <westfresno :data="section" v-if="section.type === 'west_fresno_locator'" :class="section.align" />

            <presidio :data="section" v-if="section.type === 'presidio_locator'" :class="section.align" />
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
import Yazoo from '~/components/YazooLocator.vue';
import Robeson from '~/components/RobesonLocator.vue';
import StLouis from '~/components/StLouisLocator.vue';
import StandingRock from '~/components/StandingRockLocator.vue';
import Fresno from '~/components/FresnoLocator.vue';
import WestFresno from '~/components/WestFresnoLocator.vue';
import Presidio from '~/components/PresidioLocator.vue';

export default {
    components: {
        Extender,
        Copy,
        Photo,
        Timeline,
        Refer,
        Quote,
        Snippet,
        Yazoo,
        Robeson,
        stlouis: StLouis,
        standingrock: StandingRock,
        fresno: Fresno,
        westfresno: WestFresno,
        Presidio
    },
    props: ['data'],
    name: 'Sections'
};
</script>

<style scoped>
.left {
    width: 15%;
    float: left;
    clear: left;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

.right {
    width: 15%;
    float: right;
    clear: right;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}
@media (max-width: 650px) {
    .left {
        width: 100%;
        float: none;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .right {
        width: 100%;
        float: none;
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
}
</style>