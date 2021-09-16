<template>
  <div class="certificate">
    <div class="hight-title">健康照明产品质量等级认证证书</div>
    <div class="wrap">
      <image mode="widthFix" class="pic" :src="src"></image>
      <key-value :data="data" :config="config" 
      rowPadding="16rpx"
      noDataShowDash
      :valueFontWeight="800"
      :valueWidth="470"></key-value>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: [
        {
          id: "paramName",
          name: "参数名称",
        },
        {
          id: "grade",
          name: "等级",
        },
        {
          id: "certificateAuthority",
          name: "发证机构",
        },
        {
          id: "certificateNo",
          name: "证书编号",
        },
        {
          id: "publishDate",
          type: "date",
          name: "证书发证日期",
        },
        {
          id: "clientName",
          name: "委托人名称及地址",
          formatter: (val) => this.formatAddr(val, "clientAddress"),
        },
        {
          id: "manufacturer",
          name: "制造商名称及地址",
          formatter: (val) => this.formatAddr(val, "manufacturerAddress"),
        },
        {
          id: "manufacturerAddress",
          name: "生产商名称及地址",
          formatter: (val) => this.formatAddr(val, "producerAddress"),
        },
        {
          id: "productName",
          name: "产品名称",
        },
        {
          id: "xinghao",
          name: "产品规格、型号（系列）",
        },
        {
          id: "standerNo",
          name: "依据的产品检测标准编号（含年号）和/或其他技术要求",
        },
        {
          id: "authType",
          name: "认证模式",
        },
        {
          id: "gainDate",
          name: "获证日期",
        },
        {
          id: "effectiveDate",
          name: "有效期",
        },
        {
          id: "changeDate",
          name: "换发日期",
        },
      ],
    };
  },
  computed: {
    src() {
      if(!this.data.grade) return ''
      return `/static/level${this.data.grade.length}.png`;
    },
  },
  props:{
    data:{
      type:Object,
      default:()=>({})
    },
  },
  created() {},
  mounted() {},
  methods: {
    formatAddr(val, id) {
      if (!val) return "-";
      let addr = "";
      if (this.data[id]) {
        addr = `<div>${this.data[id]}</div>`;
      }
      return `<div>${val}</div>` + addr;
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  background: #f3f2f8;
  box-shadow: 0px 0px 8rpx 0px rgba(0, 0, 0, 0.2);
  border: 10rpx solid #221f52;
  padding: 66rpx 32rpx 66rpx 40rpx;
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pic {
    display: inline-block;
    margin: 0 auto;
    width: 210rpx;
    margin-bottom: 48rpx;
  }
}
</style>
<style lang="scss">

</style>