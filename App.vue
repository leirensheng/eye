<script>
import { mapMutations } from "vuex";

export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  async onShow() {
    console.log("App Show");
    // 首次进入进入介绍页面,不跳转,不读取
    if (!this.$store.state.hasShowTips) {
      return;
    }
    let clipData = await this.$getClip();
    this.setClipData(clipData)
    if (clipData.indexOf("http") !== -1) {
      uni.switchTab({
        url: "/pages/search/index",
      });
      uni.$emit("analyse");
    }
  },
  methods:{
    ...mapMutations(["setClipData"]),
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #fff;
}

/*每个页面公共css */
view,
text,
span,
div {
  box-sizing: border-box;
  font-family: 微软雅黑;
}
.safe-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.btn {
  border-radius: 50rpx;
  height: 88rpx;
  width: 560rpx;
  color: white;
  background: linear-gradient(180deg, #0060ff 0%, #004dcd 100%);
  font-size: 36rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  &[aria-disabled="true"] {
    background: linear-gradient(180deg, #c3c3c3 0%, #999999 100%);
    color: white !important;
  }
}

.btn1 {
  border-radius: 4px;
  background-color: #355dee;
  height: 80rpx;
  font-size: 32rpx;
  width: 100%;
  // width: 702rpx;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-primary {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #355dee;
  color: #355dee;
  height: 80rpx;
  font-size: 32rpx;
  // width: 702rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sticky {
  position: sticky;
  top: 0;
  z-index: 33;
}
.hight-title {
  font-size: 32rpx;
  line-height: 44rpx;
  color: rgba(0, 0, 0, 0.85);
  padding-left: 16rpx;
  border-left: 12rpx solid #004dcd;
  // line-height: 1;
  font-weight: 500;
}
</style>
