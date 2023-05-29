//专门处理歌单详情页的axios请求
import axiosService from '../index'
export function getMusicListDetail(id){
    return axiosService({
        method: 'GET',
        url: `/playlist/detail?id=${id}`,
    })
}
//获取歌单的歌曲
export function getMusicItemList(id){
    return axiosService({
        method: 'GET',
        url: `/playlist/track/all?id=${id}6&limit=20&offset=0`,
    })
}