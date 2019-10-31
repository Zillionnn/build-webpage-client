<template>
  <div class="page">
    <div v-if="menuList.length>0">
      <div v-for="(menu,index) in menuList" :key="index" >
        <router-link :to="`/page/${menu.link}`">{{menu.name}}</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import * as api from '@/api'
import { $http } from '@/service/requestService.js'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      menuList: [],
      appId: 1
    }
  },

  created () {
    this.initData()
  },

  methods: {
    initData () {
      // this.getRoutes()
      this.getAppMenu()
    },
    /**
     * 获取app 菜单
     */
    getAppMenu () {
      this.configType = 'menu'
      api.base
        .appMenuList(this.appId)
        .then(res => {
          this.menuList = res.data.data

          let children = []
          children = res.data.data.map(e => {
            return {
              path: '/page/' + e.link,
              name: e.name,
              meta: {
                page_id: e.link
              },
              component: () => import(`@/components/pages/TemplatePage.vue`)
            }
          })

          return children
        })
        .then(r => {
          sessionStorage.setItem('routes', JSON.stringify(r))
          console.log(r)
          this.$router.addRoutes(r)
          console.log(this.$router)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getRoutes () {
      $http
        .get('http://127.0.0.1:7000/api/v1/routers')
        .then(res => {
          let children = []
          children = res.data.data.map(e => {
            return {
              path: e.path,
              name: e.name,
              component: () => import(`@/components/pages/TemplatePage.vue`)
            }
          })

          return children
        })
        .then(r => {
          sessionStorage.setItem('routes', JSON.stringify(r))
          console.log(r)
          this.$router.addRoutes(r)
          console.log(this.$router)
        })
    }
  }
}
</script>

<style scoped>
</style>
