import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.use(require('vue-moment'));

import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import Profile from './components/Profile.vue';

import UserList from './components/UserList.vue';

import ContractList from './components/ContractList.vue';
import ContractCreate from './components/ContractCreate.vue';
import ContractEdit from './components/ContractEdit.vue';

import EmployeeList from './components/EmployeeList.vue';
import EmployeeCreate from './components/EmployeeCreate.vue';
import EmployeeEdit from './components/EmployeeEdit.vue';

import HolidayList from './components/HolidayList.vue';
import HolidayCreate from './components/HolidayCreate.vue';
import HolidayEdit from './components/HolidayEdit.vue';

import HourRegistryList from './components/HourRegistryList.vue';
import HourRegistryCreate from './components/HourRegistryCreate.vue';
import HourRegistryEdit from './components/HourRegistryEdit.vue';

const routes = [
  {
    path: "/",
    redirect: "/contracts"
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: SignIn
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: SignUp
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile
  },
  {
    name: 'UserList',
    path: '/users',
    component: UserList
  },
  {
    name: 'ContractList',
    path: '/contracts',
    component: ContractList
  },
  {
    name: 'ContractCreate',
    path: '/contracts/create',
    component: ContractCreate
  },
  {
    name: 'ContractEdit',
    path: '/contracts/:id',
    component: ContractEdit
  },
  {
    name: 'EmployeeList',
    path: '/employees',
    component: EmployeeList
  },
  {
    name: 'EmployeeCreate',
    path: '/employees/create',
    component: EmployeeCreate
  },
  {
    name: 'EmployeeEdit',
    path: '/employees/:id',
    component: EmployeeEdit
  },
  {
    name: 'HolidayList',
    path: '/holidays',
    component: HolidayList
  },
  {
    name: 'HolidayCreate',
    path: '/holidays/create',
    component: HolidayCreate
  },
  {
    name: 'HolidayEdit',
    path: '/holidays/:id',
    component: HolidayEdit
  },

  {
    name: 'HourRegistryList',
    path: '/hourregistries',
    component: HourRegistryList
  },
  {
    name: 'HourRegistryCreate',
    path: '/hourregistries/create',
    component: HourRegistryCreate
  },
  {
    name: 'HourRegistryEdit',
    path: '/hourregistries/:id',
    component: HourRegistryEdit
  }
];

const router = new VueRouter(
  {
    mode: 'history',
    routes: routes
  }
);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')