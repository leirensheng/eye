<template>
  <div class="search">
    <image class="bg" mode="widthFix" src="/static/bg.png"></image>
    <div class="top">
      <div class="title">欢迎使用慧眼识物小程序</div>
      <div class="card">
        <div class="clip-title">我的剪贴板</div>
        <div class="textarea" v-if="value">{{ value }}</div>
        <div class="textarea no-text" v-else>
          请复制淘宝、天猫、京东、拼多多手机端室内照明产品的链接，打开小程序即可自动粘贴
        </div>
        <!-- <textarea
          :maxlength="-1"
          class="textarea"
          v-model="value"
          :placeholder="placeholder"
        /> -->
        <div class="result" v-if="result">
          <image class="icon" mode="widthFix" v-if="src" :src="src"></image>
          <div>{{ result.productName }}</div>
        </div>
        <div class="right" @click="clear">
          <image class="icon" mode="widthFix" src="/static/delete.svg"></image>
          <span class="text">清空</span>
        </div>
      </div>
      <div class="not-support" v-if="notSupport">
        该商品链接不适用于本工具合规性报告查询
      </div>
      <div class="no-info" v-if="isNotComplete && result">
        <div class="no-info-message">
          此链接未收集到必要信息，请您向客服或厂商索要证书编号、制造商或生产厂名称、产品规格型号、功率参数信息
        </div>
        <my-form v-model="form" @isOk="handleIsOk"></my-form>
      </div>
      <button :disabled="isDisabled" class="btn" @click="generateBtnClick">
        {{ btnName }}
      </button>
    </div>
    <div class="bottom">
      <div class="text">深圳市计量质量检测研究院主办</div>
      <div class="subtext">
        消费者报道杂志社有限公司·正选™数据中心提供技术支持
      </div>
    </div>
  </div>
</template>

<script>
import { analyse, generate } from "@/api/eye.js";
import { mapMutations } from "vuex";

import subscribeMixin from "./subscribe";

