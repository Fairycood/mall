<template>
  <div class="top-back">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'TopBack',
  data() {
    return {

    }
  },
  methods: {
    
  },
  components: {

  }
}
</script>

<style scoped>
  .top-back {
    position: fixed;
    right: 10px;
    bottom: 55px;
    z-index: 2;
  }
  .top-back img {
    width: 43px;
    height: 43px;
  }
</style>
