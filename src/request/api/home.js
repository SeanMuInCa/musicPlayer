//专门处理首页的axios请求
import axiosService from '../index'
//获取banner
export function getBanner(){
    return axiosService({
        method: 'GET',
        url: '/banner?type=2',
    })
}
//获取其它数据也写在这里/recommend/resource
export function getMusicList(){
    return axiosService({
        method: 'GET',
<<<<<<< HEAD
        url: '/personalized?limit=20',
=======
        url: '/personalized?limit=10',
>>>>>>> 7491713f69f2975d6072ae8a0b62410effde65a7
    })
}
