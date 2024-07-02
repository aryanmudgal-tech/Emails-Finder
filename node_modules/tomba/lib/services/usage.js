const Service = require('../service.js');
const TombaException = require('../exception.js');

class Usage extends Service {

    /**
     * get Usage
     *
     * Returns a your monthly requests
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    async getUsage() {
        let path = '/usage';
        let payload = {};

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Usage;