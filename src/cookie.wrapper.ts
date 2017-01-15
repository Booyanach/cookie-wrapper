import Cookie from './cookie';
/**
 * Wraps Cookie sessions into a decent-to-use class for TypeScript projects.
 * 
 * Allows for most usual operations done over cookies, ie:
 *  - get a Cookie - getKey(<key:string>)
 *  - set a Cookie - setKey(<key:string>, <value:string>)
 *  - remove a Cookie - removeKey(<key:string>)
 *  - list all Cookie keys - queryKeys()
 */
export default class CookieWrapper {
    private keys: any = {};

    constructor(private domain: string = "") {
        this.parseKeys();
    }

    /**
     * Returns a key stored in the Cookie session
     * @param key
     * @returns {Cookie}
     */
    public getKey(key: string): Cookie {
        this.parseKeys();
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
    public setKey(key: string, value: any, expiration: string = ''): Cookie {
        let cookie: Cookie = new Cookie(key, value, this.domain, expiration);
        this.keys[key] = cookie;
        return cookie;
    }

    /**
     * Removes a cookie from the Cookie session
     * @deprecated: use the cookie object itself after using getKey
     * @param key
     */
    public removeKey(key: string) {
        let cookie = this.keys[key];
        cookie.delete();
    }

    /**
     * Returns a list of all the Cookie keys
     * @returns {Array<string>}
     */
    public queryKeys(): Array<string> {
        this.parseKeys();
        if (!Object.keys(this.keys)) return [];
        return Object.keys(this.keys);
    }

    /**
     * Sets Expiration date on a key
     * @param key
     * @param days
     * @returns {Cookie}
     */
    public setExpiration(key: string, days: number): Cookie {
        this.parseKeys();
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + days);
        let cookie = this.getKey(key);
        cookie.expires = expiration.toISOString();
        cookie.save();
        return cookie;
    }

    /**
     * Populates this.keys as a Javascript Object indexing all Cookie objects currently in the
     * browser session
     */
    private parseKeys() {
        let crumbs = document.cookie.split("; ");
        if (!crumbs[crumbs.length-1]) {
            crumbs.pop();
        }
        let keys = JSON.parse("{" +
            crumbs.map(crumb => {
                let crumbArr = crumb.split(/=/);
                return `"${crumbArr[0]}": "${crumbArr[1]}"`;
            }).join(",") +
        "}");
        this.keys = {};
        Object.keys(keys).forEach(key => {
            this.keys[key] = new Cookie(
                key, keys[key].value, keys[key].domain, keys[key].expires, keys[key].path
            );
        });
    }
}
