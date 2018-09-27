<template>
    <westFresno />
</template>

<script>
//import fresno from '~/components/fresno.vue'
import robeson from '~/components/RobesonLocator.vue'
import standingRock from '~/components/StandingRockLocator.vue'
import yazoo from '~/components/YazooLocator.vue'
import presidio from '~/components/PresidioLocator.vue'
import stLouis from '~/components/StLouisLocator.vue'
import fresno from '~/components/FresnoLocator.vue'
import westFresno from '~/components/WestFresnoLocator.vue'
export default {
    components: {
        westFresno,
        fresno,
        yazoo,
        standingRock,
        robeson,
        presidio,
        stLouis
    }
};
</script>

<style scoped>
</style>
