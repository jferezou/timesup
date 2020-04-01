import {TOAST} from "@/plugins/toast/definition";
import Utils from "@/utils.js";
import httpStatusText from "./httpStatusText";

const ERROR_TITLE = "Une erreur est survenue";

export default function displayError(error) {
  let errorMessage = Utils.EMPTY_STRING;
  let errorTitle = ERROR_TITLE;
  if (error.response && error.response.status) {
    const status = error.response.status;
    if (status < 400) {
      errorMessage = "Erreur inattendue";
    } else if (status === 401) {
      console.error("Authentification requise : " + error.response.data.message);
      if (error.response.data) {
        if (error.response.data.type === "ExpiredRefreshError" || error.response.data.type === "ExpiredAccessError") {
          errorMessage = "La session a expiré, veuillez vous reconnecter.";
        } else if (error.response.data.type === "MissingUserError" || error.response.data.type === "MissingUserError") {
          errorMessage = "Utilisateur inconnu.";
        } else if (error.response.data.type === "AuthenticationError" || error.response.data.type === "AuthenticationError") {
          errorMessage = "Mot de passe incorrect.";
        }
      } else {
        errorMessage = httpStatusText[status];
      }
    } else if (status === 403) {
      console.error("Accès non autorisé pour le rôle : " + error.response.data.message);
      errorMessage = httpStatusText[status];
    } else if (status < 500) {
      if (error.response.data && error.response.data.message && error.response.data.message !== "") {
        errorMessage += "\n" + error.response.data.message;
      } else {
        errorMessage = httpStatusText[status];
      }
      if (error.response.data && error.response.data.error_code && error.response.data.error_code !== "") {
        errorTitle += " - " + error.response.data.error_code;
      }

    } else {
      errorMessage = "Erreur du serveur";
    }
  } else {
    errorMessage = "Connexion au serveur perdue";
  }
  TOAST.error(errorTitle, errorMessage);
}
