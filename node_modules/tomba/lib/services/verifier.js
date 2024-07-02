const Service = require('../service.js');
const TombaException = require('../exception.js');

class Verifier extends Service {

    /**
     * Email Verifier
     *
     * verify the deliverability of an email address.
     *
     * @param {string} email
     * @throws {TombaException}
     * @returns {Promise}
     */
    async emailVerifier(email) {
        if (typeof email === 'undefined') {
            throw new TombaException('Missing required parameter: "email"');
        }

        let path = '/email-verifier/{email}'.replace('{email}', email);
        let payload = {};

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Verifier;