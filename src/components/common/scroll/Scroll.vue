<template>
  <div class="wraper" ref="wraper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core"
import ObserveDom from "@better-scroll/observe-dom"
import Pullup from '@better-scroll/pull-up'
import ObserveImage from '@better-scroll/observe-image'
BScroll.use(ObserveDom)
BScroll.use(Pullup)
BScroll.use(ObserveImage)

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //创建scroll实例
    this.scroll = new BScroll(this.$refs.wraper,{
      click: true,
      observeDOM: true,
      observeImage: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    }),
    //监听滚动的位置
    this.scroll.on('scroll', (position => {
      this.$emit('scroll', position)
    })),
    //监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      this.scroll.finishPullUp()
    })
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>