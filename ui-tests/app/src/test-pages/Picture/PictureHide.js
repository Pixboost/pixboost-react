import React, { Component } from 'react';
import {pixboostConfig} from '../config';
import {Picture} from 'pixboost-react';

class PictureHide extends Component {
  render() {
    return (
      <React.Fragment>
        <span>You should not see an image on desktop and tablet.</span>
        <Picture lazy={true}
                 config={pixboostConfig}
                 breakpoints={{
                   lg: {
                     src: 'http://www.midday.coffee/assets/cups/blur-2846257__340.jpg',
                     hide: true
                   },
                   md: {
                     src: 'http://www.midday.coffee/assets/cups/code-geek-2680204__340.png',
                     hide: true
                   },
                   sm: {
                     src: 'http://www.midday.coffee/assets/cups/coffee-3183729__340.jpg',
                     op: 'resize?size=x150'
                   }
                 }}/>
      </React.Fragment>
    );
  }
}

export default PictureHide;