<template>
  <view class="cloud-chart">
    <div class="hight-title">评论质量关键词词云</div>
    <qiun-data-charts
      canvas2d
      class="charts-box"
      canvas-id="canvasPiehhjhhjhvgg"
      :opts="opts"
      type="word"
      background="none"
      :chartData="wordData"
    />
  </view>
</template>

<script>
export default {
  props: {
    keyword: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    wordData() {
      let res = {
        series: this.keyword.map((one) => ({
          name: one.keyword,
          textSize: this.getSize(one.discoveryTimes),
        })),
      };
      console.log(res);
      return res;
      return {
        series: this.keyword.map((one) => ({
          name: one.keyword,
          textSize: this.getSize(one.discoveryTimes),
        })),
      };
    },
    min() {
      return Math.min(...this.keyword.map((one) => one.discoveryTimes));
    },
    max() {
      return Math.max(...this.keyword.map((one) => one.discoveryTimes));
    },
  },
  data() {
    return {
      opts: {
        enableScroll: true,
      },
    };
  },
  methods: {
    getSize(val) {
      let minSize = 14;
      let maxSize = 28;
      let k = (maxSize - minSize) / (this.max - this.min);
      return k * val + minSize;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 30rpx;
  .title {
    font-size: 32rpx;
    font-weight: bold;
  }
  .charts-box {
    position: relative;
    width: 100%;
    z-index: -1;
    // height: 624rpx;
  }
}
</style>