<template>
    <div class="right">
        <strong>Matthew</strong>

        <video width="297" height="284" autoplay loop muted>
          <source src="https://apps.publicintegrity.org/abandoned-in-america-9CtJQQlNKL8A/resized/ROBESON%20COUNTY:%20ASHLEY/SELECTS/matthew.mp4" type="video/mp4">
        </video>

        <strong>Florence</strong>
        <video width="297" height="284" autoplay loop muted>
          <source src="https://apps.publicintegrity.org/abandoned-in-america-9CtJQQlNKL8A/resized/ROBESON%20COUNTY:%20ASHLEY/SELECTS/florence.mp4" type="video/mp4">
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
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }

    .right {
        width: 100%;
        float: none;
        margin-right: 1.5% !important;
        margin-left: 1.5% !important;
    }
}
</style>
