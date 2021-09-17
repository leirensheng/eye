<template>
  <div class="luminous-flux">
    <p class="has-indent">光通量（luminous
    flux）指人眼所能感觉到的辐射功率，光通量的单位为“流明”，符号lm。光通量是指按照国际规定的标准人眼视觉特性评价的辐射通量的导出量，在理论上其单位相当于电学单位瓦特，但光通量不是指光源发光所需的电源功率，而是指肉眼能够感觉到的光功率。因此，照明产品的光通量数值越大，相对产品也就越亮。</p>
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
.luminous-flux {
  padding: 48rpx 24rpx;
  line-height: 48rpx;
  font-size: 28rpx;
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
