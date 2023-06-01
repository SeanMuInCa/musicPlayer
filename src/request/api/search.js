//专门处理歌单详情页的axios请求
import axiosService from '../index'
export function getSearchDefaultWord(){
    return axiosService({
        method: 'GET',
        url: `/search/default`,
    })
}
