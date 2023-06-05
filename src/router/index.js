import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/MusicItem',
    name: 'MusicItem',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "MusicItem" */ '../views/MusicItem.vue'),
    // beforeEnter: (to, from, next) => {
    //   // 判断一下音乐是不是有
    //   if (!store.isLoaded) {
    //     alert("没内容")
    //     next(false) // 阻止路由跳转
    //   } else {
    //     next() // 正常放行
    //   }
    // }
  },
  {
    path: '/Search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    beforeEnter: (to, from, next) => {
      // 判断是否登录
      if (!store.isLogin) {
        alert("请登录")
        next('/Login') // 阻止路由跳转
      } else {
        next() // 正常放行
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserInfo" */ '../views/UserInfo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//底部组件是否显示的全局守卫
router.beforeEach((to, from) => {
  if(to.path == '/Login'){
    // console.log(store.state.isFooter);
    store.state.isFooter = false
  }
  else{
    // console.log(to);
    store.state.isFooter = true
    console.log(store.state.isFooter);
  }
    

})
export default router
