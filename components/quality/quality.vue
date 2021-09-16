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

    <cloud-chart :keyword="data.keyword"></cloud-chart>
  </div>
</template>

<script>
let model = {
  name: "固定式通用灯具（吊灯/吸顶灯，白炽灯，E14/E27灯座，IP20，I类，适宜直接安装在普通可燃材料表面）",
  specifications: "MX-11×MAX25W;MX-22×MAX25W;MX-3 3×MAX25W",
  item: "标志和说明、结构、能效等级",
  date: "2021.04.09",
  region: "广州市市场监管局",
};
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
