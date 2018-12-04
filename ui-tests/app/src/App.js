import React, { Component } from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import SimpleImage from './test-pages/Image/SimpleImage';
import LazyImage from './test-pages/Image/LazyImage';
import LazyVisibleImage from './test-pages/Image/LazyVisibleImage';
import LazyImageWithSourceUpdate from './test-pages/Image/LazyImageWithSourceUpdate';

class Toc extends Component {
  render() {
    return (
      <ul>
        <li><Link to={'/image/simple'}>Simple image</Link></li>
        <li><Link to={'/image/lazy'}>Lazy image</Link></li>
        <li><Link to={'/image/lazy-visible'}>Lazy Visible image</Link></li>
        <li><Link to={'/image/lazy-update'}>Lazy image with update</Link></li>
      </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className={'js-app'}>
          <Switch>
            <Route exact path={'/'} component={Toc}/>
            <Route path={'/image/simple'} component={SimpleImage}/>
            <Route path={'/image/lazy'} component={LazyImage}/>
            <Route path={'/image/lazy-visible'} component={LazyVisibleImage}/>
            <Route path={'/image/lazy-update'} component={LazyImageWithSourceUpdate}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
