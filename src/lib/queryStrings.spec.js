const { queryString } = require('./queryStrings');

describe('Object to query string', () => {
  it('should  create a valid quey string when an object is provided', () => {
    const obj = {
      name: 'Felipe',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Felipe&profession=developer');
  });
  it('should create a valid quey string when an array is passed as value', () => {
    const obj = {
      name: 'Felipe',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Felipe&abilities=JS,TDD');
  });
  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Felipe',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});
