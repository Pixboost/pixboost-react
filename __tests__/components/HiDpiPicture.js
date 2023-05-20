import renderer from 'react-test-renderer';
import React from 'react';
import {HiDpiPicture} from '../../src/components/HiDpiPicture';

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123',
  breakpoints: {
    lg: { media: '(min-width: 990px)' },
    md: { media: '(min-width: 640px)' },
    sm: {}
  }
};

describe ('HiDpiPicture', () => {
  it('should render responsive image with hi-DPI support', () => {
    expect(
      renderer.create(
        <HiDpiPicture alt="YO"
                 config={testConfig}
                 breakpoints={{
                   sm: {size: '100vw', op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
                   md: {size: '640w', op: 'resize?size={WIDTH}'},
                   lg: {size: '1500w', op: 'resize?size={WIDTH}'}
                 }}
                 minWidth={300}
                 maxWidth={1500}
                 src="//here.com/logo.png"
        />
      )).toMatchSnapshot();
  });
});
