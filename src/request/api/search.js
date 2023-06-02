//专门处理歌单详情页的axios请求
import axiosService from '../index'
export function getSearchDefaultWord(){
    return axiosService({
        method: 'GET',
        url: `/search/default`,
    })
}
//热门搜索词
export function getSearchList(){
    return axiosService({
        method: 'GET',
        url: `/search/hot`,
    })
}
//搜索歌曲
export function getSongList(keyword){
    return axiosService({
        method: 'GET',
        url: `/cloudsearch?keywords=${keyword}`,
    })
}
