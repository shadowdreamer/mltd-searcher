import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store/'
import router from './router'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import sleep from './plugins/sleep'

Vue.use(VueVirtualScroller)

Vue.config.productionTip = false
Vue.prototype.$sleep = sleep

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
