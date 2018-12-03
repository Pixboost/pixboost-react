import React, { Component } from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import SimpleImage from './test-pages/Image/SimpleImage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className={'js-app'}>
          <ul>
              <li><Link to={'/image/simple'}>Simple image</Link></li>
          </ul>
          <Switch>
            <Route path={'/image/simple'} component={SimpleImage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
