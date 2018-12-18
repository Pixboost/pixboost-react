import React, { Component } from 'react';
import {pixboostConfig} from '../config';
import {Picture} from 'pixboost-react';

class LazyPicture extends Component {
  render() {
    return (
      <div>
        <div style={{minHeight: '2000px'}}/>
        <Picture config={pixboostConfig}
                 breakpoints={{
                   lg: {
                     src: 'http://www.midday.coffee/assets/cups/blur-2846257__340.jpg',
                   },
                   md: {
                     src: 'http://www.midday.coffee/assets/cups/code-geek-2680204__340.png',
                     op: 'fit?size=200x200'
                   },
                   sm: {
                     src: 'http://www.midday.coffee/assets/cups/coffee-3183729__340.jpg',
                     op: 'resize?size=x150'
                   }
                 }}/>
      </div>
    );
  }
}

export default LazyPicture;