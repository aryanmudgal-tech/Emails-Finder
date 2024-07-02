declare module "tomba" {
  export class Client {
    /**
     * Set endpoint.
     *
     * @param {string} endpoint
     *
     * @return {this}
     */
    setEndpoint(endpoint: string): Client;

    /**
     * Set self signed.
     *
     * @param {bool} status
     *
     * @return {this}
     */
    setSelfSigned(status?: boolean): Client;

    /**
     * Set Key
     *
     * Your Key
     *
     * @param {string} value
     *
     * @returns {this}
     */
    setKey(key: string): Client;

    /**
     * Set Secret
     *
     * Your Secret
     *
     * @param {string} value
     *
     * @returns {this}
     */
    setSecret(secret: string): Client;
  }

  export class TombaException extends Error {
    public code: number | null;
    public response: string | null;
    constructor(message: string, code?: number, response?: string);
  }

  export class Service {
    public client: Client;
    constructor(client: Client);
  }

  export class Account extends Service {

    /**
     * Get Account
     *
     * Returns information about the current account.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getAccount<T extends unknown>(): Promise<T>;
  }
  export class Domain extends Service {

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
    domainSearch<T extends unknown>(domain: string, page?: number, limit?: number, department?: string): Promise<T>;
  }
  export class Finder extends Service {

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
    emailFinder<T extends unknown>(domain: string, firstName: string, lastName: string): Promise<T>;
  }
  export class Verifier extends Service {

    /**
     * Email Verifier
     *
     * verify the deliverability of an email address.
     *
     * @param {string} email
     * @throws {TombaException}
     * @returns {Promise}
     */
    emailVerifier<T extends unknown>(email: string): Promise<T>;
  }
  export class Sources extends Service {

    /**
     * Email Sources
     *
     * Find email address source somewhere on the web.
     *
     * @param {string} email
     * @throws {TombaException}
     * @returns {Promise}
     */
    emailSources<T extends unknown>(email: string): Promise<T>;
  }
  export class Status extends Service {

    /**
     * Domain status
     *
     * Returns domain status if is webmail or disposable.
     *
     * @param {string} domain
     * @throws {TombaException}
     * @returns {Promise}
     */
    domainStatus<T extends unknown>(domain: string): Promise<T>;

    /**
     * get Company Autocomplete
     *
     * Company Autocomplete is an API that lets you auto-complete company names
     * and retrieve logo and domain information.
     *
     * @param {string} query
     * @throws {TombaException}
     * @returns {Promise}
     */
    autoComplete<T extends unknown>(query: string): Promise<T>;
  }
  export class Count extends Service {

    /**
     * get Email Count
     *
     * Domain name from which you want to find the email addresses.
     *
     * @param {string} domain
     * @throws {TombaException}
     * @returns {Promise}
     */
    emailCount<T extends unknown>(domain: string): Promise<T>;
  }
  export class Usage extends Service {

    /**
     * get Usage
     *
     * Returns a your monthly requests
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getUsage<T extends unknown>(): Promise<T>;
  }
  export class Logs extends Service {

    /**
     * get Logs
     *
     * Returns a your last 1,000 requests you made during the last 3 months.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getLogs<T extends unknown>(): Promise<T>;
  }
  export class Keys extends Service {

    /**
     * Get your keys.
     *
     * Returns a list of your keys.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getKeys<T extends unknown>(): Promise<T>;

    /**
     * Delete key
     *
     * Delete key
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    deleteKey<T extends unknown>(id: string): Promise<T>;

    /**
     * Create Key
     *
     * Create a new Key.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    createKey<T extends unknown>(): Promise<T>;

    /**
     * Reset a key
     *
     * Rest your key.
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    resetKey<T extends unknown>(id: string): Promise<T>;
  }
  export class LeadsLists extends Service {

    /**
     * Get Leads Lists
     *
     * Returns a list of leads lists..
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getLists<T extends unknown>(): Promise<T>;

    /**
     * Delete List ID
     *
     * Delete a specific list by passing id.
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    deleteListId<T extends unknown>(id: string): Promise<T>;

    /**
     * Create new List
     *
     * Create a new leads list with the name request parameter
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    createList<T extends unknown>(): Promise<T>;

    /**
     * Update List ID
     *
     * Update the fields of a list using id.
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    updateListId<T extends unknown>(id: string): Promise<T>;
  }
  export class LeadsAttributes extends Service {

    /**
     * Get Lead Attributes
     *
     * Returns a list of Lead Attributes.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    getLeadAttributes<T extends unknown>(): Promise<T>;

    /**
     * Delete Lead Attribute
     *
     * Delete a specific Attributes by passing id.
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    deleteLeadAttribute<T extends unknown>(id: string): Promise<T>;

    /**
     * Create Lead Attribute
     *
     * Create a new Attributes with the name and type request parameter.
     *
     * @throws {TombaException}
     * @returns {Promise}
     */
    createLeadAttribute<T extends unknown>(): Promise<T>;

    /**
     * Update Lead Attribute
     *
     * Update the fields of a Attributes using id.
     *
     * @param {string} id
     * @throws {TombaException}
     * @returns {Promise}
     */
    updateLeadAttribute<T extends unknown>(id: string): Promise<T>;
  }
}
