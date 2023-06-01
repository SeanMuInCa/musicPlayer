<template>
	<div class="musicFooter">

        <van-popup v-model:show="detailShow" :style="{ width:'100%',height:'100%' }" position="bottom" >
        <MusicDetail :playMusic="playMusic" :isPause="isPause" :player="this.$refs"></MusicDetail>
        </van-popup>
        
        
		<div class="avatar" @click="updateDetailShow">
            <img :src="currentPlayList[currentIndex].al.picUrl" ref="img">
        </div>
		<div class="info" @click="updateDetailShow">
            
            <div class="text">
                <p class="name">{{ currentPlayList[currentIndex].name }}</p>
                <p class="msg">横划可以切换歌曲</p>
            </div>
            
        </div>
		<div class="play" >
			<svg class="icon" aria-hidden="true" @click="playMusic" v-if="isPause">
				<use xlink:href="#icon-playcircle-fill"></use>
			</svg>
			<svg class="icon" aria-hidden="true" @click="playMusic" v-else>
				<use xlink:href="#icon-zanting"></use>
			</svg>
		</div>
		<div class="menu">
            <svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-caidan"></use>
			</svg>
        </div>
        <audio ref="player" :src="`https://music.163.com/song/media/outer/url?id=${currentPlayList[currentIndex].id}.mp3`"></audio>
	</div>
</template>

<script>
import { ref,onMounted, getCurrentInstance,reactive,toRef } from 'vue';
import { mapMutations, mapState } from 'vuex';
import MusicDetail from './MusicDetail.vue'
	// import { inject } from 'vue'
	export default {
		name: "MusicFooter",
        components:{MusicDetail},
		setup() {
            // let show = ref(false)
            // console.log(show);
            // let isPlay = ref(false)//考虑到以后也要用，这个值我放到vuex里了
            // const player = ref(null)//vue3中拿节点
            // onMounted(() => {
            //     console.log(player);
            // })
            // let player = reactive({})
            let interVal =0
            const show = ref(false);
        const showPopup = () => {
            show.value = true;
        };
        return {
            show,
            showPopup,interVal
            // player
        };
            const onClickOverlay = () => {
                console.log(1);
                
            }
            return{
                // isPlay
                onClickOverlay
            }
        },
        methods:{
            playMusic(){
                if(this.$refs.player.paused){
                    this.$refs.player.play()
                    this.$refs.img.className = 'circle'
                    this.updatePlayerStatus(false)
                    this.updateTime()
                }
                else{
                    this.$refs.player.pause()
                    this.updatePlayerStatus(true)
                    this.$refs.img.className = 'pause'
                    clearInterval(this.interVal)
                }
                // this.isPlay = true
            },
            addDuration(){
                this.updateDuration(this.$refs.player.duration)
            },
            updateTime(){
                console.log(this.$refs.player.currentTime);
                this.interVal = setInterval(() => {
                    this.updateCurrentTime(this.$refs.player.currentTime)
                },1000)
            },
            ...mapMutations(['updatePlayerStatus','updateDetailShow','updateCurrentTime','updateDuration'])
        },
        mounted() {
            console.log(this.$refs);
            // this.player = toRef(this.$refs.player)
            // console.log(this.player);
            this.$store.dispatch('getLyric',this.currentPlayList[this.currentIndex].id)
        },
        updated(){
            this.$store.dispatch('getLyric',this.currentPlayList[this.currentIndex].id)
        },
			// let state = inject('state')
        computed:{
            ...mapState(['currentPlayList', 'currentIndex','isPause','detailShow']),
            show(){
                return this.detailShow
            }
        },
        watch:{
            currentIndex(){
                if(!this.isPause){
                    this.$refs.player.autoplay = true
                    this.updatePlayerStatus(false)
                }else this.$refs.player.autoplay = false
            },
            // currentPlayList(){

            // }
        }
        
		
	};
</script>

<style lang="less" scoped>
@keyframes circle{
        0%{
            /*transform对元素进行旋转、缩放、移动或倾斜。以下就是旋转0度。*/
            transform: rotate(0deg);
        }
        100%{
            /*以下就是旋转360度*/
            transform: rotate(360deg);
        }
    }
    .van-overlap{
        width: 0;
        height: 0;
    }
	.musicFooter {
		width: 100%;
		height: 1.2rem;
		background-color: #fff;
        border-top: 1px solid #999;
		position: fixed;
		bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: space-between;
        .icon{
            width: .6rem;
            height: .6rem;
        }
        .avatar{
            width: 25%;
            height: 100%;
            // background-color: black;
            flex: .5;
            
            // margin-top: .6rem;
            display: flex;
            justify-content: center;
            align-items: center;
            
            img{
                
                width: .6rem;
                height: .6rem;
                border-radius: 50%;
                transform: rotate(360deg);
            }
            .circle{
                animation: circle 6s infinite linear;
            }
            .pause{
                animation-play-state: paused;
            }
        }
        .info{
            flex: 2;
            height: 100%;
            // background-color: orange;
            display: flex;
            align-items: center;

            .name{
                font-size: .3rem;
                font-weight: 700;
            }
            .msg{
                color: #999;
            }
        }
        .play,.pause{
            flex: .5;
            text-align: right;
        }
        .menu{
            flex: .5;
            text-align: right;

        }
	}
</style>
