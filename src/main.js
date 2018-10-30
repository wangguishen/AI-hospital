// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'  //引入IE兼容性
//引入vuex
import Vuex from 'vuex'
import router from './router/index'

//引入element-ui插件
import store from './store/index.js';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(Vuex)

//引入数据库处理axios
import axios from 'axios'
Vue.prototype.$Ajax = axios
Vue.config.productionTip = false
Vue.prototype.COLLEC_ENV = process.env.COLLEC_ENV  //收藏环境
Vue.prototype.VER_NO = '1.0'  //收藏版本

import "@/style/style.css"
import '@/assets/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


