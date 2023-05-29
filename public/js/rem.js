function remSize(){
    //获取设备宽度，从而设置rem
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    //限制屏幕大小，不能太大，不能太小
    if(deviceWidth > 830){
        deviceWidth = 830
    }
    if(deviceWidth < 320)
        deviceWidth = 320
    //1rem就等于100px了
    document.documentElement.style.fontSize = (deviceWidth /8.3 ) + 'px'
    //字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = function(){
    remSize()

}