import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// add Element UI (UI Components kit)
import './plugins/element.js'

// add the filters
import './services/vue-filters'

// uses Vue 3.0's Composition API in Vue 2.x
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
