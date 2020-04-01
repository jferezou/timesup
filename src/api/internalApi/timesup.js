import internalApiRoutes from "@/api/internalApi/apiRoutes";
import {apiConstructor} from "@/api";
import {TOAST} from "@/plugins/toast/definition";
import Utils from "@/utils.js";

export default timesupApi;

function timesupApi() {
  const specificApi = {
    add_name: add_name(),
    shuffle: shuffle(),
    validermots: validermots(),
    founded: founded(),
    startround: startround(),
    chronoEnded: chronoEnded()
  };
  return specificApi;
}

function add_name() {
  function addNameMethod(body, queryParams, headers) {
    let path = internalApiRoutes.timesup.addName;
    let postForPath = apiConstructor.post(path);
    const useToken = false;
    return postForPath(body, queryParams, headers, useToken).then(result => {
      TOAST.success("Nouveau mot ajouté", Utils.EMPTY_STRING);
      return Promise.resolve(result);
    });
  }

  return addNameMethod;
}

function validermots() {
  function validermotsMethod(body, queryParams, headers) {
    let path = internalApiRoutes.timesup.validermots;
    let postForPath = apiConstructor.post(path);
    const useToken = false;
    return postForPath(body, queryParams, headers, useToken).then(result => {
      return Promise.resolve(result);
    });
  }

  return validermotsMethod;
}

function chronoEnded() {
  function chronoEndedMethod(body, queryParams, headers) {
    let path = internalApiRoutes.timesup.chronoEnded;
    let postForPath = apiConstructor.post(path);
    const useToken = false;
    return postForPath(body, queryParams, headers, useToken).then(result => {
      return Promise.resolve(result);
    });
  }

  return chronoEndedMethod;
}

function founded() {
  function foundedMethod(body, queryParams, headers) {
    let path = internalApiRoutes.timesup.founded;
    let postForPath = apiConstructor.post(path);
    const useToken = false;
    return postForPath(body, queryParams, headers, useToken).then(result => {
      return Promise.resolve(result);
    });
  }

  return foundedMethod;
}

function shuffle() {
  function shuffleMethod(queryParams, headers) {
    let path = internalApiRoutes.timesup.shuffle;
    let postForPath = apiConstructor.get(path);
    const useToken = false;
    return postForPath(queryParams, headers, useToken).then(result => {
      TOAST.success("Mots mélangés", "Vous pouvez démarrer la nouvelle manche !");
      return Promise.resolve(result);
    });
  }

  return shuffleMethod;
}

function startround() {
  function startroundMethod(queryParams, headers) {
    let path = internalApiRoutes.timesup.startround;
    let postForPath = apiConstructor.get(path);
    const useToken = false;
    return postForPath(queryParams, headers, useToken).then(result => {
      return Promise.resolve(result);
    });
  }

  return startroundMethod;
}