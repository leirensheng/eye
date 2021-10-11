<template>
  <div class="my-card" :class="isSuccess && 'is-success'">
    <div class="title">{{ title }}</div>
    <div class="sub-title">{{ subTitle }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    isSuccess: {
      type: Boolean,
      default: "",
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.my-card {
  border: 2rpx solid #8393AC;;
  border-radius: 4rpx;
  background: #E8EAEE;
  padding: 36rpx 20rpx;
  text-align: center;
  width: 646rpx;
  &.is-success {
    border-color: #8cb7ff;
    background: #e4eeff;
  }
  .title {
    line-height: 48rpx;
    font-weight: 500;
    font-size: 32rpx;
  }
  .sub-title {
      text-align: left;
    margin-top: 12rpx;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.65);
    line-height: 44rpx;
  }
}
</style>
