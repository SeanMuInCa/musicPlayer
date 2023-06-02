<template>
    <div class="searchBox">
        <div class="searchTop">
            <svg class="icon left" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhui2"></use>
            </svg>
            <div class="right">
                <input type="text" :placeholder="keyWord" v-model="searchValue"
                    @keyup.enter="search(searchValue ? searchValue : keyWord)">
                <div class="hot">
                    <ul>
                        <li v-for="(h, index) in state.hotWords.slice(1, 6)" :key="index" @click="search(h.first)">{{ h.first
                        }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="searchContent">
            <div class="searchHistory">
                <span>搜索历史</span>
                <span v-for=" w in state.searchArr" :key="w" class="sHistory" @click="search(w)">{{ w }}</span>
                <svg class="icon left" aria-hidden="true" @click="clearH">
                    <use xlink:href="#icon-shanchu"></use>
                </svg>
            </div>
            <div class="list">
                <ol>
                    <li v-for="(m, index) in state.songList" :key="m">
                        <div class="li">
                            <div class="index">{{ index + 1 }}</div>
                            <div class="center" @click="playMusic(index)">
                                <div class="name">{{ m.name }}</div>
                                <div class="ar">
                                    <!-- 限制了长度，不然名字太长了 -->
                                    <span v-for=" ar in m.ar.slice(0, 4)" :key="ar"> {{ ar.name }}&nbsp;&nbsp;</span>
                                </div>
                            </div>
                            <div class="play" v-if="m.mv">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-shipinbofang"></use>
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
    </div>
</template>
<script>
import { onMounted, ref, reactive } from 'vue'
import { getSearchDefaultWord } from '../request/api/search';
import { getSearchList } from '../request/api/search';
import { getSongList } from '../request/api/search';
import { mapMutations, mapState } from 'vuex';
export default {
    setup(props) {

        let searchValue = ref('')
        let keyWord = ref('')
        const state = reactive({
            hotWords: [],
            searchArr: [],
            songList: []
        })

        onMounted(async () => {
            keyWord.value = (await getSearchDefaultWord()).data.data.showKeyword
            let res = (await getSearchList()).data.result.hots
            res.map((item) => {
                state.hotWords.push(item)
            })

            state.searchArr = localStorage.getItem('search').split(',')
            
            // console.log(hotWords[0].first);
        })
        // console.log(sear);
        const search = async (key) => {
            // console.log(searchArr);
            state.songList = (await getSongList(key)).data.result.songs
            if (state.searchArr.length >= 9) {
                state.searchArr.splice(8, 1)
            }
            if (state.searchArr.indexOf(key) != -1) return
            state.searchArr.unshift(key)
            searchValue.value = ''

            console.log(state.songList);
            localStorage.setItem('search', state.searchArr)
        }
        const clearH = () => {
            state.searchArr = []
            localStorage.setItem('search', state.searchArr)
        }

        return {
            keyWord,
            clearH,
            state,
            searchValue,
            search,
        }
    },
    computed:{
        ...mapState(['currentPlayList', 'currentIndex', 'isPause', 'detailShow', 'arName', 'lyricData', 'currentTime']),
        currentList(){
            return this.currentPlayList
        },
        currentInx(){
            return this.currentIndex
        }
    },
    methods: {
        ...mapMutations(['updateCurrentList', 'updateCurrentIndex', 'updateArName','pushPlayList']),
        playMusic(index) {
            this.pushPlayList(this.state.songList[index])
            this.updateCurrentList(this.currentList)
            // console.log(this.currentPlayList,'123',this.currentInx);
            this.updateCurrentIndex(this.currentPlayList.length - 1)
            // console.log(this.currentPlayList[this.currentIndex]);
            let str = ''
            this.state.songList[index].ar.forEach(element => {
                str += element.name + ' '
            });
            console.log(this.state.songList, '####');
            console.log(str, '@@@@');
            this.updateArName(str)
        }
    }

}
</script>
<style lang="less" scoped>
.searchBox {
    width: 100%;
    height: 100%;
    padding: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .searchTop {
        width: 100%;
        // height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: .4rem;
            height: .4rem;
            // flex: 1;

        }

        .left {
            flex: 1;
            width: 15%;

        }

        .right {
            flex: 1;

            input {
                // flex: 1;
                width: 95%;
                margin-left: .1rem;
                padding: .2rem;
                // width: 30%;
                // display: inline-block;
                border-style: none;
                border-bottom: 1px solid #999;
                margin-bottom: .1rem;
            }

            ul {
                // margin-left: 1rem;
                overflow: hidden;
                white-space: nowrap;
            }

            li {
                display: inline;
                height: .4rem;
                margin: .1rem;
                font-size: .2rem;
                color: #999;
            }
        }
    }

    .searchContent {
        margin-top: .5rem;
        width: 100%;
        display: flex;
        flex-direction: column;

        .searchHistory {
            // height: 4rem;
            // background-color: #999;
            position: relative;

            .icon {
                position: absolute;
                right: 0;
                bottom: .05rem;
            }

            .sHistory {
                display: inline-block;
                margin: .1rem;
                height: .5rem;
                padding: .1rem;
                // width: 100%;
                border-radius: .1rem;
                color: #fff;
                background-color: gray;
            }
        }

        .list {
            width: 100%;
            height: 100%;
            padding: 0 .2rem;
            display: flex;
            flex-direction: column;

            li {
                display: block;
                width: 100%;
                height: 1rem;

                .li {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .center {
                        margin-left: .4rem;
                        flex: 2;
                        display: flex;
                        flex-direction: column;
                        width: 50%;

                        .name {
                            font-weight: 700;
                        }

                        .ar {
                            font-size: .1rem;
                            color: #999;
                            width: 1rem;

                            span {
                                width: 1rem;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                overflow: hidden;
                            }
                        }

                        .play {
                            // flex-grow:  2;
                            // margin-right: 1rem;
                            flex-grow: 1;
                            flex-shrink: 1;
                            flex-basis: 100%;

                            .icon {
                                width: .7rem;
                            }
                        }
                    }
                }

                .index {
                    line-height: 1rem;
                    color: #999;
                }
            }
        }
    }
}</style>