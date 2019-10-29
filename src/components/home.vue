<template>
  <div class="page">
    <router-link :to="'/home/foo'">foo</router-link>
    <router-link :to="'/home/bar'">bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import {$http} from '@/service/requestService.js'

export default {
  name: 'home',
  components: {},
  data () {
    return {

    }
  },

  created () {
    this.initData()
  },

  methods: {
    initData () {
      this.getRoutes()
    },
    getRoutes () {
      $http.get('http://127.0.0.1:7000/api/v1/routers')
        .then((res) => {
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
