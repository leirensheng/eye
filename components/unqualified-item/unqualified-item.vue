<template>
  <div class="unqualified-item">
    <div class="top">
      <div class="row" v-for="(item, index) in config" :key="index">
        <div class="key">{{ item.name }}</div>
        <div class="value">{{ data[item.id] }}</div>
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <div class="key">抽检发布时间</div>
        <div class="value">{{ data.date }}</div>
      </div>
      <div class="right">
        <div class="key">抽检行政机构</div>
        <div class="value">{{ data.region }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: [
        {
          id: "name",
          name: "名称",
        },
        {
          id: "specifications",
          name: "型号",
        },
        {
          id: "item",
          name: "不合格项",
        },
      ],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.unqualified-item {
  border-radius: 10rpx;
  box-shadow: 0px 0px 8rpx 0px rgba(0, 0, 0, 0.2);
  padding: 34rpx 28rpx;
  .top {
    .row {
      margin-bottom: 16rpx;
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .key {
    flex-shrink: 0;
    width: 140rpx;
    font-size: 24rpx;
    color: #999999;

    line-height: 34rpx;
    font-weight: 400;
  }
  .value {
    font-size: 28rpx;
    line-height: 40rpx;
    font-weight: 500;
    color: #000000;
  }
  .bottom {
    margin-top: 48rpx;
    display: flex;
    .key {
      width: auto;
      margin-bottom: 10rpx;
    }
    .left {
      margin-right: 68rpx;
    }
  }
}
</style>
