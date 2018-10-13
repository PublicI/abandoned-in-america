<template>
    <div class="bigger">
        <video style="width: 100%;height: auto" id="loopingVideo" loop playsinline muted>
          <source :src="data.location" type="video/mp4">
        </video>
    </div>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin';

export default {
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
    margin-bottom: 20px;
}
</style>
