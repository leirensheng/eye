<template>
  <div class="history">
    <div class="top" ref="top">
      <div class="title">历史记录</div>
      <div class="right" v-if="isLogin">
        <my-radio v-model="collected"></my-radio>
      </div>
    </div>
    <div class="content">
      <div v-if="!isLogin" class="no-login" @click="$toLogin">
        <div>你还没有登录，</div>
        <div>请登录后查看历史报告></div>
      </div>

      <div class="no-data" v-else-if="!loading && !history.length">
        <image class="icon" mode="widthFix" src="/static/no-data.svg"></image>
        <div class="name">暂无历史报告</div>
      </div>
      <div class="has-content" v-else>
        <history-search
          :data="history"
          :isShowFrame="isShowFrame"
          :noMore="noMore"
        ></history-search>
      </div>
    </div>
    <reject-message v-model="isShowReject"></reject-message>
    <agree-message v-model="isShowAgree"></agree-message>
  </div>
</template>

<script>
import { getHistory } from "@/api/eye.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isReachBottom: false,
      loading: false,
      history: [],
      collected: 0,
      scrollId: "",
      isShowFrame: false,
      noMore: false,
      isShowReject: false,
      isShowAgree: false,
    };
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },

    isShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(["needRefreshAll", "needRefreshCollect"]),
    params() {
      return {
        collected: this.collected,
        scrollId: this.scrollId,
      };
    },
  },
  watch: {
    isReachBottom() {
      this.isReachBottom = false;
      if (this.noMore || this.loading) return;
      this.getData();
    },
    isLogin(val) {
      if (val) {
        this.refresh();
      }
    },
    collected() {
      this.refresh();
    },
    isShow: {
      immediate: true,
      handler(val) {
        if (val) {
          this.checkAndLoadData();
          this.checkIfShowPic();
        }
      },
    },
  },
  created() {
    uni.$on("setReachBottom", () => {
      this.isReachBottom = true;
    });
    uni.$on("pullDown", async () => {
      await this.refresh();
      uni.$emit("stopPullDown");
    });
  },
  beforeDestroy() {
    uni.$off("pullDown");
    uni.$off("setReachBottom");
  },
  methods: {
    ...mapMutations([
      "setNeedRefreshAll",
      "setNeedRefreshCollect",
      "setSubscribe",
    ]),
    async refresh() {
      this.isShowFrame = true;
      this.scrollId = "";
      this.history = [];
      this.noMore = false;
      let start = Date.now();
      await this.getData();

      let useTime = Date.now() - start;
      let minTime = 350;
      if (useTime < minTime) {
        setTimeout(() => {
          this.loading = false;
          this.isShowFrame = false;
        }, minTime - useTime);
      } else {
        this.loading = false;
        this.isShowFrame = false;
      }
    },
    checkAndLoadData() {
      if (this.needRefreshAll || (this.needRefreshCollect && this.collected)) {
        try {
          this.refresh();
        } catch (e) {
          console.log(e);
        }
      }
      this.setNeedRefreshAll(false);
      this.setNeedRefreshCollect(false);
    },
    checkIfShowPic() {
      let isSubscribeOk = this.$store.state.isSubscribeOk;
      if (typeof isSubscribeOk === "boolean") {
        this.isShowAgree = this.isSubscribeOk;
        this.isShowReject = !this.isSubscribeOk;
        this.setSubscribe(undefined);
      }
    },
    checkIsNoMore(data) {
      this.noMore = data.length < 10;
    },
    async getData() {
      if (this.noMore || this.loading || !this.isLogin) return;
      this.loading = true;
      try {
        let data = await getHistory(this.params);
        if (data.length) {
          this.scrollId = data.slice(-1)[0].id;
        }
        this.checkIsNoMore(data);
        this.history.push(...data);
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.history {
  padding: 28rpx 24rpx;
  padding-top: 0;
  color: black;
  text-align: left;

  .top {
    border-bottom: 1rpx solid rgb(224, 224, 224);
    padding: 28rpx 24rpx;
    margin: 0 -24rpx;
    position: sticky;
    top: 0;
    z-index: 2;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-weight: 400;
      font-size: 32rpx;
      color: black;
      line-height: 44rpx;
    }
  }
  .content {
    .no-login,
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: black;
      font-weight: 400;
      text-align: center;
    }
    .no-data {
      transform: translateX(10rpx);
      .name {
        transform: translateX(-10rpx) translateY(12px);
      }
      .icon {
        width: 476rpx;
      }
    }
    .has-content {
      width: 100%;
    }
  }
}
</style>
