<template>
  <div class="history-item" @click="toDetail">
    <image class="left" mode="widthFix" :src="src" v-if="src"></image>
    <div class="right">
      <div class="name">{{ item.productName }}</div>
      <div class="bottom">
        <div class="date">{{ $formatTime(item.createDate) }}</div>
        <div class="status" :class="item.genStatus === 0 && 'light'">
          {{ getStatus(item.genStatus) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    src() {
      if(!this.item.platform ) return ''
      return "/static/" + this.item.platform + ".png";
    },
  },
  created() {},
  mounted() {},
  methods: {
    toDetail() {
      uni.navigateTo({
        url: "/pages/report/index?id=" + this.item.id,
      });
    },
    getStatus(status) {
      let map = {
        0: "需要花费1分钟生成...",
        1: "报告已生成",
      };
      return map[status];
    },
  },
};
</script>

<style scoped lang="scss">
.history-item {
  box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.15);
  display: flex;
  padding: 32rpx 24rpx 32rpx 16rpx;
  .left {
    flex-shrink: 0;
    width: 84rpx;
    margin-right: 16rpx;
  }
  .right {
    flex: 1;
    font-size: 28rpx;
    line-height: 40rpx;
    .name {
      color: black;
      font-weight: 500;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999999;
      margin-top: 16rpx;
      .status.light {
        color: rgb(59, 85, 226);
      }
    }
  }
}
</style>
