<template>
  <div class="history-page">
    <div class="one-history" v-for="item in data" :key="item.id">
      <history-item :item="item"></history-item>
    </div>

    <load-more v-if="!noMore"></load-more>
    <div class="no-more" v-else>没有更多了</div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  props: {
    noMore: {
      type: Boolean,
      default: false,
    },
    data:{
      type:Array,
      default:[]
    }
  },

  created() {
    // this.getData();
  },
  beforeDestroy() {},
  computed: {

  },
  watch: {

  },

  onLoad() {},
  mounted() {},
  async onShow() {
   
  },

  methods: {


  },
};
</script>

<style scoped lang="scss">
.history-page {
  padding-top: 10rpx;
  .one-history {
    margin-bottom: 32rpx;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .no-more{
    text-align: center;
    font-size: 28rpx;
  }
}
</style>
