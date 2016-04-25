# cookie-wrapper ![Build status](https://travis-ci.org/Booyanach/cookie-wrapper.svg) [![npm version](https://badge.fury.io/js/cookie-wrapper.svg)](https://badge.fury.io/js/cookie-wrapper)
Wraps Cookie sessions into a decent-to-use class for TypeScript projects
## Allows for most usual operations done over cookies, ie:
 *  get a Cookie - getKey(<key:string>)
 *  set a Cookie - setKey(<key:string>, <value:string>)
 *  remove a Cookie - removeKey(<key:string>)
 *  list all Cookie keys - queryKeys()

## Installation:
`npm install cookie-wrapper`

## Example:

```TypeScript
    import {CookieWrapper} from "cookie.wrapper";
    
    export class HowdyHo {
        private cookieWrapper: CookieWrapper = new CookieWrapper();
        private message: string;
        
        constructor() {
            this.cookieWrapper.setKey("Eh", "a cookie!");
            this.message = this.cookieWrapper.getKey("Eh");
        }
    }
```

## Changelog:
 * 0.0.2:
  * Added the ability to list available keys

## List of TODOs:
 *  A Cookie interface
 *  Keys as an Observable
 *  Possibly wrappers for frameworks
