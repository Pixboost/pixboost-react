import Picture from '../../src/components/Picture';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('lozad', () => {
  return jest.fn().mockImplementation(() => {
    return {
      observe: () => {}
    };
  });
});

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123',
  breakpoints: {
    lg: {media: '(min-width: 990px)'},
    md: {media: '(min-width: 640px)'},
    sm: {}
  }
};

describe('Picture', () => {
  it('should render with minimum parameters', () => {
    expect(
      renderer.create(
        <Picture config={testConfig}
          breakpoints={{
            sm: {hide: true},
            md: {src: 'https://here.com/logo.png', op: 'resize?size=200'},
            lg: {src: 'https://here.com/logo-large.png'}
          }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should render when not lazy', () => {
    expect(
      renderer.create(
        <Picture config={testConfig}
                 lazy={false}
                 breakpoints={{
                   sm: {hide: true},
                   md: {src: 'https://here.com/logo.png', op: 'resize?size=200'},
                   lg: {src: 'https://here.com/logo-large.png'}
                 }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should render with alt attribute', () => {
    expect(
      renderer.create(
        <Picture config={testConfig}
                 alt={'YO!'}
                 breakpoints={{
                   sm: {hide: true},
                   md: {src: 'https://here.com/logo.png', op: 'resize?size=200'},
                   lg: {src: 'https://here.com/logo-large.png'}
                 }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});