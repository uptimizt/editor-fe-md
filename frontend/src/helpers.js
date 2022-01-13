import { requestInProgress, restApiParams, appPass } from './stores.js';

let headers = {};

let restBaseUrl;

restApiParams.subscribe((value) => {
  if (value.nonce) {
    headers['X-WP-Nonce'] = value.nonce;
  }

  restBaseUrl = value.root;
});

appPass.subscribe((value) => {
  if (value && headers['X-WP-Nonce'] === undefined) {
    headers['Authorization'] = value;
  }
});


export function changeUrl(path = '') {
  console.log(window.location);
  window.history.pushState("", "", path);
}

export function getRestUrl(path = '') {
  path = path.startsWith('/') ? path.slice(1) : path;
  return restBaseUrl + path;
}


export async function remoteRequest(url, args = {}) {
  requestInProgress.set(true);
  let data = [];

  
  if (undefined === url) {
    requestInProgress.set(false);
    return false;
  }

  if (args.method === undefined) {
    args.method = 'GET';
  }
  if (undefined === args.headers) {
    args.headers = headers;
  } else {
    // console.log(args.headers);
    args.headers['Authorization'] = headers['Authorization'];
  }

  if(args.headers["Content-Type"] === undefined) {
    args.headers["Content-Type"] = "application/json";
  }

  console.log(url, args);
  const response = await fetch(url, args);

  if (response.ok) {
    data.json = await response.json();
    data.url = url;
  }

  requestInProgress.set(false);

  return data;
}
