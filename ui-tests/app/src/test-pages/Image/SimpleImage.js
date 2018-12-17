import React, { Component } from 'react';
import {Image} from 'pixboost-react';
import {pixboostConfig} from '../config';

class SimpleImage extends Component {
  render() {
    return (
      <Image src={'http://www.midday.coffee/assets/banner.jpg'} lazy={false} config={pixboostConfig}/>
    );
  }
}

export default SimpleImage;