import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './css/app.css'

Vue.prototype.git_token = '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'

Vue.config.productionTip = false

Vue.use(Notifications)

new Vue({
  render: h => h(App),
}).$mount('#app')
