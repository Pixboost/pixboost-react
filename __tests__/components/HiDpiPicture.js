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
            sm: {op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            md: {op: 'resize?size={WIDTH}'},
            lg: {op: 'resize?size={WIDTH}'}
          }}
          sizes={{
            sm: '100vw',
            md: '640px',
            lg: '1500px'
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
            md: {op: 'resize?size={WIDTH}'},
            sm: {op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            lg: {op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          sizes={{
            md: '640px',
            sm: '100vw',
            lg: '1500px'
          }}
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
            sm: {op: 'fit?size={WIDTH}x{HEIGHT}', height: 600},
            md: {op: 'resize?size={WIDTH}'},
            lg: {op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
          sizes={{
            sm: '100vw',
            md: '640px',
            lg: '1500px'
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
            sm: {op: 'optimise'},
            md: {op: 'asis'},
            lg: {op: 'resize?size={WIDTH}'}
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
          sizes={{
            sm: '100vw',
            md: '640px',
            lg: '1500px'
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
            whatisthis: {op: 'optimise'},
          }}
          minWidth={300}
          maxWidth={1500}
          src="//here.com/logo.png"
          imgProps={{
            width: 100,
            height: 200
          }}
          sizes={{
            whatisthis: '100vw'
          }}
        />
      );
    }).toThrow('could not find breakpoint [whatisthis] in the config');
  });
});
