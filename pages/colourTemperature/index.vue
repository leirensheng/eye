<template>
  <div class="colour-temperature">
    <p class="has-indent">
      色温是对光或光源颜色的一种度量。以理想黑体加热到发出与光源相同的光色时的实际温度作为标度，单位为“开尔文”，符号：K。色温是指可见光所具有的色彩倾向。具有不同色温值的光即会产生不同的色彩，其规律是，随着色温值从低向高过渡，光的色彩也由暖向冷、由红向蓝过渡。
    </p>
    <p>日常阳光从日出到日落的色温如图示意：</p>
    <image class="pic" mode="widthFix" src="/static/desc1.png"></image>
    <div class="desc">（图片来源：天猫—雷士台灯介绍页面）</div>
    <image class="pic" mode="widthFix" src="/static/desc2.png"></image>
    <div class="desc">（图片来源：知乎—什么是色温）</div>
    <p class="mr-top has-indent">
      通常室内照明产品的色温主流分为暖白、日光、冷白三类。1、暖白色温约在3000K以下，光线偏黄光，给人温暖放松的感觉。2、日光色温约在3000K～5000K之间，光线中红绿蓝光占比合适，接近早晨或下午的自然光，给人自然明亮、舒适的感觉。3、冷白色温在5000K以上，蓝光占比较高，给人肃穆、冷清的感觉。因此，需根据家居环境选择特定色温的室内照明产品。
    </p>
    <image class="pic" mode="widthFix" src="/static/desc3.png"></image>
    <div class="desc">（图片来源：知乎—什么是色温）</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.colour-temperature {
  padding: 48rpx 24rpx;
  line-height: 48rpx;
  font-size: 28rpx;
  text-align: justify;
  .mr-top {
    margin-top: 48rpx;
  }

  .has-indent {
    text-indent: 2rem;
  }
  .pic {
    width: 100%;
    margin: 48rpx 0 16rpx 0;
  }
  .desc {
    text-align: center;
    color: #999;
    font-size: 24rpx;
    line-height: 34rpx;
  }
}
</style>
