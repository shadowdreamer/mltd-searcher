import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Card from './views/CardDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/card', redirect: '/' },
    {
      path: '/card/:id',
      name: 'card',
      component: ()=>import('@/views/CardDetail.vue')
    },
    {
      path: '/gamenews',
      name: 'gamenews',
      component: ()=>import('@/views/GameNews.vue')
    },
    {
      path: '/config',
      name: 'config',
      component: ()=>import('@/views/Config.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: ()=>import('@/views/About.vue')
    },
  ],
  scrollBehavior ( ) {
    return { x: 0, y: 0 }
  }
})
