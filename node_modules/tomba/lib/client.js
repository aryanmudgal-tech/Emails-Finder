const axios = require('axios');
const TombaException = require('./exception.js');

class Client {
    
    constructor() {
        this.endpoint = 'https://api.tomba.io/v1';
        this.headers = {
            'x-sdk-version': 'tomba:nodejs:v1.0.2',
        };
        this.selfSigned = false;
    }

    /**
     * Set Key
     *
     * Your Key
     *
     * @param {string} key
     *
     * @return self
     */
    setKey(key) {
        this.addHeader('X-Tomba-Key', key);

        return this;
    }

    /**
     * Set Secret
     *
     * Your Secret
     *
     * @param {string} secret
     *
     * @return self
     */
    setSecret(secret) {
        this.addHeader('X-Tomba-Secret', secret);

        return this;
    }

    /**
     * Set self signed.
     *
     * @param {bool} status
     *
     * @return this
     */
    setSelfSigned(status = true) {
        this.selfSigned = status;

        return this;
    }

    /**
     * Set endpoint.
     *
     * @param {string} endpoint
     *
     * @return this
     */
    setEndpoint(endpoint)
    {
        this.endpoint = endpoint;

        return this;
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    addHeader(key, value) {
        this.headers[key.toLowerCase()] = value;
        
        return this;
    }
      
    async call(method, path = '', headers = {}, params = {}, responseType = 'json') {
        if(this.selfSigned) { // Allow self signed requests
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        }

        headers = Object.assign(this.headers, headers);

        let contentType = headers['content-type'].toLowerCase();

        let formData = null;

        let options = {
            method: method.toUpperCase(),
            url: this.endpoint + path,
            params: (method.toUpperCase() === 'GET') ? params : {},
            headers: headers,
            data: (method.toUpperCase() === 'GET' || contentType.startsWith('multipart/form-data')) ? formData : params,
            json: (contentType.startsWith('application/json')),
            responseType: responseType
        };
        try {
            let response = await axios(options);
            return response.data;
        } catch(error) {
            if('response' in error) {
                if(error.response && 'data' in error.response) {
                    if (typeof(error.response.data) === 'string') {
                        throw new TombaException(error.response.data, error.response.status, error.response.data);   
                    } else {
                        throw new TombaException(error.response.data.errors.message, error.response.status, error.response.data);
                    }
                } else {
                    throw new TombaException(error.response, error.response.status, error.response.data);
                }
            } else {
                throw new TombaException(error.message);
            }
        }
    }
}

module.exports = Client;
