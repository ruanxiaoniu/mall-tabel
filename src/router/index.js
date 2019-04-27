import Vue from 'vue'
import Router from 'vue-router'

const Comment = ()=>import('@/components/Comment')
const Order = ()=>import('@/components/Order')
const UserInfo = ()=>import('@/components/UserInfo')
const AddGoods = ()=>import('@/components/AddGoods')
const Goods = ()=>import('@/components/Goods')

const Login = ()=>import('@/Login')
const Index = ()=>import('@/Index')
Vue.use(Router)
export default new Router({

  mode: 'history',
  routes: [
    {
      path:'/',
      name:'login',
      component:Login,
    },
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/goods',
          // meta:{
          //   requireAuth:true,//需要登录
          // },
          component:Goods
        },
        {
          path:'/goods/addGoods',
          // meta:{
          //   requireAuth:true,//需要登录
          // },
          component:AddGoods
        },
        {
          path:'/userInfo',
          // meta:{
          //   requireAuth:true,//需要登录
          // },
          component:UserInfo
        },
        {
          path:'/order',
          // meta:{
          //   requireAuth:true,//需要登录
          // },
          component:Order,
       },
       {
        path:'/comment',
        // meta:{
        //   requireAuth:true,//需要登录
        // },
        component:Comment
       },
      ]
    },
    {
      path:'/login',
      component:Login,
    },
  ]
});
// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//         next();
//     }
//     else {
//         next({
//             path: '/login',
//             query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//     }
// }
// else {
//     next();
// }
// })
