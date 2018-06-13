import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Tickets from '@/components/tickets'
import CreateTicket from '@/components/createTicket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets
    },
    {
      path: '/create',
      name: 'create',
      component: CreateTicket
    }
  ]
})
