<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render> 
        <van-swipe-item v-for="image in images" :key="image">
            <img :src="image" />
        </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
    // import axios from 'axios'
    import {getBanner} from '../../request/api/home'
    import {onMounted, reactive} from 'vue'
    export default {
        name: 'SwpierTop',
        setup() {
            let images=reactive([])//这里居然忘了响应式
        onMounted(async () => {
            // getBanner().then(//方法1，用封装的Promise，方法2用async
            //     response=>{
            //         // console.log(response);
            //         response.data.banners.forEach(element => {
            //             images.push(element.pic)
            //         });
            //         console.log(images);
            //     },
            //     reason=>{
            //         console.log(reason.message);
            //     }
            // )
            let res = await getBanner()
            res.data.banners.forEach(element => {
                images.push(element.pic)
            });
        })
            return { images };
        },
    }
</script>

<style lang="less">
.swiperTop{
    .van-swipe {
        width: 100%;
        // padding:10px;
        .van-swipe-item{
            // padding: 0 0.2rem;
            img{
                width: 100%;
                height: 3.22rem;
            }
        }
        .van-swipe__indicator--active{
            background-color: rgb(211, 109, 109);
        }
    }
}

</style>