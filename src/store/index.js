import { createStore } from "vuex";
import { getMusicLyric } from "../request/api/musicItem";
export default createStore({
  state: {
    //给个默认值，防止在未进入歌单前，那里是空着也不好看
    currentPlayList: [
      {
        al: {
          id: 164305610,
          
          // pic: 109951166004488060,
          picUrl:
            "https://p2.music.126.net/gfLR-3TEncp1cOog8oUaFA==/109951168567036973.jpg",
          // pic_str: "109951166004488057",
        },
        id:2041974276,
        name: "风驶过的声音是（说唱版）",
        arName:'张三'
      },
    ],
    currentIndex: 0,//默认播放下标为第一个
    isPause:true,
    detailShow:false,//是否打开详情页
    lyricData:{},//歌词
    currentTime:0,//当前歌曲播放时间
    duration:0,//歌曲总时长
  },
  mutations: {//修改数据放这里
    updatePlayerStatus(state,value){
      state.isPause = value
    },
    pushPlayList(state, value){
      state.currentPlayList.push(value)
      console.log(this.state.currentPlayList);
    },
    updateCurrentList(state, value){
      state.currentPlayList = value
      // state.currentIndex = index
      // console.log(value,index);
      console.log(state.currentPlayList);
    },
    updateCurrentIndex(state,index){
      state.currentIndex = index
    },
    updateDetailShow(state){
      state.detailShow = !state.detailShow
      // console.log(1);
    },
    updateArName(state,name){
      state.arName = name
    },
    updateLyricData(state,data){
      state.lyricData = data
    },
    updateCurrentTime(state, time){
      state.currentTime = time
      // console.log(state.currentTime);
    },
    updateDuration(state, duration){
      state.duration = duration
    }
  },
  actions: {
    async getLyric(context, value){
      let lyric = await getMusicLyric(value)
      // console.log(lyric.data.lrc);
      context.commit('updateLyricData',lyric.data.lrc)
    }
  },
  modules: {},
});
