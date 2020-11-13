import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import App from '@/App.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: App,
    children: [
      { path: '', redirect: 'login' },
      {
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'app',
        component: () => import('@/views/MainLayout.vue'),
        children: [
          {
            path: '',
            redirect: 'repair'
          },
          {
            path: 'repair',
            component: () => import('@/views/Repair.vue')
          },
          {
            path: 'repair/:id',
            component: () => import('@/views/RepairDetails.vue')
          },
          { path: 'chat', component: () => import('@/views/Chat.vue') },
          {
            path: 'config',
            component: () => import('@/views/Configs.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