export default {
  mixins: [subscribeMixin],

  async onShow() {},
  onUnload() {
    uni.$off("analyse");
    uni.$off("loginStatus", this.setLoginStatus);
    this.setClipData("");
  },
  onLoad() {
    uni.$on("loginStatus", this.setLoginStatus);
    uni.$on("analyse", this.start);
  },
  async created() {
    if (this.$store.state.noStartWhenCreated) return;
    // 从介绍页面进来后,读取
    let clipData = await this.$getClip();
    this.setClipData(clipData);

    if (this.$isUrl(clipData)) {
      this.start();
    }
  },
  data() {
    return {
      result: "",
      value: "",
      form: {},
      hasGenerate: false,
      isFormOk: false,
      isLogin: false,
      loading: false,
      placeholder:
        "请复制淘宝、天猫、京东、拼多多手机端室内照明产品的链接，打开小程序即可自动粘贴",
    };
  },
  mounted() {},
  computed: {
    btnName() {
      return this.hasGenerate ? "报告已生成" : "生成合规性报告";
    },
    isNotComplete() {
      if (!this.result) return false;
      let arr = ["certificateNo", "model", "power", "producer"];
      return arr.some((key) => [undefined, ""].includes(this.result[key]));
    },
    isDisabled() {
      return (
        this.value.length === 0 ||
        !this.isPlaformMatch ||
        this.loading ||
        !this.isFormOk ||
        this.hasGenerate
      );
    },
    isPlaformMatch() {
      return ["TB", "TM", "JD", "PDD"].includes((this.result || {}).platform);
    },
    notSupport() {
      let reg =
        /https:\/\/(mobile\.yangkeduo\.com)|(item\.m\.jd\.com)|(m\.tb\.cn)/g;
      return /http/g.test(this.value) && !reg.test(this.value);
    },
    src() {
      if (!this.result || !this.isPlaformMatch) return "";
      return "/static/" + this.result.platform + ".png";
    },
  },
  methods: {
    handleIsOk(val) {
      this.isFormOk = val;
    },
    setLoginStatus(val) {
      this.isLogin = val;
    },
    ...mapMutations(["setClipData", "setNeedRefreshLeft", "setSubscribe"]),

    async start() {
      this.loading = true;
      this.isLogin = await this.$checkLogin();
      this.loading = false;

      this.checkSubscribe();

      let clipData = this.$store.state.clipData;
      this.value = clipData;
      this.$nextTick(() => {
        this.analyseUrl();
      });
    },
    async analyseUrl() {
      if (!this.value) return;
      this.result = null;
      this.loading = true;
      uni.showLoading({
        title: "解析中",
      });
      this.result = await analyse({ url: this.value });
      this.form = { ...this.result };
      uni.hideLoading();
      this.loading = false;
    },

    async generateReport() {
      let weChatNotify = false;
      this.loading = true;
      try {
        await this.subscribe();
        weChatNotify = true;
      } catch (e) {
        weChatNotify = false;
      }
      uni.showLoading({
        title: "生成中",
      });
      await generate({
        ...this.form,
        weChatNotify,
      });
      this.setNeedRefreshLeft(true);
      uni.hideLoading();
      this.loading = false;
      this.toReport(weChatNotify);
    },
    toReport(isSubscribeOk) {
      this.hasGenerate = true;
      this.setSubscribe(isSubscribeOk);
      uni.switchTab({
        url: "/pages/user/index",
      });
    },
    clear() {
      this.hasGenerate = false;
      this.value = "";
      this.form = {};
      this.result = "";
      this.setClipData("");
    },
    async generateBtnClick() {
      if (!this.isLogin) {
        this.$toLogin();
        return;
      }
      await this.generateReport();
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  position: relative;
  padding-top: 60rpx;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 48rpx;
  .bg {
    position: absolute;
    z-index: -1;
    top: -1px;
    width: 100%;
  }
  .top {
    .title {
      white-space: nowrap;
      color: white;
      font-weight: bold;
      font-size: 40rpx;
      text-align: center;
      line-height: 56rpx;
      margin-bottom: 30rpx;
    }
    .card {
      border-radius: 10rpx;
      box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.15);
      width: 702rpx;
      background: white;
      margin: 0 auto;
      padding: 40rpx 24rpx;
      position: relative;
      // min-height: 450rpx;
      .clip-title {
        text-align: center;
        line-height: 44rpx;
        font-weight: 400;
        font-size: 32rpx;
      }
      .textarea {
        height: 240rpx;
        font-size: 28rpx;
        word-break: break-all;
        // height: 240rpx;
        margin-top: 32rpx;
        width: 100%;
        line-height: 40rpx;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
      }
      .no-text {
        color: #999999;
      }
      .right {
        position: absolute;
        right: 24rpx;
        top: 40rpx;
        // float: right;
        display: flex;
        // justify-content:center;
        align-items: center;
        color: #004dcd;
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 400;
        .icon {
          width: 28rpx;
          margin-right: 8rpx;
        }
      }
      .result {
        margin-top: 48rpx;
        display: flex;
        border-top: 1rpx solid #e8e8e8;
        padding-top: 48rpx;
        font-weight: 500;
        line-height: 40rpx;
        font-size: 28rpx;
        .icon {
          width: 72rpx;
          flex-shrink: 0;
          margin-right: 16rpx;
        }
      }
    }
    .btn {
      margin-top: 48rpx;
    }
    .not-support,
    .no-info-message {
      margin-top: 32rpx;
      margin-bottom: -32rpx;
      color: #ff0003;
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      background: white;
    }
    .no-info-message {
      margin-bottom: 32rpx;
      padding: 0 24rpx;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80rpx;
    color: #999999;
    .text {
      font-size: 28rpx;
      line-height: 40rpx;
      margin-bottom: 8rpx;
    }
    .subtext {
      font-size: 24rpx;
      line-height: 34rpx;
    }
  }
}
</style>
