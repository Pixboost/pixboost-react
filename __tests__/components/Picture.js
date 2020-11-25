import Picture from '../../src/components/Picture';
import React from 'react';
import renderer from 'react-test-renderer';

const mockLozad = {
  observe: jest.fn()
};

jest.mock('../../src/lozad', () => {
  return jest.fn().mockImplementation(() => {
    return mockLozad;
  });
});

const testRendererOptions = {
  createNodeMock: () => {
    return {
      getBoundingClientRect: () => {
        return {};
      }
    };
  }
};

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123',
  breakpoints: {
    lg: { media: '(min-width: 990px)' },
    md: { media: '(min-width: 640px)' },
    sm: {}
  }
};

const testConfigWithAllBreakpoints = {
  domain: 'https://test.com',
  apiKey: 'abc123',
  breakpoints: {
    lg: { media: '(min-width: 990px)' },
    md: { media: '(min-width: 640px)' },
  }
};

describe('Picture', () => {
  beforeEach(() => {
    mockLozad.observe.mockClear();
  });

  it('should not crash if one of the breakpoints don\'t have source', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            breakpoints={{
              sm: {},
              md: { src: undefined, op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with minimum parameters', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            breakpoints={{
              sm: { hide: true },
              md: { src: 'https://here.com/logo.png', op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render when not lazy', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            lazy={false}
            breakpoints={{
              sm: { hide: true },
              md: { src: 'https://here.com/logo.png', op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render when not lazy and with all breakpoints specified', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfigWithAllBreakpoints}
            lazy={false}
            breakpoints={{
              md: { src: 'https://here.com/logo.png', op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with alt attribute', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            alt={'YO!'}
            breakpoints={{
              sm: { hide: true },
              md: { src: 'https://here.com/logo.png', op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should not apply URL transformation for data: sources', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            alt={'YO!'}
            breakpoints={{
              sm: { hide: true },
              md: { src: 'data:ABCDEF', op: 'resize?size=200' },
              lg: { src: 'https://here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should replace source that starts with // to https://', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            alt={'YO!'}
            breakpoints={{
              sm: { hide: true },
              md: { src: '//here.com/logo.png', op: 'resize?size=200' },
              lg: { src: '//here.com/logo-large.png' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should encode sources that have query params', () => {
    expect(
      renderer
        .create(
          <Picture
            config={testConfig}
            alt={'YO!'}
            breakpoints={{
              sm: { hide: true },
              md: { src: '//here.com/logo.png?param=1', op: 'resize?size=200' },
              lg: { src: '//here.com/logo-large.png?param=2' }
            }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
