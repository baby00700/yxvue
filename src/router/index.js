import Vue from 'vue'
import Router from 'vue-router'
import root0 from '@/components/root0'
import xsbm from '@/components/xsbm'
import xfjn from '@/components/xfjn'
import ssfp from '@/components/ssfp'
import zxyp from '@/components/zxyp'
import dxdj from '@/components/dxdj'
import sssm from '@/components/sssm'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/dist/',
  routes: [
    {
      path: '/dist',
      component: root0,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/xsbm',
      component: xsbm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/xfjn',
      component: xfjn,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/ssfp',
      component: ssfp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/zxyp',
      component: zxyp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/dxdj',
      component: dxdj,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dist/sssm',
      component: sssm,
      meta: {
        requiresAuth: true
      }
    }

  ]
})
