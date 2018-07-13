import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Image} from 'pixboost-react';
import Picture from '../../src/components/Picture';

class App extends Component {
  render() {
    const pixboostConfig = {
      apiKey: 'MTg4MjMxMzM3MA__',
      domain: 'pixboost.com',
      breakpoints: {
        lg: {media: '(min-width: 990px)'},
        md: {media: '(min-width: 640px)'},
        sm: {}
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Image src={'https://cdn.pixabay.com/photo/2017/06/05/14/55/glass-2374311__340.jpg'}
               alt={'glass'}
               lazy={false}
               op={'optimise'}
               config={pixboostConfig}
               className="TopImage"
        />
        <Picture breakpoints={
          {
            lg: {src: 'https://cdn.pixabay.com/photo/2018/03/01/09/33/laptop-3190194_960_720.jpg'},
            md: {src: 'https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg', op: 'fit?size=300x300'},
            sm: {hide: true}
          }
        } config={pixboostConfig}/>
        <div className={'Spacer'}>
          Scroll down to see lazy image
        </div>
        <Image src={'https://cdn.pixabay.com/photo/2016/05/10/15/29/bear-1383980_960_720.jpg'}
               alt={'lazy bear'}
               op={'resize?size=200'}
               config={pixboostConfig}/>
      </div>
    );
  }
}

export default App;
