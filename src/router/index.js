import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue';
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home,
    name:'home'
  },
  {
    path:'/login',
    component:()=>import('../views/login/login'),
    name:'login',
    meta:{
      ifNotAuth:true
    }
  },
  {
    path:'/signup',
    component:()=>import('../views/signup/signup'),
    name:'signup',
    meta:{
      ifNotAuth:true
    }
  },
  {
    path:'/add-job',
    component:()=>import('../views/add-job/add-job'),
    name:'add-job',
    meta:{
      requireAuth:true
    }
  },
  {
    path:'/job-details/:id',
    component:()=>import('../views/job-details/job-details'),
    name:'job-details'
  },
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const user = JSON.parse(localStorage.getItem('myData'))
  if(to.matched.some(route=>route.meta.requireAuth)){
    if(user){
      next()
      return
    }
    localStorage.setItem('fullPath',JSON.stringify(to.fullPath))
    next('/login')
    return
  }else if(to.matched.some(route=>route.meta.ifNotAuth)){
    if(!user){
      next()
      return
    }
    next(from.fullPath)
    return
  }
  next()
})

export default router