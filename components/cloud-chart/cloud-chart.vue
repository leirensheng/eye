<template>
  <view class="cloud-chart">
    <div class="hight-title">评论质量关键词词云</div>
    <div class="no-data" v-if="keyword.length === 0">
      <image class="icon" mode="widthFix" src="/static/no-data.svg"></image>
      <div class="desc">暂无数据</div>
    </div>
    <qiun-data-charts
      v-else
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
      let minSize = 18;
      let maxSize = 28;
      let k =
        this.max === this.min ? 1 : (maxSize - minSize) / (this.max - this.min);
      return k * val + minSize;
    },
  },
};
</script>

<style lang="scss" scoped>
.cloud-chart {
}
</style>