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

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

Vue.component('v-button', VButton)
Vue.component('head-bar', HeadBar)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
