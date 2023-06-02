<template>
    <div class="itemTop">
        <img :src="playList.coverImgUrl" class="bgImg">
        <div class="menuBar">
            <div class="menuBarLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-fanhui1"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="menuBarRight">
                <div search>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-sousuo"></use>
                    </svg>
                </div>
                <div class="menubtn">
                    <svg class="icon" aria-hidden="true" style="width: .48rem;">
                        <use xlink:href="#icon-caidanguanli"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="contentLeft">
                <div class="cover">
                    <img :src="playList.coverImgUrl" alt=""/>
                </div>
            </div>
            <div class="contentRight">
                <div class="words">
                    <p class="title">{{ playList.name }}</p>
                    <div class="creator">
                        <img :src="playList.creator.avatarUrl" alt="" class="avatar">
                        <span>{{ playList.creator.nickname }}</span>
                    </div>
                    <p>{{ playList.creator.signature }}</p>
                </div>
            </div>
        </div> 
        <div class="panelBar">
            <div class="comment">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liuyan"></use>
                </svg>
                <span>{{ playList.commentCount }}</span>
            </div>
            
            <div class="comment">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{ playList.shareCount }}</span>
            </div>
            <div class="comment">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span>
            </div>
            <div class="comment">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuanxingxuanzhong"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
    
</template>

<script>
    import {isReactive, reactive,onMounted,toRef, inject} from 'vue'
    export default {
        name: 'MusicItemTop',
        setup(props) {
            console.log(props,'props');
            // console.log(Object.keys(props.playList).length);
            if(Object.keys(props.playList).length === 0){
                props.playList.creator = JSON.parse(localStorage.getItem('itemDetail')).playList.creator
                console.log(props.playlist,'session');
            }
            let state = inject('state')
            console.log(state,'top');
            // props.playList=""
            // let playList =reactive({})
            // if(props.playlist === {}){
            // let state = reactive({
            //     playList:{}
            // })
            // onMounted(() => {
            //     // console.log(props,'props');
            //     playList =  JSON.parse(sessionStorage.getItem('itemDetail')).playList
            //     console.log(playList,'session');
            // })
            //     console.log('!',sessionStorage.getItem('ItemDetail'));
            // }
            // console.log('111',props);
            // console.log('222',props.playlist);
            // // let playList = props.playList
            return {
                // state
            }
        },
        props:['playList'],
    }
</script>

<style lang="less" scoped>
.itemTop{
    width: 100%;
    height: 7.8rem;
    position: relative;
    color:#fff;
    .bgImg{
        width: 100%;
        height: 8rem;
        position: fixed;
        z-index: -1;
        filter: blur(1rem);
    }
    .menuBar{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        .menuBarLeft{
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                // margin-left: .3rem;
                font-size: .45rem;
                color: #fff;
                // line-height: .57rem;
            }
        }
        .menuBarRight{
            display: flex;
            width: 25%;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: .6rem;
                height: .6rem;
                fill: #fff;
            }
        }
        
    }
    .content{
        width: 100%;
        display: flex;
        .contentLeft, .contentRight{
            height: 4.5rem;
            width: 50%;
            // border: 1px solid #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .cover,.words{
                width: 3rem;
                height: 3rem;
                // border: 1px solid #fff;
                border-radius: .1rem;
                p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                
                img{
                    height: 100%;
                    width: 100%;
                    border-radius: .1rem;
                }
            }
            
        }
        .contentRight{
            .words{
            // flex: 3;
            width: 3.4rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .creator{
                display: flex;
                align-items: center;
                img{
                    width: .6rem;
                    height: .6rem;
                    border-radius: 50%;
                }
                .title{
                    margin-top: .2rem;
                }
                span{
                    margin-left: .3rem;
                }
            }
        }
    }
}
    .panelBar{
        width: 100%;
        height: 30%;
        display: flex;
        // border: 1px solid black;
        justify-content: space-around;
        padding: .2rem;
        flex-direction: row;
        // z-index: 9999;
        
        .comment{
            width: 1.2rem;
            height: 1rem;
            text-align: center;
            // background-color: black;
            // border: 1px solid #fff;
            .icon{
            width: 100%;
            height: 100%;
            // z-index: 9999;
        }
        }
    }
}

</style>