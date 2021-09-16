<template>
  <div class="form">
    <div class="row" v-for="item in data" :key="item.id">
      <label class="label" :for="item.id">{{ item.name }}：</label>
      <input
        :name="item.id"
        class="uni-input"
        :value="value[item.id]"
        @input="(e)=>handleChange(e,item.id)"
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
          id: "no",
        },
        {
          name: "制造商/生产厂",
          id: "clientName",
          placeholder: "请输入公司名称",
        },
        {
          name: "型号",
          id: "specifications",
        },
        {
          name: "功率",
          id: "category",
          placeholder: "请输入产品功率",
        },
      ],
    };
  },
  created() {},
  props: {
    value: {
      type: Object,
      defalut: () => ({}),
    },
  },
  watch: {
  },

  methods: {
      handleChange(e,id){
         let newValue = {...this.value,[id]:e.detail.value}
         this.$emit('input',newValue)
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
    border-bottom: 1rpx solid #E8E8E8;
    border-top: 1rpx solid #E8E8E8;
    padding: 32rpx 24rpx;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .label {
      min-width: 250rpx;
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
