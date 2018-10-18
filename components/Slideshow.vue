<template>
  <div v-swiper:mySwiper="swiperOption" @someSwiperEvent="callback">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in doc.slides">
        <img :src="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1'))" :srcset="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" style="width:100%;height: auto">

      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>


<script>
export default {
    props: ['doc','base'],
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          // some swiper options...
        }
      }
    },
    mounted() {
        /*
      setTimeout(() => {
        this.banners.push('/4.jpg')
        console.log('banners update')
      }, 3000)
      console.log(
        'This is current swiper instance object', this.mySwiper, 
        'It will slideTo banners 3')
      this.mySwiper.slideTo(3, 1000, false)*/
    }
}
</script>

<style scoped>

</style>