import Cookie from './cookie';

class TestCookieConstructor extends Cookie {};

describe('Cookie', () => {
    it('generates a Cookie object when instantiated', () => {
        TestCookieConstructor.prototype.save = jest.fn();
        const newCookie = new TestCookieConstructor('a', 'b', 'c');

        expect(newCookie.key).toBe('a');
        expect(newCookie.value).toBe('b');
        expect(newCookie.domain).toBe('c');

        expect(newCookie.save).toHaveBeenCalled();
        jest.clearAllMocks();
    });

    describe('subscription', () => {
        it('updates subscribers when the cookie is updated', done => {
            const newCookie = new Cookie('a', 'b', 'c');

            newCookie.subscribe(() => {
                expect(newCookie.value).toBe('d');
                done();
            });

            newCookie.update('d');
        });
    });

    describe('update', () => {
        it('updates the value of the cookie', () => {
            const newCookie = new Cookie('a', 'b', 'c');

            newCookie.save = jest.fn();

            newCookie.update('d');

            expect(newCookie.value).toBe('d');
            expect(newCookie.save).toHaveBeenCalled();
        });

        it('handles JSON object and stores it as a string', () => {
            const newCookie = new Cookie('a', 'b', 'c');

            newCookie.update({'a':'d'});
            
            expect(newCookie.value).toBe('{"a":"d"}');
        });
    });
    describe('delete', () => {
        it('sets expiration date to the past', () => {
            const newCookie = new Cookie('a', 'b', 'c');

            newCookie.save = jest.fn();

            newCookie.delete();

            expect(newCookie.expires).toBe('Thu, 01 Jan 1970 00:00:01 GMT');
            expect(newCookie.path).toBe('/');

            expect(newCookie.save).toHaveBeenCalled();
        })
    });
    describe('toCookieString', () => {
        it('generates a cookie string according to what is passed to the constructor', () => {
            const newCookie = new Cookie('a', 'b', 'localhost', 'Thu, 01 Jan 1970 00:00:01 GMT', './abc');

            const cookieString = newCookie.toCookieString();
            
            expect(cookieString).toBe('a=b;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=./abc;')
        });
        it('generates a cookie string according to what is passed to the constructor', () => {
            const newCookie = new Cookie('a', 'b');

            const cookieString = newCookie.toCookieString();
            
            expect(cookieString).toBe('a=b;path=/;')
        });
    });
})