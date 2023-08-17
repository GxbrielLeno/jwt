const cache = require("memory-cache");
const jwt_decode = require("jwt-decode");
const { renew } = require("./auth");
const { create } = require("./auth");

function monitor() {
  if (cache.get("currentCredential") == null) {
    initializeAccessTokenReference();
  } else {
    monitorTimeInterval();
  }
}

function extractCredentialAttributes(response) {
  let map = new Map();
  map.set("access_token", response.data["access_token"]);
  map.set("refresh_token", response.data["refresh_token"]);
  map.set("expires_in", response.data["expires_in"]);
  map.set("refresh_expires_in", response.data["refresh_expires_in"]);
  map.set("token_type", response.data["token_type"]);
  cache.put("currentCredential", map);
  return map;
}

function initializeAccessTokenReference() {
  console.log("Request of new credential.");

  let promisePost = create();
  promisePost
    .then(function (response) {
      let map = extractCredentialAttributes(response);
      console.log("Created credential: " + map.get("access_token"));
    })
    .catch(function (error) {
      console.log(
        "Detected a error during the process of requesting access token: " +
          error
      );
    });
}

function monitorTimeInterval() {
  console.log("Starting monitoring...");
  let map = cache.get("currentCredential");

  let accessToken = map.get("access_token");
  let jwtDecoded = jwt_decode(accessToken, { complete: false });

  let expTime = jwtDecoded.exp;
  let currentTime = Math.floor(+new Date() / 1000);

  let nextMonitoringPeriod =
    process.env.IDP_TASK_UPDATE_INTERVAL_IN_MINUTES * 60;

  if (expTime <= currentTime + nextMonitoringPeriod) {
    let promisePost = renew(map.get("refresh_token"));
    promisePost
      .then(function (response) {
        let map = extractCredentialAttributes(response);
        console.log("Refreshed credentials: " + map.get("access_token"));
      })
      .catch(function (error) {
        console.log(
          "Detected a error during the process of refresh access token: " +
            error
        );
      });
  } else {
    console.log(
      "Update skipped. Access token remaining time until expiration:  " +
        ((expTime - currentTime) / 60).toFixed(0) +
        " minutes"
    );
  }
}

module.exports = {
  monitor: monitor,
};
