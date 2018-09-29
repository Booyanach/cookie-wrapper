# cookie-wrapper ![Build status](https://travis-ci.org/Booyanach/cookie-wrapper.svg) [![npm version](https://badge.fury.io/js/cookie-wrapper.svg)](https://badge.fury.io/js/cookie-wrapper)
Wraps Cookie sessions into a decent-to-use class for TypeScript projects
## Allows for most usual operations done over cookies, ie:
 *  get a Cookie - get(<key:string>)
 *  set a Cookie - set(<key:string>, <value:string>, <expiration?:string>)
 *  remove a Cookie - remove(<key:string>)
 *  list all Cookie keys - query()
 *  set an expiration for a cookie - expireIn(<key:string>, <days:number>)
 *  subscribe to a cooke for when changes occur - subscribe(() => void)

## Installation:
`npm install cookie-wrapper`

## Example:

```TypeScript
    import {CookieWrapper} from "cookie.wrapper";
    
    export class HowdyHo {
        private cookieWrapper: CookieWrapper = new CookieWrapper("your.domain.here");
        private message: string;
        
        constructor() {
            this.cookieWrapper.set("Eh", "a cookie!");
            this.message = this.cookieWrapper.get("Eh");
        }
    }
```

## Changelog:
 * 2.0.1:
    Fix this readme up a bit
    `Cookie` is now an extension of an `RxJS.Subject` class
 * 2.0.0:
    Improved api, more readable, no longer with Key in methods
    Added `update(value: string)` method on the Cookie instance
    Added `subscription` to Cookie, it is an Observable
    Users can now use `(cookie as Cookie).subscription.subscribe(() => ...))`
    to automatically read updates to the Cookie instance
    Unit Tests
    2 years later, I finally did this... phew!
 * 0.1.3:

    Cookies are now a separate Object and have their own api:
        - delete a Cookie - delete()
        - convert a Cookie to a browser Cookie string - toCookieString()
        - save a Cookie - save()
    CookieWrapper now works upon Cookie objects.
    CookieWrapper was not changed in a significant way, so this should be working fine with projects
    using previous versions.
 * 0.1.2:

    Re-worked the parser
 * 0.1.1:

    CookieWrapper now receives a domain name, so it can handle the (dot) issue
 * 0.1.0:

    key parser now gracefully handles non-json strings
 * 0.0.9:

    Correction to the key parser
 * 0.0.8:

    minimal fix to setKey
 * 0.0.7:

    Now handles JS objects.

    Better expiration handling in setKey
 * 0.0.6:

    Added the ability to set cookies which expire

    Fixed an issue when handling json objects in the cookies
 * 0.0.2:

    Added the ability to list available keys

## List of TODOs:
 *  Possibly wrappers for frameworks
