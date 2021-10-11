<template>
  <div class="quality">
    <unqualify
      :allUnqualifiedItems="data.category"
      title="近3年该产品及生产企业的不合格发现批次"
      noDataDesc="该产品近三年未发现产品质量监督抽检不合格情况"
    ></unqualify>

    <unqualify
      :allUnqualifiedItems="data.product"
      title="近3年该产品品类相关的不合格发现批次"
      noDataDesc="该产品品类近三年未发现产品质量监督抽检不合格情况"
    ></unqualify>

    <cloud-chart
      :commentFinished="data.commentFinished"
      :commentKeyWord="data.commentKeyWord"
      :positive="data.positive"
      :negative="data.negative"
    ></cloud-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allUnqualifiedItems1: [],
      allUnqualifiedItems2: [],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    // this.allUnqualifiedItems1 = Array.from({ length: 4 }, () => model);
    // this.allUnqualifiedItems2 = Array.from({ length: 98 }, () => model);
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.quality {
}
</style>
