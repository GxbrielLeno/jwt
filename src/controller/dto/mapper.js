const {AuthResponse} = require("./response");

function mapToJSON(cache) {
    let currentCredential = cache.get('currentCredential');
    return new AuthResponse(currentCredential.get('access_token'),
        currentCredential.get('refresh_token'),
        currentCredential.get('expires_in'),
        currentCredential.get('refresh_expires_in'),
        currentCredential.get('token_type'))
}

module.exports = {
    mapToJSON: mapToJSON
}
