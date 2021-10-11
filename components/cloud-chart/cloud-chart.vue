<template>
  <view class="cloud-chart">
    <div class="hight-title">评论质量关键词词云</div>
    <div class="types">
      <scroll-tab :tabs="tabs" v-model="curTab"></scroll-tab>
    </div>

    <div class="content-wrap">
      <div class="no-data generating" v-if="!commentFinished">
        {{ commentFinished }}
        <image
          class="icon"
          mode="widthFix"
          src="/static/generating.svg"
        ></image>
        <div class="desc">正在生成中...</div>
      </div>
      <div class="no-data" v-else-if="showData.length === 0">
        <image class="icon" mode="widthFix" src="/static/no-data.svg"></image>
        <div class="desc">暂无数据</div>
      </div>
      <div class="chart" v-else>
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
    commentKeyWord: {
      type: Array,
      default: () => [],
    },
    commentFinished: {
      type: Boolean,
      default: false,
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
      return [...this.negative, ...this.positive, ...this.commentKeyWord];
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
        series: this.showData.map((one) => {
          let obj = {
            name: one.keyword,
            textSize: this.getSize(one.discoveryTimes),
          };
          if (this.commentKeyWord.includes(one)) {
            obj.color = "#999";
          }
          return obj;
        }),
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
  .types {
    margin-top: 32rpx;
    display: flex;
    justify-content: center;
  }
  .content-wrap {
    min-height: 214rpx;
  }
  .chart {
    margin-top: 10rpx;
  }
  .generating {
    margin-top: 58rpx;
  }
}
</style>