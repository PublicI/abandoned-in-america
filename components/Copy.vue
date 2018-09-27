<template>
    <div :class="'copy centralColumn ' + data.type">

        <h3 v-if="data.hed">{{data.hed}}</h3>

        <div v-html="'<p>' + data.text.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'" v-if="data.text">
        </div>

    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Sections'
};
</script>

<style>
.copy h3 {
    margin-bottom: 10px;
    margin-top: 30px;
}
.copy p {
    font-family: "ff-tisa-web-pro","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    line-height: 29px;
    font-size: 19px;
    line-height: 26px;
    color: rgb(50,50,50);
}
.copy h3 {
    color: black;
    text-shadow: none;
}
.lede p {
    /*
    line-height: 34px;
    font-size: 25px;
    */
}
.lede p:first-child:first-letter {
  color: #E74C3C;
  float: left;
  font-family: Georgia,serif;
  font-size: 72px;
  line-height: 60px;
  padding-top: 6px;
  padding-right: 8px;
  padding-left: 3px;
}
</style>