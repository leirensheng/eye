<template>
  <div class="user-page">
    <div class="top">
      <div class="left">
        <div class="icon-wrap">
          <image class="icon" mode="widthFix" :src="src" @click="clickName" />
        </div>
        <span @click="clickName">{{ username }}</span>
      </div>
    </div>
    <div class="bottom">
      <div class="history-wrap">
        <history
          :isShow="isShow"
          :isLogin="isLogin"
          :pageHeight="pageHeight"
          :isFixedTop="isFixedTop"
          :fixedTop="fixedTop"
        ></history>
      </div>
      <div class="tips">
        <span>如何生成报告？</span>
        <span class="blue" @click="toHome">操作指南></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      isShow: false,
      user: null,
      isLogin: false,
      user: "",
      fixedTop: 1,
      scrollTop: 0,
      pageHeight: 0,
    };
  },
  computed: {
    isFixedTop() {
      return this.scrollTop >= this.fixedTop;
    },
    src() {
      return this.isLogin ? this.user.avatar : "/static/no-user.svg";
    },
    username() {
      return this.isLogin ? this.user.nickName : "登录/注册";
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onPullDownRefresh() {
    uni.$emit("pullDown");
  },
  async onReachBottom() {
    uni.$emit("setReachBottom");
  },
  onLoad() {
    uni.$on("stopPullDown", () => {
      uni.stopPullDownRefresh();
    });
    uni.$on('userPageIsShow',(val)=>{
      this.isShow = val
    })
    this.getFixedTop();
  },
  onUnLoad() {
    uni.$off("stopPullDown");
    uni.$off("userPageIsShow");
  },
  onHide() {
    this.isShow = false;
  },
  async onShow() {
    this.isShow = true;
    this.isLogin = await this.$checkLogin();
    this.user = uni.getStorageSync("user");
  },
  methods: {
    ...mapMutations(["setNoStartWhenCreated"]),
    async getFixedTop() {
      this.fixedTop = await this.$getDomInfo(
        ".user-page .top",
        false,
        "height"
      );
    },
    clickName() {
      if (!this.isLogin) {
        this.$toLogin();
      }
    },
    toHome() {
      this.setNoStartWhenCreated();
      uni.setStorageSync("isFromUser", true);
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.user-page {
  min-height: 100vh;
  padding-bottom: 48rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .bg {
    position: absolute;
    z-index: -1;
    top: -1px;
    width: 100%;
  }
  .top {
    width: 100%;
    height: 206rpx;
    display: flex;
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, #005cf6 0%, #004dcd 100%);
    .left {
      margin-left: 62rpx;
      height: 90rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32rpx;
      .icon-wrap {
        border-radius: 50%;
        width: 90rpx;
        height: 90rpx;
        border: 2rpx solid #fff;
        margin-right: 16rpx;
        overflow: hidden;
        will-change: transform;
        .icon {
          width: 90rpx;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    flex: 1;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .history-wrap {
      width: 100%;
    }

    .tips {
      padding-right: 24rpx;
      display: flex;
      justify-content: center;
      color: #292929;
      font-size: 28rpx;
      .blue {
        color: rgb(60, 87, 231);
      }
    }
  }
}
</style>
