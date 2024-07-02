const Service = require('../service.js');
const TombaException = require('../exception.js');

class Domain extends Service {

    /**
     * Domain Search
     *
     * You can use this endpoint to show different browser icons to your users.
     * The code argument receives the browser code as it appears in your user
     * /account/sessions endpoint. Use width, height and quality arguments to
     * change the output settings.
     *
     * @param {string} domain
     * @param {number} page
     * @param {number} limit
     * @param {string} department
     * @throws {TombaException}
     * @returns {Promise}
     */
    async domainSearch(domain, page, limit, department) {
        if (typeof domain === 'undefined') {
            throw new TombaException('Missing required parameter: "domain"');
        }

        let path = '/domain-search';
        let payload = {};

        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }

        if (typeof page !== 'undefined') {
            payload['page'] = page;
        }

        if (typeof limit !== 'undefined') {
            payload['limit'] = limit;
        }

        if (typeof department !== 'undefined') {
            payload['department'] = department;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Domain;