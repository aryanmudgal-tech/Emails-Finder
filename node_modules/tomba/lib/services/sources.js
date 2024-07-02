const Service = require('../service.js');
const TombaException = require('../exception.js');

class Sources extends Service {

    /**
     * Email Sources
     *
     * Find email address source somewhere on the web.
     *
     * @param {string} email
     * @throws {TombaException}
     * @returns {Promise}
     */
    async emailSources(email) {
        if (typeof email === 'undefined') {
            throw new TombaException('Missing required parameter: "email"');
        }

        let path = '/email-sources/{email}'.replace('{email}', email);
        let payload = {};

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Sources;