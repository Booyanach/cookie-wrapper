import {Subject, PartialObserver, Subscription} from 'rxjs';

/**
 * A class that represents a browser's Cookie string, in an object format
 * Allows for:
 *  - creating a Cookie - new Cookie(
 *      <key:string>, <value:string>, <domain:?string>, <expires:?string>, <path:?string>
 * )
 *  - delete a Cookie - delete()
 *  - convert a Cookie to a browser Cookie string - toCookieString()
 *  - save a Cookie - save()
 *
 *  TODO: endpoint to serve a Cookie as an Observable
 */
export default class Cookie extends Subject<Cookie> {
    key: string;
    path: string;
    value: string;
    domain: string;
    expires: string;

    constructor(
        key: string, value: string, domain: string = '', expires: string = '', path: string = '/'
    ) {
        super();
        this.key = key;
        this.path = path;
        this.value = value;
        this.domain = domain;
        this.expires = expires;

        this.save();
    }

    /*
     * Instead of throwing away the Cookie instance, update it
     */
    public update(value: string | Object) {
        if (typeof value === 'string') {
            this.value = value;
        } else {
            this.value = JSON.stringify(value);
        }
        this.save();
    }

    /**
     * Deletes this cookie, ie, sets the expiry date to before current date.
     */
    public delete() {
        this.expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
        this.path = '/';
        this.save();
    }

    /**
     * Generates a string in the format that document.cookie reads.
     */
    public toCookieString() {
        let cookie = `${this.key}=${this.value};`;

        if (this.expires) {
            cookie += `expires=${this.expires};`;
        }
        if (this.domain) {
            cookie += `domain=${this.domain};`;
        }
        cookie += `path=${this.path};`;
        return cookie;
    }

    /**
     * Stores this cookie to the current document.
     */
    public save() {
        document.cookie = this.toCookieString();
        this.next();
    }
}