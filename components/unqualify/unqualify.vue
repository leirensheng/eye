<template>
  <div class="unqualify">
    <div class="hight-title">{{ title }}</div>

    <div class="no-data" v-if="showUnqualifiedItems.length === 0">
      <image class="icon" mode="widthFix" src="/static/no-data.svg"></image>
      <div class="desc">{{ noDataDesc }}</div>
    </div>

    <div class="items" v-else>
      <div
        class="item"
        v-for="(item, index) in showUnqualifiedItems"
        :key="index"
      >
        <unqualified-item :data="item"></unqualified-item>
      </div>
    </div>
    <div class="calc" v-if="allUnqualifiedItems.length">
      <div class="left">共有{{ allUnqualifiedItems.length }}条数据</div>
      <div v-if="!isNoMoreUnqualified" class="right" @click="seeMore">
        <div>展开更多</div>
        <image class="icon" mode="widthFix" src="/static/down.svg"></image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    allUnqualifiedItems: {
      type: Array,
      default: () => [],
    },
    noDataDesc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isNoMoreUnqualified: false,
      unqualifiedMoreTimes: 0,
    };
  },
  computed: {
    showUnqualifiedItems() {
      let end = this.unqualifiedMoreTimes * 15 + 3;
      if (end >= this.allUnqualifiedItems.length) {
        this.isNoMoreUnqualified = true;
      }
      return this.allUnqualifiedItems.slice(0, end);
    },
  },
  created() {},
  mounted() {},
  methods: {
    seeMore() {
      this.unqualifiedMoreTimes++;
    },
  },
};
</script>

<style scoped lang="scss">
.unqualify {
  margin-bottom: 48rpx;
  .items {
    padding: 32rpx 0 16rpx 0;
    .item {
      margin-bottom: 32rpx;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .calc {
    font-size: 28rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      color: #999;
    }
    .right {
      color: #004dcd;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        margin-left: 10rpx;
        width: 26rpx;
      }
    }
  }
}
</style>
