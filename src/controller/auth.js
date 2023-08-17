const cache = require('memory-cache');
const {mapToJSON} = require("./dto/mapper");
require('dotenv').config();

function getAccessToken(req, res) {
    if(cache.get('currentCredential') == null) {
        console.log(process.env.IDP_CLIENT_ID)
        console.log("Not a valid credential available.")
        res.status(500).contentType("application/json").json("Not a valid credential available."+ process.env.IDP_CLIENT_ID);
    }else{
        console.log("Credential valid.")
        let jsonBody = mapToJSON(cache);
        console.log("Response JSON:", jsonBody);
        res.status(200).contentType("application/json").json(jsonBody);
    }
}

module.exports = {
    getAccessToken: getAccessToken,
};
