<template>
    <fresnoThematic />
</template>

<script>
//import fresno from '~/components/fresno.vue'
import robeson from '~/components/RobesonLocator.vue'
import standingRock from '~/components/StandingRockLocator.vue'
import yazoo from '~/components/YazooLocator.vue'
import presidio from '~/components/PresidioLocator.vue'
import presidioHosp from '~/components/PresidioHospitals.vue'
import stLouis from '~/components/StLouisLocator.vue'
import fresno from '~/components/FresnoLocator.vue'
import westFresno from '~/components/WestFresnoLocator.vue'
import fresnoThematic from '~/components/FresnoThematic.vue'
import stLouisHud from '~/components/StLouisHud.vue'
export default {
    components: {
        fresnoThematic,
        westFresno,
        fresno,
        yazoo,
        standingRock,
        robeson,
        presidioHosp,
        presidio,
        stLouis,
        stLouisHud
    }
};
</script>

<style scoped>
</style>
