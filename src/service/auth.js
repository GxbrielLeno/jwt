const axios = require('axios')

function initializeAccessToken() {

    let body = "grant_type=client_credentials&client_id=".concat(process.env.IDP_CLIENT_ID, "&client_secret=", process.env.IDP_CLIENT_SECRET);

    const requestConfig = {
        baseURL: process.env.IDP_ADDRESS,
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}
    };

    console.log("Access-Token request body: " + body);

    return axios.post("/token-service/jwt", body, requestConfig);
};

function renewAccessToken (refreshToken) {

    let body = "grant_type=refresh_token&refresh_token=".concat(refreshToken);

    const requestConfig = {
        baseURL: process.env.IDP_ADDRESS,
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept' : 'application/json'}
    };

    console.log("Refresh-Access-Token request body: " + body);

    return axios.post("/token-service/jwt", body, requestConfig);

};

module.exports = {
    create : initializeAccessToken,
    renew : renewAccessToken
}
