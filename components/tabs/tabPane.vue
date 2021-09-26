<template>
    <view 
        class='tab-pane-item'
    >
        <slot></slot>
    </view>
</template>
<script>
export default {
    name:'TabPane',
}
</script>
<style lang="scss">
.tab-pane-item{
    width: 100vw;
    display: inline-block;
    white-space: initial;
    vertical-align: top;
    box-sizing: border-box;
    overflow: auto;
    height: auto;
}
</style>
