import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'

import VuejsonToCsv from 'vue-json-to-csv'
import vueXlsxTable from 'vue-xlsx-table'

Vue.use(vueXlsxTable, { rABS: false })

Vue.use(VuejsonToCsv)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
