<template>
    <div class="bigger">
        <div id="videoContainer" class="videoContainer muted">
            <video style="width: 100%;height: auto" id="loopingVideo" loop playsinline muted>
              <source :src="data.location" type="video/mp4">
            </video>

            <div id="audioButton" class="audioButton">

                <svg fill="#FFFFFF" class="audioWave" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 70 70"><g transform="translate(0,-982.36218)"><path style="color:#000000;enable-background:accumulate;" d="m 39,999.36218 -14,10.00002 -10,0 0,16 10,0 14,10 z m 8.8125,2.96872 c -0.8191,0.071 -1.56023,0.6995 -1.76444,1.4959 -0.20421,0.7965 0.14314,1.7039 0.82694,2.1604 1.98692,1.3574 4.12499,5.8837 4.125,11.375 3e-5,5.4911 -2.13803,9.9862 -4.125,11.3437 -0.98206,0.5322 -1.32836,1.9686 -0.69668,2.8898 0.63168,0.9212 2.09639,1.1158 2.94668,0.3915 3.85203,-2.6317 5.87503,-8.2025 5.875,-14.625 -1e-5,-6.4227 -2.02294,-12.0247 -5.875,-14.6563 -0.37615,-0.2722 -0.8493,-0.4074 -1.3125,-0.375 z m -5.0625,4 c -0.79703,0.079 -1.51621,0.6828 -1.73091,1.4544 -0.2147,0.7716 0.089,1.6605 0.73091,2.1394 0.82613,0.6513 2.25002,3.7171 2.25,7.4375 -1e-5,3.7206 -1.42395,6.7551 -2.25,7.4062 -0.83153,0.6527 -0.99146,2.0051 -0.33511,2.8337 0.65635,0.8286 2.00938,0.9826 2.83511,0.3226 2.67733,-2.1106 3.74999,-6.0347 3.75,-10.5625 2e-5,-4.5276 -1.07275,-8.4831 -3.75,-10.5938 -0.41435,-0.3385 -0.96861,-0.5002 -1.5,-0.4375 z" fill="#FFFFFF" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>

                <svg fill="#FFFFFF" class="audioMuted" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 70 70"><g transform="translate(0,-982.36218)"><path style="color:#000000;enable-background:accumulate;" d="m 38.999747,999.36218 -14,10.00002 -10,0 0,16 10,0 14,10 0,-36.00002 z m 5.9375,12.00002 c -0.49191,0 -0.99968,0.1873 -1.375,0.5625 -0.75063,0.7507 -0.75063,1.9681 0,2.7187 l 2.71875,2.7188 -2.71875,2.7187 c -0.75063,0.7505 -0.75063,1.9681 0,2.7188 0.75053,0.7505 1.96811,0.7505 2.71875,0 l 2.71875,-2.7188 2.71875,2.7188 c 0.75073,0.7505 1.96821,0.7505 2.71875,0 0.75067,-0.7507 0.75068,-1.9683 0,-2.7188 l -2.71875,-2.7187 2.71875,-2.7188 c 0.75068,-0.7506 0.75059,-1.968 0,-2.7187 -0.75061,-0.7505 -1.96812,-0.7505 -2.71875,0 l -2.71875,2.7187 -2.71875,-2.7187 c -0.37532,-0.3752 -0.85185,-0.5625 -1.34375,-0.5625 z" fill="#FFFFFF" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>

            </div>
        </div>
        <div class="cutline"><span>{{data.cutline}}</span><br><span class="credit" v-html="data.credit"></span></div>
    </div>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin';

export default {
    data() {
        return {
            muted: true
            // safari: false
        };
    },
    props: ['data'],
    mixins: [ inViewport ],
    watch: {
        'inViewport.now': visible => {
            let el = document.getElementById('loopingVideo');

            if (visible) {
                el.play();
            }
            else {
                el.pause();
            }
        }
    },
    mounted() {
        let vm = this;

        vm.$nextTick(() => {
            let vid = document.getElementById('loopingVideo');
            let button = document.getElementById('audioButton');
            let container = document.getElementById('videoContainer');

            button.addEventListener('click', () => {
                if (vid.muted) {
                    vid.muted = false;
                    vid.setAttribute('muted', false);
                    container.classList.remove('muted');
                }
                else {
                    vid.muted = true;
                    vid.setAttribute('muted', true);
                    container.classList.add('muted');
                }
            });

            vid.addEventListener('click', () => {
                if (vid.muted) {
                    vid.muted = false;
                    vid.setAttribute('muted', false);
                    container.classList.remove('muted');
                }
                else {
                    vid.muted = true;
                    vid.setAttribute('muted', true);
                    container.classList.add('muted');
                }
            });

        });
    }
};
</script>

<style scoped>
.videoContainer .audioWave {
    display: block;
}

.videoContainer .audioMuted {
    display: none;
}

.videoContainer.muted .audioWave {
    display: none;
}

.videoContainer.muted .audioMuted {
    display: block;
}

.bigger {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.cutline, .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(140,140,140);
    padding-bottom: 10px;
    padding-top: 5px;
}

.credit {
    font-size: 13px;
    line-height: 16px;
    color: rgb(160,160,160);
    padding-left: 15px;
}

.cutline .credit {
    padding-left: 0;
}

.videoContainer {
    position: relative;
    /* margin-bottom: 20px; */
    cursor: pointer;
}
.videoContainer video {
    -webkit-tap-highlight-color: transparent;
}
.audioButton {
    position: absolute;
    left: 18px;
    bottom: 18px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

@media (max-width: 650px) {
    .cutline {
        padding-left: 10px;
        padding-right: 10px;
    }
}
</style>
