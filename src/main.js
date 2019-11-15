// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// Vue.use(ElementUI)
/* eslint-disable no-new */
import VButton from './components/common/VButton.vue'
import HeadBar from './components/common/HeadBar.vue'
import VTable from './components/common/VTable.vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// echart 组件，减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title.js'
import 'echarts/lib/component/legend.js'
import 'echarts/lib/component/dataZoom.js'
import 'echarts/lib/component/markLine.js'
import 'echarts/lib/component/grid.js'
import ECharts from 'vue-echarts'

Vue.config.productionTip = false

// ######################################################################
// ######################################################################
// ##############################全局组件#################################
// ######################################################################
// ######################################################################
Vue.component('v-echart', ECharts)
Vue.component('v-button', VButton)
Vue.component('head-bar', HeadBar)
Vue.component('v-table', VTable)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
