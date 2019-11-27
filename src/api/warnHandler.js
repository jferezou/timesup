import {TOAST} from "@/plugins/toast/definition";
import Vue from "vue";
import he from "he";

const WARN_TITLE = "Attention !";

export default function displayWarn(warnText) {
  const options = {
    timeout: 20000,
    title: WARN_TITLE,
    message: he.decode(warnText),
    // use vuetify info color for toast color
    color: Vue.prototype.$vuetify.theme.warning
  };
  TOAST.show(options);
}
