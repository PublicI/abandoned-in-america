<template>
    <div class="bigger videoContainer">
        <video @click="muted = !muted" style="width: 100%;height: auto" id="loopingVideo" loop playsinline :muted="muted">
          <source :src="data.location" type="video/mp4">
        </video>

        <div class="audioButton" @click="muted = !muted">
            <svg fill="#FFFFFF" xmlns:x="http://ns.adobe.com/Extensibility/1.0/" xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:graph="http://ns.adobe.com/Graphs/1.0/" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><switch><foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1"></foreignObject><g i:extraneous="self"><g><path v-if="!muted" d="M62.7,41c-1.1-0.9-2.7-0.7-3.6,0.4c-0.9,1.1-0.7,2.7,0.4,3.6c1.4,1.2,2.4,3,2.4,5c0,2.1-1,4-2.6,5.2     c-1,0.8-1.2,2.2-0.4,3.2l0.2,0.2c0.9,1,2.4,1.2,3.5,0.4C65.3,57,67,53.7,67,50C67,46.4,65.4,43.1,62.7,41z"></path><path v-if="!muted" d="M68.6,33.8c-1.1-0.9-2.6-0.7-3.5,0.4l0,0c-0.9,1.1-0.8,2.7,0.3,3.5c3.6,2.9,5.9,7.3,5.9,12.3c0,4.9-2.3,9.4-5.9,12.3     c-1.1,0.9-1.2,2.5-0.3,3.5l0,0c0.9,1.1,2.5,1.3,3.5,0.4c4.7-3.8,7.8-9.7,7.8-16.2C76.3,43.5,73.3,37.6,68.6,33.8z"></path><path d="M47.8,29.9L34.7,39.9h-6.4c-1.7,0-3,1.3-3,3v14.1c0,1.7,1.3,3,3,3h6.4l13.1,10c2.3,1.8,5.6,0.1,5.6-2.8V32.6     C53.4,29.7,50.1,28.1,47.8,29.9z"></path><path d="M50,2.5C23.8,2.5,2.5,23.8,2.5,50c0,26.2,21.3,47.5,47.5,47.5S97.5,76.2,97.5,50C97.5,23.8,76.2,2.5,50,2.5z M50,90.1     c-22.1,0-40.1-18-40.1-40.1c0-22.1,18-40.1,40.1-40.1c22.1,0,40.1,18,40.1,40.1C90.1,72.1,72.1,90.1,50,90.1z"></path></g></g></switch></svg>
        </div>

    </div>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin';

export default {
    data() {
        return {
            muted: true
        };
    },
    props: ['data'],
    mixins: [ inViewport ],
    watch: {
        'inViewport.now': visible => {
            if (visible) {
                document.getElementById('loopingVideo').play();
            }
            else {
                document.getElementById('loopingVideo').pause();
            }
        }
    }
};
</script>

<style scoped>
.bigger {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
.videoContainer {
    position: relative;
    margin-bottom: 20px;
}
.audioButton {
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 30px;
    height: 30px;
}
</style>
