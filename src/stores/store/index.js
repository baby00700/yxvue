import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    studentinfo: '',
    liuchenginfo: ''
  },
  mutations: {
    addstudentinfo (state, info) {
      info = JSON.parse(info)
      state.studentinfo = info
    }
  }
})

export default store
