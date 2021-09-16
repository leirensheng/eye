<template>
  <div class="my-tab">
    <div
      class="scroll"
      :style="{ transform: `translateX(${leftArr[value]}px)`, width: `${widthArr[value]}px` }"
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
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  mounted() {
    this.getDomData();
  },
  methods: {
    change(index) {
      this.$emit("input", index);
    },
    getDomData() {
      const query = uni.createSelectorQuery().in(this);
      query
        .selectAll(".tabs .tab")
        .boundingClientRect((rect) => {
          this.leftArr = rect.map((one) => one.left);
          this.widthArr = rect.map((one) => one.width);
        })
        .exec();
    },
  },
};
</script>

<style scoped lang="scss">
.my-tab {
  position: relative;
  .scroll {
    transition: all 0.3s  cubic-bezier(0.7, 0.51, 0.02, 1.1);
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
    padding: 0 24rpx;
    // height: 98rpx;
    justify-content: space-between;
    font-size: 28rpx;
    background: linear-gradient(
      180deg,
      #0060ff 0%,
      #004dcd 100%
    );
    .tab {
      line-height: 98rpx;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      &.active {
        color: white;
      }
    }
  }
}
</style>
