import Vue from 'vue'
import Router from 'vue-router'
import AppTable from './views/AppTable.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppTable',
      component: AppTable
    },
  ]
})
