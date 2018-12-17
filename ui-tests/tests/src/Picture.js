const assert = require('chai').assert;

describe('Picture', function() {
  it('simple', function() {
    return this.browser
      .url('http://localhost:3000/picture/simple')
      .assertView('plain', '.js-app');
  });
});