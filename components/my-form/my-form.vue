<template>
  <div class="form">
    <div class="row" v-for="item in data" :key="item.id">
      <label
        class="label"
        :class="item.isRequired ? 'required' : null"
        :for="item.id"
        >{{ item.name }}：</label
      >
      <input
        :id="item.id"
        class="uni-input"
        :value="value[item.id]"
        @input="(e) => handleChange(e, item.id)"
        :placeholder="item.placeholder || '请输入' + item.name"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          name: "证书编号",
          id: "certificateNo",
          isRequired: true,
        },
        {
          name: "制造商/生产厂",
          id: "producer",
          isRequired: true,
          placeholder: "请输入公司名称",
        },
        {
          name: "型号",
          id: "model",
          isRequired: true,
        },
        {
          name: "功率",
          id: "power",
          placeholder: "请输入产品功率",
        },
      ],
    };
  },
  created() {},
  computed: {
    isOk() {
      return this.data
        .filter((one) => one.isRequired)
        .every((one) => ![undefined, ""].includes(this.value[one.id]));
    },
  },
  watch:{
    isOk(val){
      console.log('isOk',val)
      this.$emit('isOk',val)
    }
  },
  props: {
    value: {
      type: Object,
      defalut: () => ({}),
    },
  },

  methods: {
    handleChange(e, id) {
      let newValue = { ...this.value, [id]: e.detail.value };
      this.$emit("input", newValue);
    },
    checkParams() {
      //   let fields = ["no", "clientName", "productName", "specifications"];
      //   return !fields.every((key) => this.value[key] === "");
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  margin: 0 24rpx;
  .row {
    position: relative;
    border-bottom: 1rpx solid #e8e8e8;
    border-top: 1rpx solid #e8e8e8;
    padding: 32rpx 24rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .label {
      min-width: 250rpx;
      position: relative;
      &.required::before {
        content: "*";
        color: red;
        position: absolute;
        top: 10%;
        left: -15rpx;
      }
    }
    :nth-child(2) {
      flex: 1;
    }
    input {
      height: 100%;
    }
  }
}
</style>
