import React, { Component } from 'react';
import {Image} from 'pixboost-react';
import {pixboostConfig} from '../config';

class LazyVisibleImage extends Component {
  render() {
    return (
      <div>
        <Image src={'http://www.midday.coffee/assets/banner.jpg'} lazy={true} config={pixboostConfig}/>
      </div>
    );
  }
}

export default LazyVisibleImage;