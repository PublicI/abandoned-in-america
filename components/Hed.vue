<template>
    <div>
        <div class="hed">
            <div>
                <h1>{{data.hed}}</h1>
                <!--
                <h1>
                    <div class="deathInThe">Death in the</div>
                    <div>Trench</div>
                </h1>
                -->
                <h3 class="hideOnMobile">{{data.subhed}}</h3>
            </div>
        </div>
        <h3 class="hideOnDesktop">{{data.subhed}}</h3>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Hed'
};
</script>

<style scoped>
.hed {
    position: absolute;
    z-index: 300;
    top: 32%;
    left: 38%;
}
.hideOnDesktop {
    display: none;
}
h1 {
    /* font-family: adonis-web,serif; */
    font-size: 10vw;
    line-height: 10vw;
    /* text-shadow: 2px 2px 2px black; */
    max-width: 1300px;
    color: white;
    position: relative;
    font-family: tablet-gothic-narrow,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-weight: 300;
    color: black;
}
.deathInThe {
    font-size: 5vw;
    line-height: 5vw;
    position: absolute;
    top: -5px;
    left: 15%;
}
h2 {
    /* font-family: almaq-refined,sans-serif; */
    text-transform: uppercase;
    text-shadow: 2px 2px 2px black;
    /* color: #323232; */
    max-width: 1300px;
    color: white;
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
    .hideOnMobile {
        display: none;
    }
    .hideOnDesktop {
        display: block;
    }
    h3 {
        position: relative;
        top: -20px;
        left: 10px;
        font-size: 18px;
        line-height: 20px;
    }
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