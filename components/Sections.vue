<template>
    <div>
        <div v-for="section in data.sections">
            <copy :data="section" v-if="section.type === 'text' || section.type === 'lede'" />

            <photo :base="'/' + data.series.slug + '/'" :data="section" v-if="section.type === 'image'" />

            <snippet :data="section" v-if="section.type === 'snippet'" />

            <subscribe v-if="section.type === 'subscribe'" />

            <refer :data="section" v-if="section.type === 'refer'" />

            <side :data="section" v-if="section.type === 'side'" />

            <quote :data="section" v-if="section.type === 'quote'" />

            <yazoo :data="section" v-if="section.type === 'yazoo_locator'" :class="'locator-' + section.align" />

            <robeson :data="section" v-if="section.type === 'robeson_locator'" :class="'locator-' + section.align" />

            <stlouis :data="section" v-if="section.type === 'st_louis_locator'" :class="'locator-' + section.align" />

            <standingrock :data="section" v-if="section.type === 'standing_rock_locator'" :class="'locator-' + section.align" />

            <fresno :data="section" v-if="section.type === 'fresno_locator'" :class="'locator-' + section.align" />

            <presidio :data="section" v-if="section.type === 'presidio_locator'" :class="'locator-' + section.align" />

            <div v-if="section.type === 'st_louis_hud'" :class="section.align"> 
                <stlouishud :data="section" />
            </div>

            <div v-if="section.type === 'presidio_hospitals'" :class="section.align"> 
                <presidiohospitals :data="section" />
            </div>

            <div v-if="section.type === 'fresno_thematic'" :class="section.align"> 
                <fresnothematic :data="section" />
            </div>

            <stormTracks :data="section" v-if="section.type === 'storm_tracks'" />

            <loopingVideo :data="section" v-if="section.type === 'video'" />

            <soundcloud :data="section" v-if="section.type === 'soundcloud'" />

            <slideshow :data="section" v-if="section.type === 'slideshow'" />

            <schoolRaceChart :data="section" v-if="section.type === 'school_race_chart'" />

        </div>
    </div>
</template>

<script>
import Copy from '~/components/Copy.vue';
import Side from '~/components/Side.vue';
import Photo from '~/components/Photo.vue';
import Refer from '~/components/Refer.vue';
import Quote from '~/components/Quote.vue';
import Snippet from '~/components/Snippet.vue';
import Yazoo from '~/components/YazooLocator.vue';
import Robeson from '~/components/RobesonLocator.vue';
import StLouis from '~/components/StLouisLocator.vue';
import StandingRock from '~/components/StandingRockLocator.vue';
import Fresno from '~/components/FresnoLocator.vue';
import FresnoThematic from '~/components/FresnoThematic.vue';
import Presidio from '~/components/PresidioLocator.vue';
import PresidioHospitals from '~/components/PresidioHospitals.vue';
import StLouisHud from '~/components/StLouisHud.vue';
import StormTracks from '~/components/StormTracks.vue';
import Subscribe from '~/components/Subscribe.vue';
import LoopingVideo from '~/components/LoopingVideo.vue';
import Soundcloud from '~/components/Soundcloud.vue';
import Slideshow from '~/components/Slideshow.vue';
import schoolRaceChart from '~/components/SchoolRaceChart.vue';

export default {
    components: {
        Side,
        Copy,
        Photo,
        Refer,
        Quote,
        Snippet,
        Yazoo,
        Robeson,
        stlouis: StLouis,
        standingrock: StandingRock,
        fresno: Fresno,
        Presidio,
        stlouishud: StLouisHud,
        presidiohospitals: PresidioHospitals,
        fresnothematic: FresnoThematic,
        stormTracks: StormTracks,
        Subscribe,
        loopingVideo: LoopingVideo,
        soundcloud: Soundcloud,
        slideshow: Slideshow,
        schoolRaceChart
    },
    props: ['data'],
    name: 'Sections'
};
</script>

<style scoped>
.locator-left {
    width: 20%;
    float: left;
    clear: left;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

.locator-right {
    width: 20%;
    float: right;
    clear: right;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

@media (max-width: 650px) {
    .locator-left {
        width: 30%;
        float: left;
        clear: left;
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }

    .locator-right {
        width: 30%;
        float: right;
        clear: right;
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }
}
</style>