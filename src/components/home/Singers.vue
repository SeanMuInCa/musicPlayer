<template>
    <div class="musicList">
        <div class="listHead">
            <div class="title">
                <span>热门歌手</span>
            </div>
            <div class="listMore">
                <span>查看更多</span>
            </div>
        </div>
        <div class="listContent">
            <!-- <div v-for="m in musicList" :key="m.id" class="m">
                <img :src="m.picUrl">
                <span>{{m.name}}</span>
            </div> -->
            
            <van-swipe :loop="false" :width="150" :height="150" :show-indicators="false">
                <van-swipe-item v-for="m in singerList" :key="m.id" class="listItem">
                    <!-- 实现了路由跳转并带参数 -->
                    <router-link :to="{
                        path:'/Search', 
                        query:{name:m.name}
                        }"> 
                        <img :src="m.picUrl">
                        
                        <span class="text" >{{m.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    import numeral from 'numeral'
    import {getSingersList} from '../../request/api/home'
    import { onMounted, reactive } from 'vue';
    export default {
        name: 'Singers',
        setup() {
            let singerList = reactive([])
            onMounted(async () => {//成功用async 和await完成
                // getMusicList().then(
                //     response =>{
                //         response.data.result.forEach(element => {
                //             // element.playCount = numeral(element.playCount).format('0a')
                //             // console.log(numeral(1000));
                //             musicList.push(element)
                //         });
                //         // console.log(musicList);
                //     },
                //     reason =>{
                //         console.log(reason.message);
                //     }
                // )
                let res = (await getSingersList()).data.artists
                singerList.push(...res)
                console.log(singerList);
            })
            return {singerList,numeral}
        }
    }
</script>

<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        flex-direction: column;
        margin-bottom: 1.5rem;
        // padding: .2rem;
        .listHead{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            // justify-items: baseline;
            .title{
                font-size: .6rem;
                font-weight: 900;
                line-height: 1.2rem;
            }
            .listMore{
                line-height: 60px;
            }
        }
        .listContent{
            width: 100%;
            height: 100%;
            display: flex;
            .van-swipe{
                height: 4.5rem;
            }
            .listItem{
                position: relative;
                .tip{
                    position: absolute;
                    top: .2rem;
                    left: 1.5rem;
                    color: #f1eaeaed;
                    .playcount{
                        width: .3rem;
                        height: .3rem;
                        // color: #fff;
                    }
                    .text{
                        height: 1rem;
                    }
                }
            }
            
            
            .van-swipe-item{
                width: 2rem;
                height: 100%;
                padding: 5px;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 5%;
                    // margin: 10px;
                }
            // }
        }
    }
}
</style>