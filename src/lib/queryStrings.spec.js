const {queryString} = require('./queryStrings')

describe('Object to query string', () => {
    it('should  create a valid quey string when an object is provided', () => {
        const obj = {
            name: 'Felipe',
            profession: 'developer'
        }

        expect(queryString(obj)).toBe('name=Felipe&profession=developer')
    });
});