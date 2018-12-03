const assert = require('chai').assert;

describe('Image', function() {
  it('simple', function() {
    return this.browser
      .url('http://localhost:3000/image/simple')
      .assertView('plain', '.js-app');
  });
});