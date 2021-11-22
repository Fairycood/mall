<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tabbar-item></main-tabbar-item>
  </div>
</template>

<script>
import MainTabbarItem from "./components/content/MainTabbarItem.vue"
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    MainTabbarItem
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
