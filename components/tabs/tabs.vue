<template>
  <div class="tabs">
    <div
      class="tab-pane-view"
      @touchstart="touchstart"
      @touchmove="touchMove"
      @touchend="touchend"
    >
      <div
        class="tab-pane-group"
        :class="hasTransition ? 'transition' : null"
        :style="{
          transform: `translateX(${translateX})`,
          width: `${tabList.length * 100}%`,
          height: `${curTabHeight}`,
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
let touchX = 0;
let touchY;
let windowWidth;
let startTime;
let touchDirection;
export default {
  data() {
    return {
      hasTransition: false,
      percentage: 0,
    };
  },
  computed: {
    translateX() {
      return (-this.value + this.percentage) * windowWidth + "px";
    },
    curTabHeight() {
      if (this.contentHeightArr) {
        return this.contentHeightArr[this.value] + "px";
      }
      return "auto";
    },
    minContentHeight() {
      return this.contentHeightArr
        ? Math.min(...this.contentHeightArr)
        : "auto";
    },
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    contentHeightArr: {
      type: [Array, null],
      default: null,
    },
    tabList: {
      Array: Number,
      default: [],
    },
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    windowWidth = systemInfo.windowWidth;
  },
  mounted() {},
  methods: {
    touchstart(e) {
      if (e.touches.length === 1) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        startTime = Date.now();
      }
      e.preventDefault();
    },
    touchend(e) {
      touchDirection = undefined;
      if(!this.percentage) return


      let isDistanceOk =
        Math.abs(this.percentage) > 0.5 && Math.abs(this.percentage) <= 1;

      let isSpeedOk =
        Math.abs(this.percentage) > 0.2 && Date.now() - startTime <= 200;
      let direction;

      if (isDistanceOk || isSpeedOk) {
        if (this.percentage > 0) {
          direction = 1;
        } else {
          direction = -1;
        }
      } else {
        direction = 0;
      }
      console.log("end", this.percentage);
      console.log("translate", this.translateX);

      this.hasTransition = true;
      this.percentage = 0;
      this.changeTab(direction);

      e.preventDefault();
    },

    changeTab(val) {
      this.$emit("input", this.value - val);
    },

    isSwipeTo(direction, percentage) {
      if (direction === "left") {
        return percentage > 0;
      }

      if (direction === "right") {
        return percentage < 0;
      }
    },
    getDirection(offsetX, offsetY) {
      touchDirection =
        Math.abs(offsetY) > Math.abs(offsetX) ? "vertical" : "horizontal";
    },
    touchMove(e) {
      e.preventDefault();
      this.hasTransition = false;
      let target;
      if (typeof e.touches !== "undefined" && e.touches.length === 1) {
        target = e.touches[0];
        let offset = target.clientX - touchX;
        let offsetY = target.clientY - touchY;

        if (!touchDirection) {
          this.getDirection(offset, offsetY);
          return;
        } else if (touchDirection === "vertical") {
          return;
        }

        this.percentage = offset / windowWidth;
        if (this.percentage > 0.95) this.percentage = 0.95;
        if (this.percentage < -0.95) this.percentage = -0.95;

        if (
          (this.value === 0 && this.isSwipeTo("left", this.percentage)) ||
          (this.value === this.tabList.length - 1 &&
            this.isSwipeTo("right", this.percentage))
        ) {
          this.percentage = 0;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  .tab-pane-view {
    width: inherit;
    overflow: hidden;
    height: auto;
    .tab-pane-group {
      &.transition {
        transition: transform 0.25s;
      }
    }
  }
}
</style>