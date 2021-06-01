import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user')) || null
  },
  mutations: {
    addUser (state, payload) {
      // 修改user数据
      state.user = JSON.parse(payload)
      // 存储到本地location
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
