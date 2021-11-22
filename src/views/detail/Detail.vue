<template>
  <div class="detail">
    <detail-nav></detail-nav>
    <!-- <detail-swiper :topImages="topImages"></detail-swiper> -->
  </div>
</template>

<script>
//导入子组件
import DetailNav from "./childComponents/DetailNav.vue"
import DetailSwiper from "./childComponents/DetailSwiper.vue"
//导入封装的axios
import {getDetail} from "network/detail.js"

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: null
    }
  },
  created() {
    
  },
  activated() {
    //保存传入的id
    this.iid = this.$route.params.iid
    //根据传入的iid获取对应的详情页数据
    getDetail(this.iid).then(res => {
      this.topImages = res.data.result.itemInfo.topImages
    })
  },
  methods: {

  },
  components: {
    DetailNav,
    DetailSwiper
  }
}
</script>

<style scoped>

</style>
