import {createRouter,createWebHashHistory} from 'vue-router'


let router = createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/home',
      component:()=>import('../pages/Home/index.vue')
    },
    {
      path:'/download',
      component:()=>import('../pages/Download/index.vue')
    },
    {
      path:'/setup',
      component:()=>import('../pages/Setup/index.vue')
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
})


export default router