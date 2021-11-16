<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
    ref="scroll" 
    :probeType="3" 
    :pullUpLoad=true
    @scroll="contentScroll"
    @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends = "recommends"></recommend-view>
    <feature></feature>
    <tab-control class="tab-control" :titles = "['流行','新款','精选']" @tabClick="tabClick "></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <top-back @click.native = 'backClick()' v-show="showTopBack"></top-back>
  </div>
</template>

<script>
//导入子组件
import HomeSwiper from "./childComponents/HomeSwiper.vue";
import RecommendView from "./childComponents/RecommendView.vue"
import Feature from "./childComponents/Feature.vue"
//导入公共的组件
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goodslist/GoodsList.vue";
import TopBack from "components/content/topBack/TopBack.vue";
//导入封装的axios
import { getMultiData, getGoods } from "network/home";

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        }
      },
        currentType: 'pop',
        showTopBack: false
    }
  },
    created() {
    this.getMultiData(),
    this.getGoods('pop'),
    this.getGoods('new'),
    this.getGoods('sell')
  },
  methods: {
    //获取首页头部数据
    getMultiData() {
      getMultiData().then(res => {
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
    },
    //获取首页商品列表数据
    getGoods(type) {
      const page = this.goods[type].page + 1
      getGoods(type, page).then(res => {
        this.goods[type].page += 1
        this.goods[type].list.push(...res.data.data.list)
        // this.$refs.scroll.scroll.finishPullUp()
      })
    },
    //监听tabControl的点击
    tabClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'
        break
        case 1: this.currentType = 'new'
        break
        case 2: this.currentType = 'sell'
        break
      }
    },
    //监听滚动的位置同时操作返回顶部按钮的显示和隐藏
    contentScroll(position) {
      this.showTopBack = (-position.y) > 1500
    },
    //监听返回顶部按钮的点击
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //监听上拉加载更多
    loadMore() {
      this.getGoods(this.currentType)
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    Scroll,
    TabControl,
    GoodsList,
    TopBack
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .tab-control {
    /* position: sticky; */
    top: 44px;
    z-index: 2;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;

  }
</style>
