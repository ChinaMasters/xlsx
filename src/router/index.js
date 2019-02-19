import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/import'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: Home,
      children:[
        {
          path:'/import',
          component: () => import ('../components/import.vue'),
        },
        {
          path:'/export',
          component: () => import ('../components/export.vue'),
        }
      ]
    }
  ]
})
