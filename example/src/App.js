import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Image} from 'pixboost-react';

class App extends Component {
  render() {
    const pixboostConfig = {apiKey: 'MTg4MjMxMzM3MA__', domain: 'pixboost.com'};
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
