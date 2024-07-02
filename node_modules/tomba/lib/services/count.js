const Service = require('../service.js');
const TombaException = require('../exception.js');

class Count extends Service {

    /**
     * get Email Count
     *
     * Domain name from which you want to find the email addresses.
     *
     * @param {string} domain
     * @throws {TombaException}
     * @returns {Promise}
     */
    async emailCount(domain) {
        if (typeof domain === 'undefined') {
            throw new TombaException('Missing required parameter: "domain"');
        }

        let path = '/email-count';
        let payload = {};

        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Count;