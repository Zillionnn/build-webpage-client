import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
Vue.use(Router)

let routers = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new Router({
  routes: routers
})
let flag = 0
router.beforeEach((to, from, next) => {
  // console.log('to>>', to, from)
  if (to.path !== '/') {
    if (flag === 0) {
      let routes = sessionStorage.getItem('routes')
      console.log('router/index.js', routes)

      if (routes) {
        let r = JSON.parse(sessionStorage.getItem('routes'))
        let children = []
        children = r.map(e => {
          return {
            path: '/page/' + e.link,
            name: e.name,
            meta: {
              page_id: e.link
            },
            component: () => import(`@/components/pages/TemplatePage.vue`)
          }
        })

        router.addRoutes(children)

        // 加过路由就不加了
        flag++
        next({ path: to.fullPath, replace: true })
      } else {
        next({path: '/'})
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
