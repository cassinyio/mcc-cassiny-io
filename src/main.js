// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'

Vue.router = router
Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: '/auth/login' },
  fetchData: { url: '/auth/user' },
  refreshData: { enabled: false }
})

// bus
const eventHub = new Vue() // Single event hub

// Distribute to components using global mixin
Vue.mixin({
  data: function () {
    return {
      eventHub: eventHub
    }
  }
})

// General config Axios

// Enable devtools
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
