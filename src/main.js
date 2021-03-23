import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Button } from 'element-ui'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义全局样式
import './styles/index.scss'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
