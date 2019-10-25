import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';

import ContractList from './components/ContractList.vue';
import ContractCreate from './components/ContractCreate.vue';
import ContractEdit from './components/ContractEdit.vue';

import EmployeeList from './components/EmployeeList.vue';
import EmployeeCreate from './components/EmployeeCreate.vue';
import EmployeeEdit from './components/EmployeeEdit.vue';

import HourRegistryList from './components/HourRegistryList.vue';
import HourRegistryCreate from './components/HourRegistryCreate.vue';
import HourRegistryEdit from './components/HourRegistryEdit.vue';

const routes = [
  {
    name: 'ContractList',
    path: '/contracts',
    component: ContractList,
    meta: {
      title: "Contracts",
      forVisitors: true
      //forAuth: true
    }
  },
  {
    name: 'ContractCreate',
    path: '/contracts/create',
    component: ContractCreate,
    meta: {
      title: "Contracts",
      forVisitors: true
      //forAuth: true
    }
  },
  {
    name: 'ContractEdit',
    path: '/contracts/:id',
    component: ContractEdit,
    meta: {
      title: "Contracts",
      forVisitors: true
      //forAuth: true
    }
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
new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app');
