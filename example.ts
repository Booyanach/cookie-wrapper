import {CookieWrapper} from 'cookie.wrapper';

export class HowdyHo {
    private message: string;

    constructor(private cookieWrapper: CookieWrapper) {
        this.cookieWrapper.setKey('Eh', 'a cookie!');
        this.message = this.cookieWrapper.getKey('Eh');
    }
}
