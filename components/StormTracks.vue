<template>
    <div class="right">
        <strong>Matthew</strong> &mdash; October 2016
        <video width="297" height="287" autoplay loop muted playsinline>
          <source src="https://apps.publicintegrity.org/abandoned-in-america-9CtJQQlNKL8A/video/matthew.mp4" type="video/mp4">
        </video>

        <strong>Florence</strong> &mdash; September 2018
        <video width="297" height="287" autoplay loop muted playsinline>
          <source src="https://apps.publicintegrity.org/abandoned-in-america-9CtJQQlNKL8A/video/florence.mp4" type="video/mp4">
        </video>
    </div>
</template>

<script>
export default {
};
</script>

<style>
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
