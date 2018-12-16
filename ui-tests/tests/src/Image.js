const assert = require('chai').assert;

describe('Image', function() {
  it('simple', function() {
    return this.browser
      .url('http://localhost:3000/image/simple')
      .assertView('plain', '.js-app');
  });

  it('lazy-visible', function() {
    return this.browser
      .url('http://localhost:3000/image/lazy-visible')
      .assertView('plain', '.js-app');
  });

  hermione.skip.in('ie', `IE doesn't support intersection observer`);
  it('lazy', function() {
    return this.browser
      .url('http://localhost:3000/image/lazy')
      .getAttribute('img', 'src')
      .then(src => {
        assert.equal(src, 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
      })
      .scroll('img')
      .getAttribute('img', 'src')
      .then(src => {
        assert.equal(src, 'http://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTg4MjMxMzM3MA__');
      });
  });

  it('lazy image with source update', function() {
    const browser = this.browser;
    return this.browser
      .url('http://localhost:3000/image/lazy-update')
      .assertView('initial', '.js-app')
      .click('button')
      .waitUntil(function() {
        return browser.getAttribute('img', 'src').then(attr => {
          return attr === 'http://pixboost.com/api/2/img/http://www.midday.coffee/assets/cup.jpeg/optimise?auth=MTg4MjMxMzM3MA__'
        });
      }, 3000, 'expected to update image source')
      .assertView('updated', '.js-app');
  });

});