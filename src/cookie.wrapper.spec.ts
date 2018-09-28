import CookieWrapper from './cookie.wrapper';

describe('CookieWrapper', () => {
    it('creates a wrapper for local cookies', () => {
        const wrapper = new CookieWrapper('localhost');
        expect(wrapper['domain']).toBe('localhost');
        expect(wrapper.query()).toEqual([]);

        const wrapper2 = new CookieWrapper();
        expect(wrapper2['domain']).toBe('');
        expect(wrapper2.query()).toEqual([]);
    });
    describe('get', () => {
        const wrapper = new CookieWrapper();
        afterEach(() => {
            if (wrapper.get('a'))
                wrapper.remove('a');
        })
        it('returns a cookie when it exists', () => {
            const orig = wrapper.set('a', 'b');
            const cookie = wrapper.get('a');
            
            expect(cookie.key).toEqual(orig.key);
            expect(cookie.value).toEqual(orig.value);
        });
        it('returns undefined when a cookie does not exist', () => {
            const cookie = wrapper.get('a');

            expect(cookie).toBeUndefined();
        });
    });

    describe('set', () => {
        const wrapper = new CookieWrapper();
        it('adds a cookie to the keys and returns it', () => {
            const cookie = wrapper.set('a', 'b', 'c');
            expect(wrapper['keys']['a']).toEqual(cookie);
        });
    });

    describe('remove', () => {
        const wrapper = new CookieWrapper();
        it('removes an existing key', () => {
            wrapper.set('a', 'b');
            const keys = wrapper.query();

            expect(keys).toEqual(['a']);

            wrapper.remove('a');

            const keys2 = wrapper.query();

            expect(keys2.length).toBe(0);
        });

        it('does nothing if the cookie does not exist', () => {
            const keys = wrapper.query();

            expect(keys.length).toBe(0);

            expect(wrapper.remove('a')).toBeUndefined();
        });
    })

    describe('query', () => {
        it('returns a list of all the available keys', () => {
            const wrapper = new CookieWrapper();
            wrapper.set('a', 'b', 'c');
            wrapper.set('d', 'e', 'f');

            expect(wrapper.query()).toEqual(['a', 'd']);

            wrapper.remove('a');
            wrapper.remove('d');
        });
        it('returns an empty list when there are no keys', () => {
            const empty = new CookieWrapper();
            expect(empty.query().length).toBe(0);
        });
    });

    describe('expireIn', () => {
        it('sets expiration date to some days from now', () => {
            Date.prototype.toISOString = jest.fn().mockReturnValue('Wed, 01 Jan 2020 00:00:01 GMT');
            const wrapper = new CookieWrapper();

            wrapper.set('a', 'b');

            wrapper.expireIn('a', -2);

            const cookie = wrapper.get('a');
            expect(cookie).not.toBeUndefined();
        });
    });
});