import Cookie from './cookie';

export interface ICookieKeys {
    [a: string]: Cookie
}
/**
 * Wraps Cookie sessions into a decent-to-use class for TypeScript projects.
 * 
 * Allows for most usual operations done over cookies, ie:
 *  - get a Cookie - get(<key:string>)
 *  - set a Cookie - set(<key:string>, <value:string>)
 *  - remove a Cookie - remove(<key:string>)
 *  - list all Cookie keys - query()
 */
export default class CookieWrapper {
    private keys: ICookieKeys = {};
    private domain: string;

    constructor(domain: string = "") {
        this.domain = domain;
        this.parse();
    }

    /**
     * Returns a key stored in the Cookie session
     * @param key
     * @returns {Cookie}
     */
    public get(key: string): Cookie {
        this.parse();
        if (!this.keys[key]) return undefined;
        return this.keys[key];
    }

    /**
     * Sets a cookie in the Cookie session
     * @param key
     * @param value
     * @param expiration
     * @returns {Cookie}
     */
    public set(key: string, value: string, expiration: string = ''): Cookie {
        this.keys[key] = new Cookie(key, value, this.domain, expiration);
        return this.keys[key];
    }

    /**
     * Removes a cookie from the Cookie session
     * @deprecated: use the cookie object itself after using getKey
     * @param key
     */
    public remove(key: string) {
        const cookie = this.keys[key];
        if (!cookie) return;
        cookie.delete();
    }

    /**
     * Returns a list of all the Cookie keys
     * @returns {Array<string>}
     */
    public query(): Array<string> {
        this.parse();
        if (!Object.keys(this.keys).length) return [];
        return Object.keys(this.keys);
    }

    /**
     * Sets Expiration date on a key
     * @param key
     * @param days
     * @returns {Cookie}
     */
    public expireIn(key: string, days: number): Cookie {
        this.parse();
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + days);
        const cookie = this.get(key);
        cookie.expires = expiration.toISOString();
        cookie.save();
        return cookie;
    }

    /**
     * Populates this.keys as a Javascript Object indexing all Cookie objects currently in the
     * browser session
     */
    private parse() {
        let crumbs = document.cookie.split("; ");
        if (!crumbs[crumbs.length-1]) {
            crumbs.pop();
        }
        let keys = JSON.parse("{" +
            crumbs.map(crumb => {
                const crumbArr = crumb.split(/=/);
                return `"${crumbArr[0]}": "${crumbArr[1]}"`;
            }).join(",") +
        "}");
        this.keys = {};
        Object.keys(keys).forEach(key => {
            this.keys[key] = new Cookie(
                key, keys[key], keys[key].domain, keys[key].expires, keys[key].path
            );
        });
    }
}
