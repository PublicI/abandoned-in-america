<template>
    <div class="bigger">
        <video style="width: 100%;height: auto" autoplay loop muted playsinline>
          <source :src="data.location" type="video/mp4">
        </video>
    </div>
</template>

<script>
export default {
    props: ['data']
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
