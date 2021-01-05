import Image from '../../src/components/Image';
import React from 'react';
import renderer from 'react-test-renderer';

const mockLozad = {
  observe: jest.fn()
};

jest.mock('../../src/lozad', () => {
  return jest.fn().mockImplementation((el, options) => {
    mockLozad.options = options;
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
  apiKey: 'abc123'
};

describe('Image', () => {
  beforeEach(() => {
    mockLozad.options = null;
    mockLozad.observe.mockClear();
  });

  it('should not crash when dont have expected parameters', () => {
    renderer.create(
      <Image src={undefined} config={undefined} />,
      testRendererOptions
    );
  });

  it('should render with minimum parameters', () => {
    expect(
      renderer
        .create(
          <Image src={'https://image.here.com/logo.png'} config={testConfig} />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with domain that don\'t have scheme', () => {
    expect(
      renderer
        .create(
          <Image
            src={'https://image.here.com/logo.png'}
            config={{ domain: 'test.com', apiKey: 'abc123' }}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with alt text', () => {
    expect(
      renderer
        .create(
          <Image
            src={'https://image.here.com/logo.png'}
            config={testConfig}
            alt={'yo!'}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with lazy loading disabled', () => {
    expect(
      renderer
        .create(
          <Image
            src={'https://image.here.com/logo.png'}
            config={testConfig}
            lazy={false}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should render with operation that have arguments', () => {
    expect(
      renderer
        .create(
          <Image
            src={'https://image.here.com/logo.png'}
            config={testConfig}
            op={'fit?size=100x200'}
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
          <Image
            src={'data:ABCDEF'}
            config={testConfig}
            op={'fit?size=100x200'}
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
          <Image
            src={'//image.here.com/logo.png'}
            config={testConfig}
            op={'fit?size=100x200'}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should encode image source if it has query params', () => {
    expect(
      renderer
        .create(
          <Image
            src={'//image.here.com/logo.png?param=1'}
            config={testConfig}
            op={'fit?size=100x200'}
          />,
          testRendererOptions
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('should use default config in intersection observer config', () => {
    renderer
      .create(
        <Image src={'https://image.here.com/logo.png'} config={testConfig} lazy={true}/>,
        testRendererOptions
      );

    expect(mockLozad.options).toEqual({
      threshold: 0.01,
      rootMargin: '40px 0px 0px 0px'
    });
  });

  it('should override default values in intersection observer config', () => {
    const config = Object.assign(
      {},
      testConfig,
      {
        lozadOptions: {
          rootMargin: '10px 10px 10px 10px'
        }
      });

    renderer
      .create(
        <Image src={'https://image.here.com/logo.png'}
          config={config}
          lazy={true}/>,
        testRendererOptions
      );

    expect(mockLozad.options).toEqual({
      threshold: 0.01,
      rootMargin: '10px 10px 10px 10px'
    });
  });
});
