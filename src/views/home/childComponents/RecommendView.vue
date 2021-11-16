<template>
  <div class="recommends">
    <div class="recommends-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  data() {
    return {
      
    }
  },
  methods: {

  },
  props: {
    recommends: {
        type: Array,
        default() {
        return []
      }
    }
  },
  components: {

  }
}
</script>

<style>
  .recommends {
    display: flex;
    padding: 10px 0 18px;
    border-bottom: 8px solid #eee;
    text-align: center;
    font-size: 12px;

  }
  .recommends-item {
    flex: 1;
  }
  .recommends-item img {
    width: 22vw;
    height: 22vw;
    margin-bottom: 6px;
  }
</style>
