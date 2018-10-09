<template>
    <div class="right">
        <span class="label"><strong>Matthew</strong> &mdash; October 2016</span>
        <video width="297" height="287" autoplay loop muted playsinline>
          <source src="https://apps.publicintegrity.org/abandoned-in-america/video/matthew.mp4" type="video/mp4">
        </video>

        <span class="label"><strong>Florence</strong> &mdash; September 2018</span>
        <video width="297" height="287" autoplay loop muted playsinline>
          <source src="https://apps.publicintegrity.org/abandoned-in-america/video/florence.mp4" type="video/mp4">
        </video>

        <span class="source">NOAA</span>
    </div>
</template>

<script>
export default {
};
</script>

<style scoped="">
.label {
    font-family: "nimbus-sans",sans-serif;
    font-size: 16px;
    line-height: 16px;
}

.source {
    font-family: "nimbus-sans",sans-serif;
    font-weight: 300;
    line-height: 15px;
    font-size: 15px;
    color: rgb(100,100,100);
    padding-top: 5px;
}

.left {
    width: 23%;
    float: left;
    clear: left;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

.right {
    width: 23%;
    float: right;
    clear: right;
    margin-right: 1.5% !important;
    margin-left: 1.5% !important;
}

@media (max-width: 650px) {
    .left {
        width: 100%;
        float: none;
        margin-right: 2% !important;
        margin-left: 2% !important;
    }

    .right {
        width: 100%;
        float: none;
        margin-right: 2% !important;
        margin-left: 2% !important;
    }
}
</style>
