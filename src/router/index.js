import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routers'
import store from '@/store'
import iView from 'iview'
import { getToken } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (token) {
    if (!store.state.router.hasGetRules) {
      store.dispatch('authorization').then(rules => {
        // console.log('login authorization', rules)
        store.dispatch('concatRoutes', rules).then(routers => {
          // console.log('login concatRoutes', routers)
          console.log('111')
          router.addRoutes(routers)
          console.log('222')
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: 'login' })
        })
      })
    } else {
      next()
    }
  } else {
    if (to.name === LOGIN_PAGE_NAME) next()
    else next({ name: 'login' })
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
