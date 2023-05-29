import { Swipe, SwipeItem,Button } from 'vant';

let plugins = [Swipe, SwipeItem,Button]
//循环暴露出去，省的一个一个USE了
export default function getVant(app){
    plugins.forEach((item) => {
        return app.use(item)
    })
}