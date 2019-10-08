// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入element ui
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUi)

// 引入qs
import qs from 'qs'

// 引入vuex
import store from './store/index'

//引入filters
import './filters/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  qs,
  store
})
