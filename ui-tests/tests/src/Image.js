const assert = require('chai').assert;

describe('Image', function() {
  it('simple', async function({browser}) {
    await browser.url('http://localhost:3000/image/simple');
    await browser.assertView('plain', '.js-app');
  });

  it('lazy-visible', function() {
    return this.browser
      .url('http://localhost:3000/image/lazy-visible')
      .assertView('plain', '.js-app');
  });

  it.only('lazy', async function({browser}) {
    await browser.url('http://localhost:3000/image/lazy');
    const src = browser.$('img').getAttribute('src');
    assert.equal(src, 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
    await browser.scroll('img');
    const loadedSrc = browser.$('img').getAttribute('src');
    assert.equal(loadedSrc, 'http://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTA0ODU5NDA0NQ__');
  });

  it('lazy image with source update', function() {
    const browser = this.browser;
    return this.browser
      .url('http://localhost:3000/image/lazy-update')
      .assertView('initial', '.js-app')
      .click('button')
      .waitUntil(function() {
        return browser.getAttribute('img', 'src').then(attr => {
          return attr === 'http://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTA0ODU5NDA0NQ__'
        });
      }, 3000, 'expected to update image source')
      .assertView('updated', '.js-app');
  });

});