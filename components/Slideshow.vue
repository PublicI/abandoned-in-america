<template>
<div class="slideshow">
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in doc.slides">
            <img :src="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1'))" :srcset="encodeURI(base + slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-2880.$1')) + '  2880w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-1440.$1')) + '  1440w,' + base + encodeURI(slide.location.replace('img','resized').replace(/\.(jpg|png)$/,'-720.$1')) + '   720w'" class="slideshowImage">

            <div class="cutline"><span v-html="'<p>' + slide.cutline.replace(/\n\W*\n/g,'</p>\n<p>') + '</p>'"></span><span class="credit" v-html="slide.credit"></span></div>
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
            autoHeight: true,
            pagination: {
                clickable: true,
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
.swiper-container {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

.slideshow .cutline, .slideshow .credit {
    font-family: "tablet-gothic-n2","tablet-gothic","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-family: "nimbus-sans",sans-serif;
    font-weight: 300;

    line-height: 18px;
    font-size: 15px;
    color: rgb(140,140,140);
    color: white;
    padding-bottom: 0px;
    padding-top: 5px;
}

.swiper-container {
    padding-top: 35px;
}

.swiper-button-disabled {
    display: none;
}

.slideshow .credit {
    font-size: 13px;
    line-height: 16px;
    color: rgb(200,200,200);
    padding-left: 15px;
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: initial;
    top: 0px;
}

.slideshow .cutline .credit {
    padding-left: 0;
}

.slideshow .swiper-pagination-bullet {
    background: white;
    opacity: 0.3;
}
.slideshow .swiper-pagination-bullet-active {
    background: white;
    opacity: 1;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20stroke%3D'%23000000'%20fill%3D'%23FFFFFF'%2F%3E%3C%2Fsvg%3E");
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20stroke%3D'%23000000'%20fill%3D'%23FFFFFF'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
    top: 313px;
    -webkit-tap-highlight-color: transparent;
}

.slideshow {
    background-color: rgb(30,30,30);
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.slideshowImage {
    width:auto;
    max-height: 600px;
    margin:0px auto;
    display: table;
}

@media (max-width: 900px) {
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev, .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
        top: 160px;
    }

    .slideshowImage {
        max-height: 300px;
    }

    .slideshow .cutline {
        padding-left: 5px;
        padding-right: 5px;
    }
}
</style>