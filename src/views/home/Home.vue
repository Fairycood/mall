<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-show" :titles = "['流行','新款','精选']" @tabClick="tabClick"
    ref = "topTab"
    v-show="isShow"  ></tab-control>
    <scroll class="content" 
    ref="scroll" 
    :probeType="3" 
    :pullUpLoad=true
    @scroll="contentScroll"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad = "getOffsetTop"></home-swiper>
    <recommend-view :recommends = "recommends"></recommend-view>
    <feature></feature>
    <tab-control :titles = "['流行','新款','精选']" @tabClick="tabClick"
    ref = "centerTab"></tab-control>
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
        showTopBack: false,
        offsetTop: 0,
        isShow: false
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
        this.$refs.centerTab.currentIndex = index;
        this.$refs.topTab.currentIndex = index;     
    },
    //监听内容滚动的位置
    contentScroll(position) {
      //操作topBack的显示和隐藏
      this.showTopBack = (-position.y) > 1500
      //操作tabContral的吸顶效果
      this.isShow = (-position.y) > this.offsetTop
    },
    //监听返回顶部按钮的点击
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    },
    //监听上拉加载更多
    loadMore() {
      this.getGoods(this.currentType)
    },
    //监听轮播图已加载完毕并获取tabContral的offsetTop
    getOffsetTop() {
      this.offsetTop = this.$refs.centerTab.$el.offsetTop 
  },
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
  /* 此处代码是原本的样式
  但是发现如果这样写的话，在向上滚动的时候两个tabControl的替换的过渡是跳转的，就是说衔接得很奇怪，具体什么原因不清楚 */
  /* 2021-11-17
  发现原因：下面注释的样式中content没有设置绝对定位以及设置top属性，所以到时候计算offsetTop的时候会多加了44px */
    /* .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-show {
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    height: calc(100vh - 93px);
    overflow: hidden; 
  } */
   
   #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-show {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>