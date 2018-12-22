import React, { Component } from 'react';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import SimpleImage from './test-pages/Image/SimpleImage';
import LazyImage from './test-pages/Image/LazyImage';
import LazyVisibleImage from './test-pages/Image/LazyVisibleImage';
import LazyImageWithSourceUpdate from './test-pages/Image/LazyImageWithSourceUpdate';
import SimplePicture from './test-pages/Picture/SimplePicture';
import LazyPicture from './test-pages/Picture/LazyPicture';
import LazyVisiblePicture from './test-pages/Picture/LazyVisiblePicture';
import LazyPictureWithSourceUpdate from './test-pages/Picture/LazyPictureWithSourceUpdate';
import PictureHide from './test-pages/Picture/PictureHide';

class Toc extends Component {
  render() {
    return (
      <ul>
        <li>
          Image
          <ul>
            <li><Link to={'/image/simple'}>Simple image</Link></li>
            <li><Link to={'/image/lazy'}>Lazy image</Link></li>
            <li><Link to={'/image/lazy-visible'}>Lazy Visible image</Link></li>
            <li><Link to={'/image/lazy-update'}>Lazy image with update</Link></li>
          </ul>
        </li>
        <li>
          Picture
          <ul>
            <li><Link to={'/picture/simple'}>Simple picture</Link></li>
            <li><Link to={'/picture/lazy'}>Lazy picture</Link></li>
            <li><Link to={'/picture/lazy-visible'}>Lazy Visible picture</Link></li>
            <li><Link to={'/picture/lazy-update'}>Lazy picture with update</Link></li>
            <li><Link to={'/picture/hide'}>Hide on specific breakpoints</Link></li>
          </ul>
        </li>
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
            <Route path={'/picture/simple'} component={SimplePicture}/>
            <Route path={'/picture/lazy'} component={LazyPicture}/>
            <Route path={'/picture/lazy-visible'} component={LazyVisiblePicture}/>
            <Route path={'/picture/lazy-update'} component={LazyPictureWithSourceUpdate}/>
            <Route path={'/picture/hide'} component={PictureHide}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
