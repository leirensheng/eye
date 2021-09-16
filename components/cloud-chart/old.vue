<template>
  <view class="cloud-chart">
    <div class="hight-title">评论质量关键词词云</div>

    <view class="charts-box">
      <qiun-data-charts 
      :opts="opts"
      type="word" background="none" :chartData="wordData" />
    </view>

    <!-- <canvas type="2d" class="chart-box" canvas-id="canvasPie" id="canvasPie"></canvas> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
opts:{
    pixelRatio:3
},
      wordData: {
        series: [
          { name: "跨全端图表", textSize: 25 },
          { name: "微信小程序", textSize: 20 },
          { name: "支付宝小程序", textSize: 20 },
          { name: "百度小程序", textSize: 20 },
          { name: "QQ小程序", textSize: 20 },
          { name: "头条小程序", textSize: 20 },
          { name: "抖音小程序", textSize: 20 },
          { name: "360小程序", textSize: 20 },
          { name: "跨全端", textSize: 10 },
          { name: "跨全端", textSize: 12 },
          { name: "跨全端", textSize: 10 },
          { name: "跨全端", textSize: 12 },
          { name: "跨全端", textSize: 10 },
          { name: "跨全端", textSize: 12 },
          { name: "跨全端", textSize: 10 },
          { name: "跨全端", textSize: 12 },
        ],
      },
    };
  },
  methods: {},
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
    width: 400%;
    height: 624rpx;
  }
}
</style>