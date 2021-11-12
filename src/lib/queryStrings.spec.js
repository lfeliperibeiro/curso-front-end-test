const { queryString, parse } = require('./queryStrings');

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

describe('Query string to object', () => {
  it('should corvert a query string to object', () => {
    const queryString = 'name=Felipe&profission=developer';
    expect(parse(queryString)).toEqual({
      name: 'Felipe',
      profission: 'developer',
    });
  });

  it('should corvert a query string to a single key, value to object', () => {
    const queryString = 'name=Felipe';
    expect(parse(queryString)).toEqual({
      name: 'Felipe',
    });
  });
  it('should convert a query string to an object taking care of comma separated values', () => {
    const queryString = 'name=Felipe&abilities=JS,TDD';
    expect(parse(queryString)).toEqual({
      name: 'Felipe',
      abilities: ['JS', 'TDD'],
    });
  });
});
