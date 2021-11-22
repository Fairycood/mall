<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"
export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    swiperLoad() {
      if(!this.isLoad) {
        this.$emit('swiperLoad')
        this.isLoad = true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>
