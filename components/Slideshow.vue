<template>
<div class="slideshow">
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in doc.slides">
            <img :src="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1'))" :srcset="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" style="width:100%;height: auto">

                <div class="cutline"><span>{{slide.cutline}}</span><br><span class="credit" v-html="slide.credit"></span></div>

        </div>
    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
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
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
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

<style>
.slideshow {
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
</style>