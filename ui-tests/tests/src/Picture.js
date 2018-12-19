const assert = require('chai').assert;

describe('Picture', function() {
  it('simple', function() {
    return this.browser
      .url('http://localhost:3000/picture/simple')
      .assertView('plain', '.js-app');
  });

  hermione.skip.in('ie', `IE doesn't support intersection observer`);
  it('lazy', function() {
    return this.browser
      .url('http://localhost:3000/picture/lazy')
      .isExisting('img')
      .then(imgExists => {
        assert.equal(imgExists, false);
      })
      .scroll('picture')
      .waitForExist('img');
  });

  it('lazy-visible', function() {
    return this.browser
      .url('http://localhost:3000/picture/lazy-visible')
      .assertView('plain', '.js-app');
  });

  it('hide', function() {
    return this.browser
      .url('http://localhost:3000/picture/hide')
      .assertView('plain', '.js-app');
  });

  it('lazy picture with source update', function() {
    return this.browser
      .url('http://localhost:3000/picture/lazy-update')
      .assertView('initial', '.js-app')
      .click('button')
      .pause(200)
      .assertView('updated', '.js-app');
  });
});