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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
