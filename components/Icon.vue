<template>
    <div class="iconContainerContainer">
        <div class="iconContainer">

            <img :src="'icons/' + data.icon.match(/([0-9])+/)[0] + '.svg'" />

        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Icon'
};
</script>

<style>
.iconContainerContainer {
    padding-top: 1%;
    padding-bottom: 1%;
    background-color: #E74C3C;
}
.iconContainer {
    width: 50%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>