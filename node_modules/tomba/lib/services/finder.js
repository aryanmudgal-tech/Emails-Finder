const Service = require('../service.js');
const TombaException = require('../exception.js');

class Finder extends Service {

    /**
     * Email Finder
     *
     * generates or retrieves the most likely email address from a domain name, a
     * first name and a last name.
     *
     * @param {string} domain
     * @param {string} firstName
     * @param {string} lastName
     * @throws {TombaException}
     * @returns {Promise}
     */
    async emailFinder(domain, firstName, lastName) {
        if (typeof domain === 'undefined') {
            throw new TombaException('Missing required parameter: "domain"');
        }

        if (typeof firstName === 'undefined') {
            throw new TombaException('Missing required parameter: "firstName"');
        }

        if (typeof lastName === 'undefined') {
            throw new TombaException('Missing required parameter: "lastName"');
        }

        let path = '/email-finder';
        let payload = {};

        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }

        if (typeof firstName !== 'undefined') {
            payload['first_name'] = firstName;
        }

        if (typeof lastName !== 'undefined') {
            payload['last_name'] = lastName;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Author Finder
     *
     * This API endpoint generates or retrieves the most likely email address from a blog post url.
     *
     * @param {string} url
     * @throws {TombaException}
     * @returns {Promise}
     */
    async authorFinder(url) {
        if (typeof url === 'undefined') {
            throw new TombaException('Missing required parameter: "url"');
        }


        let path = '/author-finder';
        let payload = {};

        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Linkedin Finder
     *
     * This API endpoint generates or retrieves the most likely email address from a Linkedin URL.
     *
     * @param {string} url
     * @throws {TombaException}
     * @returns {Promise}
     */
    async linkedinFinder(url) {
        if (typeof url === 'undefined') {
            throw new TombaException('Missing required parameter: "url"');
        }


        let path = '/linkedin';
        let payload = {};

        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Phone Finder
     *
     * Search phone are based on the email You give one email and it returns phone data
     *
     * @param {string} email
     * @throws {TombaException}
     * @returns {Promise}
     */
    async phoneFinder(email) {
        if (typeof email === 'undefined') {
            throw new TombaException('Missing required parameter: "email"');
        }


        let path = '/phone/{email}'.replace('{email}', email);
        let payload = {};

        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }

        return await this.client.call('get', path, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Finder;