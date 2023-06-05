<template>
  <div>
    <router-view/>
    <MusicFooter v-show="$store.state.isFooter"></MusicFooter>
  </div>
</template>
<script>
  // import store from './store/index.js'
  import MusicFooter from './components/item/MusicFooter.vue'
  export default{
    components:{MusicFooter},
    
  }
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // font-family:;
  }
  .icon{
    width: .5rem;
    height: .5rem;
    fill: #fff;
  }
  a{
    color: black;
  }

</style>
