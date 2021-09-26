<template>
  <div class="introduce" v-if="isReady">
    <swiper
      class="swiper"
      :current="current"
      @change="handleChange"
      :indicator-dots="false"
      :autoplay="false"
    >
      <swiper-item>
        <div class="first item">
          <image class="icon" mode="widthFix" src="/static/logo.png"></image>
          <div class="text">欢迎使用慧眼识物小程序</div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="second item">
          <image class="icon" mode="widthFix" src="/static/second.png"></image>
          <div class="title">专注室内照明</div>
          <div class="subtext">
            可查询淘宝、天猫、京东、拼多多上产品的合规性报告
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="third item">
          <div class="icon-wrap">
            <image class="icon" mode="widthFix" src="/static/third.png">
            </image>
            <div class="top-text">1、点击分享按钮</div>
            <div class="left-text">2、复制链接</div>
          </div>

          <div class="title">复制商品链接</div>
          <div class="subtext">使用手机端淘宝、天猫、京东、拼多多</div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="fourth item">
          <div class="icon-wrap">
            <image
              class="icon"
              mode="widthFix"
              src="/static/fourth.png"
            ></image>
            <div class="right-text">3、生成报告</div>
          </div>
          <div class="title">打开小程序</div>
          <div class="subtext">自动获取剪贴板链接，点击按钮生成合规性报告</div>
        </div>
      </swiper-item>
    </swiper>
    <div class="bottom">
      <button class="next-btn" v-if="current < 3" @click="next">下一步</button>
      <button class="next-btn open-btn" v-if="current === 3" @click="open">
        立即开启
      </button>
      <div class="dots">
        <div
          class="dot"
          v-for="(item, index) in 4"
          :key="index"
          :class="item === current && 'active'"
          @click="toCurrent(item)"
        ></div>
      </div>
    </div>
    <div class="right-btn" @click="open" v-if="current !== 3">跳过</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      current: 0,
      isReady:false
    };
  },
  computed: {},
  onLoad({ isFromUser }) {
    if (!isFromUser && uni.getStorageSync("hasShowTips")) {
      uni.switchTab({
        url: "/pages/search/index",
      });
      return;
    }
    this.isReady = true
    uni.setStorageSync("hasShowTips", true);
    this.setAppShowRead(false);
  },
  onUnload() {
    this.setAppShowRead(true);
  },
  mounted() {},
  methods: {
    ...mapMutations(["setAppShowRead"]),
    open() {
      uni.switchTab({
        url: "/pages/search/index",
      });
    },
    next() {
      this.current++;
    },
    toCurrent(i) {
      this.current = i;
    },
    handleChange(e) {
      this.current = e.detail.current;
    },
  },
};
</script>

<style scoped lang="scss">
.introduce {
  height: 100vh;
  position: relative;
  .swiper {
    height: 100vh;
    width: 100%;
    .item {
      height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .first {
      .icon {
        width: 160rpx;
      }
      .text {
        line-height: 66rpx;
        font-weight: 400;
        color: black;
        font-size: 48rpx;
        margin-top: 48rpx;
      }
    }
    .second,
    .third,
    .fourth {
      .title {
        font-size: 44rpx;
        font-weight: 500;
        line-height: 60rpx;
        margin-bottom: 16rpx;
      }
      .subtext {
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 400;
      }
    }
    .second {
      height: 80vh;
      .icon {
        width: 620rpx;
        margin-bottom: 90rpx;
      }
    }
    .third {
      height: 80vh;
      .icon-wrap {
        position: relative;
        font-size: 36rpx;
        font-weight: 800;
        .icon {
          transform: translateX(-4.3%);
          width: 500rpx;
          margin-bottom: 50rpx;
        }
        .top-text {
          position: absolute;
          color: #0058ea;
          top: 0;
          left: 50%;
          white-space: nowrap;
          transform: translate(-60%, -100%);
        }
        .left-text {
          position: absolute;
          left: 0;
          top: 59%;
          transform: translate(-50%);
          color: #0058ea;
        }
      }
    }
    .fourth {
      height: 80vh;
      .icon-wrap {
        position: relative;
        font-size: 36rpx;
        font-weight: bold;
        .icon {
          width: 570rpx;
          margin-bottom: 52rpx;
        }
        .right-text {
          color: #0058ea;
          position: absolute;
          right: 0;
          bottom: 14%;
          transform: translate(38%);
        }
      }
    }
  }
  .bottom {
    position: absolute;
    width: 70%;
    bottom: calc(constant(safe-area-inset-bottom) + 128rpx);
    bottom: calc(env(safe-area-inset-bottom) + 128rpx);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .next-btn {
      border-radius: 50rpx;
      width: 300rpx;
      height: 88rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 36rpx;
      font-weight: 500;
      border: 2rpx solid #999999;
      margin-bottom: 48rpx;
      background: white;
      &:active {
        background: rgb(243, 243, 243);
      }
    }
    .open-btn {
      border: none;
      color: white;
      background: linear-gradient(180deg, #0060ff 0%, #004dcd 100%);
      &:active {
        background: linear-gradient(180deg, #005bec 0%, #0145b1 100%);
      }
    }
    .dots {
      display: flex;
      justify-content: center;
      align-items: center;
      .dot {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        background: #e8e8e8;
        margin: 0 18rpx;
        &.active {
          width: 36rpx;
          height: 16rpx;
          background: #004dcd;

          border-radius: 50rpx;
        }
      }
    }
  }
  .right-btn {
    position: absolute;
    right: 48rpx;
    top: 32rpx;
    color: white;
    font-weight: 400;
    font-size: 26rpx;
    border-radius: 30rpx;
    line-height: 56rpx;
    width: 132rpx;
    text-align: center;
    background: #999999;
  }
}
</style>
