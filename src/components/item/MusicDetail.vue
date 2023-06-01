<template>
    <div class="musicDetail">
        <!-- <div @click="updateDetailShow">111</div> -->
        <img :src="currentPlayList[currentIndex].al.picUrl" class="bgImg">
        <div class="top">
            <div class="back" @click="goBack">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhui1"></use>
                </svg>
            </div>
            <div class="info">
                <Vue3Marquee style="color:white">{{ currentPlayList[currentIndex].name }}</Vue3Marquee>
                <span>{{ arName }}</span>
            </div>
            <div class="share">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
            </div>
        </div>
        <div class="musicDisk" v-show="!isLyric">
            <img src="@/assets/needle.png" alt="" class="needle" :class="{ needle_play: !isPause }">
            <img src="@/assets/cd.png" alt="" class="disk">
            <img :src="currentPlayList[currentIndex].al.picUrl" class="cover"
                :class="[isPause ? 'cover_pause' : 'cover_play']" @click="isLyric = true">
            <!-- <div class="lyric_inside">
                <p v-for="l in lyData" :key="l" :class="{lyc_active:(currentTime*1000 > l.lycTime && currentTime*1000 < l.next)}">{{ l.lyc }}</p>
            </div> -->
        </div>
        <div class="lyric_outside" ref="lycBox" v-show="isLyric" @touchstart="touchstart" @touchmove="touchmove">
            <p v-for="l in lyData" :key="l"
                :class="{ lyc_active: (currentTime * 1000 > l.lycTime && currentTime * 1000 < l.next) }">{{ l.lyc }}</p>
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
                <!-- <van-slider v-model="value">
                    <template #button>
                        <div class="custom-button"></div>
                    </template>
                </van-slider> -->
                <input class="rangeBar" type="range" min="0" :max="player.player.duration" v-model="player.player.currentTime" on-dragend="drag">
            </div>
            <!-- {{ (currentTime / player.player.duration).toFixed(2) * 100 }}% -->


            <div class="contr_bottom">
                <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-24gl-previous"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="playMusic" v-if="isPause">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="playMusic" v-else>
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-24gl-next"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue';
import { mapMutations, mapState } from 'vuex';
import { getMusicLyric } from '../../request/api/musicItem'
export default {
    name: 'MusicDetail',
    setup() {
        let isLyric = ref(false)
        let lyric = reactive({})
        const onChange = (value) => { 
            player.player.currentTime = (value/100*player.player.duration)
            console.log(player.player.currentTime,'-----');
        }
        const value = ref(0)
        
        return {
            isLyric, lyric, value,
        }
    },
    computed: {
        ...mapState(['currentPlayList', 'currentIndex', 'isPause', 'detailShow', 'arName', 'lyricData', 'currentTime']),
        lyData() {
            let lycArr = []
            if (this.lyricData) {
                lycArr = this.lyricData.lyric.split('\n').map((item, index) => {
                    let min = item.slice(1, 3)//切割分钟
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)//毫秒
                    let lyc = item.slice(11, item.length)
                    let lycTime = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    // console.log('min',min,'sec',sec,'mill',mill,'lyc',lyc);
                    if (isNaN(Number(mill))) {
                        mill = item.slice(7, 9)
                        lyc = item.slice(10, item.length)
                        lycTime = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    }
                    return { min, sec, mill, lyc, lycTime }
                })
                lycArr.forEach((item, index) => {
                    if (index === lycArr.length - 1 || isNaN(lycArr[index + 1].lycTime)) {//防止有的数据最后一句是空的
                        item.next = 10000000
                    } else {
                        item.next = lycArr[index + 1].lycTime
                    }
                })
            }

            // console.log(lycArr);
            return lycArr
        }
    },
    methods: {
        ...mapMutations(['updatePlayerStatus', 'updateDetailShow', 'updateLyricData', 'updateCurrentIndex','updateDuration','updateArName']),
        goBack() {
            this.isLyric = false
            this.updateDetailShow()
        },
        goPlay(value) {
            
            if (this.currentIndex + value > this.currentPlayList.length - 1) {
                this.updateCurrentIndex(0)
            }
            else if (this.currentIndex + value < 0) {
                this.updateCurrentIndex(this.currentPlayList.length - 1)
            } else {
                this.updateCurrentIndex(this.currentIndex + value)
            }
            let str = ''
            this.currentPlayList[this.currentIndex].ar.forEach(element => {
                str += element.name + ' '
            });
            // console.log(this.state.trackList,'####');
            console.log(str,'@@@@');
            this.updateArName(str)
        },
        drag(e){
            this.updateCurrentTime(this.currentTIme)
        },
        touchstart(e) {
            // 如果你要阻止点击事件，请反注释下一行代码
            // e.preventDefault()
            this.startX = e.touches[0].clientX
            this.startY = e.touches[0].clientY
        },
        touchmove(e) {
            // e.preventDefault()
            this.moveX = e.touches[0].clientX
            this.moveY = e.touches[0].clientY
            this.startX - this.moveX <= 0 ? console.log('你在往右滑') : console.log('你在往左滑')
            if (this.startX - this.moveX <= -100) { // 右滑触发
                // do
                this.isLyric = false
            }
        }

    },
    mounted() {
        console.log(this.currentPlayList);
        console.log(this.lyricData);
        this.lyric = this.$store.state.lyricData
        console.log(this.player, '@@@@@@@@@@');
        
    },
    props: ['playMusic', 'isPause', 'player'],
    watch: {
        currentTime() {
            let activeDOM = this.$el.querySelector('.lyc_active')
            // console.log(activeDOM.offsetTop,activeDOM.parentElement.clientHeight);
            // console.log(activeDOM);
            if (activeDOM) {
                // console.log(activeDOM.parentElement.clientHeight);
                if (activeDOM.offsetTop > activeDOM.parentElement.clientHeight / 2) {
                    this.$refs.lycBox.scrollTop = activeDOM.offsetTop - activeDOM.parentElement.clientHeight / 2
                }
            }
            this.value = (this.currentTime / this.player.player.duration).toFixed(2) * 100
            // console.log(this.value);
            // if(activeDOM.offsetTop > this.$refs.lycBox.clientHeight / 2){
            //     this.$refs.lycBox.scrollTop = 200
            // }
            if(this.player.player.ended) {
                this.goPlay(1)
            }
        }
    }
}
</script>
<style lang="less" scoped>
@keyframes circle {
    from {
        transform: rotate(0deg);
        // transform: scale(1);
    }

    to {
        transform: rotate(360deg);
        // transform: scale(2);
    }
}

