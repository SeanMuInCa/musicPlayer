import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1. 引入你需要的组件
import getVant from './plugins/index';
// 2. 引入组件样式
import 'vant/lib/index.css'
// import { Swipe, SwipeItem } from 'vant';
<<<<<<< HEAD
import 'vue3-marquee/dist/style.css'
=======
>>>>>>> 7491713f69f2975d6072ae8a0b62410effde65a7
let app = createApp(App)
getVant(app)
app.use(store).use(router)
app.mount('#app')
