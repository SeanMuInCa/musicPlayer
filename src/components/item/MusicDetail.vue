<template>
    <div class="musicDetail">
        <!-- <div @click="updateDetailShow">111</div> -->
        <img :src="currentPlayList[currentIndex].al.picUrl" class="bgImg">
        <div class="top">
            <div class="back" @click="updateDetailShow">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-fanhui1"></use>
                </svg>
            </div>
            <div class="info">
                <Vue3Marquee style="color:white">{{ currentPlayList[currentIndex].name }}</Vue3Marquee>
                <span>{{ arName }}</span>
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true" >
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
            </div>
        </div>
        <div class="musicDisk">
            <img src="@/assets/needle.png" alt="" class="needle">
            <img src="@/assets/cd.png" alt="" class="disk">
            <img :src="currentPlayList[currentIndex].al.picUrl" class="cover">
        </div>
        <div class="controller">
            <div class="contr_top">
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-changge"></use>
			    </svg>
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-huiyuan"></use>
			    </svg>
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-liaotian"></use>
			    </svg>
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-shipin"></use>
			    </svg>
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-tuijian"></use>
			    </svg>
            </div>
            <div class="contr_mid">
                先空着
            </div>
            <div class="contr_bottom">
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-24gl-previous"></use>
			    </svg>
                <svg class="icon play" aria-hidden="true">
				    <use xlink:href="#icon-bofang"></use>
			    </svg>
                <svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-24gl-next"></use>
			    </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import { mapMutations, mapState } from 'vuex';
export default {
    name:'MusicDetail',
    setup() {
        
    },
    computed:{
            ...mapState(['currentPlayList', 'currentIndex','isPause','detailShow','arName']),
            
        },
    methods: {
        ...mapMutations(['updatePlayerStatus','updateDetailShow'])
        
    },
    mounted() {
        console.log(this.currentPlayList);
    },
}
</script>
<style lang="less" scoped>
.musicDetail{
    width: 100%;
    height:100%;
    padding: .2rem;
    .icon{
        z-index: 9999;
        width: .6rem;
        height: .6rem;
    }
    .bgImg{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        filter: blur(50px);
    }
    .top{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .back{
            flex:.2
        }
        .info{
            flex: 1;
            display: flex;
            flex-direction: column;
            font-size: .34rem;
            span{
                color: #999;
            }
        }
        .share{
            flex:1;
            // justify-content: right;
            text-align: right;
        }
    }
    .musicDisk{
        width: 100%;
        height: 65%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow: hidden;
        .needle{
            width: 2rem;
            height: 3.3rem;
            position: absolute;
            top: 1rem;
            left: 3.5rem;
            transform-origin: 0 0;
            transform: rotate(-20deg);
            transition: all 2s;
            // overflow: hidden;
            // z-index: 9999;
        }
        .disk{
            width: 6rem;
            height: 6rem;
            margin-top: 3.1rem;
        }
        .cover{
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            position: absolute;
            top: 4rem;
        }
    }
    .controller{
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        bottom: .2rem;
        .contr_top{
            // flex: 1;
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .contr_mid{
            // flex: 1;

        }
        .contr_bottom{
            // height: 100%;
            // flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            bottom: .4rem;
            .icon{
                width: .8rem;
                height: .6rem;
                
            }
            .play{
                    width: 1rem;
                    height: .8rem;
                    margin: 0 .4rem;
                }
        }
    }
}
</style>