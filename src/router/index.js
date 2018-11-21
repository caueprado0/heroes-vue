import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.logged && to.meta.auth) {
    return router.push({
      name: 'Login'
    })
  }
  return next()
})

export default router
