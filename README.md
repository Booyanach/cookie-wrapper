# cookie-wrapper ![Build status](https://travis-ci.org/Booyanach/cookie-wrapper.svg)
Wraps Cookie sessions into a decent-to-use class for TypeScript projects
## Allows for most usual operations done over cookies, ie:
 *  get a Cookie - getKey(<key:string>)
 *  set a Cookie - setKey(<key:string>, <value:string>)
 *  remove a Cookie - removeKey(<key:string>)

## Example:

```TypeScript
    import {CookieWrapper} from "cookie.wrapper";
    
    export class HowdyHo {
        private message: string;
        
        constructor(private cookieWrapper: CookieWrapper) {
            this.cookieWrapper.setKey("Eh", "a cookie!");
            this.message = this.cookieWrapper.getKey("Eh");
        }
    }
```

## List of TODOs:
 *  A Cookie interface
 *  Keys as an Observable
 *  Possibly wrappers for frameworks
