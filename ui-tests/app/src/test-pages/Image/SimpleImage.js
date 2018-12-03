import React, { Component } from 'react';
import {Image} from 'pixboost-react';

class SimpleImage extends Component {
  render() {
    const config = {
      apiKey: 'MTg4MjMxMzM3MA__',
      domain: 'pixboost.com'
    };
    return (
      <Image src={'http://www.midday.coffee/assets/banner.jpg'} lazy={false} config={config}/>
    );
  }
}

export default SimpleImage;