/*
 * Author: Suraj Sanwal
 * Copyright (c) 2019 smartData Inc
 */

const envConfig = {
  development: {
    frontEnd: "34.211.31.84",
    apiServer: "34.211.31.84",
    apiPath: "wp-json/wp/",
    apiVersion: "v2",
    port: {backend: 7076, frontEnd: 7076},
    entry: "index.php",
  },
  production: {
    frontEnd: "34.211.31.84",
    apiServer: "34.211.31.84",
    apiPath: "wp-json/wp/",
    apiVersion: "v2",
    port: {backend: 7076, frontEnd: 7076},
    entry: "index.php",
  },
};
/* eslint-disable-next-line */
export const env = envConfig["production"];

//dummy url ==> http://34.211.31.84:7076/index.php/wp-json/wp/v2
const frontEndUrl = `http://${env.frontEnd}:${env.port.frontEnd}/`,
  http_url = `http://${env.apiServer}:${env.port.backend}/${env.entry}/${env.apiPath}/${env.apiVersion}/`,
  apiBase_url = `http://${env.apiServer}:${env.port.backend}/${env.entry}/${env.apiPath}/${env.apiVersion}/`;

/* eslint-enable */
export default class Connection {
  static getRestUrl() {
    return apiBase_url;
  }
  static getCmsUrl() {
    return frontEndUrl;
  }
  static getBaseUrl() {
    return http_url;
  }
  static getSuccessUrl() {
    return `${apiBase_url}success.html`;
  }
  static getErrorUrl() {
    return `${apiBase_url}failure.html`;
  }
}
