const {sum} = require('./calculator')

describe('Calculator', () => {
    it('should sum 2 and 2 and the result must be 4 ',  () => {
        expect(sum(2,2)).toBe(4)
    });

    it('should sum 2 and 2 even if of then is a string and to result must be 5 ',  () => {
        expect(sum('2','2')).toBe(4)
    });

    it('should  throw an error if what provided to the method cannot be summed', function () {
        expect(() => {
            sum('', '2')
        }).toThrowError()

        expect(() => {
            sum([2,2])
        }).toThrowError()

        expect(() => {
            sum({})
        }).toThrowError()

        expect(() => {
            sum()
        }).toThrowError()
    });
})
