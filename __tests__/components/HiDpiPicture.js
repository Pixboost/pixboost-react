import renderer from 'react-test-renderer';
import React from 'react';
import {HiDpiPicture} from '../../src/components/HiDpiPicture';

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123',
  breakpoints: {
    lg: { media: '(min-width: 990px)' },
    md: { media: '(min-width: 640px) and (max-width: 989.98)' },
    sm: {}
  }
};

describe ('HiDpiPicture', () => {
  it('should render HiDpiPicture', () => {
    expect(
      renderer.create(
        <HiDpiPicture alt="YO"
          config={testConfig}
          breakpoints={{
            sm: {width: '100vw', op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            md: {width: '640px', op: 'resize?size={WIDTH}'},
            lg: {width: '1500px', op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
        />
      )).toMatchSnapshot();
  });

  it('should support lazy loading', () => {
    expect(
      renderer.create(
        <HiDpiPicture alt="YO"
          config={testConfig}
          breakpoints={{
            sm: {width: '100vw', op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            md: {width: '640px', op: 'resize?size={WIDTH}'},
            lg: {width: '1500px', op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          lazy
        />
      )).toMatchSnapshot();
  });

  it('should render HiDpiPicture with extra image attributes', () => {
    expect(
      renderer.create(
        <HiDpiPicture alt="YO"
          config={testConfig}
          breakpoints={{
            sm: {width: '100vw', op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            md: {width: '640px', op: 'resize?size={WIDTH}'},
            lg: {width: '1500px', op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
        />
      )).toMatchSnapshot();
  });

  it('should support optimise and asis operations', () => {
    expect(
      renderer.create(
        <HiDpiPicture alt="YO"
          config={testConfig}
          breakpoints={{
            sm: {width: '100vw', op: 'optimise'},
            md: {width: '640px', op: 'asis'},
            lg: {width: '1500px', op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
        />
      )).toMatchSnapshot();
  });

  it('should error when breakpoint is not defined', () => {
    expect(() => {
      renderer.create(
        <HiDpiPicture alt="YO"
          config={testConfig}
          breakpoints={{
            whatisthis: {width: '100vw', op: 'optimise'},
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
        />
      );
    }).toThrow('could not find breakpoint [whatisthis] in the config');
  });
});
