// __tests__/sum-test.js
jest.dontMock('../jest/sum');

describe('sum', function() {
  it('adds 1 + 2 to equal 3', function() {
    var sum = require('../jest/sum');
    expect(sum(1, 2)).toBe(3);
  });
});