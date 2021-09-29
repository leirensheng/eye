<template>
  <view class="cloud-chart">
    <div class="hight-title">评论质量关键词词云</div>
    <div class="no-data" v-if="showData.length === 0">
      <image class="icon" mode="widthFix" src="/static/no-data.svg"></image>
      <div class="desc">暂无数据</div>
    </div>
    <div v-else>
      <div class="types">

      <scroll-tab  :tabs="tabs" v-model="curTab"></scroll-tab>
      </div>
      <qiun-data-charts
        canvas2d
        class="charts-box"
        canvas-id="canvasPiehhjhhjhvgg"
        :opts="opts"
        type="word"
        background="none"
        :chartData="wordData"
      />
    </div>
  </view>
</template>

<script>
export default {
  props: {
    positive: {
      type: Array,
      default: () => [],
    },
    negative: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    curTab(val) {
      this.isPositive = val === 1;
      this.isNegative = val === 2;
    },
  },
  computed: {
    allData() {
      return [...this.negative, ...this.positive];
    },
    showData() {
      return this.isNegative
        ? this.negative
        : this.isPositive
        ? this.positive
        : this.allData;
    },
    wordData() {
      return {
        series: this.showData.map((one) => ({
          name: one.keyword,
          textSize: this.getSize(one.discoveryTimes),
        })),
      };
    },
    min() {
      return Math.min(...this.showData.map((one) => one.discoveryTimes));
    },
    max() {
      return Math.max(...this.showData.map((one) => one.discoveryTimes));
    },
  },
  data() {
    return {
      tabs: [{ name: "全部" }, { name: "好评" }, { name: "差评" }],
      curTab: 0,
      isNegative: false,
      isPositive: false,
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
  .types{
    margin-top: 32rpx;
    display:flex;
    justify-content:center;
  }
}
</style>