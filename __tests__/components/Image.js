import Image from '../../src/components/Image';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../src/lozad', () => {
  return jest.fn().mockImplementation(() => {
    return {
      observe: () => {}
    };
  });
});

const testRendererOptions = {
  createNodeMock: () => {
    return {
      getBoundingClientRect: () => { return {}; }
    };
  }
};

const testConfig = {
  domain: 'https://test.com',
  apiKey: 'abc123'
};

describe('Image', () => {
  it('should render with minimum parameters', () => {
    expect(
      renderer.create(<Image src={'https://image.here.com/logo.png'} config={testConfig}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });

  it('should render with domain that don\'t have scheme', () => {
    expect(
      renderer.create(<Image src={'https://image.here.com/logo.png'} config={{domain: 'test.com', apiKey: 'abc123'}}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });

  it('should render with alt text', () => {
    expect(
      renderer.create(<Image src={'https://image.here.com/logo.png'} config={testConfig} alt={'yo!'}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });

  it('should render with lazy loading disabled', () => {
    expect(
      renderer.create(<Image src={'https://image.here.com/logo.png'} config={testConfig} lazy={false}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });

  it('should render with operation that have arguments', () => {
    expect(
      renderer.create(<Image src={'https://image.here.com/logo.png'} config={testConfig} op={'fit?size=100x200'}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });

  it('should not apply URL transformation for data: sources', () => {
    expect(
      renderer.create(<Image src={'data:ABCDEF'} config={testConfig} op={'fit?size=100x200'}/>, testRendererOptions).toJSON()
    ).toMatchSnapshot();
  });
});