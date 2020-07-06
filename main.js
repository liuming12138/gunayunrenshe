import Vue from 'vue'
import App from './App'
import http from './utils/https.js'
import status from './components/status.vue'
import _ from './utils/underscore-min.js'

Vue.config.productionTip = false
Vue.prototype.request = http
Vue.prototype._ = _
// 全局注册组件
Vue.component('page-status',status)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
