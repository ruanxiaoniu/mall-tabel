import Vue from 'vue'

import VueAxios from 'vue-axios'
import axios from 'axios'

// import http from 'http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
// Vue.use(http)
/* eslint-disable no-new */
axios.defaults.withCredentials=true
axios.defaults.Header=true
// axios.defaults.baseURL="http://172.18.44.25:8888"
axios.defaults.baseURL = '/api'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
import {
  Dialog,
} from 'element-ui'
Vue.use(Dialog)