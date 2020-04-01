import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import app_icons from "@/icon";
import fr from "vuetify/es5/locale/fr";
import CircularCountDownTimer from "vue-circular-count-down-timer";
Vue.use(CircularCountDownTimer);
Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: {fr},
    current: "fr"
  },
  icons: app_icons
});
