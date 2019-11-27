import "@fortawesome/fontawesome-free/css/all.css";
import Vue from 'vue'
import '@/plugins/vuetify'
import "@/plugins/toast";
import App from './App.vue'
import router from '@/router'
import '@/utils/vueFilters'
import api from "@/api";


Vue.config.productionTip = false;

new Vue({
  iconfont: "fa",
  router,
  api,
  render: h => h(App),
}).$mount('#app');
