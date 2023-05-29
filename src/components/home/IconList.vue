<template>
    <div class="list">
        <div class="item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianying"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianshi"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-changge"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="item">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IconList',
    }
</script>

<style lang="less" scoped>
.list{
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    // padding: 10px 0;
    align-items: center;
    .item{
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        .icon{
            width: 1rem;
            height: 1rem;
        }
        span{
            margin-top: 10px;
        }
    }
}
</style>