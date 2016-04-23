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

    constructor() {
        this.parseKeys();
    }

    /**
     * Returns a key stored in the Cookie session
     * @param key
     * @returns {any}
     */
    public getKey(key: string) {
        if (!this.keys[key]) this.parseKeys();
        if (!this.keys[key]) throw new Error(`Cookie "${key}" does not exist.`);
        return this.keys[key];
    }

    /**
     * Sets a cookie in the Cookie session
     * @param key
     * @param value
     */
    public setKey(key: string, value: string | number) {
        this.keys[key] = value;
        document.cookie = `${key}=${value};`;
    }

    /**
     * Removes a cookie from the Cookie session
     * @param key
     */
    public removeKey(key: string) {
        delete this.keys[key];
        this.setKey(key, '; expires=Thu, 01 Jan 1970 00:00:01 GMT');
    }

    /**
     * Returns a list of all the Cookie keys
     * @returns {string[]}
     */
    public queryKeys() {
        return Object.keys(this.keys);
    }

    /**
     * Populates this.keys as a Javascript Object
     */
    private parseKeys() {
        this.keys = JSON.parse(`{"${document.cookie.replace(/; /g, ',').replace(/=/g, `":"`)}"}`);
    }
}
