<template>
  <div class="my-tab">
    <div
      class="scroll"
      :class="hasTransition ? 'transition' : null"
      :style="{
        transform: `translateX(${translateX}px)`,
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
    hasTransition: {
      type: Boolean,
      default: true,
    },
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
    gap() {
      return this.leftArr[1] - this.leftArr[0] - this.widthArr[0];
    },
    translateX() {
      return (
        this.leftArr[this.value] -
        this.percentage * (this.widthArr[this.value] + this.gap)
      );
    },
  },
  created() {},
  mounted() {},
  methods: {
    change(index) {
      this.$emit("input", index);
    },
    async getDomData() {
      let res = await this.$getDomsInfo(".tabs .tab");
      this.leftArr = res.map((one) => one.left);
      this.widthArr = res.map((one) => one.width);
    },
  },
};
</script>

<style scoped lang="scss">
.my-tab {
  position: relative;
  .scroll {
    &.transition {
      transition: all 0.3s cubic-bezier(0.7, 0.51, 0.02, 1.1);
    }
    position: absolute;
    left: 0;
    top: 0;
    bottom: 1px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .white {
      background: white;
      height: 6rpx;
      width: 60rpx;
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    // height: 98rpx;
    justify-content: space-around;
    font-size: 28rpx;
    background: linear-gradient(180deg, #0060ff 0%, #004dcd 100%);
    .tab {
      line-height: 98rpx;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      &.active {
        font-weight: bold;
        color: white;
      }
    }
  }
}
</style>
