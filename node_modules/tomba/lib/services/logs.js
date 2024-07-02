const Service = require('../service.js');
const TombaException = require('../exception.js');

class Logs extends Service {

    /**
     * get Logs
     *
     * Returns a your last 1,000 requests you made during the last 3 months.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    async getLogs() {
        let path = '/logs';
        let payload = {};

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Logs;