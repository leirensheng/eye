<template>
  <div class="scroll-tab">
    <div
      class="scroll"
      :style="{
        transform: `translate(${translateX}px)`,
        width: `${widthArr[value]}px`,
      }"
    >
      <div class="white"></div>
    </div>
    <div class="tabs">
      <div
        class="tab"
        v-for="(one, index) in tabs"
        :key="one.name"
        @click="change(index)"
        :class="index === value && 'active'"
      >
        {{ one.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftArr: [],
      widthArr: [],
    };
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    "tabs.length": {
      immediate: true,
      handler() {
        this.getDomData();
      },
    },
  },
  computed: {
    translateX() {
      return this.leftArr[this.value];
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(index) {
      this.$emit("input", index);
    },
    async getDomData() {
      let res = await this.$getDomsInfo(".scroll-tab .tab");
      let tabsLeft = await this.$getDomInfo(".scroll-tab .tabs", false, "left");
      this.leftArr = res.map((one) => one.left - tabsLeft);

      console.log(this.leftArr);
      this.widthArr = res.map((one) => one.width);
    },
  },
};
</script>

<style scoped lang="scss">
.scroll-tab {
  position: relative;
  //   width: 420rpx;
  .scroll {
    transition: all 0.3s cubic-bezier(0.7, 0.51, 0.02, 1.1);
    position: absolute;
    left: 0;
    bottom: 4rpx;
    top: 4rpx;
    z-index: 1;
    background: linear-gradient(180deg, #0060ff 0%, #004dcd 100%);
    border-radius: 200rpx;
  }
  .tabs {
    position: relative;
    z-index: 2;
    background: transparent;
    display: inline-block;
    font-size: 28rpx;
    border-radius: 200rpx;
    border: 2rpx solid #004dcd;
    padding: 4rpx;
    .tab {
      display: inline-block;
      background: transparent;
      padding: 0 42rpx;
      line-height: 44rpx;
      font-weight: 400;
      color: #004dcd;
      &.active {
        font-weight: bold;
        color: white;
      }
    }
  }
}
</style>
