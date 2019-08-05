import Home from '@/views/Home.vue'
export default [
    {
      path: '/',
      name: 'home',
      component: Home,
      alias:'/card',
      meta:{
        icon:'dashboard',
        text:'Home'
      }
    },
    {
      path: '/card/:id',
      name: 'card',
      component: ()=>import('@/views/CardDetail.vue'),
    },
    {
      path: '/gamenews',
      name: 'gamenews',
      component: ()=>import('@/views/GameNews.vue'),
      meta:{
        icon:'description',
        text:'Game News'
      }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: ()=>import('@/views/WishList.vue'),
      meta:{
        icon:'favorite',
        text:'Wish List'
      }
    },
    {
      path: '/config',
      name: 'config',
      component: ()=>import('@/views/Config.vue'),
      meta:{
        icon:'settings',
        text:'Config'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: ()=>import('@/views/About.vue'),
      meta:{        
        icon:'mdi-help-box',
        text:'About'
      }
    },
  ]