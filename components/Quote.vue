<template>
    <div class="centralColumn">
        <div class="quote">
            <div class="quoteText">&ldquo;{{data.text}}&rdquo;</div>
            <!-- <div class="quoteAttrib">&mdash; {{data.credit}}</div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    name: 'Quote'
};
</script>

<style scoped>
.quote {
    margin-left: 20px;
    width: 260px;
    float: right;
}
.quoteText {
    color: #FFB957;
    font-family: adonis-web,serif;
    font-size: 40px;
    line-height: 45px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.quoteAttrib {
    font-size: 17px;
    line-height: 130%;
}
@media (max-width: 650px) {
    .quote {
        width: 100%;
        float: none;
        margin-left: 0;
    }
    .quoteText {
        font-size: 30px;
        line-height: 35px;
    }
}
</style>