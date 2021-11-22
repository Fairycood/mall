<template>
    <swiper class="swiper-detail" name='DetailSwiper'>
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"

export default {
  name: 'DetailSwiper',
  data() {
    return {

    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {

  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .swiper-detail {
    height: 300px;
    overflow: hidden;
  }
  .swiper-detail img {
    height: 100%;
    width: 100%;
  }
</style>
