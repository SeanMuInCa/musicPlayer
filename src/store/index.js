import { createStore } from "vuex";

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
    detailShow:false//是否打开详情页
  },
  mutations: {
    updatePlayerStatus(state,value){
      state.isPause = value
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
    }
  },
  actions: {},
  modules: {},
});
