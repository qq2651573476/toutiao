import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/views/User/User.vue'
import Home from '@/views/Home/Home.vue'
Vue.use(VueRouter)

const routes = [//              用于记录top值
  { path: '/', component: Home, meta: { isRecord: true, top: 0 } },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.top || 0 }
    }
  }
})

export default router
