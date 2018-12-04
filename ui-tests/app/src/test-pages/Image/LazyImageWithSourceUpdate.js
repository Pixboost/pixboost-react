import React, { Component } from 'react';
import {Image} from 'pixboost-react';
import {pixboostConfig} from '../config';

class LazyImageWithSourceUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: 'http://www.midday.coffee/assets/banner.jpg'
    }
  }

  render() {
    return (
      <div>
        <Image src={this.state.src} lazy={true} config={pixboostConfig}/>
        <button onClick={() => {this.setState({src: 'http://www.midday.coffee/assets/cup.jpeg'})}}>Update source</button>
      </div>
    );
  }
}

export default LazyImageWithSourceUpdate;