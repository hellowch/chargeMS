import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Cell from '../views/Cell'
import Charger from '../views/Charger'
import Community from '../views/Community'
import User from '../views/User'
import Register from '../views/Register'
import Userchange from '../views/Userchange'
import ChargingEcharts from '../components/ChargingEcharts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/cell',
      name: 'Cell',
      component: Cell
    },
    {
      path: '/charger',
      name: 'Charger',
      component: Charger
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/userchange',
      name: 'Userchange',
      component: Userchange
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/chargingEcharts',
      name: 'ChargingEcharts',
      component: ChargingEcharts
    }
  ]
})