.musicDetail {
    width: 100%;
    height: 100%;
    // padding: .2rem;

    .lyric_outside {
        p {
            font-size: .32rem;
            margin: .5rem;
            color: #999;
        }

        .lyc_active {
            font-size: .6rem;
            color: white;
            font-weight: 700;
        }
    }

    .lyric_inside {
        overflow: scroll;
        text-align: center;
    }

    .icon {
        z-index: 9999;
        width: .6rem;
        height: .6rem;
    }

    .bgImg {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: -1;
        filter: blur(50px);

    }

    .top {
        width: 100%;
        height: 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .5rem;
        padding: .2rem;

        .icon {
            // z-index: 9999;
            width: .5rem;
            height: .5rem;
        }

        .back {
            flex: .2
        }

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            font-size: .34rem;

            span {
                color: #999;
                font-size: .3rem;
            }
        }

        .share {
            flex: .5;
            // justify-content: right;
            text-align: right;
        }
    }

    .lyric_outside {
        width: 100%;
        height: 70%;
        white-space: pre-wrap;
        text-align: center;
        overflow: scroll;
    }

    .musicDisk {
        width: 100%;
        height: 65%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow: hidden;

        .needle {
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

        .needle_play {
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }

        .disk {
            width: 6rem;
            height: 6rem;
            margin-top: 3.1rem;
        }

        .cover_play {
            // transform: rotate(360deg);
            // transition: all 6s linear ;
            animation-play-state: running;
        }

        .cover {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            position: absolute;
            top: 4rem;
            animation-name: circle;
            animation-iteration-count: infinite;
            animation-duration: 10s;
            animation-timing-function: linear;
        }

        .cover_pause {
            animation-play-state: paused
        }

        .lyric {
            width: 100%;
            height: 100%;
        }
    }

    .controller {
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        bottom: .2rem;

        .contr_top {
            // flex: 1;
            // margin-top: 1rem;
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .contr_mid {
            flex: 1;
            width: 100%;
            height: 1rem;
            padding: .2rem ;
            display: flex;
            justify-content: center;
            align-items: center;
            .rangeBar{
                width: 100%;
                height: .04rem;
            }
            .custom-button {
                width: .2rem;
                height: .36rem;
                color: blue;
                font-size: 10px;
                line-height: 18px;
                text-align: center;
                background-color: blue;
                border-radius: 30%;
            }
        }

        .contr_bottom {
            // height: 100%;
            // flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            bottom: .4rem;

            .icon {
                width: .8rem;
                height: .6rem;

            }

            .play {
                width: 1rem;
                height: .8rem;
                margin: 0 .4rem;
            }
        }
    }
}
</style>