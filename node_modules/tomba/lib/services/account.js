const Service = require('../service.js');
const TombaException = require('../exception.js');

class Account extends Service {

    /**
     * Get Account
     *
     * Returns information about the current account.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    async getAccount() {
        let path = '/me';
        let payload = {};

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Account;