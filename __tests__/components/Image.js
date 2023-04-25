import Image from '../../src/components/Image';
import React from 'react';
import renderer from 'react-test-renderer';

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123'
};

describe('Image', () => {
  it('should not crash when dont have expected parameters', () => {
    renderer.create(
      <Image src={undefined} config={undefined} />
    );
  });

  it('should render with minimum parameters', () => {
    expect(
      renderer
        .create(
          <Image src={'https://image.here.com/logo.png'} config={testConfig} />
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
          />
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
          />
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
          />
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
          />
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
          />
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
          />
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
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
