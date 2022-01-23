import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'

import './plugins/bootstrap-vue'
import './plugins/axios' //registra o que foi feito em axios.js e $http vira uma instacia usavel de vue.js para pegar get e post

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
