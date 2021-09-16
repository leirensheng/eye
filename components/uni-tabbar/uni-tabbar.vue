<template>
  <view class="bottom">
    <div class="left" @click="switchTab('search')">
      <img
        v-if="isActiveSearch"
        class="icon"
        src="/static/search-active.svg"
        alt=""
      />
      <img v-else class="icon" src="/static/search.svg" alt="" />

      <span class="name" :class="isActiveSearch && 'active'">合规检查</span>
    </div>

    <div class="right" @click="switchTab('user')">
      <img
        v-if="isActiveUser"
        class="icon"
        src="/static/user-active.svg"
        alt=""
      />
      <image
        v-else
        class="icon"
        src="/static/user.svg"
        alt=""
        mode="widthFix"
      ></image>
      <span class="name" :class="isActiveUser && 'active'">我的报告</span>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isActiveUser: true,
      isActiveSearch: false,
    };
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "user",
    },
  },
  created() {
    this.changeTab(this.value);
  },
  watch: {
    value() {
      this.changeTab(this.value);
    },
  },
  methods: {
    async scan() {
      if (!this.isLogin) {
        this.$toLogin();
        return;
      }
      uni.navigateTo({
        url: "/pages/scan/camera",
      });
      return;
    },
    changeTab(tab) {
      if (tab === "user") {
        this.isActiveUser = true;
        this.isActiveSearch = false;
      } else {
        this.isActiveUser = false;
        this.isActiveSearch = true;
      }
    },
    switchTab(tab) {
      this.$emit("input", tab);
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  box-sizing: content-box;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  width: 100%;
  height: 100rpx;
  z-index: 7;
  background-color: white;
  display: flex;

box-shadow: 0px -2rpx 8rpx 0px rgba(0,0,0,0.15);
  .left{
    border-right: 1rpx solid #D8D8D8;
  }
  .left,
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 44rpx;
      height: 44rpx;
    }
    .name {
      margin-top: 5rpx;
      line-height: 34rpx;
      font-size: 24rpx;
      color: #999999;
      &.active {
        color: #004dcd;
      }
    }
  }
}
</style>
