import axios from "axios";
import _ from "lodash";
import errorHandler from "./errorHandler";
import warnHandler from "./warnHandler";

const BASE_URL = process.env.VUE_APP_API_URL;

/**
 * Main function to handle all requests to our API
 *
 * @param {String} verb HTTP method to use
 * @param {String} path endpoint to request API
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body JSON data to be sent to API
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request, default true
 * @param {Object} useTokenWithoutRefresh don't refreshtoken, default false
 * @returns {Promise}
 */
function _requestApi(verb, path, queryParams, body, headers, useToken = true, useTokenWithoutRefresh = false) {

  const newHeader = _.merge(
    headers
  );

  return request(verb, BASE_URL, path, queryParams, body, newHeader, useToken, useTokenWithoutRefresh);
}

/**
 * Main function to handle GET requests to our API
 *
 * @param {String} path endpoint to request API
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body JSON data to be sent to API
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request
 * @param {Object} useTokenWithoutRefresh don't refreshtoken
 * @returns {Promise}
 */
function apiGet(path, queryParams, headers, useToken, useTokenWithoutRefresh) {
  return _requestApi("GET", path, queryParams, undefined, headers, useToken, useTokenWithoutRefresh);
}

/**
 * Main function to handle PUT requests to our API
 *
 * @param {String} path endpoint to request API
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body JSON data to be sent to API
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request
 * @returns {Promise}
 */
function apiPut(path, body, queryParams, headers, useToken) {
  return _requestApi("PUT", path, queryParams, body, headers, useToken);
}

/**
 * Main function to handle DELETE requests to our API
 *
 * @param {String} path endpoint to request API
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body JSON data to be sent to API
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request
 * @returns {Promise}
 */
function apiDelete(path, body, queryParams, headers, useToken) {
  return _requestApi("DELETE", path, queryParams, body, headers, useToken);
}

/**
 * Main function to handle POST requests to our API
 *
 * @param {String} path endpoint to request API
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body JSON data to be sent to API
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request
 * @returns {Promise}
 */
function apiPost(path, body, queryParams, headers, useToken) {
  return _requestApi("POST", path, queryParams, body, headers, useToken);
}

function extracted(token, headers, verb, baseUrl, path, queryParams, body) {

  const config = {
    method: verb,
    baseURL: baseUrl,
    url: path,
    params: queryParams,
    headers: headers,
    data: body
  };

  return axios
    .request(config)
    .then(resolve => {
      let headers = resolve.headers;
      if (!_.isNil(headers["warn-text"])) {
        warnHandler(headers["warn-text"]);
      }
      return Promise.resolve(resolve.data);
    })
    .catch(error => {
      console.error(error);
      errorHandler(error);
      return Promise.reject(error);
    });
}

/**
 * Main function to handle all requests
 *
 * @param {String} verb http method equivalent to axios function
 * @param {String} baseUrl server baseUrl to call
 * @param {String} path route to call
 * @param {Object} queryParams dict of query parameters to send
 * @param {Object} body body to send
 * @param {Object} headers dict of http request header to send
 * @param {Object} useToken send token in request
 * @param {Object} useTokenWithoutRefresh don't refreshtoken, default false
 * @returns {Promise}
 */
function request(verb, baseUrl, path, queryParams, body, headers, useToken, useTokenWithoutRefresh = false) {
  if (!_.isNil(body)) {
    headers = _.merge(
      {
        "content-type": "application/json"
      },
      headers
    );
  }
  return extracted(null, headers, verb, baseUrl, path, queryParams, body);
}


export default {
  api: {
    get: apiGet,
    put: apiPut,
    delete: apiDelete,
    post: apiPost
  },
  request: request,
  baseUrl: BASE_URL
};

export const apiConstructor = {
  get: function getConstructor(path) {
    function getForPath(queryParams, headers, useToken = true, useTokenWithoutRefresh = false) {
      return apiGet(path, queryParams, headers, useToken, useTokenWithoutRefresh);
    }

    return getForPath;
  },
  put: function putConstructor(path) {
    function putForPath(body, queryParams, headers, useToken = true) {
      return apiPut(path, body, queryParams, headers, useToken);
    }

    return putForPath;
  },
  delete: function deleteConstructor(path) {
    function deleteForPath(body, queryParams, headers, useToken = true) {
      return apiDelete(path, body, queryParams, headers, useToken);
    }

    return deleteForPath;
  },
  post: function postConstructor(path) {
    function postForPath(body, queryParams, headers, useToken = true) {
      return apiPost(path, body, queryParams, headers, useToken);
    }

    return postForPath;
  }
};
