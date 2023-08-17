class AuthResponse {
    constructor(access_token, refresh_token, expires_in, refresh_expires_in, token_type) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in = expires_in;
        this.refresh_expires_in = refresh_expires_in;
        this.token_type = token_type;
    }
}

module.exports = {
    AuthResponse: AuthResponse
}
