import Vue from 'vue'
import Router from 'vue-router'
import AppTable from './views/AppTable.vue'
import AppRealtime from './views/AppRealtime.vue'
import AppCalendar from './views/AppCalendar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppTable',
      component: AppTable
    },
    {
      path: '/realtime',
      name: 'AppRealtime',
      component: AppRealtime
    },
    {
      path: '/calendar',
      name: 'AppCalendar',
      component: AppCalendar
    },
  ]
})
