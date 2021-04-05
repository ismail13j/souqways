/* eslint-disable */
//export const Server_URL = 'http://34.211.31.84:7076/api/v1';
// https://souqways.com/wp-json/wp/v2/{api_name}
const liveUrl = "souqways.com";
const stagingUrl = "34.211.31.84";
const baseURL = stagingUrl;
const protocol = baseURL === liveUrl ? "https" : "http";
const port = baseURL === liveUrl ? "" : ":7076";
const index = baseURL === liveUrl ? "" : "index.php/";

export const Server_URL = `${protocol}://${baseURL}${port}/${index}wp-json/wp/v2/users`;

export const Latest_Server_URL = `${protocol}://${baseURL}${port}/${index}wp-json/wp/v2`;

export const Social_Login_URL = `${protocol}://${baseURL}${port}/${index}wp-json/wp/v2`;
