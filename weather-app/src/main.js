import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDnRi7WzcLubm8nVuVIb6P96XBFEU_g4Ec",
    libraries: "places"
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
