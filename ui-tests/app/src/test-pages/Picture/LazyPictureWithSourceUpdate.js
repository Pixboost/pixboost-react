import React, { Component } from 'react';
import {Picture} from 'pixboost-react';
import {pixboostConfig} from '../config';

class LazyPictureWithSourceUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: 'http://www.midday.coffee/assets/cup.jpeg'
    }
  }

  render() {
    return (
      <div>
        <Picture config={pixboostConfig}
                 breakpoints={{
                   lg: {
                     src: this.state.src,
                   },
                   md: {
                     src: this.state.src,
                     op: 'fit?size=200x200'
                   },
                   sm: {
                     src: this.state.src,
                     op: 'fit?size=200x200'
                   }
                 }}/>
        <button onClick={() => {this.setState({src: 'http://www.midday.coffee/assets/banner.jpg'})}}>Update source</button>
      </div>
    );
  }
}

export default LazyPictureWithSourceUpdate;