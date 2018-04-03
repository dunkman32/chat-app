const expect = require('expect');

let {isRealString} = require('./validation');

describe('func isRealString', () => {
    it('should reject non-string values', function () {
        let res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject to string with only spaces', function () {
        let res = isRealString(' ');
        expect(res).toBe(false);
    });

    it('should allow correct string', function () {
        let res = isRealString(' s ');
        expect(res).toBe(true);
    });
});