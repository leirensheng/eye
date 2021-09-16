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
        <history-search :data="history" :noMore="noMore"></history-search>
      </div>
    </div>
    <reject-message v-model="isShowReject"></reject-message>
    <agree-message v-model="isShowAgree"></agree-message>
  </div>
</template>

<script>
import { getHistory } from "@/api/eye.js";
import { mapState } from "vuex";
import mock from "./mock.js";
let needRefresh = false
let needRefreshCollect = false
export default {
  data() {
    return {
      loading: false,
      history: [],
      collected: 0,
      page: 1,
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
    params() {
      return {
        collected: this.collected,
        page: this.page,
      };
    },

    ...mapState(["isReachBottom"]),
  },
  watch: {
    isReachBottom() {
      this.$store.commit("setReachBottom", false);
      if(this.noMore || this.loading) return
      this.page++;
      this.getData();
    },
    isLogin(val) {
      if (val) {
        this.refresh()
      }
    },
    collected() {
      this.refresh()
    },
    isShow: {
      immediate: true,
      handler(val) {
        if (val) {
          this.checkAndLoadData();
          this.checkIfShowPic();
          // this.checkIfRefreshCollectData()
        }
      },
    },
  },
  onLoad(){
    uni.$on('refreshHistory',()=>{
      needRefresh = true
    })
    uni.$on('refreshCollect',()=>{
      needRefreshCollect = true
    })
  },
  methods: {
    refresh(){
      this.page = 1
      this.history = []
      this.noMore = false;
      this.getData();
    },
    checkAndLoadData() {
      if (needRefresh||(needRefreshCollect&& this.collected)) {
        try {
          this.refresh()
        } catch (e) {
          console.log(e);
        }
      }
      needRefresh = false
      needRefreshCollect = false
    },
    checkIfShowPic() {
      let isSubscribeOk = uni.getStorageSync("isSubscribeOk");
      if (typeof isSubscribeOk === "boolean") {
        this.isShowAgree = this.isSubscribeOk;
        this.isShowReject = !this.isSubscribeOk;
        uni.removeStorageSync("isSubscribeOk");
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
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
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
