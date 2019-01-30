import Vue from 'vue'
import Vuex from 'vuex'

import bookmark from './module-example'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bookmark
  }
})

export default store
