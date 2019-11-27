import internalApiRoutes from "@/api/internalApi/apiRoutes";
import {apiConstructor} from "@/api";

export default authenticationApi;

function authenticationApi() {
  const specificApi = {
    login: login(),
    logout: logout(),
    refresh: refresh(),
  };
  return specificApi;
}

function login() {
  function loginMethod(body, tenant, queryParams, headers) {
    let path = internalApiRoutes.authentication.login;
    let postForPath = apiConstructor.post(path);
    const useToken = false;
    return postForPath(body, queryParams, headers, useToken).then(result => {
      return Promise.resolve(result);
    });
  }

  return loginMethod;
}

function logout() {
  function logoutMethod(queryParams, headers) {
    let path = internalApiRoutes.authentication.logout;
    let getForPath = apiConstructor.get(path);
    return getForPath(queryParams, headers).then(result => {
      return Promise.resolve(result);
    });
  }

  return logoutMethod;
}

function refresh() {
  function refreshMethod(queryParams, headers) {
    let path = internalApiRoutes.authentication.refreshToken;
    let getForPath = apiConstructor.get(path);
    const useToken = true;
    const useTokenWithoutRefresh = true;
    return getForPath(queryParams, headers, useToken, useTokenWithoutRefresh).then(result => {
      return Promise.resolve(result);
    });
  }

  return refreshMethod;
}
