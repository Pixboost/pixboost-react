import renderer from 'react-test-renderer';
import {Picture} from '../../src/components/Picture2';
import React from 'react';

describe ('Picture2')
it('should render responsive image with hi-DPI support', () => {
  renderer.create(
    <Picture alt="YO"
             config={testConfig}
             breakpoints={{
               sm: {size: '100vw'},
               md: {size: '640w'},
               lg: {size: '1500w'}
             }}
             minSize={300}
             maxSize={1500}
             src="//here.com/logo.png"
             op="resize?size={SIZE}"
    />
  );
});

it('should render responsive image with hi-DPI support 2', () => {
  renderer.create(
    <Picture alt="YO"
             config={testConfig}
             breakpoints={{
               sm: {size: '100vh'},
               md: {size: '500h'},
               lg: {size: '500h'}
             }}
             minSize={300}
             maxSize={1500}
             op="resize?size=x{SIZE}"
    />
  );
});