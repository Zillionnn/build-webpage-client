const state = {
  routes: []
}

const getters = {
  routes: () => state.routes
}

const actions = {
  passRoutes (commit, payload) {
    commit('setRoutes', payload)
  }
}

const mutations = {
  setRoutes (state, payload) {
    state.routes = payload
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
