<template>
    <div>
        <div :class="'hed centralColumn' + (data.image.location !== '' ? ' floatedHed' : '')">
            <div>
                <h1 v-if="data.series && data.slug !== data.series.slug">{{data.hed}}</h1>
                <h1 v-if="!data.series || data.slug === data.series.slug" :class="rotatedClass" style="font-size:9vw;line-height: 8.4vw;color: #E74C3C">ABANDONED IN AMERICA</h1>

                <h2>{{data.subhed}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Hed',
    data() {
        return {
            rotatedClass: 'notRotated'
        }
    }
    /*,
    mounted() {
        let vm = this;

        setTimeout(() => {
            vm.rotatedClass = 'rotated';
        },1000);
    }*/
};
</script>

<style scoped>
/*
.rotate5, .rotateNegative5, .inlineBlock {
    transition: all 2s ease-out;
}

.rotated .rotate5 {
    display: inline-block;
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
}
.rotated .rotateNegative5 {
    display: inline-block;
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
}
.rotated .inlineBlock {
    display: inline-block;
}


.notRotated .rotate5 {
    display: inline-block;
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
.notRotated .rotateNegative5 {
    display: inline-block;
    -ms-transform: rotate(-0deg);
    -webkit-transform: rotate(-0deg);
    transform: rotate(-0deg);
}
.notRotated .inlineBlock {
    display: inline-block;
}*/

.floatedHed {
    position: absolute;
    top: 5vw;
    left: 5vw;
}
.floatedHed h1 {
    /* text-shadow: 1px 1px 1px #565656; */
    color: white;
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
        /* font-family: adonis-web,serif; */
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
    /*
    h3 {
        position: relative;
        top: -20px;
        left: 10px;
        font-size: 18px;
        line-height: 20px;
    }*/
    .hed {
        top: 24%;
    }
    .deathInThe {
        left: 20%;
    }
}
/*
@media (max-width: 400px) {
    h3 {
        left: -10%;
        width: 110%;
        font-size: 16px;
        line-height: 18px;
    }
}*/
</style>