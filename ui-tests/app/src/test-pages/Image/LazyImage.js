import React, { Component } from 'react';
import {Image} from 'pixboost-react';
import {pixboostConfig} from '../config';

class LazyImage extends Component {
  render() {
    return (
      <div>
        <div style={{minHeight: '2000px'}}/>
        <Image src={'http://www.midday.coffee/assets/banner.jpg'} lazy={true} config={pixboostConfig}/>
      </div>
    );
  }
}

export default LazyImage;