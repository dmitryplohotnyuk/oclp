import Vue from 'vue'
import Vuex from 'vuex'
import singleReport from './modules/singleReport';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singleReport
  }
})