<script setup lang="ts">
// import Swiper core and required modules
import { Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// import type { SwiperOptions } from 'swiper/types';

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const modules = [Navigation, Pagination, EffectFade];

const swiperList = ref(
  [
    {
      url: 'https://swiperjs.com/demos/images/nature-1.jpg',
      title: 'Slide 1',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-2.jpg',
      title: 'Slide 2',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-3.jpg',
      title: 'Slide 3',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-4.jpg',
      title: 'Slide 4',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-5.jpg',
      title: 'Slide 5',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-6.jpg',
      title: 'Slide 6',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-7.jpg',
      title: 'Slide 7',
    },
    {
      url: 'https://swiperjs.com/demos/images/nature-8.jpg',
      title: 'Slide 8',
    },
  ]
)
</script>
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <swiper :modules="modules" :slides-per-view="3" :space-between="25" navigation :pagination="{ clickable: true }"
        @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="item in swiperList" :key="item.title">
          <img :src="item.url" alt="" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;

  .swiper-wrapper {
    width: 100%;
    height: 500px;
  }
}
</style>
