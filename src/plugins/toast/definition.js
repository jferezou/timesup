import Vue from "vue";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function install() {
  Vue.prototype.$toast = TOAST;
}

export const TOAST = {
  error: errorToast,
  info: infoToast,
  show: showToast,
  success: successToast,
  warning: warningToast
};

/**
 * Default toast settings
 * @see http://izitoast.marcelodolce.com/ > Documentation > Options
 */
iziToast.settings({
  // Apply white color to font
  theme: "dark",
  // Layout with title on top and message below
  layout: 2
});

/**
 * Display an toast with settings in parameters.
 * Apply default settings overridden by settings in parameters
 *
 * @param {Object} newToastOptions specific settings for this toast
 *                  this is merge with default settings and override them
 */
function showToast(newToastOptions) {
  return iziToast.show(newToastOptions);
}

/**
 * Display a info toast with default setting.
 * Title and message are parameters.
 *
 * @param {String} title title displays by toast
 * @param {String} message message displays by toast
 */
function infoToast(title, message) {
  const infoToastOptions = {
    title: title,
    message: message,
    // use vuetify info color for toast color
    color: Vue.prototype.$vuetify.theme.info
  };
  return iziToast.info(infoToastOptions);
}

/**
 * Display a success toast with default setting.
 * Title and message are parameters.
 *
 * @param {String} title title displays by toast
 * @param {String} message message displays by toast
 */
function successToast(title, message) {
  const successToastOptions = {
    title: title,
    message: message,
    // use vuetify success color for toast color
    color: Vue.prototype.$vuetify.theme.success
  };
  return iziToast.success(successToastOptions);
}

/**
 * Display a warning toast with default setting.
 * Title and message are parameters.
 *
 * @param {String} title title displays by toast
 * @param {String} message message displays by toast
 */
function warningToast(title, message) {
  const warningToastOptions = {
    title: title,
    message: message,
    // use vuetify warning color for toast color
    color: Vue.prototype.$vuetify.theme.warning
  };
  return iziToast.warning(warningToastOptions);
}

/**
 * Display a error toast with default setting.
 * Title and message are parameters.
 *
 * @param {String} title title displays by toast
 * @param {String} message message displays by toast
 */
function errorToast(title, message) {
  const errorToastOptions = {
    title: title,
    message: message,
    // use vuetify error color for toast color
    color: Vue.prototype.$vuetify.theme.error
  };
  return iziToast.error(errorToastOptions);
}
