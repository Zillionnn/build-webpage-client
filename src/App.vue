<template>
  <div id="app">
    <div
      v-if="showTopMenu"
      class="header"
      :style="`background: ${appDetail.menuConfig.top.backgroundColor};`"
    >
      <div class="logo">
        <img :src="appDetail.menuConfig.top.logo"/>
      </div>
    </div>
    <!-- <div v-if="menuList.length>0">
      <div v-for="(menu,index) in menuList" :key="index">
        <router-link :to="`/page/${menu.link}`">{{menu.name}}</router-link>
      </div>
    </div>-->
    <div
      v-if="showLeftMenu"
      :style="`top: ${leftMenuToTop}px;background-color:${appDetail.menuConfig.left.backgroundColor}`"
      class="side-menu"
    >
      <el-menu
        :router="true"
        :default-active="0"
        :background-color="appDetail.menuConfig.left.backgroundColor"
        :text-color="appDetail.menuConfig.left.menu.textColor"
        :active-text-color="appDetail.menuConfig.left.menu.textActiveColor"
      >
        <el-menu-item
          v-for="(menu, index) in menuList"
          :route="`/page/${menu.link}`"
          :index="index"
          :key="index"
        >
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>

<script>
import * as api from '@/api'
import { $http } from '@/service/requestService.js'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      menuList: [],
      appId: 1,
      logoUrl: '',
      appDetail: null,
      showTopMenu: false,
      showLeftMenu: false
    }
  },
  computed: {
    leftMenuToTop () {
      return this.showTopMenu ? 50 : 0
    }
  },
  created () {
    this.initData()
  },

  methods: {
    initData () {
      this.getAppDetail()
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
          this.$router.push({ path: r[0].path })
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
    },

    /**
     * app 详情
     */
    getAppDetail () {
      api.base.appDetail(this.appId).then(res => {
        this.appDetail = res.data.data
        const layout = this.appDetail.layout
        if (layout.indexOf('left') > -1) {
          this.showLeftMenu = true
        }
        if (layout.indexOf('top') > -1) {
          this.showTopMenu = true
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  position: relative;
  height: 100vh;
}
body {
  margin: 0;
}
.header {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.side-menu {
  width: 200px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  background: #2c3e50;
}
.logo {
  width: 100px;
  height: 50px;
}
.logo img {
  width: 100%;
  height: 100%;
}
</style>
