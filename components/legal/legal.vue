<template>
  <div class="legal">
    <div class="hight-title">CCC证书</div>
    <div class="status" :style="{ backgroundColor, borderColor }">
      <image mode="widthFix" class="icon" :src="src"></image>
      <div class="name">{{ statusName }}</div>
    </div>
    <div class="form-wrap">
      <div class="form-name">产品参数信息</div>
      <div class="form">
        <key-value
          :data="data"
          :config="config"
          hasBorder
          :valueWidth="470"
        ></key-value>
      </div>
      <div class="has-empty" v-if="hasEmpty">
        *以上信息未查询到的情况，可能是由于CCC证书号提供错误导致，请联系商品网店客服，索要正确的CCC证书号
      </div>
    </div>

    <div class="hight-title se-wen">色温</div>
    <div class="card">
      <my-card
        :title="seWenTitle"
        :subTitle="seWenSubTitle"
        :isSuccess="data.colourTemperature"
      ></my-card>
      <div class="knowledge" @click="toKnowledge('colourTemperature')">知识点></div>
    </div>

    <div class="hight-title guang">光通量</div>
    <div class="card">
      <my-card
        :title="guangTitle"
        :subTitle="guangSubTitle"
        :isSuccess="data.luminousFlux"
      ></my-card>
      <div class="knowledge" @click="toKnowledge('luminousFlux')">知识点></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasOneDifferent:false,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {},
  computed: {
    isExpired(){
      return new Date()> new Date(this.data.effectiveDate)

    },
    config() {
      return [
        {
          id: "certificateNo",
          name: "证书编号",
        },
        {
          id: "productName",
          name: "产品名称",
        },
        {
          id: "punishDate",
          name: "证书发证日期",
        },
        {
          id: "effectiveDate",
          name: "证书有效期",
          lightName: this.isExpired,
          type:'date'
        },
        {
          id: "executeStander",
          name: "执行标准",
        },
        {
          id: "model",
          name: "型号",
          formatter: (val) => this.formatAndCompare(val, "urlModel"),
        },
        {
          id: "producer",
          name: "生产者/制造商",
          formatter: (val) => this.formatAndCompare(val, "urlProducer"),
        },
        {
          id: "authConsignor",
          name: "认证委托人",
          formatter: (val) => this.formatAndCompare(val, "urlConsignor"),
        },
        {
          id: "power",
          name: "功率",
        },
      ];
    },
    seWenTitle() {
      if (this.data.colourTemperature) {
        return `该产品的色温为${this.data.colourTemperature}`;
      }
      return "未查询到该产品的色温";
    },
    seWenSubTitle() {
      if (this.data.colourTemperature) {
        return `*消费者注意确认这个指标与自身实际需求相匹配`;
      }
      return "*消费者应注意该项目关乎照明效果，需要与商家确认清楚，谨慎购买";
    },
    guangTitle() {
      if (this.data.luminousFlux) {
        return `该产品的光通量为${this.data.guang}`;
      }
      return "未查询到该产品的光通量";
    },
    guangSubTitle() {
      if (this.data.luminousFlux) {
        return `*消费者注意确认这个指标与自身实际需求相匹配`;
      }
      return "*消费者应注意该项目关乎照明效果，需要与商家确认清楚，谨慎购买";
    },
    hasEmpty() {
      return this.config.some((one) =>
        ["", undefined].includes(this.data[one.id])
      );
    },
    borderColor() {
    let color='#B7EB8F'
      if(this.isExpired||this.hasOneDifferent){
        color="#fdf9de"
      }else if(this.isNoInfo){
        color="#FF8788"
      }
      return color;
    },
    backgroundColor() {
       let color='#eeffd8'
      if(this.isExpired||this.hasOneDifferent){
        color="#FFF9DC"
      }else if(this.isNoInfo){
        color="#f8dfdf"
      }
      return color
    },
    src() {
      let type='success'
      if(this.isExpired||this.hasOneDifferent){
        type="info"
      }else if(this.isNoInfo){
        type="danger"
      }
      return `/static/${type}.svg`;
    },
    isNoInfo(){
      return !this.data.productName
    },
    statusName() {
      if(this.isExpired){
        return "请注意产品生产日期应在证书有效截止日期前，否则，合规性有疑问，请谨慎购买"
      }else if(this.hasOneDifferent){
        return "该产品信息与CCC证书不一致，合规性有疑问，请谨慎购买"
      }else if(this.isNoInfo){
        return "未查询到该产品的CCC证书，合规性有疑问，请谨慎购买"
      }
      return "该产品信息与CCC证书信息一致，合规性良好"
    },
  },
  mounted() {},
  methods: {
   toKnowledge(page){
     this.$toPage(page)
   },
    checkIsLost(webInfo) {
      return ["", undefined].includes(webInfo);
    },
    checkIsDifferent(a, b) {
      return a !== b;
    },
    formatAndCompare(val, id) {
      let isNOData = this.checkIsLost(val);
      if (isNOData) {
        return '<div class="no">未查询到</div>';
      }
      let valToCompare = this.data[id];

      let isLost = this.checkIsLost(valToCompare);
      let isDifferent = this.checkIsDifferent(val, valToCompare);

      if(isDifferent){
        this.hasOneDifferent = true
      }
      let valStr = `<div>${val}</div>`;
      let tipsStr = isLost
        ? `<div class="red">网页展示商品信息缺失，需向客服核实</div>`
        : isDifferent
        ? `<div class="red">网页展示商品信息不一致，需向客服核实</div>`
        : "";
      let res = valStr + tipsStr;
      return res;
    },
  },
};
</script>

<style scoped lang="scss">
.legal {
  .status {
    padding: 32rpx;
    margin-top: 24rpx;
    border-radius: 4rpx;
    display: flex;
    border: 2rpx solid;
    // justify-content: center;
    // will-change: transform;

    // align-items: center;
    .icon {
      margin-top: 5rpx;
      width: 42rpx;
      flex-shrink: 0;
      margin-right: 16rpx;
    }
    .name {
      font-weight: 500;
      font-size: 28rpx;
      line-height: 48rpx;
    }
  }
  .form-wrap {
    position: relative;
    .form-name {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      text-align: center;
      position: relative;
      display: inline-block;
      // margin: 0 auto;
      margin: 48rpx 0 36rpx 0;

      &::before {
        z-index: -1;
        position: absolute;
        bottom: 0;
        left: -10rpx;
        right: -10rpx;
        top: 50%;
        content: "";
        display: block;
        background: #d9e7ff;
      }
    }

    .has-empty {
      color: #ff2022;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 40rpx;
      margin-top: 16rpx;
      text-align: justify;
    }
  }
  .se-wen {
    margin-top: 52rpx;
  }
  .guang {
    margin-top: 48rpx;
  }
  .card {
    margin-top: 28rpx;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .knowledge {
      margin-top: 16rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      color: #004dcd;
    }
  }
}
</style>
<style lang="scss">
</style>