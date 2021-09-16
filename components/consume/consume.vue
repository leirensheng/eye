<template>
  <div class="consume">
    <div class="hight-title">消费指南</div>
    <div class="text">
      <p class="item">
        作为灯具消费者，不仅要关心灯具样式、节能、材质与价格等因素，更重要要关心灯具安全性问题，购买时最好选择非0类灯具;另外，最好消费者在正规灯具市场中购买正规厂家标有CCC标志灯具，万一遇到问题，就能找到相关厂家与部门。
      </p>
      <p class="item">
        对于在家庭中已经购买使用0类灯具，也要采取相应措施，提高灯具安全系数。比如，将荧光灯支架、格栅灯、简灯、壁灯、吸顶灯等带有易触及金属外壳连上接地线，将台灯、落地灯等可移式灯具电源线改为护套线、带有易触及金属外壳连上接地线后再把二极插头改为单相三极插头都能显著减少触电风险。
      </p>
      <p class="item">
        对于没有按规定在三极插座中接入地线，要请专业人员接入接地线，否则，即使购买了I类灯具也没有起到应有安全保障作用。
      </p>
    </div>
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
.consume {
  .text {
    margin-top: 30rpx;
    .item {
      text-indent: 2rem;
      font-size: 28rpx;
      text-align: justify;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 400;
      line-height: 48rpx;
    }
  }
}
</style>
