<template>
    <div class="searchBox">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhui2"></use>
            </svg>
            <input type="text" v-model="keyWord">
        </div>
        <div class="searchContent">

        </div>
    </div>
</template>
<script>
    import {onMounted,ref} from 'vue'
    import {getSearchDefaultWord} from '../request/api/search';
    export default  {
        setup(props){
            let keyWord = ref('')
            onMounted(async () => {
                keyWord.value = (await getSearchDefaultWord()).data.data.showKeyword
                console.log(keyWord);
            })
            return {keyWord}
        },
        watch:{
            keyWord(){
                console.log(this.keyWord);
            }
        }
    }
</script>
<style lang="less" scoped>
    .searchBox{
        width: 100%;
        // height: 5rem;
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .searchTop{
            width: 100%;
            // height: 3rem;
            display: flex;
            .icon{
                width: .6rem;
                height: .6rem;
            }
            input{
                flex: 1;
                margin-left: 1rem;
                // width: 30%;
                // display: inline-block;
                border-style: none;
                border-bottom: 1px solid #999;
            }
        }
        .searchContent{

        }
    }
</style>