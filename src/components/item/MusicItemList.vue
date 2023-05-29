<template>
    <div class="musicList">
        <div class="top">
            <div class="topLeft">
                <svg class="icon playcount" aria-hidden="true">
                    <use xlink:href="#icon-iconfontplay2"></use>
                </svg>
                <span>播放全部</span>
                <span style="fontSize: 14px; color: gray;">(共{{ state.playList.trackCount }}首)</span>
            </div>
            <div class="topRight" >
                <div>+收藏</div>
                <div>
                    ({{ subscribedCount }})
                </div>
            </div>
        </div>
        <div class="list">
            <ol>
                <li v-for="(m,index) in state.trackList" :key="m">
                    <div class="li">
                        <div class="index">{{index+1}}</div> 
                        <div class="center">
                            <div class="name">{{ m.name }}</div> 
                            <div class="ar">
                                <!-- 限制了长度，不然名字太长了 -->
                                <span v-for=" ar in m.ar.slice(0,4)" :key="ar"> {{ ar.name }}&nbsp;&nbsp;</span>
                            </div>
                        </div> 
                        <div class="play" v-if="m.mv">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-play"></use>
                            </svg>
                        </div>
                        <div class="menu">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-caidan"></use>
                            </svg>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
        
        
    </div>
</template>
<script>
import {inject, onMounted} from 'vue'
export default ({
    name:'MusicItemList',
    setup(props) {
        // console.log(props,'props---->list');
        // if(props.trackList.length === 0){
        //         props.trackList.creator = JSON.parse(localStorage.getItem('itemDetail')).trackList
        //         console.log(props.trackList,'session');
        //     }
        let state = inject('state')
        let subscribedCount = inject('subscribedCount')
        console.log(state,'itemlist');
        console.log(subscribedCount,'itemlist');
        // let trackList = state.trackList
        // console.log(trackList,'!@!');
        onMounted(() => {
            let ar = ''
            
        })
        return {
            state,
            subscribedCount
        }
    },
    // props:['trackList'],
    
})
</script>
<style lang="less" scoped>
.musicList{
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: .4rem .4rem 0 0;
    .top{
        display: flex;
        flex-direction: row;
        padding: .3rem;
        justify-content: space-between;
        align-items: center;
        .topLeft{
            font-size: .38rem;
            display: flex;
            align-items: center;
            span{
                margin-left: .2rem;
                // padding-bottom: .2rem;
            }
        }
        .topRight{
            background-color: red;
            width: 40%;
            height: .8rem;
            border-radius: .4rem;
            color: white;
            line-height: .65rem;
            padding: .1rem;
            font-size: .35rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .list{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        display: flex;
        flex-direction: column;
        li{
            display: block;
            width: 100%;
            height: 1rem;
            .li{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .center{
                    margin-left: .4rem;
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    width: 50%;
                    .name{
                        font-weight: 700;
                    }
                    .ar{
                        font-size: .1rem;
                        color: #999;
                        width: 1rem;
                        span{
                            width: 1rem;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                    }
                    .play{
                        // flex-grow:  2;
                        padding-right: 1rem;
                        flex-grow: 1;
                        flex-shrink: 1;
                        flex-basis: 100%;
                        .icon{
                            width: .7rem;
                        }
                    }
                }
            }
            .index{
                line-height: 1rem;
                color: #999;
            }
        }
    }
}
</style>
