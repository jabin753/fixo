import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import App from '@/App.vue'
import { Store } from '@/store'
import { AuthUser } from '@/plugins/firebase'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    component: App,
    children: [
      { path: '', redirect: 'login' },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('@/views/Login.vue'),
        meta: { requireAuth: false }
      },
      {
        path: 'app',
        component: () => import('@/views/MainLayout.vue'),
        meta: { requireAuth: true },
        children: [
          {
            path: '',
            redirect: 'repair'
          },
          {
            path: 'repair',
            component: () => import('@/views/Repair.vue'),
            meta: { requireAuth: true }
          },
          {
            path: 'repair/:id',
            name: 'RepairDetails',
            component: () => import('@/views/RepairDetails.vue'),
            meta: { requireAuth: true }
          },
          {
            path: 'cliente',
            component: () => import('@/views/Clientes.vue'),
            meta: { requireAuth: true }
          },
          {
            path: 'cliente/:id',
            component: () => import('@/views/ClienteDetails.vue'),
            meta: { requireAuth: true }
          },
          {
            path: 'config',
            component: () => import('@/views/Configs.vue'),
            meta: { requireAuth: true }
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

export const makeRouter = (store: Store): VueRouter => {
  // Guards
  router.beforeEach((to, from, next) => {
    // Using delay because store doesn't retrieve user info soon
    setTimeout(
      () => {
        const user = store.getters['currentUser'] as AuthUser
        if (to.meta.requireAuth) {
          if (user) {
            next()
          } else {
            router.push({ name: 'LoginPage' })
          }
        }
        next()
      },
      from.path == '/' ? 500 : 0
    )
  })
  return router
}
