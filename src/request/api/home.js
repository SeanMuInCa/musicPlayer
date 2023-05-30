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
        url: '/personalized?limit=20',
    })
}
