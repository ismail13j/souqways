/* eslint-disable */

"use strict";

// import Connection from "../config/connection";
import NetInfo from "@react-native-community/netinfo";
// import querystring from "querystring";

class RestClient {
  static createFormData = (data = {}) => {
    return Object.keys(data).reduce((formData, item) => {
      formData.append(item, data[item]);
      return formData;
    }, new FormData());
  };
  static isConnected = () => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch()
        .then(state => {
          if (state.isConnected) {
            resolve(state.isConnected);
          } else {
            reject(state.isConnected);
          }
        })
        .catch(e => reject(e));
    });
  };
  static getURLString = (url, queryParam = {}) => {
    return url + "?" + querystring.stringify(queryParam);
  };

  static restCall = (
    url,
    params,
    token = null,
    type = "POST",
    isFormData = false,
  ) => {
    return new Promise((resolve, reject) => {
      this.isConnected()
        .then(() => {
          fetch(Connection.getRestUrl() + url, {
            method: type,
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Authorization: token,
            },
            body: isFormData
              ? this.createFormData(params)
              : JSON.stringify(params),
          })
            .then(response => response.json())
            .then(response => {
              if (response.statusCode === 200) resolve(response);
              else reject(response);
            })
            .catch(error => {
              reject({
                message:
                  "The server is not reachable right now, sorry for inconvenience.",
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          reject({
            message: "Please check your internet connectivity.",
          });
        });
    });
  };
  static getCall = (url, param = {}, token = null) => {
    return new Promise((resolve, reject) => {
      this.isConnected()
        .then(() => {
          let requestURL = RestClient.getURLString(
            Connection.getRestUrl() + url,
            param,
          );
          fetch(url, {
            method: "GET",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Authorization: token,
            },
          })
            .then(response => response.json())
            .then(response => {
              if (response.statusCode === 200) resolve(response);
              else reject(response);
            })
            .catch(error => {
              reject({
                message:
                  "The server is not reachable right now, sorry for inconvenience.",
              });
              console.warn("eroro", error);
            });
        })
        .catch(error => {
          reject({
            message: "Please check your internet connectivity.",
            error,
          });
        });
    });
  };
  static delCall = (url, token = null) => {
    return new Promise((resolve, reject) => {
      this.isConnected()
        .then(() => {
          fetch(Connection.getRestUrl() + url, {
            method: "Delete",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Authorization: token,
            },
          })
            .then(response => response.json())
            .then(response => {
              if (response.statusCode === 200) resolve(response);
              else reject(response);
            })
            .catch(error => {
              reject({
                message:
                  "The server is not reachable right now, sorry for inconvenience.",
              });
            });
        })
        .catch(error => {
          reject({
            message: "Please check your internet connectivity.",
          });
        });
    });
  };

  static sendForm = (url, params) => {
    return new Promise((resolve, reject) => {
      var body = new FormData();
      body.append("file", params);
      RestClient.restCall(url, body, token)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };
}

export default RestClient;
