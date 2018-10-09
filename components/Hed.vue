<template>
    <div>
        <div :class="'hed centralColumn' + (data.image.location !== '' ? ' floatedHed' : '')">
            <div>
                <!-- <h4 v-if="data.series">Part one of {{data.series.hed.toUpperCase()}}</h4> -->

                <h1 v-if="data.series && data.slug !== data.series.slug">{{data.hed}}</h1>
                <div v-if="!data.series || data.slug === data.series.slug">
                    <h1 class="projectHed">ABANDONED</h1>
                    <h1 class="projectHed" style="position: relative; left: -1%">IN AMERICA</h1>
                </div>

                <h2>{{data.subhed}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import FontFaceObserver from 'fontfaceobserver';
import fitty from 'fitty';

export default {
    props: ['data'],
    name: 'Hed',
    data() {
        return {
            rotatedClass: 'notRotated'
        }
    },
    mounted() {
        let vm = this;

        vm.$nextTick(() => {
            var font = new FontFaceObserver('balboa', {
                weight: 400
            });

            font.load().then(() => {
                fitty('.projectHed');
            }, () => {
                // console.log('Font is not available');
            });
        });
    }
};
</script>

<style scoped>
.floatedHed {
    position: absolute;
    top: 5vw;
    left: 5vw;
}
.floatedHed h1 {
    /* text-shadow: 1px 1px 1px #565656; */
    color: white;
    text-shadow: 1px 1px 1px #000000;
}
.outline {
    text-shadow:
   -1px -1px 0 #000,  
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;
}
.hideOnDesktop {
    display: none;
}
.projectHed {
    font-size:9vw;
    line-height: 0.85;
    margin: 0;
    padding: 0;
    display: inline-block;
    white-space: nowrap;
    color: #E74C3C !important;

}
h1 {
    /* font-family: adonis-web,serif; */
    font-size: 5vw;
    line-height: 5vw;
    /* text-shadow: 2px 2px 2px black; */
    max-width: 1300px;
    color: white;
    position: relative;
    font-family: tablet-gothic-narrow,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-family: "balboa",sans-serif;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    color: black;
    padding-top: 10px;
}
h2 {
    color: #3c3c3c;
    color: white;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 400;
    padding-right: 10px;
    text-shadow: 1px 1px 1px #000000;
}
.deathInThe {
    font-size: 5vw;
    line-height: 5vw;
    position: absolute;
    top: -5px;
    left: 15%;
}
h3 {
    color: white;
    /* text-shadow: 2px 2px 2px black; */
    width: 30%;
    position: relative;
    left: 38%;
    color: black;
    font-weight: 300;
    font-size: 18px;
    line-height: 20px;
}
h4 {
/*    text-transform: uppercase; */
    color:#E74C3C;
    color: white;
    font-size: 1vw;
    font-family: "balboa",sans-serif;
    padding-left: 5px;
}
@media (min-width: 1600px) {
    .deathInThe {
        left: 18%;
    }
}
@media (max-width: 1145px) {
    h3 {
        left: 45%;
    }
}
@media (max-width: 1050px) {
    h3 {
        left: 20px;
        top: 10%;
        color: white;
        width: 50%;
        text-shadow: 2px 2px 1px black;
    }
}
@media (max-width: 800px) {
    h3 {
        width: 80%;
        font-size: 16px;
        line-height: 18px;
    }
}
@media (max-width: 500px) {
    h1 {
        font-size: 10vw;
        line-height: 10vw;
    }
    h2 {
        font-size: 20px;
        line-height: 22px;
    }
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: block;
    }
    .hed {
        top: 24%;
    }
    .floatedHed {
        position: absolute;
        top: 3vw;
        left: 3vw;
    }
}
</style>