import Vue from 'vue'
import Vuex from 'vuex'
// import env from '@/conf/env'
import createLogger from 'vuex/dist/logger'
import page from './page.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page
  },
  //   strict: env.debug,
  plugins: [createLogger()]
})
