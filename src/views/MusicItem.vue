<template>
    <div >
        <MusicItemTop :playList="state.playList" ></MusicItemTop>
        <MusicItemList v-if="isLoaded"></MusicItemList>
        <!-- {{ subscribedCount }} -->
    </div>
</template>

<script>
    import {getMusicListDetail,getMusicItemList} from '@/request/api/musicItem'
    import { useRoute } from 'vue-router';
    import {onMounted, reactive, ref,provide,toRef,onBeforeMount} from 'vue'
    import MusicItemTop from '../components/item/MusicItemTop.vue'
    import MusicItemList from '../components/item/MusicItemList.vue'
    export default {
        name: 'MusicItem',
        
        setup() {
            let isLoaded = ref(false)
            const state = reactive({
                playList:{},//歌单详情页数据
                trackList:[]//歌单里的歌曲数据
            })//在外面包一层state吧，这样可以适应多种写法，比如vuex和react
            let subscribedCount=ref()
            //获取ID
            onBeforeMount(async () => {
                let id = useRoute().query.id
                console.log(id);
                let data = await getMusicListDetail(id)
                let dataTrack = await getMusicItemList(id)
                console.log(data);
                console.log(dataTrack);
                state.playList = data.data.playlist
                state.trackList = dataTrack.data.songs
                // isLoaded = true
                subscribedCount.value = toRef(data.data.playlist, 'subscribedCount')
                console.log(state.playList);
                console.log(subscribedCount,"@@@");
                //防止页面刷新造成数据丢失，先存起来
                localStorage.setItem('itemDetail', JSON.stringify(state))
                localStorage.setItem('subscribedCount', JSON.stringify(subscribedCount))
                
            })
            onMounted(() => {
                console.log(isLoaded);
                isLoaded.value = true
                console.log(isLoaded);

            })
            console.log(subscribedCount,'!!!!');
            provide('state', state)
            provide('subscribedCount', subscribedCount)
            return {state,subscribedCount,isLoaded}
        },
        
        components:{MusicItemTop,MusicItemList},
    }
</script>

<style>

</style>