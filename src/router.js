import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue' //penulisan bisa '@/views/Home.vue'
import store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    {
      path: '/categories',
      name: 'categories',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Categories.vue')
    },


    {
      path: '/books',
      name: 'books',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Books.vue')
    },


    {
      path: '/category/:slug',
      name: 'category',
      component: () => import(/* webpackChunkName: "about" */ './views/Category.vue')
    },

    {
      path: '/book/:slug',
      name: 'book',
      component: () => import(/* webpackChunkName: "about" */ './views/Book.vue')
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: () => import( /* webpackChunkName: "checkout" */
      './views/Checkout.vue'),
      meta: {auth : true}
    },

    {
      path: '/payment',
      name: 'payment',
      component: () => import( /* webpackChunkName: "checkout" */
      './views/Payment.vue'),
      meta: {auth : true}
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import( /* webpackChunkName: "checkout" */
      './views/Profile.vue'),
      meta: {auth : true}
    },

    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record=> record.meta.auth)) {
    if (store.getters['auth/guest']) {
      store.dispatch('alert/seta',({
        status:true,
        text: 'Login first',
        type: 'error'
      }))

      store.dispatch('setPrevUrl', to.path)
      store.dispatch('dialog/setComponent','login')
      store.dispatch('dialog/setStatus',true)
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})
export default router
