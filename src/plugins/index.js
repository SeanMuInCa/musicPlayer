<<<<<<< HEAD
import { Swipe, SwipeItem,Button,Popup,Slider  } from 'vant';
import Vue3Marquee from 'vue3-marquee'

let plugins = [Swipe, SwipeItem,Button,Popup,Vue3Marquee,Slider ]
=======
import { Swipe, SwipeItem,Button } from 'vant';

let plugins = [Swipe, SwipeItem,Button]
>>>>>>> 7491713f69f2975d6072ae8a0b62410effde65a7
//循环暴露出去，省的一个一个USE了
export default function getVant(app){
    plugins.forEach((item) => {
        return app.use(item)
    })
}