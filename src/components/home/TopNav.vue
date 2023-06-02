<template>
    <div class="topNav">
        <div class="menu">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </div>
        <div class="nav">
            <span>我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="search" @click="$router.push('/Search')">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
    

</template>

<script>
    export default {
        name: 'TopNav',
    }
</script>

<style scoped lang="less">
    .topNav{
        width: 100%;
        height: 1rem;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // line-height: 1rem;
        .nav{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            font-size: .36rem;
            .active{
                font-weight:700;
            }
        }
    }
</style>

<style scoped lang="less">
    .topNav{
        width: 100%;
        height: 1rem;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // line-height: 1rem;
        .nav{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            font-size: .36rem;
            .active{
                font-weight:700;
            }
        }
    }
</style>