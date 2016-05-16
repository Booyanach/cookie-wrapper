/**
 * Wraps Cookie sessions into a decent-to-use class for TypeScript projects
 * Allows for most usual operations done over cookies, ie:
 *  - get a Cookie - getKey(<key:string>)
 *  - set a Cookie - setKey(<key:string>, <value:string>)
 *  - remove a Cookie - removeKey(<key:string>)
 *  - list all Cookie keys - queryKeys()
 *
 *  TODO: A Cookie interface
 *  TODO: Keys as an Observable
 */
export default class CookieWrapper {
    private keys: any;

    constructor(private domain: string = "") {
        this.parseKeys();
    }

    /**
     * Returns a key stored in the Cookie session
     * @param key
     * @returns {any}
     */
    public getKey(key: string) {
        this.parseKeys();
        if (!this.keys[key]) return undefined;
        var decoded = decodeURIComponent(this.keys[key]);
        try {
            return JSON.parse(decoded);
        } catch (e) {
            return decoded;
        }
    }

    /**
     * Sets a cookie in the Cookie session
     * @param key
     * @param value
     * @param expiration
     */
    public setKey(key: string, value: any, expiration: string = '') {
        this.keys[key] = encodeURIComponent(JSON.stringify(value));

        let cookie = `${key}=${this.keys[key]};`;

        if (expiration) {
            cookie += `expires=${expiration};`;
        }
        if (this.domain) {
            cookie += `domain=${this.domain};`;
        }

        document.cookie = cookie;
    }

    /**
     * Removes a cookie from the Cookie session
     * @param key
     */
    public removeKey(key: string) {
        delete this.keys[key];
        this.setKey(key, '', 'Thu, 01 Jan 1970 00:00:01 GMT');
    }

    /**
     * Returns a list of all the Cookie keys
     * @returns {string[]}
     */
    public queryKeys() {
        this.parseKeys();
        if (!Object.keys(this.keys)) return [];
        return Object.keys(this.keys);
    }

    /**
     * Sets Expiration date on a key
     * @param key
     * @param days
     * @returns {string[]}
     */
    public setExpiration(key: string, days: number) {
        this.parseKeys();
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + days);
        this.setKey(key, this.getKey(key), expiration.toISOString());
    }

    /**
     * Populates this.keys as a Javascript Object
     */
    private parseKeys() {
        this.keys = JSON.parse('{' +
            (
                document.cookie ?
                '"' + document.cookie.replace(/"/g, '\\\"').
                replace(/=/g, '": "').replace(/; /g, '", "') + '"' :
                ""
            ) +
        '}');
    }
}
